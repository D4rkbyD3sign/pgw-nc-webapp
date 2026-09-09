// Conference content — the shape the cloud brain (Firebase) and admin screen
// fill at run time. 2027 = new data, same shapes.
//
// SESSIONS: the real 2026 program, transcribed from PGW's working agenda
// 'Partner Speaking Allocation v3' (Adam, 2026-08-21). Times and partner
// allocations confirmed; topics, panels, keynote speakers and adviser
// spotlights are not yet supplied and are NOT invented here.
//
// ✅ 2026-09-09: the 2025 speaker list is GONE. `speakers` is now DERIVED from
// each partner's `speakers` block below (one source of truth: PGW's partner
// sheet), so the Speakers tab, a speaker page and a session page can never
// disagree with the Partners tab. Rule from Adam, 2026-09-09: the presenter
// named on the sheet; where the sheet says TBC or names nobody, the partner's
// MAIN CONTACT stands in. Centuria names neither, so it has no speaker yet.
// The 2025 set (fourteen people, four returning partners) lives in git at v22.

export const conference = {
  brandName: 'PGW ImplementAI',
  eventName: 'ImplementAI',
  year: 2026,
  tagline: 'Turning technology into results.',
  eyebrow: 'National Conference · 29 Oct · Hobart',
  dates: '29–30 October 2026',
  /* `date` is load-bearing, not decoration. Without it the app had no way to
     know WHICH DAY it was, and the "what's on now" lookup matched on clock
     time alone across both days at once. See conferenceNow() below. ISO, and
     it means the date in CONFERENCE_TZ. */
  days: [
    { day: 1, date: '2026-10-29', label: 'Thu 29 Oct' },
    { day: 2, date: '2026-10-30', label: 'Fri 30 Oct' },
  ],
  /* ⛔ CORRECTED 2026-08-21 from PGW's own invitation. This read "Grand
     Chancellor Hobart, 1 Davey St" — the 2025 placeholder — in every build
     since July, including the one PGW reviewed. Different hotel, different
     street. The `parking` line went with it: it described the Grand
     Chancellor's car park, and nothing is known about the Crowne Plaza's, so
     the field is REMOVED rather than guessed. The FAQ's parking question is
     conditional on it and simply stops appearing. */
  venue: {
    name: 'Crowne Plaza by IHG',
    address: 'Level 12, 110 Liverpool Street, Hobart TAS 7000',
    mapUrl: 'https://maps.google.com/?q=Crowne+Plaza+Hobart+110+Liverpool+Street',
  },
  /* Both from the invitation, and both are questions an adviser will actually
     ask — the second one's answer is a named person's inbox. */
  cpdPoints: 12,
  accommodation: {
    covered: false,
    note: 'PGW have secured a discounted rate at the Crowne Plaza.',
    contact: 'tracey@pgwfinancial.com.au',
  },
  // ⚠️ Still 2025 placeholder — not on the invitation, not confirmed for Hobart.
  wifi: { ssid: 'PGW-Conference', password: 'implement2026' },
  feedbackUrl: 'https://forms.office.com/placeholder',
}

/* ---------- Welcome note + last year's recap (to-do 12) ----------
   Asked for unprompted by an adviser at the 2026-08-04 phone test, which is
   better evidence than either Adam or Lumen weighing it.

   ⚠️ THE VIDEO IS UNLISTED AND THIS REPO IS PUBLIC. The id below is readable
   by anyone who opens the source, so "unlisted" here means UNADVERTISED, not
   confidential. That is a KNOWING, RECORDED acceptance, not an oversight:
   Lumen recommended linking out on exposure grounds and Adam overruled on the
   content itself — a conference recap is not sensitive material (2026-08-06,
   "i think lets embedd it - not an issue given the type of video it is
   anyway"). Do not "fix" this back to a link-out without asking him. */
export const welcome = {
  videoId: 'ZIosyj8JZwM',
  videoTitle: 'Our National Conference 2025 — Gold Coast',
}

// photo: URL to headshot (empty = initials avatar). linkedin: public profile URL.
// Bios condensed from the 2025 NC booklet (see Squad/PGW/PGW-NC-2026/Webapp/booklet-2025-extract.md).
const GB = 'Grand Ballroom'
const AT = 'Atrium'

/* ---------- THE REAL 2026 PROGRAM ----------
   Transcribed slot for slot from PGW's working agenda,
   'ImplementAI 2026 - Partner Speaking Allocation v3.docx' (Adam, 2026-08-21),
   replacing the 2025 booklet shape that stood here since July.

   ⚠️ WHAT IS CONFIRMED: every TIME and every partner ALLOCATION. Those are the
   document's own tables and they are reproduced exactly.

   ⛔ WHAT IS NOT, AND IS THEREFORE NOT WRITTEN HERE:
     - Session TOPICS. Only 3 of 15 partners have supplied one. A slot carries
       the presenting organisation and nothing more until the topic lands, and
       `summary` says so rather than guessing.
     - The three panels. The source lists SUGGESTED themes (internal PGW team,
       cybersecurity, adviser roundtable) under "What's Still Missing" — a
       suggestion is not a program, and putting it here would make it one.
     - Both keynote speakers. Neither is booked; the opening candidate has not
       replied and the closing slot has no candidate.
     - Both adviser spotlights.
     - ROOMS. GB/AT are carried over from the 2025 shape and are NOT confirmed
       for Hobart. Flagged with Adam.

   ⛔ EVENING EVENTS ARE ABSENT ON PURPOSE. PGW's partner tracker shows a
   Thursday evening dinner and a Friday Annual Awards Dinner exist, but no time
   and no venue for either. The 2025 entries were Gold Coast venues (Misono,
   SkyPoint) and carrying those into a Hobart conference would have been worse
   than showing nothing. Restore them the moment times and venues arrive — the
   Tonight tile, the Tonight page and the FAQ's evening answers all read from
   this array and will light up on their own.

   ⚠️ `speakerIds` is empty on every session. The 14 speakers still in this file
   are the 2025 line-up and belong to partners who are NOT returning. Sessions
   name their presenting organisation via `org` instead, so nothing here points
   at a person who is not coming.

   ~~⚠️ `partnerId` is set ONLY for the four partners returning from 2025.~~
   ✅ 2026-09-08: all fifteen 2026 partners have records + logos; every partner
   session is linked, and its summary carries the topic where PGW has one. */
export const sessions = [
  // ---- Day 1 · Thu 29 Oct · 9:00am to 5:00pm ----
  { id: 'd1-welcome', day: 1, start: '09:00', end: '09:15', title: 'Welcome & housekeeping', kind: 'PLENARY', room: GB, org: 'PGW', speakerIds: [], summary: 'Opening welcome from PGW.' },
  { id: 'd1-keynote-open', day: 1, start: '09:15', end: '10:05', title: 'Opening Keynote', kind: 'KEYNOTE', room: GB, org: '', speakerIds: [], summary: 'Guest speaker to be announced.' },
  { id: 'd1-mst', partnerId: 'mst', day: 1, start: '10:05', end: '10:50', title: 'MST Financial', kind: 'KEYNOTE', room: GB, org: 'MST Financial', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-morning-tea', day: 1, start: '10:50', end: '11:20', title: 'Morning tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-pep', partnerId: 'pep', day: 1, start: '11:20', end: '11:40', title: 'Pacific Equity Partners', kind: 'PLENARY', room: GB, org: 'Pacific Equity Partners', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-openmarkets', partnerId: 'openmarkets', day: 1, start: '11:40', end: '12:00', title: 'Open Markets', kind: 'PLENARY', room: GB, org: 'Open Markets', speakerIds: [], summary: 'Tokenisation of real-world assets' },
  { id: 'd1-spotlight', day: 1, start: '12:00', end: '12:10', title: 'Adviser Spotlight', kind: 'SPOTLIGHT', room: GB, org: '', speakerIds: [], summary: 'Adviser to be announced.' },
  { id: 'd1-gyrostat', partnerId: 'gyrostat', day: 1, start: '12:10', end: '12:55', title: 'Gyrostat', kind: 'PLENARY', room: GB, org: 'Gyrostat', speakerIds: [], summary: 'Structural weakness in retirement portfolio construction — the SMILE risks: Sequencing, Market, Inflation, Longevity, Emotional' },
  { id: 'd1-lunch', day: 1, start: '12:55', end: '13:45', title: 'Lunch', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-panel-1', day: 1, start: '13:45', end: '14:20', title: 'Panel Discussion', kind: 'PANEL', room: GB, org: 'PGW', speakerIds: [], summary: 'Panel and topic to be announced.' },
  { id: 'd1-wam', partnerId: 'wam', day: 1, start: '14:20', end: '14:40', title: 'Wilson Asset Management', kind: 'PLENARY', room: GB, org: 'Wilson Asset Management', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-paradino', partnerId: 'paradino', day: 1, start: '14:40', end: '15:25', title: 'Paradino', kind: 'PLENARY', room: GB, org: 'Paradino', speakerIds: [], summary: 'The little things that make AI work in advice — a practical session with workflow examples, adviser use cases and Q&A' },
  { id: 'd1-arvo-tea', day: 1, start: '15:25', end: '15:55', title: 'Afternoon tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-panel-2', day: 1, start: '15:55', end: '16:30', title: 'Panel Discussion', kind: 'PANEL', room: GB, org: '', speakerIds: [], summary: 'Panel and topic to be announced.' },
  { id: 'd1-centuria', partnerId: 'centuria', day: 1, start: '16:30', end: '16:50', title: 'Centuria', kind: 'PLENARY', room: GB, org: 'Centuria', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-wrap', day: 1, start: '16:50', end: '17:00', title: 'Day one wrap-up', kind: 'PLENARY', room: GB, org: 'PGW', speakerIds: [], summary: '' },
  {
    id: 'd1-cruise', day: 1, start: '18:30', end: '21:30', title: 'Mustique — Luxury Cruising', kind: 'SOCIAL',
    room: 'Elizabeth Street Pier', org: '', speakerIds: [],
    summary: 'Thursday evening on the water.',
    venue: {
      // The PLACE, not the operator — the title already carries "Mustique",
      // and the thing an adviser needs at 6pm is where to walk to.
      name: 'Elizabeth Street Pier',
      address: 'Elizabeth Street Pier, Hobart TAS 7000',
      mapUrl: 'https://maps.google.com/?q=Elizabeth+Street+Pier+Hobart',
    },
  },

  // ---- Day 2 · Fri 30 Oct · 9:00am to 4:50pm ----
  { id: 'd2-welcome', day: 2, start: '09:00', end: '09:10', title: 'Welcome back & recap', kind: 'PLENARY', room: GB, org: 'PGW', speakerIds: [], summary: '' },
  { id: 'd2-macquarie', partnerId: 'macquarie', day: 2, start: '09:10', end: '09:30', title: 'Macquarie', kind: 'PLENARY', room: GB, org: 'Macquarie', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-pep', partnerId: 'pep', day: 2, start: '09:30', end: '10:15', title: 'Pacific Equity Partners', kind: 'PLENARY', room: GB, org: 'Pacific Equity Partners', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-tal', partnerId: 'tal', day: 2, start: '10:15', end: '10:35', title: 'TAL', kind: 'PLENARY', room: GB, org: 'TAL', speakerIds: [], summary: 'Life insurance market update' },
  { id: 'd2-morning-tea', day: 2, start: '10:35', end: '11:05', title: 'Morning tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd2-afic', partnerId: 'afic', day: 2, start: '11:05', end: '11:50', title: 'AFIC', kind: 'PLENARY', room: GB, org: 'AFIC', speakerIds: [], summary: 'Technology insights from the recent company profit reporting season' },
  { id: 'd2-millbrook', partnerId: 'millbrook', day: 2, start: '11:50', end: '12:10', title: 'Millbrook Group', kind: 'PLENARY', room: GB, org: 'Millbrook Group', speakerIds: [], summary: 'Building resilient portfolios: the growing role of private credit' },
  { id: 'd2-spotlight', day: 2, start: '12:10', end: '12:20', title: 'Adviser Spotlight', kind: 'SPOTLIGHT', room: GB, org: '', speakerIds: [], summary: 'Adviser to be announced.' },
  { id: 'd2-lunch', day: 2, start: '12:20', end: '13:10', title: 'Lunch', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd2-hub24', partnerId: 'hub24', day: 2, start: '13:10', end: '13:55', title: 'HUB24', kind: 'PLENARY', room: GB, org: 'HUB24', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-trilogy', partnerId: 'trilogy', day: 2, start: '13:55', end: '14:15', title: 'Trilogy Funds', kind: 'PLENARY', room: GB, org: 'Trilogy Funds', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-panel-3', day: 2, start: '14:15', end: '15:00', title: 'Panel Discussion', kind: 'PANEL', room: GB, org: '', speakerIds: [], summary: 'Panel and topic to be announced.' },
  { id: 'd2-arvo-tea', day: 2, start: '15:00', end: '15:30', title: 'Afternoon tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd2-keynote-close', day: 2, start: '15:30', end: '16:30', title: 'Closing Keynote', kind: 'KEYNOTE', room: GB, org: '', speakerIds: [], summary: 'Guest speaker to be announced.' },
  { id: 'd2-close', day: 2, start: '16:30', end: '16:50', title: 'Conference close & key takeaways', kind: 'PLENARY', room: GB, org: 'PGW', speakerIds: [], summary: '' },
  {
    id: 'd2-drinks', day: 2, start: '17:00', end: '18:30', title: 'Drinks', kind: 'SOCIAL',
    room: 'Level 4', org: '', speakerIds: [],
    summary: 'Optional — before the awards dinner.',
    venue: {
      name: 'Level 4, Crowne Plaza',
      address: '110 Liverpool Street, Hobart TAS 7000',
      mapUrl: 'https://maps.google.com/?q=Crowne+Plaza+Hobart+110+Liverpool+Street',
    },
  },
  {
    id: 'd2-awards', day: 2, start: '18:30', end: '22:00', title: 'Annual Awards Dinner', kind: 'SOCIAL',
    room: 'Crowne Plaza', org: '', speakerIds: [],
    summary: 'The adviser awards night — the conference finale.',
    /* ⚠️ END TIME IS AN ASSUMPTION, and the only invented value in this array.
       The invitation gives a 6:30pm start and no finish. 22:00 is a guess kept
       solely because a session needs an end for the agenda to render a range.
       ⬜ Confirm with Adam and correct — do not let it harden by sitting here. */
    endAssumed: true,
    venue: {
      name: 'Crowne Plaza by IHG',
      address: 'Level 12, 110 Liverpool Street, Hobart TAS 7000',
      mapUrl: 'https://maps.google.com/?q=Crowne+Plaza+Hobart+110+Liverpool+Street',
    },
  },
]

// Educational partners — 2026 line-up, from PGW's Education Partners sheet
// (Adam, 2026-09-08). Order = the conference artwork: PEP (main partner) first,
// then alphabetical. NO tiers in the app — Adam ruled it; advisers don't care
// who paid what, and a Gold partner shouldn't read second-class on a phone.
//
// Every field is DERIVED from the sheet, never written here: `blurb` is the
// partner's own company blurb, `speaker.bio` is their own booklet blurb, `topic`
// is what they told PGW. Where the sheet is blank the field is absent and the
// view hides that block — no invented copy. Three typos corrected in transit
// (Afics → AFIC's, Deustche → Deutsche, McNeiill → McNeill); the sheet is
// PGW's, so the fix lives here, not there.
//
// ⛔ Speakers carry NAME + TITLE only. No mobiles, no emails: this repo is
// public, and the sheet's contact columns stay in the fenced Squad folder.
// Speaker photos: nine landed 2026-09-09 (Adam, via speakers-inbox), cropped
// square at 480px to img/speakers/2026/<speakerId>.jpg. Absent = monogram.
//
// The 2025 set (eleven partners, four returning) lives in git at v20 `8e9a039`.
export const partners = [
  {
    id: 'pep', name: 'Pacific Equity Partners', short: 'PEP', logo: 'img/partners/2026/pep.png',
    blurb: 'Pacific Equity Partners (PEP) is an Australia-based Private Markets Fund Manager. Founded in 1998, we are a leader in Australian and New Zealand markets. We work in partnership with management teams to drive business success through transformational profit improvement and have built a reputation for delivering world-class returns.',
    speakers: [
      { name: 'Cameron Blanks', photo: 'img/speakers/2026/pep-blanks.jpg', title: 'Managing Director', bio: 'Cameron joined Pacific Equity Partners in 2002. Prior to joining PEP, Cameron spent three years with Bain & Company in Australia and North America. Previously, Cameron worked for seven years in the mining and construction industry in Australia, Asia and North America. He received an MBA from MIT Sloan, and a MEng and BEng (First Class Honours) from the University of South Australia where he was a Graduate Society Scholar.' },
      { name: 'Paul Ryan', photo: 'img/speakers/2026/pep-ryan.jpg', bio: 'Paul joined Pacific Equity Partners in 2013. Before joining PEP, he was at Deutsche Bank and Dakota Capital. He holds a BCom (Hons) from the University of Auckland.' },
    ],
  },
  {
    id: 'afic', name: 'Australian Foundation Investment Company', short: 'AFIC', logo: 'img/partners/2026/afic.png',
    blurb: "AFIC is the largest Listed Investment Company in Australia. AFIC's investment style is to buy shares in quality companies and hold them for the medium to long term. The investment objectives are to pay a stable to growing dividend over time and to provide attractive total returns over the medium to long term.",
    topic: 'Technology insights from the recent company profit reporting season',
    speakers: [
      { name: 'Brett McNeill', title: 'Portfolio Manager', bio: 'Brett joined the AFIC Group in October 2019 as the Portfolio Manager for Djerriwarrh Investments. Brett also became the Portfolio Manager of Australian Foundation Investment Company in October 2025. Brett has over 23 years of investment experience. Prior to joining AFIC, Brett spent 14 years at Antares Capital (previously called Portfolio Partners and Aviva Investors) as a Portfolio Manager and Analyst. Brett holds a Bachelor of Commerce (Economics) and is a CFA Charterholder.' },
    ],
  },
  {
    id: 'centuria', name: 'Centuria', logo: 'img/partners/2026/centuria.png',
  },
  {
    id: 'ellerston', name: 'Ellerston Capital', logo: 'img/partners/2026/ellerston.png',
    // No presenter on the sheet — main contact stands in (Adam, 2026-09-09).
    speakers: [{ name: 'Lisa Salamon' }],
  },
  {
    id: 'gyrostat', name: 'Gyrostat', logo: 'img/partners/2026/gyrostat.png',
    blurb: 'Gyrostat Capital Management specialises in Retirement Portfolio Resilience — the discipline of helping investors remain financially and emotionally invested throughout their retirement journey, regardless of the path markets take. Gyrostat is an Australian investment manager focused on a structural weakness in portfolio construction — that the approach used to build portfolios in accumulation is often carried unchanged into retirement, despite fundamentally different risk dynamics. Gyrostat’s approach is based on a simple principle: risk is not something to be predicted, but something that is continuously priced and can be managed through structure. Its strategies combine equity exposure with systematic protection, designed to reduce the impact of large market declines while maintaining participation in rising markets. The objective is not to maximise returns, but to improve the consistency of outcomes — particularly for investors exposed to sequencing risk.',
    topic: 'Structural weakness in retirement portfolio construction, leaving retirees exposed to the SMILE risks — Sequencing, Market, Inflation, Longevity and Emotional risk',
    speakers: [
      { name: 'Craig Racine', photo: 'img/speakers/2026/gyrostat-racine.jpg', title: 'Founder', bio: 'Craig Racine has held senior executive positions based in Australia and Hong Kong in asset management, private equity, investment banking, equity research, and industry. He commenced his career in the chartered accounting industry with KPMG. In Hong Kong, his senior management experience included Executive Director at The Asian Infrastructure, Soros Funds Management, Frank Russell Investments, and AMP Capital. During that time, he held Board positions in multi-national companies in China, India, Indonesia, The Philippines, Pakistan, and globally. He was a Managing Director and Head of Sector Research at ING Barings (Asia) and Peregrine Investment Bank. Upon returning to Australia, he founded boutique asset management firm Gyrostat Capital Management.' },
    ],
  },
  {
    id: 'hub24', name: 'HUB24', logo: 'img/partners/2026/hub24.png',
    blurb: 'HUB24 is a leading provider of integrated platform and technology solutions for financial advisers, offering a flexible and innovative investment platform designed to improve efficiency and deliver better client outcomes. Backed by award-winning functionality and a strong focus on adviser experience, HUB24 helps simplify complexity and drive better financial futures.',
    speakers: [{ name: 'Jack Rooke', photo: 'img/speakers/2026/hub24-rooke.jpg' }],
  },
  {
    id: 'macquarie', name: 'Macquarie', logo: 'img/partners/2026/macquarie.png',
    blurb: 'Macquarie’s Banking and Financial Services group and Macquarie Asset Management are part of Macquarie Group, a diversified financial group providing clients with asset management, finance, banking, advisory, and risk and capital solutions across debt, equity and commodities. Founded in 1969, Macquarie Group employs approximately 20,000+ in 34 markets and is listed on the Australian Securities Exchange. Macquarie’s Banking and Financial Services group comprises Macquarie’s retail businesses, providing a diverse range of personal banking, wealth management and business banking products and services to retail clients, advisers, brokers and business clients.',
    speakers: [{ name: 'Laura Khoury' }],
  },
  {
    id: 'millbrook', name: 'Millbrook Group', logo: 'img/partners/2026/millbrook.png',
    blurb: "Established in 2005, Millbrook Group is a specialist Australian property credit fund manager focused on delivering income-generating investment opportunities secured by real property. With more than $330 million in funds under management and over 2,400 investors, Millbrook has funded more than $1.3 billion in property loans across Australia, building a strong track record in mortgage-backed private credit. Millbrook's investment philosophy centres on capital preservation, disciplined credit assessment, and generating attractive risk-adjusted returns through first and second mortgage lending secured against Australian real estate. The firm combines institutional-grade credit processes with a relationship-driven approach, offering advisers access to private credit solutions designed to complement traditional fixed income and equity allocations.",
    topic: 'Building resilient portfolios: the growing role of private credit',
    speakers: [
      { name: 'Andrew Slattery', photo: 'img/speakers/2026/millbrook-slattery.jpg', title: 'Head of Investments', bio: 'Andrew Slattery has over 17 years of experience in the financial services sector with expertise in investment management, credit structuring, private banking and relationship management. He has held senior roles at leading firms NAB Private Wealth and ANZ Private. Andrew started his banking career at Citigroup in their Global Transactions business. As Head of Investments, Andrew oversees Millbrook’s capital raising activities, fund strategy, portfolio management, distribution and investor relations.' },
    ],
  },
  {
    id: 'mst', name: 'MST Financial', logo: 'img/partners/2026/mst.png',
    blurb: "MST Financial is a premier equity research and institutional services platform founded in 2017 and wholly owned by its staff and representatives. Built by an experienced team of highly regarded investment professionals, MST Financial serves more than 150 institutional investors with research and advisory services consistently rated among the best in the market. As an Australian owned firm, MST Financial brings an alignment of interest and depth of conviction that sets it apart. From this research foundation, MST Financial has evolved into a fully integrated platform purpose built to support advice firms and their clients. Sandstone Insights delivers equity research, market insights and adviser education, while MST Investment Solutions provides portfolio consulting and bespoke implementation across SMA, IMA and MDA structures. MST Income Solutions rounds out the offering with hybrid and credit portfolios, listed and OTC income strategies, and transition portfolios giving advisers institutional grade tools to meet a broad range of client income needs. Underpinning it all, MST Financial's execution and capital markets capabilities ensure seamless end to end implementation. From listed and OTC execution with institutional liquidity access, through to primary market participation via its Equity and Debt Capital Markets division, advisers partnering with MST Financial gain access to infrastructure and expertise that was once the exclusive domain of the largest institutional investors.",
    speakers: [
      { name: 'John Lockton', photo: 'img/speakers/2026/mst-lockton.jpg', title: 'Chief Investment Officer & Portfolio Manager', bio: 'John brings over two decades of experience in equity strategy and portfolio management to his role as Chief Investment Officer at MST Financial. John joined MST Financial in 2022. As CIO, John is responsible for the multi-asset-class views and sits on investment committees of some of Australia’s leading private wealth firms. Prior to MST, John held senior positions at Wilsons Advisory. John held multiple roles at Wilsons over his 12 years at the Firm, including Head of Asset Allocation and Portfolio Manager for the Australian Equities and Global Equities portfolios.' },
    ],
  },
  {
    id: 'openmarkets', name: 'Openmarkets', logo: 'img/partners/2026/openmarkets.png',
    blurb: "Openmarkets Group (OMG) is a leading Australian B2B fintech, providing trading, wealth management infrastructure and technology solutions to financial institutions, advisers and fintechs. We deliver a unique, end-to-end ecosystem that connects investors to markets through scalable, compliant and innovative technology. Operating within Australia's highly regulated financial system under our AFSL and as a clearing broker of ASX, we are trusted by partners to power critical trading and investment capabilities. We also provide wealth management products and services, such as Portfolio Administration, MDA, tax engine and model rebalancing technology.",
    topic: 'Tokenisation of real-world assets',
    speakers: [
      { name: 'Dan Jowett', photo: 'img/speakers/2026/openmarkets-jowett.jpg', title: 'Chief Executive Officer', bio: 'Dan is the CEO of Openmarkets and has served as OMG’s Chief Executive Officer since March 2022. Prior to joining Openmarkets, Mr Jowett was the Chief Operating Officer and Chief Financial Officer of Shaw and Partners Limited, an Australian investment and wealth management firm, between 2012 and 2021. Dan commenced his career providing financial assurance and advisory services while at PwC Australia and KPMG UK, and has 30 years of professional experience across stockbroking, wealth management, funds management and investment banking. Mr Jowett is a Fellow of the Institute of Chartered Accountants in England and Wales, holds a Professional Diploma in Stockbroking, and is a Responsible Executive under the ASIC Market Integrity Rules (ASX).' },
    ],
  },
  {
    id: 'paradino', name: 'Paradino', logo: 'img/partners/2026/paradino.png',
    blurb: 'Paradino is an end-to-end AI advice automation platform built for Australian financial advisers. It helps advice teams move from discovery to review-ready advice documents by capturing meeting context, organising client knowledge, supporting strategy work, and reducing the manual handling that slows advice down. The platform is built around a simple belief: AI should make advice more effective, not just faster. Advisers stay in control, while Paradino helps make the work more consistent, more traceable, and easier to review. The aim is not to replace judgement, but to give advisers and support teams better tools for the work they already do every day. Paradino works with advice practices, licensees and partners across Australia to bring practical AI into real advice workflows. That includes integrations with key advice, modelling and practice tools, so firms can modernise how advice gets prepared without losing the human judgement, compliance discipline and client context that matter most.',
    topic: 'The little things that make AI work in advice — a practical session with workflow examples, adviser use cases and Q&A',
    speakers: [
      { name: 'Alex Gassner', photo: 'img/speakers/2026/paradino-gassner.jpg', title: 'Co-Founder & CEO', bio: 'Alex Gassner is Co-Founder and CEO of Paradino, an end-to-end AI advice automation platform for financial advisers. Alex has spent his career inside the advice process. He began in paraplanning and financial advice, before moving into practice development and advice auditing with KPMG. Before co-founding Paradino, he led Scale Up Paraplanning, building workflows that supported hundreds of advisers and the delivery of thousands of Statements of Advice. That experience gives Alex a practical view of where advice work slows down: documentation, review, compliance, handoffs and the small details that can get lost between a client meeting and the final advice document. At Paradino, he works closely with advice practices to build solutions that fit the way advisers actually work, with adviser judgement and approval remaining central.' },
    ],
  },
  {
    id: 'russell', name: 'Russell Investments', logo: 'img/partners/2026/russell.png',
    blurb: 'Since 1936, Russell Investments has been building a legacy of continuous innovation to deliver exceptional value to clients, working every day to improve people’s financial security. Russell Investments leverages its global research capabilities to identify and assess the best ideas from across the investment management universe. We then apply these insights through a disciplined portfolio construction process, helping advisers access diversified, professionally managed investment solutions.',
    // No presenter on the sheet — main contact stands in (Adam, 2026-09-09).
    speakers: [{ name: 'Nesh Subotic' }],
  },
  {
    id: 'tal', name: 'TAL', logo: 'img/partners/2026/tal.png',
    topic: 'Life insurance market update',
    speakers: [{ name: 'Mark Olivier', title: 'Business Development Manager NSW' }],
  },
  {
    id: 'trilogy', name: 'Trilogy Funds', logo: 'img/partners/2026/trilogy.png',
    blurb: 'For over 25 years, Trilogy Funds has specialised in property backed, income investments. We have successfully navigated numerous economic, property and interest rate cycles, seeking to maximise returns while preserving capital in our credit portfolios and pursuing growth in our property investments. Our experience, expertise and reputation enable us to source high quality opportunities for our retail, wholesale and institutional investors.',
    speakers: [
      { name: 'Walter Raspopin', photo: 'img/speakers/2026/trilogy-raspopin.jpg', title: 'Distribution Manager — QLD, SA & TAS', bio: "Walter Raspopin is the Distribution Manager for Queensland, South Australia and Tasmania at Trilogy Funds. With more than 30 years of experience in the financial services industry, Walter has built an extensive career working across boutique fund managers, banks, building societies and financial planning firms. Walter joined Trilogy Funds over 11 years ago and has played a key role during a period of significant growth for the business. During his tenure, Trilogy's funds under management (FUM) have expanded from approximately $30 million to more than $1.6 billion, reflecting the strength of the firm's investment offering and its growing presence in the market. Drawing on his deep industry knowledge and broad distribution experience, Walter works closely with financial advisers and investment professionals across his regions, helping them identify solutions that support their clients' wealth creation and investment objectives." },
    ],
  },
  {
    id: 'wam', name: 'Wilson Asset Management', logo: 'img/partners/2026/wam.png',
    blurb: 'Established in 1997 by Geoff Wilson AO, Wilson Asset Management is an independently owned investment manager based in Sydney, Australia. As the investment manager for nine leading listed investment companies (LICs) listed on the ASX and three unlisted funds, Wilson Asset Management invests $6 billion on behalf of more than 130,000 retail investors. Wilson Asset Management created and is the lead supporter of the first LICs to deliver both investment and social returns: Future Generation Australia (ASX: FGX) and Future Generation Global (ASX: FGG), as well as Future Generation Women.',
    speakers: [
      { name: 'Chris Boyd', photo: 'img/speakers/2026/wam-boyd.jpg', title: 'Investment Specialist', bio: "Chris Boyd is an Investment Specialist at Wilson Asset Management (WAM), where he works closely with financial advisers, research houses, consultants and professional investors across Australia. With more than 25 years of experience in investment management and wealth distribution, Chris has held senior distribution roles at Pengana Capital Group, HMC Capital and Schroders. He specialises in helping advisers access differentiated investment solutions and is actively involved in the growth of WAM's alternative investment capabilities, including the WAM Founders Fund and WAM Real Assets Fund." },
    ],
  },
]

export function partnerById(id) {
  return partners.find((p) => p.id === id)
}

/* ---------- On-the-day help (to-do 5, the emergency-contacts ask) ----------
   The people an adviser calls when something goes wrong at the venue.
   Names and numbers supplied by Adam, 2026-08-21, verbatim.

   NO TITLES, deliberately (Adam's call). This is a list you scan while
   something has already gone wrong; a job title does not help you decide who
   to ring, and four names read faster than four names and four roles.

   ⚠️⚠️ THE NUMBERS BELOW ARE PLACEHOLDERS. THE REAL ONES ARE NOT IN THIS REPO
   AND MUST NOT BE PUT IN IT.

   This repository is PUBLIC (free-tier Pages requires it). Four of these five
   mobiles belong to people who are not Adam; they were given for conference
   use, which is not the same as agreeing to be findable on the open internet.
   And git history is permanent — deleting a committed number removes it from
   the file, never from the history of a repo that has already been cloned.

   Agreed with Adam, 2026-08-21: names + placeholders here so the screen can be
   seen and reviewed, real numbers delivered at runtime from Firestore
   (events/{EVENT_ID}/live/contacts), same pattern as the schedule overrides —
   code is the default, cloud is the override.
   ✅ BUILT 2026-09-09 (v28): brain.js listens on live/contacts, the Help page
   merges by id, and #/admin has a "Help numbers" box the crew type into.

   Real numbers live at ~/.house-keys/pgw-nc-contacts.json — outside every
   repo, never ferried. (The 0400 000 0XX placeholders that sat here from
   21 Aug to 9 Sep are gone: a name with no published number now shows as a
   name, which is honest, instead of a number that dials nowhere.) */
// ⛔ NAMES ONLY. The numbers are personal mobiles and live in Firestore at
// events/{EVENT_ID}/live/contacts (crew-written from #/admin); brain.js merges
// them in by id. Nothing in this public file should ever carry a real number,
// and since 2026-09-09 it carries no placeholder either.
export const crewContacts = [
  { id: 'ross', name: 'Ben Ross' },
  { id: 'gould', name: 'Tracey Gould' },
  { id: 'griffin', name: 'Alex Griffin' },
  { id: 'shin', name: 'Johnny Shin' },
  { id: 'graham', name: 'Adam Graham' },
]

export const materials = [
  { id: 'm1', sessionId: 'd1-stropro', label: 'Deck — Maximising Opportunities with Structured Products', type: 'deck', url: '#' },
  { id: 'm2', sessionId: 'd2-gyrostat', label: 'Handout — Portfolio Construction for Lower Risk Investors', type: 'handout', url: '#' },
]

/** Every presenter, derived from the partners above. Ids are stable
 *  (`<partnerId>-<surname>`) so a photo can be named for them and a
 *  `#/speaker/…` link survives a re-derivation. */
const slug = (t) => t.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')
export const speakers = partners.flatMap((p) =>
  (p.speakers ?? []).map((sp) => ({
    id: `${p.id}-${slug(sp.name.split(' ').at(-1))}`,
    partnerId: p.id,
    org: p.name,
    orgShort: p.short ?? p.name,
    ...sp,
  })),
)

export function speakerById(id) {
  return speakers.find((s) => s.id === id)
}

/** Who is presenting a session: named speakers if the agenda names any,
 *  otherwise the presenting partner's people. */
export function speakersForSession(s) {
  const named = (s.speakerIds ?? []).map(speakerById).filter(Boolean)
  if (named.length) return named
  return s.partnerId ? speakers.filter((sp) => sp.partnerId === s.partnerId) : []
}

/** Next social event (dinner etc) for the "Tonight" tile. */
export function nextSocial() {
  return sessions.find((s) => s.kind === 'SOCIAL')
}

/** All social events for a day, in time order (drinks → dinner). */
export function socialsForDay(day) {
  return sessions
    .filter((s) => s.kind === 'SOCIAL' && s.day === day)
    .sort((a, b) => a.start.localeCompare(b.start))
}

const toMin = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/* ---------- what time is it, and which conference day is it? ----------

   WHY THIS EXISTS. Until 2026-08-21 the app asked the DEVICE what time it was
   and then searched EVERY session on BOTH days for one whose start/end
   straddled that clock. It never checked the date. Day 1 sits earlier in the
   array, so it always won: on the Friday the app would announce Thursday's
   session, file every question against a Thursday session id, and score every
   pulse rating against the wrong session. With the 2025 placeholder agenda
   (day 1 started at noon) that broke 8 of 13 Friday slots. With the real v3
   agenda — BOTH DAYS 9:00 to ~17:00 — it would have been wrong for
   essentially all of Friday.

   Found because PGW tested from Adelaide on 2026-08-21 and were half an hour
   behind Adam, which surfaced that "on now" was device-relative. Chasing that
   turned up the larger fault underneath: the app had no concept of the date.

   WHOSE CLOCK. The conference timezone, not the device's. Adam's read is right
   that everyone will be in Hobart together, so this is belt and braces rather
   than the main event — but a timezone is a DEVICE SETTING, not a fact about
   where someone is standing: a phone with its timezone set by hand, a laptop
   brought from interstate, or anyone following along remotely would otherwise
   see the wrong session. Deciding which day it is needs a date basis anyway,
   so this costs nothing extra and removes the whole class of fault.

   IANA name, never a fixed offset — Hobart is AEDT in late October and the
   browser holds the DST rules, we should not. */
export const CONFERENCE_TZ = 'Australia/Hobart'

const TZ_FMT = new Intl.DateTimeFormat('en-AU', {
  timeZone: CONFERENCE_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  // h23 rather than hour12:false — some engines report midnight as "24" under
  // hour12:false, which would put the clock 24 hours out for one minute a day.
  hourCycle: 'h23',
})

/**
 * The moment `now` expressed in conference time.
 *
 * Returns { date, nowMin, day } where `day` is the conference day number, or
 * NULL when today is not a conference day at all. Null is a real answer and
 * callers must handle it — it is what makes "nothing is on" expressible.
 */
export function conferenceNow(now = new Date()) {
  const parts = Object.fromEntries(
    TZ_FMT.formatToParts(now)
      .filter((p) => p.type !== 'literal')
      .map((p) => [p.type, p.value]),
  )
  const date = `${parts.year}-${parts.month}-${parts.day}`
  const match = conference.days.find((d) => d.date === date)
  return {
    date,
    nowMin: Number(parts.hour) * 60 + Number(parts.minute),
    day: match ? match.day : null,
  }
}

/** Everything after the given wall-clock minute on a day, in order —
 *  breaks included (advisers care about lunch). */
export function upcomingAfter(nowMin, day = 1, limit = 4) {
  return sessions
    .filter((s) => s.day === day && toMin(s.start) > nowMin)
    .sort((a, b) => toMin(a.start) - toMin(b.start))
    .slice(0, limit)
}

/** A day's full agenda, in time order. */
export function agendaForDay(day) {
  return sessions.filter((s) => s.day === day).sort((a, b) => toMin(a.start) - toMin(b.start))
}

/* ---------- live schedule overrides (the admin screen writes these) ----------
   ARCHITECTURE (Adam's call, 2026-07-27): the code is the DEFAULT, the cloud is
   an OVERRIDE. The app always has a working agenda from this file; Firebase only
   carries the differences. If the cloud is empty, slow or unreachable, phones
   still show a correct schedule — nothing on stage ever renders blank.

   Overrides are applied INTO the sessions array above rather than returned as a
   copy. Module imports are live bindings, so every helper here and every screen
   that already imported `sessions` sees the same truth at the same moment,
   with no refactor and no second source to keep in step. */

// Pristine times, captured once at load — the thing we reset back to.
const BASE_TIMES = new Map(sessions.map((s) => [s.id, { start: s.start, end: s.end }]))

const toHHMM = (mins) => {
  const clamped = Math.max(0, Math.min(24 * 60 - 1, mins))
  return `${String(Math.floor(clamped / 60)).padStart(2, '0')}:${String(clamped % 60).padStart(2, '0')}`
}

/**
 * Apply the live override document. Always call with the WHOLE document —
 * it recomputes from the pristine base every time, so removing an override
 * in the admin puts the original time back rather than stranding an edit.
 *
 * Shape: { delayMin, delayFrom, delayDay, sessions: { <id>: {start,end} } }
 *
 * An explicit per-session edit WINS OUTRIGHT and does not also take the
 * running-late shift — otherwise a time you typed by hand would silently drift
 * by another ten minutes, which is the kind of surprise you find on stage.
 */
export function applyScheduleOverrides(ov = {}) {
  const per = ov.sessions ?? {}
  const delay = Number(ov.delayMin) || 0
  const from = Number(ov.delayFrom) || 0
  const day = ov.delayDay ?? null

  for (const s of sessions) {
    const base = BASE_TIMES.get(s.id)
    if (!base) continue
    const explicit = per[s.id]

    if (explicit?.start && explicit?.end) {
      s.start = explicit.start
      s.end = explicit.end
      continue
    }

    s.start = base.start
    s.end = base.end

    /* Scope by END time, not start. "We're running ten minutes late" is said
       WHILE the over-running session is still on stage — so that session's end
       must move too, along with everything after it. Scoping by start would
       leave the actual late session untouched and only push the ones behind it,
       which is the opposite of what the person pressing the button means. */
    const inScope = (day === null || s.day === day) && toMin(base.end) > from
    if (delay && inScope) {
      s.start = toHHMM(toMin(base.start) + delay)
      s.end = toHHMM(toMin(base.end) + delay)
    }
  }
}

/** Original times, for the admin screen to show what it's changing from. */
export function baseTimes(id) {
  return BASE_TIMES.get(id) ?? null
}
