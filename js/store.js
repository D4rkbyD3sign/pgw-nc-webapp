// Personal agenda lives on the phone itself — localStorage, no login, anonymous.
const KEY = 'pgw-nc-starred'

export function getStarred() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function toggleStarred(id) {
  const ids = getStarred()
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function isStarred(id) {
  return getStarred().includes(id)
}
