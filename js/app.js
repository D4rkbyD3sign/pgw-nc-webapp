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
  installView,
  faqView,
  welcomeView,
  wireHome,
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

/* `back` names the page this one belongs UNDER, and its presence is what puts a
   back control on the screen. The five tab roots deliberately have none — they
   are the floor, and a back button on the floor invites people to leave the app.

   ⚠️ THIS IS A REGRESSION FIX, NOT A FEATURE (Ben Ross, 2026-08-21). Until v18
   the app opened inside the browser, so Safari's chrome and Android's system
   back were the way out of a speaker profile. v18 added the manifest and the
   app now opens STANDALONE — no address bar, no browser back. Android still
   has its system button; on iOS there was suddenly no way back at all except
   the tab bar. We made the app better and removed the escape hatch in the same
   push, and Ben found it within hours of the room-screen test. */
const routes = {
  '': { render: () => homeView(), wire: wireHome },
  install: { render: () => installView(), back: '' },
  faq: { render: () => faqView(), back: '' },
  welcome: { render: () => welcomeView(), back: '' },
  agenda: { render: (arg) => agendaView(arg) },
  session: { render: (arg) => sessionView(arg), back: 'agenda' },
  speakers: { render: () => speakersView(), back: '' },
  speaker: { render: (arg) => speakerView(arg), back: 'speakers' },
  partners: { render: () => partnersView() },
  partner: { render: (arg) => partnerView(arg), back: 'partners' },
  tonight: { render: () => tonightView(), back: '' },
  ask: { render: () => askView(), wire: wireAsk, live: true },
  // Pulse survey for one session — reached from the home prompt after it ends.
  pulse: { render: (arg) => pulseView(arg), wire: wirePulse, back: '' },
  // Crew-facing faces of the same app — hidden routes, sign-in required.
  // Not a nicety: the security rules refuse the question queue to anyone
  // who isn't authenticated, so these screens are empty without it.
  mod: { render: () => modView(), wire: wireMod, live: true, auth: true },
  screen: { render: () => screenView(), live: true, chrome: false, auth: true },
  // wire added 2026-07-28 purely to carry the sign-out; results had no wiring before.
  results: { render: () => resultsView(), wire: wireCrewFooter, live: true, auth: true },
  admin: { render: (arg) => adminView(arg), wire: wireAdmin, live: true, auth: true },
  materials: { render: () => stubView('Materials', 'Speaker decks and handouts will appear here as partners share them, before and after each session.') },
  wifi: { render: () => stubView('Wi-Fi', 'Network details + tap-to-copy password.'), back: '' },
  venue: { render: () => stubView('Venue', 'Map, address and parking.'), back: '' },
}

/* ---------- going back without leaving the app ----------

   Two ways back, and the choice between them matters.

   history.back() is the right one when there IS somewhere to go back to: it
   returns you where you actually came from, so a speaker reached from a
   session page goes back to that session rather than to the speaker list.

   But it is WRONG on a cold open. Someone who scans a QR code straight to a
   speaker profile, or taps a shared link, has no in-app history — and
   history.back() there walks them OUT of the app entirely, which in standalone
   mode means out to nothing. So we count our own navigations and fall back to
   the route's declared parent when the stack is empty.

   `depth` counts hash changes since load. Going back decrements rather than
   incrementing, which is what the flag is for — without it a back press would
   look like forward navigation and the count would only ever climb. */
let depth = 0
let goingBack = false

function goBack(parent) {
  if (depth > 0) {
    goingBack = true
    history.back()
  } else {
    location.hash = `#/${parent}`
  }
}

function backBar(parent) {
  const label = parent === '' ? 'Home' : parent.charAt(0).toUpperCase() + parent.slice(1)
  return `
    <div class="backbar">
      <button class="backbtn" type="button" data-back="${parent}" aria-label="Back to ${label}">
        ${icons.arrowLeft}<span>Back</span>
      </button>
    </div>`
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
  /* No back control over a login form or the room screen: the first is a
     dead end by design and the second is a projector nobody navigates. */
  const showBack = route.back !== undefined && !gated && !waiting
  if (waiting) view.innerHTML = '<div class="stub"><p>…</p></div>'
  else if (gated) view.innerHTML = loginView()
  else view.innerHTML = (showBack ? backBar(route.back) : '') + route.render(rest.join('/'))

  renderTabs(base)
  if (showBack) {
    view.querySelector('[data-back]')?.addEventListener('click', (e) => goBack(e.currentTarget.dataset.back))
  }
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

window.addEventListener('hashchange', () => {
  if (goingBack) {
    depth = Math.max(0, depth - 1)
    goingBack = false
  } else {
    depth++
  }
  render()
})
onAuthChange(render) // sign-in/out flips the crew routes without a reload
render()
renderUpdatebar()

// Keep the "Happening now" card ticking while Home is up.
setInterval(() => {
  if (currentPath() === '') render()
}, 30_000)
