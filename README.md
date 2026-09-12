# Moamen Gemee — Videographer

React + Vite one-pager. Dark, cinematic, mobile-first.

## Run

```bash
npm install
npm run dev      # http://localhost:5173 (also on your phone via the LAN URL)
npm run build    # → dist/
```

## Footage

15 vertical films live in `src/data/site.js` (`FILMS`). Each one ships twice:

- `public/videos/preview/<slug>.mp4` — 10s, silent, ~400 KB. Autoplays in the card.
- `public/videos/full/<slug>.mp4` — full cut with sound. Downloads only when tapped.
- `public/posters/<slug>.jpg` — still frame, paints instantly.

Originals stay in `_originals/` (gitignored, untouched). To re-encode after adding
a new source file, drop it in `_originals/` and rerun the ffmpeg lines below.

```bash
# preview
ffmpeg -i in.mp4 -t 10 -an -vf "scale='min(432,iw)':-2,fps=24"   -c:v libx264 -crf 31 -maxrate 600k -bufsize 1200k -movflags +faststart preview/out.mp4
# full
ffmpeg -i in.mp4 -vf "scale='min(540,iw)':-2" -c:v libx264 -crf 30 -maxrate 1000k   -bufsize 2000k -c:a aac -b:a 64k -ac 1 -movflags +faststart full/out.mp4
# poster
ffmpeg -ss 1 -i in.mp4 -frames:v 1 -vf "scale='min(360,iw)':-2" -q:v 5 poster.jpg
```

Change `RAIL_COUNT` in `site.js` to move the split between the swipe rail and
the grid below it.

## What's in the box
- Scroll-progress bar, auto-hiding nav, film grain + vignette overlay
- Hero with parallax background and masked line-rise type
- Infinite marquee, snap-scroll 9:16 rail with active-card tracking
- Tap-to-play lightbox for full cuts, magnetic desktop cursor
- Full `prefers-reduced-motion` fallback, 44px+ touch targets, safe-area insets

## Instagram
Linked from the nav, hero, reels header, about badge and footer —
`INSTAGRAM` in `src/data/site.js`.

## Deploy (Render)

`render.yaml` at the repo root defines the static site — Blueprint deploys pick
it up automatically. If the service was created by hand, set these in the
dashboard instead:

| Field | Value |
| --- | --- |
| Service type | **Static Site** (not Web Service) |
| Build Command | `npm ci && npm run build` |
| **Publish Directory** | `dist` |

Publish Directory takes a *folder path*, not a command. Vite writes to `dist/`.
