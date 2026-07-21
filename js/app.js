import { homeView, agendaView, speakersView, tonightView, sessionView, stubView } from './views.js'
import { icons } from './icons.js'

const view = document.getElementById('view')
const tabbar = document.getElementById('tabbar')

const routes = {
  '': () => homeView(),
  agenda: (arg) => agendaView(arg),
  session: (arg) => sessionView(arg),
  speakers: () => speakersView(),
  tonight: () => tonightView(),
  ask: () => stubView('Ask a question', 'Anonymous Q&A — wired to the cloud brain in the next phase.'),
  materials: () => stubView('Materials', 'Decks & handouts shelf — receives Phase 2 AI later.'),
  wifi: () => stubView('Wi-Fi', 'Network details + tap-to-copy password.'),
  venue: () => stubView('Venue', 'Map, address and parking.'),
}

// v4: Me/My Agenda dropped — single-track conference, everyone attends everything.
// Starring stays in the framework (store.js) for a multi-stream 2027, off by default.
const tabs = [
  { path: '', label: 'Home', icon: icons.home },
  { path: 'agenda', label: 'Agenda', icon: icons.agendaTab },
  { path: 'ask', label: 'Ask', icon: icons.chatBold, center: true },
  { path: 'materials', label: 'Materials', icon: icons.materialsTab },
]

function currentPath() {
  return location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
}

function renderTabs(base) {
  tabbar.innerHTML = tabs
    .map((t) => {
      if (t.center) {
        return `<a href="#/${t.path}" class="tab center"><span class="fab">${t.icon}</span>${t.label}</a>`
      }
      const active = base === t.path ? ' active' : ''
      return `<a href="#/${t.path}" class="tab${active}">${t.icon}${t.label}</a>`
    })
    .join('')
}

function render() {
  const path = currentPath()
  const [base, ...rest] = path.split('/')
  const page = routes[base] ?? routes['']
  view.innerHTML = page(rest.join('/'))
  renderTabs(base)
  view.scrollTop = 0
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', render)
render()

// Keep the "Happening now" card ticking while Home is up.
setInterval(() => {
  if (currentPath() === '') render()
}, 30_000)
