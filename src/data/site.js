// ─── EDIT EVERYTHING HERE ────────────────────────────────────────────────
// Drop video files in /public/videos and poster images in /public/posters,
// then just point `src` / `poster` at them. Anything left null renders a
// styled placeholder, so the site never looks broken while you're loading up.

export const INSTAGRAM =
  'https://www.instagram.com/moamen__videographer?stkn=dm01NjNocWJtanYy&utm_source=qr'

export const CONTACT = {
  handle: '@moamen__videographer',
  email: 'Moamen.Gemee@hotmail.com',
  whatsapp: '', // e.g. 'https://wa.me/201234567890'
  location: 'Cairo, EG · shooting worldwide'
}

// Full-bleed hero background loop (muted, autoplay). 6–10s, 1080p, <3MB.
export const HERO_VIDEO = {
  src: null, // '/videos/hero.mp4'
  poster: null // '/posters/hero.jpg'
}

// Vertical 9:16 reels — the thumb-scroll rail. Add as many as you like.
export const REELS = [
  { id: 'r1', title: 'Neon Nights', client: 'Aura Studio', src: null, poster: null },
  { id: 'r2', title: 'Golden Hour', client: 'Sahara Coffee', src: null, poster: null },
  { id: 'r3', title: 'Concrete Bloom', client: 'Form Athletics', src: null, poster: null },
  { id: 'r4', title: 'Salt & Smoke', client: 'Nour Kitchen', src: null, poster: null },
  { id: 'r5', title: 'After Dark', client: 'Ritual Club', src: null, poster: null }
]

// Landscape 16:9 case-study films.
export const WORK = [
  {
    id: 'w1',
    title: 'Midnight Motion',
    kind: 'Brand Film',
    year: '2025',
    role: 'Director · DP · Edit',
    blurb: 'A 90-second night run through the city, cut to a heartbeat.',
    src: null,
    poster: null
  },
  {
    id: 'w2',
    title: 'The Quiet Craft',
    kind: 'Documentary',
    year: '2025',
    role: 'DP · Colour',
    blurb: 'Hands, steam and patience. Shot handheld on a 35mm prime.',
    src: null,
    poster: null
  },
  {
    id: 'w3',
    title: 'Run The Block',
    kind: 'Commercial',
    year: '2024',
    role: 'Director · Edit',
    blurb: 'Six locations, one take feel. Speed ramps doing the talking.',
    src: null,
    poster: null
  },
  {
    id: 'w4',
    title: 'Bride On Film',
    kind: 'Wedding',
    year: '2024',
    role: 'DP · Edit',
    blurb: 'No posing. Just the room, the light and the people in it.',
    src: null,
    poster: null
  }
]

export const SERVICES = [
  { n: '01', t: 'Brand Films', d: 'Story-led films that make a brand feel like a place you want to be.' },
  { n: '02', t: 'Social Reels', d: 'Vertical-native edits built for the first 1.5 seconds.' },
  { n: '03', t: 'Commercials', d: 'Concept, board, shoot, grade — delivered end to end.' },
  { n: '04', t: 'Events & Weddings', d: 'Documentary eye, cinematic finish, zero awkward posing.' }
]

export const STATS = [
  { v: 240, suffix: '+', l: 'Projects delivered' },
  { v: 18, suffix: 'M', l: 'Views on client work' },
  { v: 7, suffix: 'yrs', l: 'Behind the lens' },
  { v: 60, suffix: '+', l: 'Brands & creators' }
]

export const MARQUEE = [
  'Brand Films', 'Reels', 'Commercials', 'Music Videos',
  'Weddings', 'Colour Grading', 'Aerials', 'Docu'
]
