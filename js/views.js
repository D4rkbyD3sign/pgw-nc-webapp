import { conference, sessions, speakerById, nextSocial, upcomingAfter } from './data.js'
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
    (s) => s.kind !== 'BREAK' && s.kind !== 'SOCIAL' && nowMin >= minutes(s.start) && nowMin < minutes(s.end),
  )
  const session = hit ?? sessions.find((s) => s.id === 's2')
  const start = minutes(session.start)
  const dur = minutes(session.end) - start
  const minIn = hit ? nowMin - start : Math.round(dur * 0.44)
  return {
    session,
    pct: Math.round((minIn / dur) * 100),
    minIn,
    minLeft: dur - minIn,
    demoNowMin: hit ? nowMin : start + minIn,
  }
}

function upcomingCard(s) {
  const speaker = speakerById(s.speakerIds[0] ?? '')
  return `
    <div class="now upcard">
      <div class="row">
        <span class="live"><span class="dot up"></span>UP NEXT · ${s.start}–${s.end}</span>
        <span class="tagm">${s.kind}</span>
      </div>
      <h3>${s.title}</h3>
      <div class="who">
        ${s.kind === 'SOCIAL' ? '' : '<span class="pic"></span>'}
        <span class="txt"><b>${s.kind === 'SOCIAL' ? s.venue?.name ?? s.room : speaker?.name ?? 'TBA'}</b> · ${s.kind === 'SOCIAL' ? s.venue?.address ?? '' : s.room}</span>
      </div>
    </div>`
}

export function homeView() {
  const live = liveSession()
  const speaker = speakerById(live.session.speakerIds[0] ?? '')
  const upcoming = upcomingAfter(live.demoNowMin)
  const social = nextSocial()

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
    <div class="nowrap">
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
        <a href="#/ask" class="ask askin">${icons.chat} Ask a question — anonymously</a>
      </div>
      ${upcoming.map(upcomingCard).join('')}
    </div>
    <a href="#/agenda" class="seemore">SEE MORE →</a>

    <div class="navwrap">
      <span class="lab">// Jump to</span>
      <div class="grid">
        <a href="#/speakers" class="tile">
          <div class="ico">${icons.speakers}</div>
          <div><div class="n">Speakers</div><div class="s">${conference.speakerCount} this year</div></div>
        </a>
        <a href="#/tonight" class="tile tonight">
          <div class="ico">${icons.dinner}</div>
          <div><div class="n">Tonight</div><div class="s">${social ? `${social.title} · ${social.start}` : 'Nothing scheduled'}</div></div>
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

export function tonightView() {
  const social = nextSocial()
  if (!social) return stubView('Tonight', 'Nothing scheduled tonight.')
  const v = social.venue ?? {}
  return `
    <div class="stub">
      <span class="eyebrow">TONIGHT · ${social.start}–${social.end}</span>
      <h2 style="margin-top:12px">${social.title}</h2>
      <p>${social.summary}</p>
    </div>
    <div class="now" style="margin-top:4px">
      <div class="row">
        <span class="live"><span class="dot up"></span>${v.name ?? social.room}</span>
        <span class="tagm">${v.dress ?? ''}</span>
      </div>
      <div class="who">
        <span class="txt">${v.address ?? ''}</span>
      </div>
      ${v.mapUrl ? `<a href="${v.mapUrl}" target="_blank" rel="noopener" class="ask askin">${icons.pin} Open map &amp; directions</a>` : ''}
    </div>
  `
}

export function stubView(title, note) {
  return `<div class="stub"><h2>${title}</h2><p>${note}</p></div>`
}
