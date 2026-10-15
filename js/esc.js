/* esc(): the ONE escape for every value the app did not write itself (record 241,
   spec A §3.1). Applied at the point of printing, never on save, so Firestore keeps
   exactly what was typed. & first, then < > " '. Non-strings are stringified first;
   null and undefined become ''. Our own data.js is NOT passed through this (spec A §2):
   it is trusted, and already holds deliberate markup and entities. */
export function esc(v) {
  if (v === null || v === undefined) return ''
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
