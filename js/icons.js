// Thin-line icon set — traced from the approved mock (stroke 1.5–1.7, round caps).
const wrap = (inner, sw = 1.5) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

/* The PGW mark — OFFICIAL artwork, not a trace.
   Paths lifted from the licensee's own logo pack (PGW/brand/guide/logo-*.svg,
   harvested 2026-07-09); the mark is Group_3 of the full lockup, cropped to its
   measured bbox. Full lockups + standalone marks live in img/brand/.

   The colourway is load-bearing and was previously WRONG in this file: in the
   real mark the three ASCENDING BARS are lime and the RING is charcoal. The
   hand-traced stand-in had it inverted, which is why the mark broke up on the
   charcoal room screen — the bars vanished into the background. Adam caught it
   on the big screen, 2026-07-27. Don't re-invert it. */
const markPaths = (bars, ring) => `
    <path d="M249.452,228.844l3.921-18.272,6.182-1.958-5.019,23.848A22.361,22.361,0,0,1,249.452,228.844Zm13.267,6.038,8.588-38.008-6.182,1.958-7.867,34.82A22.368,22.368,0,0,0,262.719,234.882Zm8.959-.971,11.343-48.945-6.1,1.932L265.7,234.966a22.411,22.411,0,0,0,5.908-1.033Z" transform="translate(-243.25 -184.966)" fill="${bars}"/>
    <path d="M195.683,292.647a17.792,17.792,0,0,0,5.115-22.234l1.329-5.775a22.072,22.072,0,0,1-7.771,33.778Zm-31.64-7.489a21.987,21.987,0,0,0,3.839,7.155l1.26-5.913a17.74,17.74,0,0,1,19.45-25.323l4.324-1.38.379-1.635a22,22,0,0,0-29.252,27.1Z" transform="translate(-163 -250.575)" fill="${ring}" fill-rule="evenodd"/>`

const mark = (bars, ring, h = 30) =>
  `<svg height="${h}" viewBox="-0.011 0 44.004 50" fill="none" role="img" aria-label="PGW">${markPaths(bars, ring)}</svg>`

export const icons = {
  // Light grounds (cream app chrome): true two-tone.
  logo: mark('#C8D562', '#272728'),
  // Dark grounds (the room screen): all-white variant from the same pack.
  logoWhite: mark('#FFFFFF', '#FFFFFF', 34),

  // Checkbox tick — heavier stroke than the nav icons so it reads at 13px.
  tick: wrap('<path d="M20 6 9 17l-5-5"/>', 2.6),

  net: `<svg class="net" width="130" height="100" viewBox="0 0 140 110" fill="none">
    <g stroke="#C8D562" stroke-width="1" opacity="0.9">
      <line x1="26" y1="20" x2="70" y2="14"/><line x1="70" y1="14" x2="110" y2="34"/>
      <line x1="26" y1="20" x2="48" y2="58"/><line x1="48" y1="58" x2="70" y2="14"/>
      <line x1="48" y1="58" x2="92" y2="70"/><line x1="92" y1="70" x2="110" y2="34"/>
    </g>
    <g fill="#C8D562">
      <circle cx="26" cy="20" r="3.2"/><circle cx="70" cy="14" r="3.8"/><circle cx="110" cy="34" r="3.2"/>
      <circle cx="48" cy="58" r="2.8"/><circle cx="92" cy="70" r="3.4"/>
    </g>
  </svg>`,

  chat: wrap(
    `<path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.4V16.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5z"/>`,
    1.6,
  ),
  chatBold: wrap(
    `<path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.4V16.5H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5z"/>`,
    1.7,
  ),
  calendar: wrap(
    `<rect x="3" y="4.5" width="18" height="16" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/>`,
  ),
  speakers: wrap(
    `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.2 2.5-5.4 5.5-5.4s5.5 2.2 5.5 5.4"/><path d="M16 5.4a3 3 0 0 1 0 5.8"/><path d="M17.5 20c0-2.6-1-4.4-2.6-5.2"/>`,
  ),
  doc: wrap(
    `<path d="M6.5 3h7l4.5 4.5V20a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13.5 3v4.5H18"/><line x1="8.5" y1="12.5" x2="15" y2="12.5"/><line x1="8.5" y1="16" x2="13" y2="16"/>`,
  ),
  star: wrap(
    `<path d="M12 3.5l2.6 5.3 5.8.9-4.2 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.2-4.1 5.8-.9z"/>`,
  ),
  wifi: wrap(
    `<path d="M3 8.5c5-4 13-4 18 0"/><path d="M5.5 11.7c3.6-2.9 9.4-2.9 13 0"/><path d="M8.2 14.9c2-1.6 5.6-1.6 7.6 0"/><circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none"/>`,
  ),
  pin: wrap(
    `<path d="M12 21c5-4.5 7.5-8 7.5-11.5a7.5 7.5 0 0 0-15 0C4.5 13 7 16.5 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>`,
  ),
  home: wrap(`<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.6V20h12V9.6"/>`, 1.6),
  agendaTab: wrap(
    `<rect x="3" y="4.5" width="18" height="16" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2.5" x2="8" y2="6.5"/>`,
    1.6,
  ),
  materialsTab: wrap(
    `<path d="M6.5 3h7l4.5 4.5V20a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13.5 3v4.5H18"/>`,
    1.6,
  ),
  me: wrap(`<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>`, 1.6),
  cup: wrap(
    `<path d="M4.5 8.5h12v5.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V8.5z"/><path d="M16.5 9.5h1.5a2.5 2.5 0 0 1 0 5h-1.5"/><path d="M8 5.5V4"/><path d="M11 5.5V4"/>`,
  ),
  glass: wrap(
    `<path d="M5 4h14l-7 8.5z"/><line x1="12" y1="12.5" x2="12" y2="19.5"/><line x1="8.5" y1="19.5" x2="15.5" y2="19.5"/>`,
  ),
  award: wrap(
    `<circle cx="12" cy="9" r="5.5"/><path d="M9 13.8L7.5 21l4.5-2.4L16.5 21L15 13.8"/>`,
    1.6,
  ),
  mail: wrap(
    `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>`,
  ),
  phone: wrap(
    `<path d="M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z"/>`,
  ),
  dinner: wrap(
    `<path d="M8 21v-8.2"/><path d="M6 3v4.5a2 2 0 0 0 4 0V3"/><path d="M8 3v9.8"/><path d="M16 21v-6.5"/><path d="M18.5 3c-1.7 0-2.5 2.6-2.5 5.5v6h2.5V3z"/>`,
  ),
}
