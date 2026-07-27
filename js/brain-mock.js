// The cloud brain — data adapter for live Q&A (and later: surveys, version beacon).
// MOCK backend for now: localStorage + BroadcastChannel, so the full loop
// (attendee → moderator → big screen) demos live across tabs on one device.
// Firebase drops in behind this exact interface when the project exists —
// no screen changes needed. See SCOPE.md "Update & Cache Discipline".

const KEY = 'pgw-nc-questions'
const MINE = 'pgw-nc-my-questions'

const chan = 'BroadcastChannel' in window ? new BroadcastChannel('pgw-nc-brain') : null
const listeners = new Set()

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

/* Snapshot before iterating: a listener may unsubscribe/resubscribe itself
   while being notified (the router does), and Set.forEach visits re-added
   entries — iterating live would loop forever. */
function notify() {
  ;[...listeners].forEach((l) => l())
}

function write(qs) {
  localStorage.setItem(KEY, JSON.stringify(qs))
  chan?.postMessage('sync')
  notify()
}

chan?.addEventListener('message', notify)
window.addEventListener('storage', (e) => {
  if (e.key === KEY) notify()
})

/** Subscribe to brain changes. Returns an unsubscribe function. */
export function onChange(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function questions() {
  return read().sort((a, b) => a.ts - b.ts)
}

/** Anonymous by structure: no identity is ever collected or stored. */
export function submitQuestion(sessionId, text) {
  const q = {
    id: crypto.randomUUID(),
    sessionId,
    text: text.trim(),
    ts: Date.now(),
    status: 'pending', // pending -> approved -> promoted -> shown | dismissed
  }
  write([...read(), q])
  const mine = JSON.parse(localStorage.getItem(MINE) ?? '[]')
  localStorage.setItem(MINE, JSON.stringify([...mine, q.id]))
  return q
}

/** This device's own questions (tracked locally, still anonymous server-side). */
export function myQuestions() {
  const mine = new Set(JSON.parse(localStorage.getItem(MINE) ?? '[]'))
  return questions().filter((q) => mine.has(q.id))
}

export function setStatus(id, status) {
  write(read().map((q) => (q.id === id ? { ...q, status } : q)))
}

/** Put a question on the room screen; the previous one moves to history. */
export function promote(id) {
  write(
    read().map((q) => {
      if (q.id === id) return { ...q, status: 'promoted' }
      if (q.status === 'promoted') return { ...q, status: 'shown' }
      return q
    }),
  )
}

/** The question currently on the big screen, or null. */
export function promotedQuestion() {
  return questions().find((q) => q.status === 'promoted') ?? null
}
