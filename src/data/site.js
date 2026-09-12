// ─── EDIT EVERYTHING HERE ────────────────────────────────────────────────
// Each piece has a 10s silent preview (autoplays in the card) and the full
// cut with sound (loads only when someone taps to watch). Files live in
// public/videos/preview + public/videos/full, posters in public/posters.

export const INSTAGRAM =
  'https://www.instagram.com/moamen__videographer?stkn=dm01NjNocWJtanYy&utm_source=qr'

export const CONTACT = {
  handle: '@moamen__videographer',
  email: 'Moamen.Gemee@hotmail.com',
  location: 'Dubai, UAE'
}

export const HERO_VIDEO = { src: '/videos/hero.mp4', poster: '/posters/hero.jpg' }

const v = (slug, title, client, kind) => ({
  id: slug,
  title,
  client,
  kind,
  preview: `/videos/preview/${slug}.mp4`,
  full: `/videos/full/${slug}.mp4`,
  poster: `/posters/${slug}.jpg`
})

// Order matters — this is the order they appear on the page.
export const FILMS = [
  v('dubai-world-cup', 'Dubai World Cup', 'Event Film', 'Event'),
  v('sky-news', 'Sky News', 'Broadcast', 'Broadcast'),
  v('hudabeauty', 'Huda Beauty', 'Beauty', 'Beauty'),
  v('kiko', 'Kiko', 'Cosmetics', 'Beauty'),
  v('azizi', 'Azizi', 'Real Estate', 'Real Estate'),
  v('al-marwan', 'Al Marwan', 'Real Estate', 'Real Estate'),
  v('al-marwan-dev', 'Al Marwan Developments', 'Real Estate', 'Real Estate'),
  v('dubai', 'Dubai', 'City Film', 'Lifestyle'),
  v('city-walk-barber-shoop', 'City Walk Barber', 'Grooming', 'Brand'),
  v('barber-shoop', 'Barber Shop', 'Grooming', 'Brand'),
  v('blush', 'Blush', 'Beauty', 'Beauty'),
  v('dibs', 'Dibs', 'Beauty', 'Beauty'),
  v('makeup', 'Makeup', 'Beauty', 'Beauty'),
  v('bex', 'Bex', 'Brand', 'Brand'),
  v('bts', 'Behind The Scenes', 'On Set', 'BTS')
]

// First six ride the swipe rail up top; the rest fill the grid below.
export const RAIL_COUNT = 6

export const SERVICES = [
  { n: '01', t: 'Brand & Product', d: 'Beauty, grooming and retail films built for the first second of a scroll.' },
  { n: '02', t: 'Real Estate', d: 'Developments shot like destinations — space, light and scale.' },
  { n: '03', t: 'Events & Broadcast', d: 'Live days covered end to end and cut fast enough to still matter.' },
  { n: '04', t: 'Edit & Colour', d: 'Post on footage you already have. Cut, grade, sound, delivered.' }
]

export const CLIENTS = [
  'Dubai World Cup', 'Sky News', 'Huda Beauty', 'Kiko', 'Azizi',
  'Al Marwan', 'City Walk Barber', 'Blush', 'Dibs', 'Bex'
]

export const MARQUEE = [
  'Brand Films', 'Reels', 'Real Estate', 'Beauty',
  'Events', 'Broadcast', 'Colour', 'Edit'
]
