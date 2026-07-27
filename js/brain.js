// The cloud brain — Firebase Firestore behind the same interface the mock had.
// (The mock is preserved at brain-mock.js: localStorage + BroadcastChannel,
// useful for demoing the loop with no network. Nothing was thrown away.)
//
// THE ONE STRUCTURAL POINT: views.js reads this synchronously while rendering —
// brain.questions() must return an array NOW, not a promise. So this module
// keeps a local cache that Firestore's onSnapshot feeds, and notifies the
// router to re-render whenever the cache moves. Same interface, live data.
//
// Everything is scoped under events/{EVENT_ID}/ so 2027 is a new drawer,
// not a collision. See config.js.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js'
import { firebaseConfig, EVENT_ID } from './config.js'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const questionsRef = collection(db, 'events', EVENT_ID, 'questions')

/* ---------- listeners ---------- */

const listeners = new Set()

/* Snapshot before iterating: a listener may unsubscribe/resubscribe itself
   while being notified (the router does), and Set.forEach visits re-added
   entries — iterating live would loop forever. Carried over from the mock,
   where it was a real bug, caught in verification. */
function notify() {
  ;[...listeners].forEach((l) => l())
}

/** Subscribe to brain changes. Returns an unsubscribe function. */
export function onChange(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/* ---------- the cache ---------- */

// Full queue. Only ever populated for a signed-in moderator — the rules forbid
// an attendee from listing the collection at all (see firestore.rules).
let cache = []
let queueUnsub = null

// This device's own questions, tracked by id in localStorage. Anonymous
// server-side: the id lives on the phone, never against a person.
const MINE = 'pgw-nc-my-questions'
const mineDocs = new Map() // id -> question
const mineUnsubs = new Map() // id -> unsubscribe
let optimistic = [] // shown instantly on submit, dropped when the real doc lands

function myIds() {
  try {
    return JSON.parse(localStorage.getItem(MINE) ?? '[]')
  } catch {
    return []
  }
}

function rememberId(id) {
  localStorage.setItem(MINE, JSON.stringify([...myIds(), id]))
}

function shape(id, data) {
  return {
    id,
    sessionId: data.sessionId,
    text: data.text,
    status: data.status,
    // serverTimestamp is null for the instant between local write and server ack.
    ts: data.ts?.toMillis?.() ?? null,
  }
}

/** Watch one of my own questions so its status chip goes live. */
function watchMine(id) {
  if (mineUnsubs.has(id)) return
  const unsub = onSnapshot(
    doc(questionsRef, id),
    (snap) => {
      if (snap.exists()) mineDocs.set(id, shape(snap.id, snap.data()))
      else mineDocs.delete(id)
      optimistic = optimistic.filter((q) => q.id !== id)
      notify()
    },
    () => {
      /* A question deleted or unreadable — drop it quietly rather than
         breaking the attendee's page over someone else's housekeeping. */
      mineDocs.delete(id)
      notify()
    },
  )
  mineUnsubs.set(id, unsub)
}

myIds().forEach(watchMine)

/* ---------- reads (synchronous, by design) ---------- */

function byTime(a, b) {
  // Null ts = written locally, not yet server-stamped → it's the newest thing.
  return (a.ts ?? Number.MAX_SAFE_INTEGER) - (b.ts ?? Number.MAX_SAFE_INTEGER)
}

/** The full queue — moderator/screen only. Empty for attendees, by design. */
export function questions() {
  return [...cache].sort(byTime)
}

/** This device's own questions (tracked locally, still anonymous server-side). */
export function myQuestions() {
  const ids = new Set(myIds())
  const real = [...mineDocs.values()].filter((q) => ids.has(q.id))
  return [...real, ...optimistic].sort(byTime)
}

/** The question currently on the big screen, or null. */
export function promotedQuestion() {
  return questions().find((q) => q.status === 'promoted') ?? null
}

/* ---------- writes ---------- */

/** Anonymous by structure: no identity is ever collected or stored. */
export async function submitQuestion(sessionId, text) {
  const body = text.trim()
  if (!body) return null

  // Show it on the asker's screen immediately — a send that appears to do
  // nothing for 300ms reads as broken, and this app is the exhibit.
  const tempId = `local-${crypto.randomUUID()}`
  optimistic = [...optimistic, { id: tempId, sessionId, text: body, status: 'pending', ts: null }]
  notify()

  try {
    const ref = await addDoc(questionsRef, {
      sessionId,
      text: body,
      status: 'pending',
      ts: serverTimestamp(), // server clock, not the phone's — moderator order must be true
    })
    rememberId(ref.id)
    optimistic = optimistic.filter((q) => q.id !== tempId)
    watchMine(ref.id)
    return ref.id
  } catch (err) {
    optimistic = optimistic.map((q) => (q.id === tempId ? { ...q, status: 'failed' } : q))
    notify()
    console.error('[brain] question not sent', err)
    return null
  }
}

export async function setStatus(id, status) {
  await updateDoc(doc(questionsRef, id), { status })
}

/** Put a question on the room screen; the previous one moves to history. */
export async function promote(id) {
  const batch = writeBatch(db)
  cache
    .filter((q) => q.status === 'promoted' && q.id !== id)
    .forEach((q) => batch.update(doc(questionsRef, q.id), { status: 'shown' }))
  batch.update(doc(questionsRef, id), { status: 'promoted' })
  await batch.commit()
}

/* ---------- auth (moderator + room screen only; attendees never sign in) ---------- */

let currentUser = null
let authReady = false

onAuthStateChanged(auth, (u) => {
  currentUser = u
  authReady = true
  queueUnsub?.()
  queueUnsub = null
  cache = []

  if (u) {
    // Signed in: the rules now permit listing the queue.
    queueUnsub = onSnapshot(
      query(questionsRef, orderBy('ts')),
      (snap) => {
        cache = snap.docs.map((d) => shape(d.id, d.data()))
        notify()
      },
      (err) => console.error('[brain] queue listener', err),
    )
  }
  notify()
})

export function user() {
  return currentUser
}

/** False until Firebase has restored (or ruled out) a saved session.
    Stops the room screen flashing a login form on reload mid-conference. */
export function authReadyYet() {
  return authReady
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOutMod() {
  return signOut(auth)
}

/** Fires whenever sign-in state changes, so the router can re-render. */
export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb)
}
