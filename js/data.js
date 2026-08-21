// Conference content — the shape the cloud brain (Firebase) and admin screen
// fill at run time. 2027 = new data, same shapes.
//
// SESSIONS: the real 2026 program, transcribed from PGW's working agenda
// 'Partner Speaking Allocation v3' (Adam, 2026-08-21). Times and partner
// allocations confirmed; topics, panels, keynote speakers and adviser
// spotlights are not yet supplied and are NOT invented here.
//
// SPEAKERS and PARTNERS below are still the 2025 line-up and are STALE:
// 7 of the 11 partners listed are not returning in 2026, and the 14 speakers
// belong to partners who are not coming. No 2026 session points at either —
// sessions carry their presenting organisation in `org` instead — but the
// Speakers and Partners tabs still render this old data. They need their own
// pass once PGW supply names, blurbs and logos.

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
export const speakers = [
  { id: 'ross', name: 'Benjamin Ross', title: 'National Operations Manager', org: 'PGW Financial Services', bio: 'Responsible Manager of PGW Financial Services for 10 years. An economics graduate of the University of Adelaide with experience across stockbroking, trade settlements, financial advising and licensee compliance, Ben works with advisers to integrate compliant practices and practice growth within PGW.', photo: 'img/speakers/ross.png', linkedin: '#', email: 'b.ross@example.com', phone: '0400 000 000' },
  { id: 'joseph', name: 'Anto Joseph', title: 'CEO & Founder', org: 'Stropro', bio: 'Founder of Stropro, the multi-award-winning alternative investments platform — $1.6bn+ arranged across 600+ strategies for 100+ advisers. Previously spent a decade in private wealth at Citi, including Vice President of Citi Partnerships and Senior Private Banker to high-net-worth clients across Asia and Australia.', photo: 'img/speakers/joseph.png', linkedin: '#', email: 'a.joseph@example.com', phone: '0400 000 001' },
  { id: 'ott', name: 'Nicole Ott', title: 'National Manager — Dealer Groups & Platforms', org: 'Trilogy Funds', bio: "Leads Trilogy Funds' engagement with dealer groups, independent advisers and platforms nationally. Active in the adviser community: FAAA Brisbane Metro Community Committee, Future2 Foundation National Grants Committee, and formerly Education Chair of the AFA Queensland State Committee.", photo: 'img/speakers/ott.png', linkedin: '#', email: 'n.ott@example.com', phone: '0400 000 002' },
  { id: 'leung', name: 'Billy Leung', title: 'Senior Investment Strategist', org: 'Global X ETFs', bio: 'Joined Global X in 2024, leading investment research and technology-sector ETF analysis. Previously an equity analyst at Optiver and Director of Equity Research for China Internet at Haitong International in Hong Kong, ranked a top regional analyst by Asiamoney. BCom (Melbourne), CPA Australia.', photo: 'img/speakers/leung.png', linkedin: '#', email: 'b.leung@example.com', phone: '0400 000 003' },
  { id: 'stodart', name: 'Charles Stodart', title: 'Investment Specialist', org: 'Zurich', bio: "With Zurich since 2015 and 20+ years in financial services, providing investment commentary and support to advisers on Zurich's managed funds. Prior roles across Five Oceans, Pengana's Asian Equities Fund, Perennial and Murray Johnstone. CFA and CAIA charterholder.", photo: 'img/speakers/stodart.png', linkedin: '#', email: 'c.stodart@example.com', phone: '0400 000 004' },
  { id: 'mccathie', name: 'Martyn McCathie', title: 'Investment Specialist', org: 'Wilson Asset Management', bio: 'Provides investment insights and manages relationships with brokers, planners, research houses and platforms at WAM. 20+ years across domestic and international financial services, and a member of the Investment Committee for Future Generation Australia (FGX) and Future Generation Global (FGG) since inception.', photo: 'img/speakers/mccathie.png', linkedin: '#', email: 'm.mccathie@example.com', phone: '0400 000 005' },
  { id: 'kelly', name: 'Nick Kelly', title: 'Portfolio Manager, WAM Alternative Assets', org: 'Wilson Asset Management', bio: 'Joined WAM in 2025 with 20+ years in investment. Previously 12 years at Willis Towers Watson in Sydney as Asia-Pacific Head of Private Markets, and before that eight years in risk advisory at PwC.', photo: 'img/speakers/kelly.png', linkedin: '#', email: 'n.kelly@example.com', phone: '0400 000 006' },
  { id: 'brown', name: 'Philip Brown', title: 'Head of Research', org: 'FIIG Securities (for AUSIEX)', bio: 'Head of Research at FIIG Securities since late 2023, with 20 years in bank research teams. Formerly Senior Fixed Income Strategist at CBA, part of the team awarded best government-bond research by KangaNews five years running. Also worked at Citigroup and Deutsche Bank; degree in statistics.', photo: 'img/speakers/brown.png', linkedin: '#', email: 'p.brown@example.com', phone: '0400 000 007' },
  { id: 'sutjipto', name: 'David Sutjipto', title: 'National Business Development Specialist', org: 'iExtend', bio: 'Drives adviser engagement and business growth at iExtend. 21+ years in financial services across life insurance, adviser engagement and retention strategy, including national sales and retention leadership at AMP and Resolution Life.', photo: 'img/speakers/sutjipto.png', linkedin: '#', email: 'd.sutjipto@example.com', phone: '0400 000 008' },
  { id: 'racine', name: 'Craig Racine', title: 'Founder', org: 'Gyrostat Capital Management', bio: 'Founder of Gyrostat Capital Management, with senior executive experience across Australia and Hong Kong in asset management, private equity, investment banking and equity research — including Executive Director roles at the Asian Infrastructure Trust, ADB, Soros Funds Management and AMP Capital, and MD & Head of Sector Research at ING Barings (Asia).', photo: 'img/speakers/racine.png', linkedin: '#', email: 'c.racine@example.com', phone: '0400 000 009' },
  { id: 'mccormack', name: 'Cameron McCormack', title: 'Senior Portfolio Manager', org: 'VanEck', bio: 'Leads investment performance analytics at VanEck and is responsible for trade execution across equity and fixed income ETFs. Previously at Pacific Life Re Australia in pricing and client solutions. BCom (UNSW, Actuarial Studies & Finance), Associate of the Society of Actuaries.', photo: 'img/speakers/mccormack.png', linkedin: '#', email: 'c.mccormack@example.com', phone: '0400 000 010' },
  { id: 'blanks', name: 'Cameron Blanks', title: 'Managing Director', org: 'Pacific Equity Partners', bio: 'Managing Director at PEP, with the firm since 2002. Previously three years at Bain & Company across Australia and North America, and seven years in mining and construction. MBA (MIT Sloan), Master of Engineering and Bachelor of Engineering with First Class Honours (UniSA).', photo: 'img/speakers/blanks.png', linkedin: '#', email: 'c.blanks@example.com', phone: '0400 000 011' },
  { id: 'mannix', name: 'Dean Mannix', title: 'Founder & CEO', org: 'SalesITV / Better Sales Coach', bio: 'A world-leading authority on sales growth and mindset with 25+ years across 25+ countries — clients include Goldman Sachs, Morgan Stanley, Macquarie, CBA and UBS. Best-selling author and doctoral candidate researching sales coaching; holds a Law degree and Executive MBA.', photo: 'img/speakers/mannix.png', linkedin: '#', email: 'd.mannix@example.com', phone: '0400 000 012' },
  { id: 'bradbury', name: 'Steven Bradbury', title: 'OAM — Olympic Champion & Motivational Speaker', org: 'Guest Speaker', bio: "Australia's most recognised Olympic underdog story and a sought-after keynote speaker — 1,350+ conferences across 21 countries over 15 years, translating elite speed-skating discipline into strategies for business success. Success often comes to those who stay in the race when others fall away.", photo: 'img/speakers/bradbury.png', linkedin: '#', email: 's.bradbury@example.com', phone: '0400 000 013' },
]

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

   ⚠️ `partnerId` is set ONLY for the four partners returning from 2025, whose
   records below are still accurate. The eleven new partners have no record yet
   — no blurb, no logo — so linking them would render a broken tile. */
export const sessions = [
  // ---- Day 1 · Thu 29 Oct · 9:00am to 5:00pm ----
  { id: 'd1-welcome', day: 1, start: '09:00', end: '09:15', title: 'Welcome & housekeeping', kind: 'PLENARY', room: GB, org: 'PGW', speakerIds: [], summary: 'Opening welcome from PGW.' },
  { id: 'd1-keynote-open', day: 1, start: '09:15', end: '10:05', title: 'Opening Keynote', kind: 'KEYNOTE', room: GB, org: '', speakerIds: [], summary: 'Guest speaker to be announced.' },
  { id: 'd1-mst', day: 1, start: '10:05', end: '10:50', title: 'MST Financial', kind: 'KEYNOTE', room: GB, org: 'MST Financial', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-morning-tea', day: 1, start: '10:50', end: '11:20', title: 'Morning tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-pep', partnerId: 'pep', day: 1, start: '11:20', end: '11:40', title: 'Pacific Equity Partners', kind: 'PLENARY', room: GB, org: 'Pacific Equity Partners', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-openmarkets', day: 1, start: '11:40', end: '12:00', title: 'Open Markets', kind: 'PLENARY', room: GB, org: 'Open Markets', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-spotlight', day: 1, start: '12:00', end: '12:10', title: 'Adviser Spotlight', kind: 'SPOTLIGHT', room: GB, org: '', speakerIds: [], summary: 'Adviser to be announced.' },
  { id: 'd1-gyrostat', partnerId: 'gyrostat', day: 1, start: '12:10', end: '12:55', title: 'Gyrostat', kind: 'PLENARY', room: GB, org: 'Gyrostat', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-lunch', day: 1, start: '12:55', end: '13:45', title: 'Lunch', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-panel-1', day: 1, start: '13:45', end: '14:20', title: 'Panel Discussion', kind: 'PANEL', room: GB, org: 'PGW', speakerIds: [], summary: 'Panel and topic to be announced.' },
  { id: 'd1-wam', partnerId: 'wam', day: 1, start: '14:20', end: '14:40', title: 'Wilson Asset Management', kind: 'PLENARY', room: GB, org: 'Wilson Asset Management', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-paradino', day: 1, start: '14:40', end: '15:25', title: 'Paradino', kind: 'PLENARY', room: GB, org: 'Paradino', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd1-arvo-tea', day: 1, start: '15:25', end: '15:55', title: 'Afternoon tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd1-panel-2', day: 1, start: '15:55', end: '16:30', title: 'Panel Discussion', kind: 'PANEL', room: GB, org: '', speakerIds: [], summary: 'Panel and topic to be announced.' },
  { id: 'd1-centuria', day: 1, start: '16:30', end: '16:50', title: 'Centuria', kind: 'PLENARY', room: GB, org: 'Centuria', speakerIds: [], summary: 'Topic to be announced.' },
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
  { id: 'd2-macquarie', day: 2, start: '09:10', end: '09:30', title: 'Macquarie', kind: 'PLENARY', room: GB, org: 'Macquarie', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-pep', partnerId: 'pep', day: 2, start: '09:30', end: '10:15', title: 'Pacific Equity Partners', kind: 'PLENARY', room: GB, org: 'Pacific Equity Partners', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-tal', day: 2, start: '10:15', end: '10:35', title: 'TAL', kind: 'PLENARY', room: GB, org: 'TAL', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-morning-tea', day: 2, start: '10:35', end: '11:05', title: 'Morning tea', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd2-afic', day: 2, start: '11:05', end: '11:50', title: 'AFIC', kind: 'PLENARY', room: GB, org: 'AFIC', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-millbrook', day: 2, start: '11:50', end: '12:10', title: 'Millbrook Group', kind: 'PLENARY', room: GB, org: 'Millbrook Group', speakerIds: [], summary: 'Topic to be announced.' },
  { id: 'd2-spotlight', day: 2, start: '12:10', end: '12:20', title: 'Adviser Spotlight', kind: 'SPOTLIGHT', room: GB, org: '', speakerIds: [], summary: 'Adviser to be announced.' },
  { id: 'd2-lunch', day: 2, start: '12:20', end: '13:10', title: 'Lunch', kind: 'BREAK', room: AT, org: '', speakerIds: [], summary: '' },
  { id: 'd2-hub24', day: 2, start: '13:10', end: '13:55', title: 'HUB24', kind: 'PLENARY', room: GB, org: 'HUB24', speakerIds: [], summary: 'Topic to be announced.' },
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

// Educational partners — booklet order = order of importance (PEP top billing).
// Blurbs condensed from the 2025 booklet; themeFit = how they connect to this year's theme.
export const partners = [
  {
    id: 'pep', name: 'Pacific Equity Partners', logo: 'img/partners/pep.png',
    tagline: "Navigating Markets with Australia's Private Equity Leader",
    positioning: 'Your Gateway into Private Markets.',
    blurb: "Australia's largest private equity firm — 27 years, $17 billion under management, 28% Net IRR across economic environments. PEP Gateway, their fund-of-funds, gives advisers' wholesale clients access to world-class PE firms including Bain Capital, Nordic Capital and Veritas, with $50,000 minimums and availability on Netwealth and Hub24.",
    themeFit: 'Institutional-grade private markets, made accessible through platform technology — private equity as a practical adviser tool, not an institutional privilege.',
  },
  {
    id: 'ausiex', name: 'AUSIEX', logo: 'img/partners/ausiex.png',
    tagline: 'Turning Market Volatility into Strategic Advantages',
    positioning: 'From volatility to opportunity, seamlessly.',
    blurb: '25+ years serving Australian advisers; a comprehensive trading and investment platform supporting 4,600+ advisers and 475,000 investors. Backed by Nomura Research Institute, with proprietary trading intelligence and — via the FIIG acquisition — Australia\'s most extensive fixed income platform.',
    themeFit: 'Proprietary market-data intelligence turned into adviser insight — technology reading the market so advisers can act on it.',
  },
  {
    id: 'globalx', name: 'Global X', logo: 'img/partners/globalx.png',
    tagline: 'Beyond Ordinary: Harnessing Structural Growth Through Market Cycles',
    positioning: 'Smart beta leadership, active-like results.',
    blurb: 'Over $9 billion in Australia ($632 billion globally) through intelligently designed ETF strategies — thematic megatrends, covered-call income, Australia\'s largest commodity suite and a pioneering bitcoin ETF. Their dynamic GXDW strategy rotates across themes using proprietary momentum indicators.',
    themeFit: 'ETFs engineered around AI infrastructure, defence tech and semiconductors — investing in the technology transformation the conference is about.',
  },
  {
    id: 'gyrostat', name: 'Gyrostat', logo: 'img/partners/gyrostat.png',
    tagline: 'Turning Uncertainty into Opportunity with Dynamic Protection',
    positioning: 'Harnessing volatility for peace of mind.',
    blurb: 'Risk-managed equity funds with a 14-year track record: proprietary dynamic hedging that has never exceeded 3% quarterly downside (Class A) while delivering genuine non-correlation to the ASX 200. Available on Hub24, Netwealth and Mason Stevens with SQM 4-star rating.',
    themeFit: 'Proprietary hedging technology that identifies volatility pricing anomalies — an algorithmic answer to sequencing risk in retirement portfolios.',
  },
  {
    id: 'iextend', name: 'iExtend', logo: 'img/partners/iextend.png',
    tagline: 'Transforming Policy Cancellation into Client Retention',
    positioning: 'Maintaining coverage when clients need it most.',
    blurb: 'When clients face cancelling life insurance, iExtend steps in to co-own policies — assuming premiums on the co-owned portion and sharing claim proceeds. One in four policies assessed is ultimately retained fully. QuickCalc gives advisers 24/7 pre-assessment with auditable trails.',
    themeFit: 'A digital-first model (QuickCalc, data-driven assessment) that turns a hard client conversation into a technology-enabled retention strategy.',
  },
  {
    id: 'stropro', name: 'Stropro', logo: 'img/partners/stropro.png',
    tagline: 'Institutional Alternatives Democratised for Navigating Every Market Cycle',
    positioning: 'Turning market cycles into defined returns.',
    blurb: 'Structured products platform — $1.6bn+ deployed since 2019 across 10 global investment banks (Morgan Stanley, Citi, BNP Paribas, Barclays and more), serving 50+ advisory firms. AI-assisted product screening, multi-bank price tendering and Australia\'s first multi-issuer Protected Equity Loan.',
    themeFit: 'AI-assisted product screening on the Investment Desk — literally the conference theme applied to structured investments.',
  },
  {
    id: 'trilogy', name: 'Trilogy Funds', logo: 'img/partners/trilogy.png',
    tagline: 'Battle-Tested Resilience Through 25+ Years of Market Cycles',
    positioning: 'Stability through volatility, growth through cycles.',
    blurb: 'Quarter-century property and mortgage fund manager — $3.4 billion for 5,300+ investors. The flagship Monthly Income Trust has held its $1.00 unit price for 18 years through GFC, COVID and rate cycles. Diversified across residential, commercial, industrial, childcare and NDIS.',
    themeFit: 'Real-time market intelligence from operating as both lender and fund manager — dual-perspective data advisers can use.',
  },
  {
    id: 'vaneck', name: 'VanEck', logo: 'img/partners/vaneck.png',
    tagline: 'Smart Beta Leadership for All-Season Performance',
    positioning: 'Enhancing Your Financial Portfolio.',
    blurb: "70 years of global heritage, $23 billion in Australia across 45+ ETFs. Flagship QUAL ETF has delivered 15.19% p.a. since 2014; the suite spans covered calls, thematic AI-infrastructure and defence ETFs, a pioneering bitcoin ETF and the ALFA long-short ETF.",
    themeFit: '"Intelligently designed investment strategies" — systematic, rules-based investing that shows what disciplined technology does across full market cycles.',
  },
  {
    id: 'wam', name: 'Wilson Asset Management', logo: 'img/partners/wam.png',
    tagline: 'Catalyst-Driven Excellence Through a Quarter-Century of Market Cycles',
    positioning: 'Time in the market, not timing the market.',
    blurb: "From Geoff Wilson's $20m in 1999 to a $6 billion platform serving 130,000+ retail investors through nine Listed Investment Companies. Catalyst-driven investing backed by 4,000+ company meetings a year; 2025's WAM Income Maximiser is Australia's first monthly franked-dividend LIC structure.",
    themeFit: 'Research at industrial scale — thousands of company meetings distilled into catalyst identification before the broader market moves.',
  },
  {
    id: 'zurich', name: 'Zurich', logo: 'img/partners/zurich.png',
    tagline: '100 years of Australian heritage, global strength',
    positioning: 'A century of protection, continuously modernised.',
    blurb: 'Dual brands Zurich and OnePath serve 1.5 million life-insurance customers, with a fortress 256% Swiss Solvency ratio. The all-in-one Adviser Portal gives single sign-on access to both product suites, real-time Portfolio Insights analytics and intelligent quoting.',
    themeFit: 'AI-enhanced underwriting streamlining mental-health applications — a live example of AI making advice outcomes faster and fairer.',
  },
  {
    id: 'salesitv', name: 'SalesITV / Dean Mannix', logo: 'img/partners/salesitv.png',
    tagline: 'World-class sales training, accessible to all advisers',
    positioning: 'Better People… Better Sales.',
    blurb: "Australia's largest single-source sales and service training library — 125+ video sessions on a mobile cloud platform, built by Dean Mannix over 25 years and trusted by Goldman Sachs, Westpac, CBA, Macquarie and BT. The Sales ROI Methodology gives advisers replicable, ethical frameworks.",
    themeFit: 'Cloud-delivered, on-demand coaching — practice-growth capability that lives on the same phone this app does.',
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
   ⬜ NOT BUILT YET. Until it is, this page shows placeholder numbers, so it is
   NOT fit to put in front of an attendee. Blocker for shipping to-do 5.

   Real numbers live at ~/.house-keys/pgw-nc-contacts.json — outside every
   repo, never ferried.

   The 0400 000 0XX shape is deliberate: it matches the dummy-phone convention
   already used for speakers further up this file, and it is obviously fake at
   a glance, so nobody mistakes a placeholder for a number that will dial. */
export const crewContacts = [
  { id: 'ross', name: 'Ben Ross', phone: '0400 000 020' },
  { id: 'gould', name: 'Tracey Gould', phone: '0400 000 021' },
  { id: 'griffin', name: 'Alex Griffin', phone: '0400 000 022' },
  { id: 'shin', name: 'Johnny Shin', phone: '0400 000 023' },
  { id: 'graham', name: 'Adam Graham', phone: '0400 000 024' },
]

export const materials = [
  { id: 'm1', sessionId: 'd1-stropro', label: 'Deck — Maximising Opportunities with Structured Products', type: 'deck', url: '#' },
  { id: 'm2', sessionId: 'd2-gyrostat', label: 'Handout — Portfolio Construction for Lower Risk Investors', type: 'handout', url: '#' },
]

export function speakerById(id) {
  return speakers.find((s) => s.id === id)
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
