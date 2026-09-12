# Moamen Gemee — Videographer

React + Vite one-pager. Dark, cinematic, mobile-first.

## Run

```bash
npm install
npm run dev      # http://localhost:5173 (also on your phone via the LAN URL)
npm run build    # → dist/
```

## Adding your real footage

Everything editable lives in **`src/data/site.js`**. Nothing else needs touching.

1. Drop files into `public/videos/` and poster stills into `public/posters/`.
2. Point at them:

```js
export const HERO_VIDEO = { src: '/videos/hero.mp4', poster: '/posters/hero.jpg' }

export const REELS = [
  { id: 'r1', title: 'Neon Nights', client: 'Aura Studio',
    src: '/videos/neon.mp4', poster: '/posters/neon.jpg' },
  ...
]
```

Any entry left as `src: null` renders the animated placeholder frame, so the site
never looks broken while you're mid-upload.

### Video specs that keep it fast
- **Hero**: 1080p, 6–10s, no audio, **under 3 MB** (`-crf 28`, H.264 mp4).
- **Reels**: 720×1280, under 4 MB each.
- **Films**: 1280×720 preview loops; link the full cut out if you want.

```bash
ffmpeg -i in.mov -an -vf scale=-2:1080 -c:v libx264 -crf 28 -movflags +faststart out.mp4
```

Videos only play while on screen (IntersectionObserver), so a phone never decodes
more than one or two at once.

## What's in the box
- Scroll-progress bar, auto-hiding nav, film grain + vignette overlay
- Hero with parallax background and masked line-rise type
- Infinite marquee, snap-scroll 9:16 reel rail with active-card tracking
- Parallax case-study frames, animated count-up stats, magnetic desktop cursor
- Full `prefers-reduced-motion` fallback, 44px+ touch targets, safe-area insets

## Instagram
Linked from the nav, hero, reels header, about badge and footer —
`INSTAGRAM` in `src/data/site.js`.
