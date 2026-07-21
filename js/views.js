import { conference, sessions, speakers, speakerById, nextSocial, socialsForDay, upcomingAfter, agendaForDay } from './data.js'
import { icons } from './icons.js'

const minutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** The session on right now (wall clock vs session times).
 *  Outside conference hours we demo the first speaker session so the screen never sits empty. */
export function liveSession(now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const hit = sessions.find(
    (s) => s.kind !== 'BREAK' && s.kind !== 'SOCIAL' && nowMin >= minutes(s.start) && nowMin < minutes(s.end),
  )
  const session = hit ?? sessions.find((s) => s.speakerIds.length > 0)
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

function whoLine(s) {
  if (s.kind === 'SOCIAL') return `<b>${s.venue?.name ?? s.room}</b> · ${s.venue?.address ?? ''}`
  const names = s.speakerIds.map((id) => speakerById(id)?.name).filter(Boolean)
  if (!names.length) return `<b>PGW</b> · ${s.room}`
  const orgs = [...new Set(s.speakerIds.map((id) => speakerById(id)?.org).filter(Boolean))]
  return `<b>${names.join(' & ')}</b> · ${orgs.join(' · ') || s.room}`
}

function upcomingCard(s) {
  const isBreak = s.kind === 'BREAK'
  return `
    <div class="now upcard${isBreak ? ' brk' : ''}">
      <div class="row">
        <span class="live"><span class="dot up"></span>UP NEXT · ${s.start}–${s.end}</span>
        <span class="tagm">${s.kind}</span>
      </div>
      <h3>${s.title}</h3>
      ${isBreak ? `<div class="who"><span class="txt">${s.room}</span></div>` : `
      <div class="who">
        ${s.speakerIds.length ? '<span class="pic"></span>' : ''}
        <span class="txt">${whoLine(s)}</span>
      </div>`}
    </div>`
}

export function homeView() {
  const live = liveSession()
  const upcoming = upcomingAfter(live.demoNowMin, live.session.day)
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
          ${live.session.speakerIds.length ? '<span class="pic"></span>' : ''}
          <span class="txt">${whoLine(live.session)}</span>
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
          <div><div class="n">Speakers</div><div class="s">${speakers.length} this year</div></div>
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

export function agendaView(dayArg) {
  const day = Number(dayArg) === 2 ? 2 : 1
  const list = agendaForDay(day)
  const live = liveSession()

  const rows = list
    .map((s) => {
      const isBreak = s.kind === 'BREAK'
      const isNow = s.id === live.session.id
      if (isBreak) {
        return `
        <div class="agrow">
          <div class="agtime">${s.start}</div>
          <div class="agbreak">${s.title} · ${s.room}</div>
        </div>`
      }
      const social = s.kind === 'SOCIAL'
      return `
      <div class="agrow">
        <div class="agtime">${s.start}</div>
        <a href="#/${social ? 'tonight' : `session/${s.id}`}" class="agcard${isNow ? ' isnow' : ''}">
          <div class="row">
            <span class="live">${isNow ? '<span class="dot"></span>ON NOW · ' : ''}${s.start}–${s.end}</span>
            <span class="tagm">${s.kind}</span>
          </div>
          <h3>${s.title}</h3>
          <div class="who"><span class="txt">${whoLine(s)}</span></div>
        </a>
      </div>`
    })
    .join('')

  return `
    <div class="pagehead">
      <h2>Agenda</h2>
      <div class="daypills">
        ${conference.days
          .map(
            (d) =>
              `<a href="#/agenda${d.day === 2 ? '/2' : ''}" class="pill${day === d.day ? ' active' : ''}">${d.label}</a>`,
          )
          .join('')}
      </div>
    </div>
    <div class="aglist">${rows}</div>
  `
}

function initials(name) {
  return name
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export function speakersView() {
  const cards = speakers
    .map(
      (s) => `
      <div class="spcard">
        ${s.photo ? `<img class="spavatar" src="${s.photo}" alt="${s.name}">` : `<span class="spavatar spinit">${initials(s.name)}</span>`}
        <div class="spbody">
          <div class="row">
            <div>
              <div class="n">${s.name}</div>
              <div class="s">${s.org}</div>
            </div>
            ${s.linkedin ? `<a class="lichip" href="${s.linkedin}" target="_blank" rel="noopener">in</a>` : ''}
          </div>
          <p class="spbio">${s.bio}</p>
        </div>
      </div>`,
    )
    .join('')

  return `
    <div class="pagehead">
      <h2>Speakers</h2>
      <p class="sub">${speakers.length} across the two days</p>
    </div>
    <div class="splist">${cards}</div>
  `
}

export function tonightView() {
  const live = liveSession()
  const socials = socialsForDay(live.session.day)
  if (!socials.length) return stubView('Tonight', 'Nothing scheduled tonight.')
  const dayLabel = conference.days.find((d) => d.day === live.session.day)?.label ?? ''
  const cards = socials
    .map((social) => {
      const v = social.venue ?? {}
      return `
    <div class="now" style="margin-bottom:14px">
      <div class="row">
        <span class="live"><span class="dot up"></span>${social.start} · ${social.title}</span>
        <span class="tagm">${v.dress ?? ''}</span>
      </div>
      <h3>${v.name ?? social.room}</h3>
      <div class="who">
        <span class="txt">${v.address ?? ''}</span>
      </div>
      <p class="spbio" style="margin-top:10px">${social.summary}</p>
      ${v.mapUrl ? `<a href="${v.mapUrl}" target="_blank" rel="noopener" class="ask askin">${icons.pin} Open map &amp; directions</a>` : ''}
    </div>`
    })
    .join('')
  return `
    <div class="pagehead">
      <h2>Tonight</h2>
      <p class="sub">${dayLabel} — the evening's plan</p>
    </div>
    ${cards}
  `
}

export function sessionView(id) {
  const s = sessions.find((x) => x.id === id)
  if (!s) return stubView('Session', 'Session not found.')
  const sps = s.speakerIds.map(speakerById).filter(Boolean)
  return `
    <div class="stub">
      <span class="eyebrow">${s.kind} · ${s.start}–${s.end} · ${s.room}</span>
      <h2 style="margin-top:12px">${s.title}</h2>
      <p>${s.summary || ''}</p>
    </div>
    ${sps
      .map(
        (sp) => `
      <div class="spcard" style="margin-top:4px">
        ${sp.photo ? `<img class="spavatar" src="${sp.photo}" alt="${sp.name}">` : `<span class="spavatar spinit">${initials(sp.name)}</span>`}
        <div class="spbody">
          <div class="row">
            <div>
              <div class="n">${sp.name}</div>
              <div class="s">${sp.org}</div>
            </div>
            ${sp.linkedin ? `<a class="lichip" href="${sp.linkedin}" target="_blank" rel="noopener">in</a>` : ''}
          </div>
          <p class="spbio">${sp.bio}</p>
        </div>
      </div>`,
      )
      .join('')}
    <div style="padding:20px 24px">
      <a href="#/ask" class="ask" style="margin:0">${icons.chat} Ask a question — anonymously</a>
    </div>
  `
}

export function stubView(title, note) {
  return `<div class="stub"><h2>${title}</h2><p>${note}</p></div>`
}
