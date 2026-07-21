// Conference content — dummy data in the exact shape the cloud brain (Firebase)
// and admin screen will fill later. 2027 = new data, same shapes.

export const conference = {
  brandName: 'PGW ImplementAI',
  eventName: 'ImplementAI',
  year: 2026,
  tagline: 'Turning technology into results.',
  eyebrow: 'National Conference · 29 Oct · Hobart',
  dates: '29–30 October 2026',
  venue: {
    name: 'Grand Chancellor Hobart',
    address: '1 Davey St, Hobart TAS 7000',
    mapUrl: 'https://maps.google.com/?q=Hotel+Grand+Chancellor+Hobart',
    parking: 'Hotel car park via Davey St — validated for attendees.',
  },
  wifi: { ssid: 'PGW-Conference', password: 'implement2026' },
  feedbackUrl: 'https://forms.office.com/placeholder',
  speakerCount: 18,
}

export const speakers = [
  {
    id: 'lindqvist',
    name: 'Dr. Sarah Lindqvist',
    title: 'AI Strategy Lead',
    org: 'Placeholder Institute',
    bio: 'Placeholder bio — content pours in via the admin.',
  },
  {
    id: 'chen',
    name: 'Marcus Chen',
    title: 'Head of Advice Technology',
    org: 'Placeholder Group',
    bio: 'Placeholder bio.',
  },
  {
    id: 'okafor',
    name: 'Amara Okafor',
    title: 'Compliance & AI Practice',
    org: 'Placeholder Legal',
    bio: 'Placeholder bio.',
  },
]

export const sessions = [
  {
    id: 's1',
    day: 1,
    start: '09:00',
    end: '09:45',
    title: 'Welcome — The Year Ahead',
    kind: 'PLENARY',
    room: 'Grand Ballroom',
    speakerIds: ['chen'],
    summary: 'Opening address and the shape of the two days.',
  },
  {
    id: 's2',
    day: 1,
    start: '10:00',
    end: '10:45',
    title: 'Keynote — The AI-Advised Practice',
    kind: 'PLENARY',
    room: 'Grand Ballroom',
    speakerIds: ['lindqvist'],
    summary: 'What an AI-augmented advice practice actually looks like in 2026.',
  },
  {
    id: 's3',
    day: 1,
    start: '11:00',
    end: '12:00',
    title: 'Workshop — Automating the Back Office',
    kind: 'WORKSHOP',
    room: 'Harbour Room',
    speakerIds: ['chen'],
    summary: 'Hands-on: where the hours actually go, and what AI takes off the desk.',
  },
  {
    id: 's4',
    day: 1,
    start: '12:00',
    end: '13:00',
    title: 'Lunch',
    kind: 'BREAK',
    room: 'Atrium',
    speakerIds: [],
    summary: '',
  },
  {
    id: 's5',
    day: 1,
    start: '13:00',
    end: '14:00',
    title: 'Panel — AI, Compliance and the Licensee',
    kind: 'PANEL',
    room: 'Grand Ballroom',
    speakerIds: ['okafor', 'lindqvist'],
    summary: 'Where the regulator stands, and where the line actually is.',
  },
  {
    id: 's6',
    day: 1,
    start: '14:15',
    end: '15:15',
    title: 'Workshop — Prompting for Advisers',
    kind: 'WORKSHOP',
    room: 'Harbour Room',
    speakerIds: ['lindqvist'],
    summary: 'Practical prompting patterns for advice work.',
  },
  {
    id: 'e1',
    day: 1,
    start: '18:30',
    end: '22:00',
    title: 'Welcome Dinner',
    kind: 'SOCIAL',
    room: 'The Glass House',
    speakerIds: [],
    summary: 'Conference welcome dinner — all attendees.',
    venue: {
      name: 'The Glass House',
      address: 'Brooke Street Pier, Hobart TAS 7000',
      mapUrl: 'https://maps.google.com/?q=The+Glass+House+Brooke+Street+Pier+Hobart',
      dress: 'Smart casual',
    },
  },
  {
    id: 's7',
    day: 2,
    start: '09:30',
    end: '10:30',
    title: 'Case Studies — Practices That Shipped',
    kind: 'PLENARY',
    room: 'Grand Ballroom',
    speakerIds: ['chen', 'okafor'],
    summary: 'Real PGW practices, real tools, real results.',
  },
]

/** Next social event (dinner etc) for the "Tonight" tile. */
export function nextSocial() {
  return sessions.find((s) => s.kind === 'SOCIAL')
}

/** Sessions after the given wall-clock minute, day 1, in order. */
export function upcomingAfter(nowMin, limit = 3) {
  const toMin = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  return sessions
    .filter((s) => s.day === 1 && s.kind !== 'BREAK' && toMin(s.start) > nowMin)
    .slice(0, limit)
}

export const materials = [
  {
    id: 'm1',
    sessionId: 's2',
    label: 'Keynote deck — The AI-Advised Practice',
    type: 'deck',
    url: '#',
  },
  {
    id: 'm2',
    sessionId: 's3',
    label: 'Back-office automation worksheet',
    type: 'handout',
    url: '#',
  },
]

export function speakerById(id) {
  return speakers.find((s) => s.id === id)
}
