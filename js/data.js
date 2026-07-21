// Conference content — dummy data in the exact shape the cloud brain (Firebase)
// and admin screen will fill later. 2027 = new data, same shapes.
// Sessions/speakers seeded from the REAL 2025 NC agenda (Adam, 2026-07-21),
// mapped onto the 2026 dates — placeholder until the 2026 program lands.

export const conference = {
  brandName: 'PGW ImplementAI',
  eventName: 'ImplementAI',
  year: 2026,
  tagline: 'Turning technology into results.',
  eyebrow: 'National Conference · 29 Oct · Hobart',
  dates: '29–30 October 2026',
  days: [
    { day: 1, label: 'Thu 29 Oct' },
    { day: 2, label: 'Fri 30 Oct' },
  ],
  venue: {
    name: 'Grand Chancellor Hobart',
    address: '1 Davey St, Hobart TAS 7000',
    mapUrl: 'https://maps.google.com/?q=Hotel+Grand+Chancellor+Hobart',
    parking: 'Hotel car park via Davey St — validated for attendees.',
  },
  wifi: { ssid: 'PGW-Conference', password: 'implement2026' },
  feedbackUrl: 'https://forms.office.com/placeholder',
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

export const sessions = [
  // ---- Day 1 · Thu 29 Oct (2025 shape: starts midday) ----
  { id: 'd1-reg', day: 1, start: '12:00', end: '12:30', title: 'Registration & Lunch', kind: 'BREAK', room: AT, speakerIds: [], summary: '' },
  { id: 'd1-welcome', day: 1, start: '12:30', end: '12:40', title: 'Welcome', kind: 'PLENARY', room: GB, speakerIds: [], summary: 'Opening welcome from PGW.' },
  { id: 'd1-panel-pgw', day: 1, start: '12:40', end: '13:30', title: 'Panel Discussion — PGW', kind: 'PANEL', room: GB, speakerIds: [], summary: 'PGW panel discussion.' },
  { id: 'd1-stropro', partnerId: 'stropro', day: 1, start: '13:30', end: '14:10', title: 'Maximising Opportunities with Structured Products', kind: 'PLENARY', room: GB, speakerIds: ['joseph'], summary: 'Stropro on structured product opportunities.' },
  { id: 'd1-trilogy', partnerId: 'trilogy', day: 1, start: '14:10', end: '14:50', title: "Helping Solve Australia's Housing Crisis", kind: 'PLENARY', room: GB, speakerIds: ['ott'], summary: 'Trilogy Funds Management.' },
  { id: 'd1-arvo-tea', day: 1, start: '14:50', end: '15:10', title: 'Afternoon Tea', kind: 'BREAK', room: AT, speakerIds: [], summary: '' },
  { id: 'd1-globalx', partnerId: 'globalx', day: 1, start: '15:10', end: '15:50', title: 'Riding the AI Wave: Discipline in Disruption', kind: 'PLENARY', room: GB, speakerIds: ['leung'], summary: 'Global X.' },
  { id: 'd1-panel-ai', day: 1, start: '15:50', end: '16:40', title: 'Panel Discussion — Investing in the Age of AI', kind: 'PANEL', room: GB, speakerIds: [], summary: 'Panel on investing in the age of AI.' },
  { id: 'd1-wam', partnerId: 'wam', day: 1, start: '16:40', end: '17:20', title: 'The Structural Advantages of Investing in LIC', kind: 'PLENARY', room: GB, speakerIds: ['mccathie', 'kelly'], summary: 'Wilson Asset Management.' },
  { id: 'd1-close', day: 1, start: '17:20', end: '17:30', title: 'Closing Session', kind: 'PLENARY', room: GB, speakerIds: [], summary: '' },
  {
    id: 'd1-drinks', day: 1, start: '17:30', end: '19:00', title: 'Pre-Dinner Drinks', kind: 'SOCIAL', room: 'Misono Lounge Bar', speakerIds: [],
    summary: 'Whisky lounge with 50+ varieties from around the world, including the acclaimed Nikka range. (2025 placeholder venue.)',
    venue: { name: 'Misono Lounge Bar', address: 'Level 3/158 Ferny Ave, Surfers Paradise QLD 4217', mapUrl: 'https://maps.google.com/?q=Misono+Lounge+Bar+Surfers+Paradise', dress: 'Smart casual' },
  },
  {
    id: 'd1-dinner', day: 1, start: '19:00', end: '22:00', title: 'Conference Dinner', kind: 'SOCIAL', room: 'Misono Japanese Restaurant', speakerIds: [],
    summary: 'Teppanyaki dining — live chefs, sushi bar and the outdoor whisky bar. (2025 placeholder venue.)',
    venue: { name: 'Misono Japanese Restaurant', address: 'Level 3/158 Ferny Ave, Surfers Paradise QLD 4217', mapUrl: 'https://maps.google.com/?q=Misono+Japanese+Restaurant+Surfers+Paradise', dress: 'Smart casual' },
  },

  // ---- Day 2 · Fri 30 Oct ----
  { id: 'd2-welcome', day: 2, start: '09:00', end: '09:20', title: 'Welcome', kind: 'PLENARY', room: GB, speakerIds: [], summary: '' },
  { id: 'd2-ausiex', partnerId: 'ausiex', day: 2, start: '09:20', end: '10:00', title: 'Fixed Income Market Update — How Do Bonds Fit Into Your Portfolio', kind: 'PLENARY', room: GB, speakerIds: ['brown'], summary: 'AUSIEX — 80% fixed income update, 20% equity/global markets.' },
  { id: 'd2-iextend', partnerId: 'iextend', day: 2, start: '10:00', end: '10:40', title: 'iExtend in Action', kind: 'PLENARY', room: GB, speakerIds: ['sutjipto'], summary: 'iExtend.' },
  { id: 'd2-morning-tea', day: 2, start: '10:40', end: '11:00', title: 'Morning Tea', kind: 'BREAK', room: AT, speakerIds: [], summary: '' },
  { id: 'd2-gyrostat', partnerId: 'gyrostat', day: 2, start: '11:00', end: '11:40', title: 'Portfolio Construction for Lower Risk Investors — Accumulation to Retirement', kind: 'PLENARY', room: GB, speakerIds: ['racine'], summary: 'Gyrostat.' },
  { id: 'd2-vaneck', partnerId: 'vaneck', day: 2, start: '11:40', end: '12:20', title: 'Beyond the Benchmark: Investing for the Next Era of Growth', kind: 'PLENARY', room: GB, speakerIds: ['mccormack'], summary: 'Van Eck.' },
  { id: 'd2-lunch', day: 2, start: '12:20', end: '13:00', title: 'Lunch', kind: 'BREAK', room: AT, speakerIds: [], summary: '' },
  { id: 'd2-pep', partnerId: 'pep', day: 2, start: '13:00', end: '13:40', title: 'Charting Calm Waters: Private Equity in Turbulent Markets', kind: 'PLENARY', room: GB, speakerIds: ['blanks'], summary: 'PEP.' },
  { id: 'd2-salesitv', partnerId: 'salesitv', day: 2, start: '13:40', end: '15:00', title: 'Sales Growth Blueprint', kind: 'PLENARY', room: GB, speakerIds: ['mannix'], summary: 'Better Sales Coach (SalesITV).' },
  { id: 'd2-arvo-tea', day: 2, start: '15:00', end: '15:20', title: 'Afternoon Tea', kind: 'BREAK', room: AT, speakerIds: [], summary: '' },
  { id: 'd2-bradbury', day: 2, start: '15:20', end: '16:50', title: 'Guest Speaker — Steven Bradbury', kind: 'PLENARY', room: GB, speakerIds: ['bradbury'], summary: 'Guest speaker session.' },
  { id: 'd2-close', day: 2, start: '16:50', end: '17:00', title: 'Closing Session — Partner Acknowledgement', kind: 'PLENARY', room: GB, speakerIds: [], summary: '' },
  {
    id: 'd2-awards', day: 2, start: '18:00', end: '22:30', title: 'Awards Dinner', kind: 'SOCIAL', room: 'SkyPoint, Level 78', speakerIds: [],
    summary: 'The annual adviser awards night — the conference finale. (2025 placeholder venue.)',
    venue: { name: 'SkyPoint, Level 78', address: 'Q1 Building, Level 78/9 Hamilton Ave, Surfers Paradise QLD 4217', mapUrl: 'https://maps.google.com/?q=SkyPoint+Q1+Building+Surfers+Paradise', dress: 'Cocktail' },
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
