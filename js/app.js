import {
  homeView,
  agendaView,
  speakersView,
  speakerView,
  partnersView,
  partnerView,
  tonightView,
  sessionView,
  askView,
  wireAsk,
  modView,
  wireMod,
  screenView,
  stubView,
} from './views.js'
import { icons } from './icons.js'
import { onChange } from './brain.js'

const view = document.getElementById('view')
const tabbar = document.getElementById('tabbar')
const app = document.querySelector('.app')

const routes = {
  '': { render: () => homeView() },
  agenda: { render: (arg) => agendaView(arg) },
  session: { render: (arg) => sessionView(arg) },
  speakers: { render: () => speakersView() },
  speaker: { render: (arg) => speakerView(arg) },
  partners: { render: () => partnersView() },
  partner: { render: (arg) => partnerView(arg) },
  tonight: { render: () => tonightView() },
  ask: { render: () => askView(), wire: wireAsk, live: true },
  // Crew-facing faces of the same app — hidden routes, admin auth arrives with Firebase.
  mod: { render: () => modView(), wire: wireMod, live: true },
  screen: { render: () => screenView(), live: true, chrome: false },
  materials: { render: () => stubView('Materials', 'Decks & handouts shelf — receives Phase 2 AI later.') },
  wifi: { render: () => stubView('Wi-Fi', 'Network details + tap-to-copy password.') },
  venue: { render: () => stubView('Venue', 'Map, address and parking.') },
}

// v4: Me/My Agenda dropped — single-track conference, everyone attends everything.
const tabs = [
  { path: '', label: 'Home', icon: icons.home },
  { path: 'agenda', label: 'Agenda', icon: icons.agendaTab },
  { path: 'ask', label: 'Ask', icon: icons.chatBold, center: true },
  { path: 'materials', label: 'Materials', icon: icons.materialsTab },
  { path: 'partners', label: 'Partners', icon: icons.award },
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

let unsubscribe = null

function render() {
  const path = currentPath()
  const [base, ...rest] = path.split('/')
  const route = routes[base] ?? routes['']
  unsubscribe?.()
  unsubscribe = null

  app.classList.toggle('screenmode', route.chrome === false)
  view.innerHTML = route.render(rest.join('/'))
  renderTabs(base)
  route.wire?.(render)
  if (route.live) unsubscribe = onChange(render)
  view.scrollTop = 0
  window.scrollTo(0, 0)
}

window.addEventListener('hashchange', render)
render()

// Keep the "Happening now" card ticking while Home is up.
setInterval(() => {
  if (currentPath() === '') render()
}, 30_000)
