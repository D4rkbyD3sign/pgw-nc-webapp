import { conference, sessions, speakers, speakerById, partners, partnerById, nextSocial, socialsForDay, upcomingAfter, agendaForDay, baseTimes, crewContacts, welcome } from './data.js'
import { icons } from './icons.js'
import * as brain from './brain.js'

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

/** Small wayfinding icon for breaks and social events, by title. */
function eventIcon(s) {
  if (s.kind !== 'BREAK' && s.kind !== 'SOCIAL') return ''
  const t = s.title.toLowerCase()
  if (/tea|coffee/.test(t)) return icons.cup
  if (/drink/.test(t)) return icons.glass
  if (/lunch|dinner|breakfast|registration|awards/.test(t)) return icons.dinner
  return s.kind === 'SOCIAL' ? icons.glass : icons.cup
}

/** Small partner logo for a session, when a partner presents it. */
function partnerMark(s) {
  const p = s.partnerId ? partnerById(s.partnerId) : null
  return p ? `<img class="aglogo" src="${p.logo}" alt="${p.name}">` : ''
}

function upcomingCard(s) {
  const isBreak = s.kind === 'BREAK'
  return `
    <div class="now upcard${isBreak ? ' brk' : ''}">
      <div class="row">
        <span class="live"><span class="dot up"></span>UP NEXT · ${s.start}–${s.end}</span>
        ${eventIcon(s) ? `<span class="evico">${eventIcon(s)}</span>` : `<span class="tagm">${s.kind}</span>`}
      </div>
      <h3>${s.title}</h3>
      ${isBreak ? `<div class="who"><span class="txt">${s.room}</span></div>` : `
      <div class="who">
        ${s.speakerIds.length ? '<span class="pic"></span>' : ''}
        <span class="txt">${whoLine(s)}</span>
        ${partnerMark(s)}
      </div>`}
    </div>`
}

/* How far back the pulse prompt will chase a session, in minutes.
   90 is deliberate. Chase only the last-ended session and you lose anyone who
   stepped out for a coffee — the next session ends, and the earlier one is
   never asked about at all. Chase everything unanswered and you hand an adviser
   a queue of six surveys, which is how you teach a room to ignore the app.
   90 minutes catches the stragglers and self-limits to about two sessions. */
const PULSE_WINDOW_MIN = 90

/** The freshest finished session this device hasn't rated yet, or null.
 *  Ben Ross's ask was responses within a minute or two of the presentation, so
 *  this chases sessions just gone — never the one currently running. */
export function justEndedSession(now = new Date()) {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const day = liveSession(now).session.day
  return (
    sessions
      .filter(
        (s) =>
          s.day === day &&
          s.kind !== 'BREAK' &&
          s.kind !== 'SOCIAL' &&
          minutes(s.end) <= nowMin &&
          nowMin - minutes(s.end) <= PULSE_WINDOW_MIN &&
          !brain.hasResponded(s.id),
      )
      // freshest first — ask about what they remember best
      .sort((a, b) => minutes(b.end) - minutes(a.end))[0] ?? null
  )
}

/** Shown on home only when there is something fresh left to rate. */
function pulsePrompt() {
  const s = justEndedSession()
  if (!s) return ''
  return `
    <a href="#/pulse/${s.id}" class="pulseprompt">
      <span class="lab">// How was it?</span>
      <h3>${s.title}</h3>
      <p>Rate it in ten seconds — anonymous.</p>
      <span class="pp-go">${icons.chat} Give feedback →</span>
    </a>`
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

    ${pulsePrompt()}
    <!-- After the pulse prompt on purpose: rating a session that just finished
         is time-critical and disappears after 90 minutes, while the install
         nudge is patient and will still be here tomorrow. -->
    ${installPrompt()}

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
        <!-- Full width and first: it is the one tile with a reason to be
             opened BEFORE the conference rather than during it. -->
        <a href="#/welcome" class="tile wide">
          <div class="ico">${icons.play}</div>
          <div><div class="n">Welcome</div><div class="s">And last year's, on the Gold Coast</div></div>
        </a>
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
        <!-- Spans both columns. The FAQ answers questions from all three
             tiers — evenings, conference, app — so it does not belong beside
             Wi-Fi as a peer; it sits under them as the catch-all. -->
        <a href="#/faq" class="logicard wide">
          ${icons.help}
          <div><div class="n">Questions</div><div class="s">The evenings, the venue, this app</div></div>
        </a>
      </div>
    </div>

    <!-- Build stamp. Deliberately dull and deliberately present: during a test
         or a support conversation, "what does the bottom of your home screen
         say" settles in one second whether a phone is stale or you're chasing
         a real bug. Attendees will never notice it; you will need it. -->
    <p class="buildstamp">BUILD ${brain.buildState().running}</p>
  `
}

/* ---------- crew footer: the way back out ----------
   Firebase keeps a crew session in localStorage and it survives closing the
   browser — deliberate, so the room screen doesn't flash a login form at fifty
   people after a reload. The cost is that a signed-in browser is a standing key
   to the moderator desk and every dismissed question, and until 2026-07-28
   there was no way to hand that key back: signOutMod() existed in brain.js and
   nothing called it. A borrowed laptop or a venue machine kept the key forever.

   Two taps to confirm: signing out by accident mid-session is recoverable but
   embarrassing, and the desk is used in a hurry. */

export function crewFooter() {
  return `
    <div class="crewout">
      <button class="dbtn" data-signout="1">Sign out</button>
    </div>`
}

export function wireCrewFooter() {
  const btn = document.querySelector('[data-signout]')
  if (!btn) return
  let armed = false
  btn.addEventListener('click', async () => {
    if (!armed) {
      armed = true
      btn.textContent = 'Tap again to sign out'
      btn.classList.add('arm')
      setTimeout(() => {
        if (!armed) return
        armed = false
        btn.textContent = 'Sign out'
        btn.classList.remove('arm')
      }, 4000)
      return
    }
    await brain.signOutMod()
    // onAuthChange re-renders; the crew route falls back to the login form.
  })
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
          <div class="agbreak"><span class="evico">${eventIcon(s)}</span>${s.title} · ${s.room}</div>
        </div>`
      }
      const social = s.kind === 'SOCIAL'
      return `
      <div class="agrow">
        <div class="agtime">${s.start}</div>
        <a href="#/${social ? 'tonight' : `session/${s.id}`}" class="agcard${isNow ? ' isnow' : ''}">
          <div class="row">
            <span class="live">${isNow ? '<span class="dot"></span>ON NOW · ' : ''}${s.start}–${s.end}</span>
            ${social ? `<span class="evico">${eventIcon(s)}</span>` : `<span class="tagm">${s.kind}</span>`}
          </div>
          <h3>${s.title}</h3>
          <div class="who"><span class="txt">${whoLine(s)}</span>${partnerMark(s)}</div>
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
      <a href="#/speaker/${s.id}" class="spcard">
        ${s.photo ? `<img class="spavatar" src="${s.photo}" alt="${s.name}">` : `<span class="spavatar spinit">${initials(s.name)}</span>`}
        <div class="spbody">
          <div class="n">${s.name}</div>
          <div class="s">${s.title} · ${s.org}</div>
          <p class="spbio clamp">${s.bio}</p>
        </div>
      </a>`,
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

export function speakerView(id) {
  const s = speakers.find((x) => x.id === id)
  if (!s) return stubView('Speaker', 'Speaker not found.')
  const theirSessions = sessions.filter((x) => x.speakerIds.includes(s.id))
  return `
    <div class="sphero">
      ${s.photo ? `<img class="spportrait" src="${s.photo}" alt="${s.name}">` : `<span class="spportrait spinit">${initials(s.name)}</span>`}
      <div class="pagehead" style="padding-top:18px">
        <h2>${s.name}</h2>
        <p class="sub">${s.title} · ${s.org}</p>
      </div>
    </div>
    <div class="spdetail">
      <p class="spbio">${s.bio}</p>
    </div>
    <span class="lab" style="margin-top:26px">// Contact</span>
    <div class="contactlist">
      ${s.email ? `<a class="contactrow" href="mailto:${s.email}">${icons.mail}<span>${s.email}</span></a>` : ''}
      ${s.phone ? `<a class="contactrow" href="tel:${s.phone.replace(/\s/g, '')}">${icons.phone}<span>${s.phone}</span></a>` : ''}
      ${s.linkedin ? `<a class="contactrow" href="${s.linkedin}" target="_blank" rel="noopener"><span class="limark">in</span><span>LinkedIn profile</span></a>` : ''}
    </div>
    ${theirSessions.length ? `
    <span class="lab" style="margin-top:26px">// Speaking at</span>
    <div class="aglist">
      ${theirSessions
        .map(
          (x) => `
      <div class="agrow">
        <div class="agtime">${x.start}</div>
        <a href="#/session/${x.id}" class="agcard">
          <div class="row"><span class="live">${conference.days.find((d) => d.day === x.day)?.label ?? ''} · ${x.start}–${x.end}</span><span class="tagm">${x.kind}</span></div>
          <h3>${x.title}</h3>
        </a>
      </div>`,
        )
        .join('')}
    </div>` : ''}
  `
}

export function partnersView() {
  const [first, ...rest] = partners
  const tile = (p, wide = false) => `
    <a href="#/partner/${p.id}" class="ptcard${wide ? ' wide' : ''}">
      <img class="ptlogo" src="${p.logo}" alt="${p.name}">
    </a>`
  return `
    <div class="pagehead">
      <h2>Educational Partners</h2>
      <p class="sub">The partners who make this event possible</p>
    </div>
    <div class="ptgrid">
      ${tile(first, true)}
      ${rest.map((p) => tile(p)).join('')}
    </div>
  `
}

export function partnerView(id) {
  const p = partnerById(id)
  if (!p) return stubView('Partner', 'Partner not found.')
  return `
    <div class="ptheroband"><img class="ptlogo big" src="${p.logo}" alt="${p.name}"></div>
    <div class="pagehead" style="padding-top:20px">
      <h2>${p.name}</h2>
      <p class="sub">${p.positioning}</p>
    </div>
    <div class="spdetail">
      <p class="spbio">${p.blurb}</p>
    </div>
    <span class="lab" style="margin-top:26px">// ImplementAI ${conference.year}</span>
    <div class="now" style="margin-bottom:14px">
      <p class="spbio" style="margin-top:0">${p.themeFit}</p>
    </div>
    <div class="quotebar">“${p.tagline}”</div>
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
        <span class="live"><span class="evico">${eventIcon(social)}</span>${social.start} · ${social.title}</span>
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
      <a href="#/speaker/${sp.id}" class="spcard" style="margin-top:4px">
        ${sp.photo ? `<img class="spavatar" src="${sp.photo}" alt="${sp.name}">` : `<span class="spavatar spinit">${initials(sp.name)}</span>`}
        <div class="spbody">
          <div class="n">${sp.name}</div>
          <div class="s">${sp.title} · ${sp.org}</div>
          <p class="spbio clamp">${sp.bio}</p>
        </div>
      </a>`,
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

/* ---------- Welcome + last year's recap (live phone test item 5) ----------
   Adam's shape, 2026-08-21: the note sits ABOVE the video, and the video is
   titled for what it is — last year, on the Gold Coast — so nobody taps it
   expecting Hobart.

   The player is youtube-nocookie.com rather than youtube.com. Same video, same
   embed, but it does not write tracking cookies before someone has chosen to
   press play. Fifty advisers open this app; none of them agreed to be tracked
   by Google to read a welcome note. `loading="lazy"` keeps the player off the
   wire entirely until it is scrolled to.

   The watch-on-YouTube link underneath is not decoration: corporate networks
   and locked-down phones block embedded players, and without it those people
   get a grey box and no way through. */

export function welcomeView() {
  const src = `https://www.youtube-nocookie.com/embed/${welcome.videoId}?rel=0`
  return `
    <div class="pagehead">
      <h2>Welcome to ${conference.eventName} ${conference.year}</h2>
      <p class="sub">${conference.dates} · ${conference.venue.name}</p>
    </div>

    <div class="welcomenote">
      <p>Two days with the people you work alongside all year — and a theme that's
      on everyone's desk right now: <b>${conference.tagline.replace(/\.$/, '')}</b>.</p>
      <p>Before we get to Hobart, re-live the last one.</p>
    </div>

    <span class="lab" style="margin-top:30px">// Last year</span>
    <div class="videowrap">
      <div class="videoframe">
        <iframe
          src="${src}"
          title="${welcome.videoTitle}"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <p class="videotitle">${welcome.videoTitle}</p>
      <a class="videoout" href="https://www.youtube.com/watch?v=${welcome.videoId}" target="_blank" rel="noopener">
        Can't see it? Watch on YouTube →
      </a>
    </div>
  `
}

/* ---------- FAQ (live phone test item 4, 2026-08-04) ----------
   Three sections, exactly as the adviser asked: the events, the conference,
   the app.

   ⚠️ EVERY TIME, VENUE, DRESS CODE AND ADDRESS BELOW IS READ FROM data.js.
   None of it is typed into an answer. This is not tidiness — the 2026 program
   is not in yet and data.js currently holds the 2025 shape as a placeholder.
   An FAQ with "drinks are at 5:30 at Misono" written into it becomes a SECOND
   source of truth that goes stale silently the day the real program lands, and
   the person who finds out is an adviser standing in the wrong foyer. Answers
   that cannot be derived from data are not written here at all — see the list
   of open questions below.

   ✅ ANSWERED BY ADAM, 2026-08-21 — three of the four open questions closed:
     - Booking: not needed, PGW organise it.
     - Guests: yes, and a form already covers it.
     - On-the-day help: Tracey, Ben, Johnny, Adam, Alex → data.js crewContacts.

   ⬜ STILL OPEN — deliberately NOT answered, because inventing conference
   logistics is exactly the kind of confident guess this house has rules about:
     - Speaker decks. Adam's words were "very likely but we need approval."
       LIKELY IS NOT A PROMISE, and this FAQ is read by fifty advisers who will
       treat anything in it as settled. PGW getting the decks and PGW being
       cleared to hand them out are two different events; only the first is
       confirmed. No question about decks appears here until the second lands.
     - The guest form: named but not linked — see the guest answer below. */

/* One helper contact — name, then a number you can tap to dial.
   No titles (Adam, 2026-08-21). Renders whatever exists and nothing more, so
   someone without a number still appears as a plain name rather than breaking
   the list or, worse, rendering an empty tel: link that dials nothing. */
function contactLine(c) {
  const ways = []
  if (c.phone) ways.push(`<a href="tel:${c.phone.replace(/\s/g, '')}">${c.phone}</a>`)
  if (c.email) ways.push(`<a href="mailto:${c.email}">${c.email}</a>`)
  return `<li><b>${c.name}</b>${ways.length ? `<br>${ways.join(' · ')}` : ''}</li>`
}

function faqSections() {
  const day1 = agendaForDay(1)
  const day2 = agendaForDay(2)
  const firstUp = day1[0]
  const lastDown = [...day2].reverse().find((s) => s.kind !== 'SOCIAL') ?? day2[day2.length - 1]
  const v = conference.venue

  const socialLine = (s) => {
    const ven = s.venue ?? {}
    return `<li><b>${s.title}</b> — ${s.start}, ${ven.name ?? s.room}${ven.dress ? ` · ${ven.dress}` : ''}</li>`
  }
  const socials = [...socialsForDay(1), ...socialsForDay(2)]
  const dressCodes = [...new Set(socials.map((s) => s.venue?.dress).filter(Boolean))]

  return [
    {
      title: 'About the events',
      items: [
        {
          q: "What's on in the evenings?",
          a: socials.length
            ? `<ul class="faqlist">${socials.map(socialLine).join('')}</ul>
               <p>Full details, addresses and a map link are on the <a href="#/tonight">Tonight</a> page.</p>`
            : '<p>Nothing scheduled outside the main program.</p>',
        },
        ...(dressCodes.length
          ? [
              {
                q: 'What should I wear?',
                a: `<p>${dressCodes.length === 1 ? `<b>${dressCodes[0]}</b> for the evening events.` : socials.filter((s) => s.venue?.dress).map((s) => `<b>${s.title}</b> — ${s.venue.dress}`).join('<br>')}</p>
                    <p>Business attire during the sessions.</p>`,
              },
            ]
          : []),
        {
          q: 'Do I need to book the evening events?',
          a: '<p>No. PGW organise the bookings — just come along.</p>',
        },
        /* No guest question here, deliberately (Adam, 2026-08-21). Guests were
           settled at booking — everyone who is coming already answered it on
           the form. Re-asking a question the reader has personally already
           answered makes the FAQ look like it doesn't know what's going on. */
      ],
    },
    {
      title: 'About the conference',
      items: [
        {
          q: 'Where is it?',
          a: `<p><b>${v.name}</b><br>${v.address}</p>
              ${v.mapUrl ? `<p><a href="${v.mapUrl}" target="_blank" rel="noopener">Open map &amp; directions →</a></p>` : ''}`,
        },
        {
          q: 'When does it start and finish?',
          a: `<p><b>${conference.days[0].label}</b> — from ${firstUp.start} (${firstUp.title.toLowerCase()})<br>
              <b>${conference.days[1].label}</b> — through to about ${lastDown.end}</p>
              <p>The <a href="#/agenda">Agenda</a> is live: if a session runs over, the times here move with it.</p>`,
        },
        ...(v.parking ? [{ q: 'Is there parking?', a: `<p>${v.parking}</p>` }] : []),
        {
          q: "What's the Wi-Fi?",
          a: `<p>Network <b>${conference.wifi.ssid}</b><br>Password <b>${conference.wifi.password}</b></p>`,
        },
        ...(crewContacts.length
          ? [
              {
                q: 'Who do I ask for help on the day?',
                /* The count is derived, never typed. It said "these five" for
                   about four minutes after the list dropped to four names,
                   which is the whole argument for computing it. */
                a: `<p>Any of them — they're all here for the whole conference. Tap a number to call.</p>
                    <ul class="faqlist">${crewContacts.map(contactLine).join('')}</ul>`,
              },
            ]
          : []),
      ],
    },
    {
      title: 'About the app',
      items: [
        {
          q: 'Do I need to sign in or create an account?',
          a: '<p>No — and there is no way to. The app never asks who you are.</p>',
        },
        {
          q: 'Are my questions really anonymous?',
          a: `<p>Yes. Nothing identifying is collected or sent.</p>
              <p>You <i>can</i> choose to add your name to a question so the speaker can
              answer you directly — that is a tick box, off by default, and it
              <b>resets to off every time</b>. Attaching your name is always a fresh decision.</p>`,
        },
        {
          q: 'What about the feedback surveys?',
          a: `<p>Always anonymous, with no option to add a name — deliberately.
              The ratings are only worth having if people can be honest.</p>`,
        },
        {
          q: 'How do I put it on my home screen?',
          a: `<p>Takes about ten seconds — <a href="#/install">step-by-step instructions are here</a>,
              for iPhone and Android.</p>`,
        },
        {
          q: 'Do I need to download anything?',
          a: '<p>No. It is a web page — no app store, no install, nothing to update.</p>',
        },
        {
          q: 'The times look different to the printed agenda',
          a: `<p>The app is the live one. If a session starts late or runs over, the crew
              update it here and every phone in the room follows within seconds.</p>`,
        },
      ],
    },
  ]
}

export function faqView() {
  const sections = faqSections()
    .map(
      (sec) => `
      <span class="lab" style="margin-top:30px">// ${sec.title}</span>
      <div class="faqgroup">
        ${sec.items
          .map(
            (it) => `
          <details class="faqitem">
            <summary>${it.q}</summary>
            <div class="faqbody">${it.a}</div>
          </details>`,
          )
          .join('')}
      </div>`,
    )
    .join('')

  return `
    <div class="pagehead">
      <h2>Questions</h2>
      <p class="sub">The evenings, the conference, and this app.</p>
    </div>
    ${sections}
  `
}

/* ---------- Add to home screen (live phone test item 1, 2026-08-04) ----------
   The adviser's words were that the PWA moment is where people fall off. Two
   things cause that and only one of them is instructions.

   The first is discovery: nothing on a web page can point at the browser's own
   Share button, so unless someone is told, they will not find it. Hence this
   page, and hence the prompt on Home.

   The second is worth it: before 2026-08-21 the app had no manifest and no
   icon, so following the steps perfectly got you a screenshot on your home
   screen labelled with a truncated page title, opening inside Safari chrome.
   The instructions were never the missing piece on their own — what they lead
   to had to be built first. See manifest.webmanifest + tools/make-icons.py. */

const INSTALL_HIDDEN_KEY = 'pgw-nc-install-hidden'

/** True when the app is already running FROM the home screen. */
export function isInstalled() {
  try {
    // display-mode covers Android and modern iOS; navigator.standalone is the
    // old iOS-only flag, kept because it still answers on older iPhones.
    return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true
  } catch {
    return false
  }
}

export function devicePlatform() {
  const ua = navigator.userAgent || ''
  if (/iPhone|iPod|iPad/.test(ua)) return 'ios'
  // iPadOS reports itself as a Mac. Touch points are what give it away — a real
  // Mac reports 0. Without this an iPad is handed Android's instructions.
  if (/Macintosh/.test(ua) && (navigator.maxTouchPoints || 0) > 1) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'desktop'
}

/* Deliberately no "Install" button anywhere in here.
   Android CAN offer one via beforeinstallprompt; iOS cannot, and never has. A
   button that exists on half the room's phones and not the other half makes
   the instructions read as broken to whoever doesn't get it. One path,
   everybody, every handset. */
const INSTALL_GUIDE = {
  ios: {
    label: 'iPhone / iPad',
    note: 'Open this page in <b>Safari</b> — the Share menu only offers it there.',
    steps: [
      {
        icon: icons.share,
        text: 'Tap <b>Share</b> — the box with an arrow coming out of the top. It sits at the bottom of the screen.',
      },
      { icon: icons.plusSquare, text: 'Scroll down the list and tap <b>Add to Home Screen</b>.' },
      { icon: icons.tick, text: 'Tap <b>Add</b>, top right.' },
    ],
  },
  android: {
    label: 'Android',
    note: 'Open this page in <b>Chrome</b>.',
    steps: [
      { icon: icons.dots, text: 'Tap the <b>three dots</b> at the top right of Chrome.' },
      {
        icon: icons.plusSquare,
        text: 'Tap <b>Add to Home screen</b> — some phones word it <b>Install app</b>.',
      },
      { icon: icons.tick, text: 'Tap <b>Add</b> or <b>Install</b> to confirm.' },
    ],
  },
}

function guideBlock(key) {
  const g = INSTALL_GUIDE[key]
  return `
    <p class="instnote">${g.note}</p>
    <ol class="steps">
      ${g.steps
        .map(
          (s, i) => `
        <li class="step">
          <span class="stepn">${i + 1}</span>
          <span class="stepico">${s.icon}</span>
          <span class="steptxt">${s.text}</span>
        </li>`,
        )
        .join('')}
    </ol>`
}

export function installView() {
  const plat = devicePlatform()

  if (isInstalled()) {
    return `
      <div class="pagehead">
        <h2>You're all set</h2>
        <p class="sub">This is already running from your home screen.</p>
      </div>
      <div class="instdone">
        <span class="instmark">${icons.tick}</span>
        <p>Nothing more to do — just open <b>PGW NC</b> whenever you need it.</p>
        <a href="#/" class="ask" style="width:100%;margin-top:18px">Back to the conference</a>
      </div>`
  }

  // A laptop can't add anything to a phone's home screen, so don't pretend.
  const primary = plat === 'desktop' ? null : plat
  const other = primary === 'ios' ? 'android' : 'ios'

  return `
    <div class="pagehead">
      <h2>Add to your home screen</h2>
      <p class="sub">Takes about ten seconds. No app store, no download.</p>
    </div>

    <div class="instwhy">
      <span class="lab" style="margin:0 0 12px">// Why bother</span>
      <ul>
        <li>Opens <b>full screen</b> — no address bar eating the top of your phone</li>
        <li>One tap from your home screen instead of hunting for a link</li>
        <li>Live agenda, room changes and Q&amp;A, all in the same place</li>
      </ul>
    </div>

    ${
      primary
        ? `<span class="lab" style="margin-top:28px">// On your ${INSTALL_GUIDE[primary].label}</span>
           ${guideBlock(primary)}
           <details class="instother">
             <summary>Using ${INSTALL_GUIDE[other].label} instead?</summary>
             ${guideBlock(other)}
           </details>`
        : `<p class="instnote" style="margin-top:26px">
             You're on a computer. Adding to a home screen is a phone thing — open
             this page on your phone and the steps are below.
           </p>
           <span class="lab" style="margin-top:26px">// On ${INSTALL_GUIDE.ios.label}</span>
           ${guideBlock('ios')}
           <span class="lab" style="margin-top:28px">// On ${INSTALL_GUIDE.android.label}</span>
           ${guideBlock('android')}`
    }

    <p class="instfoot">Look for <b>PGW NC</b> on your home screen when you're done.</p>
  `
}

/** The slim prompt on Home. Hidden once installed, and once dismissed. */
export function installPrompt() {
  if (isInstalled() || devicePlatform() === 'desktop') return ''
  try {
    if (localStorage.getItem(INSTALL_HIDDEN_KEY)) return ''
  } catch {
    /* private mode — they get the prompt again, which is a small cost */
  }
  return `
    <div class="instbar">
      <a href="#/install" class="instbar-go">
        <span class="instbar-ico">${icons.plusSquare}</span>
        <span>
          <b>Add to your home screen</b>
          <span class="s">Opens full screen · ten seconds</span>
        </span>
      </a>
      <button class="instbar-x" type="button" data-install-hide="1" aria-label="Dismiss">&times;</button>
    </div>`
}

export function wireHome(rerender) {
  document.querySelector('[data-install-hide]')?.addEventListener('click', () => {
    try {
      localStorage.setItem(INSTALL_HIDDEN_KEY, '1')
    } catch {
      /* nothing to do — the prompt simply returns next visit */
    }
    rerender()
  })
}

/* ---------- Live Q&A (runs on the brain adapter — mock now, Firebase later) ---------- */

const STATUS_LABEL = {
  pending: 'SENT',
  approved: 'APPROVED',
  promoted: 'ON SCREEN',
  shown: 'SHOWN',
  dismissed: 'CLOSED',
}

let askDraft = ''

/* Johnny's ask, 2026-07-27: let people optionally attach their name so the
   speaker can answer them by name.

   TWO DELIBERATE CHOICES, both about not surprising anybody:

   1. The NAME is remembered on the device (so nobody retypes it all day) but
      the TICK IS NOT. It resets to off for every question. Attaching your name
      stays a deliberate act each time — otherwise someone who named themselves
      at 10am asks something sensitive at 3pm and only finds out it went up with
      their name on it when it is on the wall.
   2. The header copy changed from "nothing about you is collected, ever" to
      "anonymous unless you choose to add your name." The old line would have
      become a lie the moment this box existed, and it is printed exactly where
      someone decides whether to risk an honest question. */
const NAME_KEY = 'pgw-nc-my-name'
let askName = (() => {
  try {
    return localStorage.getItem(NAME_KEY) ?? ''
  } catch {
    return ''
  }
})()
let askNamed = false

export function askView() {
  const live = liveSession()
  const mine = brain.myQuestions()
  return `
    <div class="pagehead">
      <h2>Ask a question</h2>
      <p class="sub">Anonymous unless you choose to add your name.</p>
    </div>
    <div class="now" style="margin-bottom:16px">
      <div class="row">
        <span class="live"><span class="dot"></span>ON NOW · ${live.session.start}–${live.session.end}</span>
        <span class="tagm">${live.session.kind}</span>
      </div>
      <h3>${live.session.title}</h3>
    </div>
    <form id="askform" class="askform">
      <textarea id="asktext" rows="3" maxlength="400" placeholder="Type your question for this session…">${askDraft}</textarea>

      <label class="namecheck" for="asknamed">
        <input type="checkbox" id="asknamed" ${askNamed ? 'checked' : ''} />
        <span class="nc-box">${icons.tick}</span>
        <span class="nc-txt">Add my name so the speaker can answer me directly</span>
      </label>
      <input
        id="askname"
        class="nameinput${askNamed ? ' on' : ''}"
        maxlength="60"
        autocomplete="name"
        placeholder="Your name"
        value="${askName.replace(/"/g, '&quot;')}"
      />

      <button type="submit" class="ask" style="margin:14px 0 0; width:100%">
        ${icons.chat} <span id="asksendlabel">${askNamed ? 'Send with my name' : 'Send anonymously'}</span>
      </button>
    </form>
    ${
      mine.length
        ? `
    <span class="lab" style="margin-top:28px">// Your questions</span>
    <div class="mylist">
      ${mine
        .slice()
        .reverse()
        .map(
          (q) => `
      <div class="myq">
        <p>${q.text}</p>
        <span class="chip s-${q.status}">${STATUS_LABEL[q.status] ?? q.status}</span>
      </div>`,
        )
        .join('')}
    </div>`
        : ''
    }
  `
}

export function wireAsk(rerender) {
  const form = document.getElementById('askform')
  const text = document.getElementById('asktext')
  const check = document.getElementById('asknamed')
  const name = document.getElementById('askname')
  const sendLabel = document.getElementById('asksendlabel')

  text?.addEventListener('input', () => {
    askDraft = text.value
  })

  check?.addEventListener('change', () => {
    askNamed = check.checked
    name.classList.toggle('on', askNamed)
    // Say on the button what is about to happen — no one should have to infer it.
    sendLabel.textContent = askNamed ? 'Send with my name' : 'Send anonymously'
    if (askNamed) name.focus()
  })

  name?.addEventListener('input', () => {
    askName = name.value
  })

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const v = text.value.trim()
    if (!v) return
    const who = askNamed ? name.value.trim().slice(0, 60) : ''
    if (askNamed && !who) {
      name.classList.add('bad')
      name.focus()
      return
    }
    if (who) {
      try {
        localStorage.setItem(NAME_KEY, who)
      } catch {
        /* private mode — they just retype it next time */
      }
      askName = who
    }
    const live = liveSession()
    brain.submitQuestion(live.session.id, v, who)
    askDraft = ''
    askNamed = false // back to anonymous by default for the next question
    rerender()
  })
}

export function modView() {
  const qs = brain.questions()
  const bySession = (q) => sessions.find((s) => s.id === q.sessionId)?.title ?? 'General'
  const item = (q, buttons) => `
    <div class="myq">
      <div style="flex:1">
        <p>${q.text}</p>
        <span class="s" style="font-family:var(--mono);font-size:10px">
          ${q.name ? `<b class="qname">${q.name}</b> · ` : ''}${bySession(q)}
        </span>
      </div>
      <div class="modbtns">${buttons}</div>
    </div>`
  const group = (title, list, buttons) =>
    list.length
      ? `<span class="lab" style="margin-top:24px">// ${title} (${list.length})</span>
         <div class="mylist">${list.map((q) => item(q, buttons(q))).join('')}</div>`
      : ''
  const pending = qs.filter((q) => q.status === 'pending')
  const approved = qs.filter((q) => q.status === 'approved')
  const onscreen = qs.filter((q) => q.status === 'promoted')
  const history = qs.filter((q) => q.status === 'shown' || q.status === 'dismissed')
  return `
    <div class="pagehead">
      <h2>Moderator</h2>
      <p class="sub">Curate incoming questions · promote to the room screen</p>
    </div>
    ${group('On screen', onscreen, (q) => `<button class="mbtn" data-act="shown" data-id="${q.id}">Done</button>`)}
    ${group('Incoming', pending, (q) => `<button class="mbtn go" data-act="approve" data-id="${q.id}">Approve</button><button class="mbtn" data-act="dismiss" data-id="${q.id}">Dismiss</button>`)}
    ${group('Approved — ready', approved, (q) => `<button class="mbtn go" data-act="promote" data-id="${q.id}">To screen</button><button class="mbtn" data-act="dismiss" data-id="${q.id}">Dismiss</button>`)}
    ${group('History', history, () => '')}
    ${qs.length ? '' : '<p class="stub" style="padding-top:8px">No questions yet — open the Ask tab in another tab of this browser to demo the loop.</p>'}
    ${crewFooter()}
  `
}

export function wireMod() {
  document.querySelectorAll('.mbtn').forEach((b) =>
    b.addEventListener('click', () => {
      const { act, id } = b.dataset
      if (act === 'promote') brain.promote(id)
      else if (act === 'approve') brain.setStatus(id, 'approved')
      else if (act === 'dismiss') brain.setStatus(id, 'dismissed')
      else if (act === 'shown') brain.setStatus(id, 'shown')
    }),
  )
  wireCrewFooter()
}

/* Who is on stage, as one plain line for the room screen. Deliberately not
   whoLine(): that one is built for a phone card, carries markup, and falls
   back to "PGW · Grand Ballroom" when nobody is listed — a room number is
   noise on a screen everyone is already sitting in front of. Here, no named
   speaker means no line at all. */
function screenWho(s) {
  if (s.kind === 'SOCIAL') return s.venue?.name ?? s.room
  const names = s.speakerIds.map((id) => speakerById(id)?.name).filter(Boolean)
  if (!names.length) return ''
  const orgs = [...new Set(s.speakerIds.map((id) => speakerById(id)?.org).filter(Boolean))]
  return `${names.join(' & ')}${orgs.length ? ` · ${orgs.join(' · ')}` : ''}`
}

/* The room screen (live phone test item 3, 2026-08-04).

   The adviser's note was "show the speaker's SESSION TOPIC, not the theme."
   SCOPE.md recorded that as the cheapest item on the list — "a data-field
   change" — and that reading was wrong. The topic was ALREADY on the screen.
   What was wrong was the hierarchy: the theme sat at 17px semibold white while
   the topic sat under it as an 11–15px tracked mono eyebrow in lime. On a
   projector, the caption-sized thing is the one nobody in row ten can read.
   He was right about what he saw and the scope was wrong about why.

   So this is a typographic fix plus one addition: the room screen never showed
   WHO was speaking at all. In a room, "who is this and what are they talking
   about" is the orienting pair, and half of it was missing.

   TWO STATES, and the difference is the whole design:
     - idle → the topic is the hero, because orienting the room is the job.
     - a question is up → the QUESTION is the hero and the topic drops back to
       a context line, because the question is why this screen exists.
   The .hasq class is what switches between them. The brand lockup stays a
   quiet watermark in both: everyone in the room already knows whose
   conference they are at. */
export function screenView() {
  const live = liveSession()
  const q = brain.promotedQuestion()
  const who = screenWho(live.session)
  return `
    <div class="bigscreen${q ? ' hasq' : ''}">
      <div class="bs-head">
        ${icons.logoWhite}
        <span class="bs-brand">PGW <b>ImplementAI</b> ${conference.year}</span>
      </div>
      <div class="bs-context">
        <div class="bs-topic">${live.session.title}</div>
        ${who ? `<div class="bs-speaker">${who}</div>` : ''}
      </div>
      ${
        q
          ? `<div class="bs-q">“${q.text}”</div><div class="bs-tag">AUDIENCE QUESTION · ${q.name ? q.name.toUpperCase() : 'ANONYMOUS'}</div>`
          : `<div class="bs-idle">Ask a question — anonymously<br><span>open the conference app on your phone</span></div>`
      }
    </div>
  `
}

/* ---------- Pulse survey (Ben Ross's ask) ----------
   One 1-5 rating, one optional comment, ten seconds. Deliberately NOT a form:
   tapping a number is the whole interaction, and the comment is there for the
   people who want to say something. Anything longer gets abandoned mid-corridor. */

/* Scale anchored by Adam, 2026-07-27: 1 = not useful at all, 5 = very useful.
   The words answer the QUESTION ASKED ("how useful was this session?") rather
   than grading the speaker — an adviser can honestly say a good session wasn't
   useful to their practice, and that is the signal Ben actually wants. */
const RATING_WORDS = {
  1: 'Not useful at all',
  2: 'Slightly useful',
  3: 'Moderately useful',
  4: 'Useful',
  5: 'Very useful',
}

let pulseRating = 0
let pulseComment = ''
let pulseSentFor = null // the session just answered — NOT a boolean, see below
let pulseFor = null // which session the draft above belongs to

export function pulseView(sessionId) {
  const s = sessions.find((x) => x.id === sessionId)
  if (!s) return stubView('Feedback', 'That session could not be found.')

  /* Both the draft and the thank-you are keyed to a session id rather than
     held as flags. As flags they leak: rate session A, walk into session B's
     survey, and you would be shown A's thank-you screen over B's form. */
  if (pulseFor !== sessionId) {
    pulseFor = sessionId
    pulseRating = 0
    pulseComment = ''
  }

  if (pulseSentFor === sessionId || brain.hasResponded(s.id)) {
    return `
      <div class="pagehead">
        <h2>Thank you</h2>
        <p class="sub">Your feedback is in — anonymously.</p>
      </div>
      <div class="pulsedone">
        <p>${s.title}</p>
        <a href="#/" class="ask" style="width:100%;margin-top:18px">Back to the conference</a>
      </div>`
  }

  return `
    <div class="pagehead">
      <h2>How was it?</h2>
      <p class="sub">Anonymous — nothing about you is collected, ever.</p>
    </div>
    <div class="now" style="margin-bottom:18px">
      <div class="row">
        <span class="live">${s.start}–${s.end}</span>
        <span class="tagm">${s.kind}</span>
      </div>
      <h3>${s.title}</h3>
    </div>
    <form id="pulseform" class="askform">
      <span class="lab" style="margin:0 0 10px">// How useful was this session?</span>
      <div class="ratings" id="ratings">
        ${[1, 2, 3, 4, 5]
          .map(
            (n) => `<button type="button" class="rate${pulseRating === n ? ' on' : ''}" data-n="${n}">${n}</button>`,
          )
          .join('')}
      </div>
      <div class="rateends"><span>Not useful at all</span><span>Very useful</span></div>
      <span class="lab" style="margin:28px 0 10px">// Anything to add? (optional)</span>
      <textarea id="pulsetext" rows="3" maxlength="400" placeholder="What worked, what didn't…">${pulseComment}</textarea>
      <button type="submit" class="ask" id="pulsesend" style="margin:16px 0 0;width:100%" ${pulseRating ? '' : 'disabled'}>
        Send feedback
      </button>
    </form>`
}

export function wirePulse(rerender, sessionId) {
  document.querySelectorAll('.rate').forEach((b) =>
    b.addEventListener('click', () => {
      pulseRating = Number(b.dataset.n)
      document.querySelectorAll('.rate').forEach((x) => x.classList.toggle('on', Number(x.dataset.n) === pulseRating))
      document.getElementById('pulsesend').disabled = false
    }),
  )
  const text = document.getElementById('pulsetext')
  text?.addEventListener('input', () => {
    pulseComment = text.value
  })
  document.getElementById('pulseform')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!pulseRating) return
    await brain.submitResponse(sessionId, pulseRating, pulseComment)
    pulseSentFor = sessionId
    pulseRating = 0
    pulseComment = ''
    rerender()
  })
}

/** Crew-only rollup — what Ben actually wants out of the day. */
export function resultsView() {
  const rows = brain.pulseSummary()
  const title = (id) => sessions.find((s) => s.id === id)?.title ?? id
  if (!rows.length) {
    return `
      <div class="pagehead"><h2>Pulse results</h2><p class="sub">Per-session feedback, live</p></div>
      <p class="stub" style="padding-top:8px">No responses yet.</p>`
  }
  const total = rows.reduce((a, r) => a + r.count, 0)
  return `
    <div class="pagehead">
      <h2>Pulse results</h2>
      <p class="sub">${total} response${total === 1 ? '' : 's'} · ranked by average rating</p>
    </div>
    <div class="mylist">
      ${rows
        .map(
          (r) => `
        <div class="pulserow">
          <div class="pr-head">
            <span class="pr-avg">${r.avg.toFixed(1)}</span>
            <div>
              <p class="pr-title">${title(r.sessionId)}</p>
              <span class="pr-n">${RATING_WORDS[Math.round(r.avg)]} · ${r.count} response${r.count === 1 ? '' : 's'}</span>
            </div>
          </div>
          <div class="pr-bar"><i style="width:${(r.avg / 5) * 100}%"></i></div>
          ${
            r.comments.length
              ? `<div class="pr-comments">${r.comments.map((c) => `<p>“${c}”</p>`).join('')}</div>`
              : ''
          }
        </div>`,
        )
        .join('')}
    </div>
    ${crewFooter()}`
}

/* ---------- Admin: running late + hand-edited times (crew only) ----------
   Scope deliberately narrow (Adam, 2026-07-27): times only. Titles, speakers
   and the rest stay in code. What actually goes wrong on a conference day is
   the clock, and a small tool you trust beats a big one you hesitate over
   while fifty people wait. */

const DELAY_STEPS = [-5, 5, 10, 15]

/* The version beacon's crew face. Deliberately sits on the admin screen and
   nowhere else: announcing an update is a decision someone makes, standing in
   the room, after checking the new build actually loaded on their own phone.

   ⚠️ THE BUTTON IS NEVER DISABLED, and that is the whole lesson of 2026-07-28.
   It first shipped disabled whenever your device was behind the beacon — the
   reasoning being "you cannot announce a version you are not running," which
   sounds right and is a deadlock. Adam's two-device test walked straight into
   it: the beacon was pushed to a build that existed on one laptop and nowhere
   else, so EVERY device was behind, so EVERY device had the button disabled,
   and nothing in the app could pull it back down. Fifty phones nagging forever
   with no way to stop them.

   Publishing always writes the build the presser is actually running. Upward
   that is an announcement; downward it is a rollback. Downward can never be
   dangerous — it can only ever reduce nagging — so refusing it protected
   nothing and removed the only escape hatch. */
function versionBox() {
  const { running, live } = brain.buildState()
  const behind = live > running
  const announced = live === running
  return `
    <span class="lab" style="margin-top:30px">// App version</span>
    <div class="delaybox">
      <div class="delaynow">Build ${running}${behind ? ` · beacon says ${live}` : ''}</div>
      <p class="delayhelp">
        ${
          behind
            ? `Phones are being told to run build ${live}, but this device can only get ${running}. If build ${live} was never really deployed, roll the beacon back — it stops everyone nagging.`
            : announced
              ? 'Every phone has been told to run this build. Nothing to do.'
              : `Phones are still being told to run build ${live}. Publish to send everyone to build ${running}.`
        }
      </p>
      <div class="delaybtns">
        <button class="dbtn" data-publish="1">
          ${behind ? `Roll the beacon back to ${running}` : 'Publish to all phones'}
        </button>
      </div>
    </div>`
}

export function adminView(dayArg) {
  const day = Number(dayArg) === 2 ? 2 : 1
  const ov = brain.scheduleDoc()
  const delay = Number(ov.delayMin) || 0
  const per = ov.sessions ?? {}
  const list = agendaForDay(day)

  const row = (s) => {
    const base = baseTimes(s.id)
    const edited = !!per[s.id]
    const moved = base && (s.start !== base.start || s.end !== base.end)
    return `
      <div class="adrow${edited ? ' edited' : ''}">
        <div class="adtimes">
          <input class="adtime" data-id="${s.id}" data-f="start" value="${s.start}" maxlength="5" inputmode="numeric" />
          <span class="addash">–</span>
          <input class="adtime" data-id="${s.id}" data-f="end" value="${s.end}" maxlength="5" inputmode="numeric" />
        </div>
        <div class="admeta">
          <p class="adtitle">${s.title}</p>
          ${
            moved && base
              ? `<span class="adwas">was ${base.start}–${base.end}${edited ? ' · hand-edited' : ' · running late'}</span>`
              : '<span class="adwas dim">on schedule</span>'
          }
        </div>
        ${edited ? `<button class="mbtn" data-reset="${s.id}">Reset</button>` : ''}
      </div>`
  }

  return `
    <div class="pagehead">
      <h2>Admin</h2>
      <p class="sub">Running late · session times · crew only</p>
    </div>

    <span class="lab">// Running late</span>
    <div class="delaybox">
      <div class="delaynow">${delay === 0 ? 'On schedule' : `${delay > 0 ? '+' : ''}${delay} min`}</div>
      <p class="delayhelp">Shifts the session on stage now and everything after it. Sessions you've hand-edited are left alone.</p>
      <div class="delaybtns">
        ${DELAY_STEPS.map((n) => `<button class="dbtn" data-step="${n}">${n > 0 ? '+' : ''}${n}</button>`).join('')}
        <button class="dbtn reset" data-reset-delay="1">Back on time</button>
      </div>
    </div>

    ${versionBox()}

    <span class="lab" style="margin-top:30px">// ${conference.days.find((d) => d.day === day)?.label ?? `Day ${day}`}</span>
    <div class="daytabs">
      <a href="#/admin/1" class="dtab${day === 1 ? ' on' : ''}">Day 1</a>
      <a href="#/admin/2" class="dtab${day === 2 ? ' on' : ''}">Day 2</a>
    </div>
    <div class="adlist">${list.map(row).join('')}</div>
    ${crewFooter()}
  `
}

export function wireAdmin(rerender, dayArg) {
  const day = Number(dayArg) === 2 ? 2 : 1
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes()

  document.querySelectorAll('.dbtn[data-step]').forEach((b) =>
    b.addEventListener('click', async () => {
      const ov = brain.scheduleDoc()
      const next = (Number(ov.delayMin) || 0) + Number(b.dataset.step)
      /* delayFrom is captured at the moment of the FIRST push and kept, so
         repeatedly nudging +5 doesn't keep moving the boundary forward and
         leave already-shifted sessions behind. */
      const from = Number(ov.delayMin) ? Number(ov.delayFrom) || 0 : nowMin
      await brain.setDelay(next, from, day)
      rerender()
    }),
  )

  document.querySelector('.dbtn[data-reset-delay]')?.addEventListener('click', async () => {
    await brain.setDelay(0, 0, day)
    rerender()
  })

  document.querySelector('.dbtn[data-publish]')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget
    btn.disabled = true
    btn.textContent = 'Publishing…'
    try {
      await brain.publishBuild()
      /* Repaint explicitly, exactly like every sibling handler on this screen.
         This originally leaned on the beacon listener to bounce back from
         Firestore and re-render for us. It was the only handler here that did,
         and on Adam's phone (2026-07-28) the write landed cleanly while the
         screen never repainted — the button just sat on "Publishing…" until he
         reloaded the page by hand. The write is confirmed; do not make the
         person who pressed the button wait on a round trip to find that out. */
      rerender()
    } catch (err) {
      console.error('[admin] publish build', err)
      btn.disabled = false
      btn.textContent = 'Publish failed — tap to retry'
    }
  })

  document.querySelectorAll('.adtime').forEach((input) =>
    input.addEventListener('change', async () => {
      const id = input.dataset.id
      const row = input.closest('.adrow')
      const start = row.querySelector('.adtime[data-f="start"]').value.trim()
      const end = row.querySelector('.adtime[data-f="end"]').value.trim()
      if (!/^\d{1,2}:\d{2}$/.test(start) || !/^\d{1,2}:\d{2}$/.test(end)) {
        input.classList.add('bad')
        return
      }
      await brain.setSessionTime(id, start.padStart(5, '0'), end.padStart(5, '0'))
      rerender()
    }),
  )

  document.querySelectorAll('[data-reset]').forEach((b) =>
    b.addEventListener('click', async () => {
      await brain.clearSessionTime(b.dataset.reset)
      rerender()
    }),
  )

  wireCrewFooter()
}

/* ---------- Crew sign-in (moderator desk + room screen only) ----------
   Attendees never see this. It exists because the security rules refuse to
   hand the question queue to anyone who isn't signed in — which is the point:
   a dismissed question stays between the asker and the moderator. */

let loginError = ''

export function loginView() {
  return `
    <div class="pagehead">
      <h2>Crew sign-in</h2>
      <p class="sub">Moderator desk and room screen · not for attendees</p>
    </div>
    <form id="loginform" class="askform">
      <input id="loginemail" type="email" autocomplete="username" placeholder="Email" required />
      <input id="loginpass" type="password" autocomplete="current-password" placeholder="Password" required />
      ${loginError ? `<p class="sub" style="color:#B4453C;margin-top:10px">${loginError}</p>` : ''}
      <button type="submit" class="ask" style="margin:14px 0 0; width:100%">Sign in</button>
    </form>
  `
}

export function wireLogin(rerender) {
  const form = document.getElementById('loginform')
  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('loginemail').value.trim()
    const pass = document.getElementById('loginpass').value
    loginError = ''
    try {
      await brain.signIn(email, pass)
      // onAuthChange re-renders; the route resolves to the real view.
    } catch (err) {
      loginError = 'That email and password did not match.'
      console.error('[auth]', err.code ?? err)
      rerender()
    }
  })
}
