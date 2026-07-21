import { conference, sessions, speakerById } from './data.js'
import { getStarred } from './store.js'
import { icons } from './icons.js'

const minutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** The session on right now (wall clock vs day-1 times).
 *  Outside conference hours we demo the keynote so the screen never sits empty. */
export function liveSession(now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const hit = sessions.find(
    (s) => s.kind !== 'BREAK' && nowMin >= minutes(s.start) && nowMin < minutes(s.end),
  )
  const session = hit ?? sessions.find((s) => s.id === 's2')
  const start = minutes(session.start)
  const dur = minutes(session.end) - start
  const minIn = hit ? nowMin - start : Math.round(dur * 0.44)
  return { session, pct: Math.round((minIn / dur) * 100), minIn, minLeft: dur - minIn }
}

export function homeView() {
  const live = liveSession()
  const speaker = speakerById(live.session.speakerIds[0] ?? '')
  const starredCount = getStarred().length

  return `
    <header class="appbar">
      <div class="brand">
        ${icons.logo}
        <span class="wm">PGW <b>ImplementAI</b></span>
      </div>
      <div class="avatar">AG</div>
    </header>

    <section class="hero">
      ${icons.net}
      <div class="eyebrow">${conference.eyebrow}</div>
      <h1 class="title">Implement<span class="ai">AI</span> ${conference.year}</h1>
      <p class="subtitle">${conference.tagline}</p>
    </section>

    <span class="lab">Happening now</span>
    <div class="now">
      <div class="row">
        <span class="live"><span class="dot"></span>ON NOW · ${live.session.start}–${live.session.end}</span>
        <span class="tagm">${live.session.kind}</span>
      </div>
      <h3>${live.session.title}</h3>
      <div class="who">
        <span class="pic"></span>
        <span class="txt"><b>${speaker?.name ?? 'TBA'}</b> · ${live.session.room}</span>
      </div>
      <div class="prog"><i style="width:${live.pct}%"></i></div>
      <div class="foot"><span>${live.minIn} MIN IN</span><span>${live.minLeft} MIN LEFT</span></div>
    </div>

    <a href="#/ask" class="ask">${icons.chat} Ask a question — anonymously</a>

    <div class="navwrap">
      <span class="lab">// Jump to</span>
      <div class="grid">
        <a href="#/agenda" class="tile">
          <div class="ico">${icons.calendar}</div>
          <div><div class="n">Agenda</div><div class="s">Full 2-day schedule</div></div>
        </a>
        <a href="#/speakers" class="tile">
          <div class="ico">${icons.speakers}</div>
          <div><div class="n">Speakers</div><div class="s">${conference.speakerCount} this year</div></div>
        </a>
        <a href="#/materials" class="tile">
          <div class="ico">${icons.doc}</div>
          <div><div class="n">Materials</div><div class="s">Decks &amp; handouts</div></div>
        </a>
        <a href="#/me" class="tile starred">
          <div class="ico">${icons.star}</div>
          <div class="bottomrow">
            <div><div class="n">My Agenda</div><div class="s">Starred sessions</div></div>
            <span class="badge">${starredCount}</span>
          </div>
        </a>
      </div>
    </div>

    <div class="navwrap">
      <span class="lab">// Logistics</span>
      <div class="logigrid">
        <a href="#/wifi" class="logicard">
          ${icons.wifi}
          <div><div class="n">Wi-Fi</div><div class="s">Tap to connect</div></div>
        </a>
        <a href="#/venue" class="logicard">
          ${icons.pin}
          <div><div class="n">Venue</div><div class="s">Map &amp; parking</div></div>
        </a>
      </div>
    </div>
  `
}

export function stubView(title, note) {
  return `<div class="stub"><h2>${title}</h2><p>${note}</p></div>`
}
