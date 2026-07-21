import { homeView, stubView } from './views.js'
import { icons } from './icons.js'

const view = document.getElementById('view')
const tabbar = document.getElementById('tabbar')

const routes = {
  '': () => homeView(),
  agenda: () => stubView('Agenda', 'Full 2-day schedule — next screen to build.'),
  ask: () => stubView('Ask a question', 'Anonymous Q&A — wired to the cloud brain in the next phase.'),
  materials: () => stubView('Materials', 'Decks & handouts shelf — receives Phase 2 AI later.'),
  me: () => stubView('My Agenda', 'Starred sessions, stored on this phone only.'),
  speakers: () => stubView('Speakers', 'Speaker profiles — content pours in via the admin.'),
  wifi: () => stubView('Wi-Fi', 'Network details + tap-to-copy password.'),
  venue: () => stubView('Venue', 'Map, address and parking.'),
}

const tabs = [
  { path: '', label: 'Home', icon: icons.home },
  { path: 'agenda', label: 'Agenda', icon: icons.agendaTab },
  { path: 'ask', label: 'Ask', icon: icons.chatBold, center: true },
  { path: 'materials', label: 'Materials', icon: icons.materialsTab },
  { path: 'me', label: 'Me', icon: icons.me },
]

function currentPath() {
  return location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
}

function renderTabs(path) {
  tabbar.innerHTML = tabs
    .map((t) => {
      if (t.center) {
        return `<a href="#/${t.path}" class="tab center"><span class="fab">${t.icon}</span>${t.label}</a>`
      }
      const active = path === t.path ? ' active' : ''
      return `<a href="#/${t.path}" class="tab${active}">${t.icon}${t.label}</a>`
    })
    .join('')
}

function render() {
  const path = currentPath()
  const page = routes[path] ?? routes['']
  view.innerHTML = page()
  renderTabs(path)
  view.scrollTop = 0
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', render)
render()

// Keep the "Happening now" card ticking while Home is up.
setInterval(() => {
  if (currentPath() === '') render()
}, 30_000)
