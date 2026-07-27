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
  setDoc,
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js'
import { firebaseConfig, EVENT_ID } from './config.js'
import { applyScheduleOverrides } from './data.js'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const questionsRef = collection(db, 'events', EVENT_ID, 'questions')
const responsesRef = collection(db, 'events', EVENT_ID, 'responses')

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
    // Optional, opt-in per question. Empty string = asked anonymously.
    name: data.name ?? '',
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

/** Anonymous BY DEFAULT. A name is attached only when the asker ticks the box
 *  on that question (Johnny's ask, 2026-07-27) — nothing else about them is
 *  ever collected, named or not: no device id, no account, no tracking. */
export async function submitQuestion(sessionId, text, name = '') {
  const body = text.trim()
  const who = (name || '').trim().slice(0, 60)
  if (!body) return null

  // Show it on the asker's screen immediately — a send that appears to do
  // nothing for 300ms reads as broken, and this app is the exhibit.
  const tempId = `local-${crypto.randomUUID()}`
  optimistic = [...optimistic, { id: tempId, sessionId, text: body, name: who, status: 'pending', ts: null }]
  notify()

  try {
    const ref = await addDoc(questionsRef, {
      sessionId,
      text: body,
      status: 'pending',
      ts: serverTimestamp(), // server clock, not the phone's — moderator order must be true
      // Field omitted entirely when anonymous, so an anonymous question carries
      // no empty name key that could later be mistaken for "we lost the name".
      ...(who ? { name: who } : {}),
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

/* ---------- pulse surveys (Ben Ross's ask: per-session, native, ~1 min) ----------
   One 1-5 rating plus an optional comment. Anonymous exactly like questions:
   nothing identifying is collected or stored. "Have I already answered this
   one?" is a DEVICE fact, kept in localStorage — the server has no idea who
   answered what, only that N people rated session X. That is deliberate: the
   moment the server could tell, the anonymity promise on the Ask screen would
   be a half-truth. */

const DONE = 'pgw-nc-my-responses'

let responseCache = [] // crew-only, same as the question queue
let responseUnsub = null

function doneIds() {
  try {
    return JSON.parse(localStorage.getItem(DONE) ?? '[]')
  } catch {
    return []
  }
}

/** Has this device already rated this session? */
export function hasResponded(sessionId) {
  return doneIds().includes(sessionId)
}

/** Submit a pulse response. rating 1-5, comment optional. */
export async function submitResponse(sessionId, rating, comment = '') {
  const body = comment.trim()
  const payload = { sessionId, rating, ts: serverTimestamp() }
  if (body) payload.comment = body

  // Mark done locally FIRST: if the write fails we would rather a person not be
  // nagged twice by a card they already dismissed. The data is nice to have;
  // pestering an adviser mid-conference is not.
  localStorage.setItem(DONE, JSON.stringify([...new Set([...doneIds(), sessionId])]))
  notify()

  try {
    await addDoc(responsesRef, payload)
    return true
  } catch (err) {
    console.error('[brain] response not sent', err)
    return false
  }
}

/** All responses — crew only. Empty for attendees, by design. */
export function responses() {
  return responseCache
}

/** Per-session rollup for the crew results screen. */
export function pulseSummary() {
  const bySession = new Map()
  for (const r of responseCache) {
    const row = bySession.get(r.sessionId) ?? { sessionId: r.sessionId, ratings: [], comments: [] }
    if (typeof r.rating === 'number') row.ratings.push(r.rating)
    if (r.comment) row.comments.push(r.comment)
    bySession.set(r.sessionId, row)
  }
  return [...bySession.values()]
    .map((row) => ({
      ...row,
      count: row.ratings.length,
      avg: row.ratings.length ? row.ratings.reduce((a, b) => a + b, 0) / row.ratings.length : 0,
    }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
}

/* ---------- live schedule (admin writes, EVERY phone reads) ----------
   Unlike questions and responses, this listener runs for everyone signed in or
   not: an attendee's agenda must follow the room. Times are not private, and
   nothing here identifies anybody. */

const scheduleRef = doc(db, 'events', EVENT_ID, 'live', 'schedule')

let schedule = {}

onSnapshot(
  scheduleRef,
  (snap) => {
    schedule = snap.exists() ? snap.data() : {}
    applyScheduleOverrides(schedule) // mutates data.js sessions in place
    notify()
  },
  (err) => {
    // Deliberately non-fatal. No cloud schedule = the built-in agenda stands.
    console.error('[brain] schedule listener', err)
  },
)

/** The current override document (admin screen reads this to show state). */
export function scheduleDoc() {
  return schedule
}

/** Running-late control. Shifts every session that had not yet started when
 *  the delay was set. Pass 0 to put the day back on its original times. */
export async function setDelay(delayMin, delayFrom, delayDay) {
  await setDoc(scheduleRef, { delayMin, delayFrom, delayDay }, { merge: true })
}

/** Hand-edit one session's times. Wins outright over the running-late shift. */
export async function setSessionTime(sessionId, start, end) {
  await setDoc(scheduleRef, { sessions: { [sessionId]: { start, end } } }, { merge: true })
}

/** Drop a hand-edit and let the session return to its built-in time. */
export async function clearSessionTime(sessionId) {
  const next = { ...(schedule.sessions ?? {}) }
  delete next[sessionId]
  // Whole-map write, not a merge: merge can't remove a key.
  await setDoc(scheduleRef, { ...schedule, sessions: next })
}

/* ---------- auth (moderator + room screen only; attendees never sign in) ---------- */

let currentUser = null
let authReady = false

onAuthStateChanged(auth, (u) => {
  currentUser = u
  authReady = true
  queueUnsub?.()
  responseUnsub?.()
  queueUnsub = null
  responseUnsub = null
  cache = []
  responseCache = []

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
    responseUnsub = onSnapshot(
      query(responsesRef, orderBy('ts')),
      (snap) => {
        responseCache = snap.docs.map((d) => ({
          id: d.id,
          sessionId: d.data().sessionId,
          rating: d.data().rating,
          comment: d.data().comment ?? '',
          ts: d.data().ts?.toMillis?.() ?? null,
        }))
        notify()
      },
      (err) => console.error('[brain] response listener', err),
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
