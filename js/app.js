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
  loginView,
  wireLogin,
  pulseView,
  wirePulse,
  resultsView,
  adminView,
  wireAdmin,
  wireCrewFooter,
} from './views.js'
import { icons } from './icons.js'
import { onChange, onAuthChange, user, authReadyYet, updateAvailable, buildState } from './brain.js'

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
  // Pulse survey for one session — reached from the home prompt after it ends.
  pulse: { render: (arg) => pulseView(arg), wire: wirePulse },
  // Crew-facing faces of the same app — hidden routes, sign-in required.
  // Not a nicety: the security rules refuse the question queue to anyone
  // who isn't authenticated, so these screens are empty without it.
  mod: { render: () => modView(), wire: wireMod, live: true, auth: true },
  screen: { render: () => screenView(), live: true, chrome: false, auth: true },
  // wire added 2026-07-28 purely to carry the sign-out; results had no wiring before.
  results: { render: () => resultsView(), wire: wireCrewFooter, live: true, auth: true },
  admin: { render: (arg) => adminView(arg), wire: wireAdmin, live: true, auth: true },
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

  // Crew routes wait for Firebase to restore any saved session before deciding
  // anything — otherwise a reload flashes the login form at a room full of people.
  const gated = route.auth && !user()
  const waiting = route.auth && !authReadyYet()

  app.classList.toggle('screenmode', route.chrome === false && !gated && !waiting)
  if (waiting) view.innerHTML = '<div class="stub"><p>…</p></div>'
  else if (gated) view.innerHTML = loginView()
  else view.innerHTML = route.render(rest.join('/'))

  renderTabs(base)
  if (gated) wireLogin(render)
  else if (!waiting) route.wire?.(render, rest.join('/'))
  if (route.live) unsubscribe = onChange(render)
  view.scrollTop = 0
  window.scrollTo(0, 0)
  // Route change can flip screenmode on or off, which decides whether the
  // update bar is allowed to show at all.
  renderUpdatebar()
}

/* ---------- the update bar (version beacon, SCOPE.md discipline point 2) ----------
   It PROMPTS. It never reloads by itself, and that is a decision, not a
   shortcut: a silent reload would wipe a half-typed question out from under
   someone mid-session, and fifty phones deciding to reload together during a
   presentation is a worse failure than a stale caption. The person taps when
   they're ready.

   Because it only ever prompts, it also cannot loop — the classic failure of
   auto-updating pages, where a phone that can't get the new code refreshes
   itself forever. Worst case here is a bar that stays visible. */

const updatebar = document.createElement('div')
updatebar.id = 'updatebar'
updatebar.hidden = true
document.body.appendChild(updatebar)

function applyUpdate() {
  /* GitHub Pages serves with Cache-Control: max-age=600 (measured 2026-07-28),
     so a plain reload inside ten minutes of a push can still be handed the old
     files from the browser's own cache. The query string moves the document to
     a URL the cache has never seen. It is not a total guarantee — module
     imports resolve without the query — which is precisely why the beacon is
     published by hand, minutes after a push, rather than automatically at the
     moment of one. */
  const { live } = buildState()
  const target = `${location.pathname}?b=${live}${location.hash}`
  /* Tapping Refresh a second time would otherwise navigate to the URL the page
     is already on, which most browsers treat as nothing at all — the button
     appears dead. Found 2026-07-28 in Adam's two-device test. Reloading in that
     case is honest: it may not get newer code (there may be none to get), but
     the press does visibly something. */
  if (target === `${location.pathname}${location.search}${location.hash}`) location.reload()
  else location.replace(target)
}

function renderUpdatebar() {
  // Never over the room screen: a banner across the big display in front of
  // fifty people is worse than a stale one. The crew drive that machine and
  // refresh it deliberately.
  const stale = updateAvailable() && !app.classList.contains('screenmode')
  updatebar.hidden = !stale
  if (!stale) return
  if (!updatebar.dataset.wired) {
    updatebar.innerHTML = `
      <span class="ubtext">A newer version of the app is ready.</span>
      <button class="ubbtn" type="button">Refresh</button>`
    updatebar.querySelector('.ubbtn').addEventListener('click', applyUpdate)
    updatebar.dataset.wired = '1'
  }
}

// A permanent subscription, unlike the per-route one below: the beacon has to
// be able to speak on Home and Agenda too, not only on the live crew screens.
onChange(renderUpdatebar)

window.addEventListener('hashchange', render)
onAuthChange(render) // sign-in/out flips the crew routes without a reload
render()
renderUpdatebar()

// Keep the "Happening now" card ticking while Home is up.
setInterval(() => {
  if (currentPath() === '') render()
}, 30_000)
