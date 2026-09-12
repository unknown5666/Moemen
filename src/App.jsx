import React, { useEffect, useRef, useState, useCallback } from 'react'
import Media from './components/Media'
import Lightbox from './components/Lightbox'
import { useReveal, useScrollDriver, reduced } from './hooks'
import {
  INSTAGRAM, CONTACT, HERO_VIDEO, FILMS, RAIL_COUNT, SERVICES, CLIENTS, MARQUEE
} from './data/site'

/* ───────────────────────── icons ───────────────────────── */
const Ig = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)
const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const Play = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

/* ───────────────────────── desktop cursor ───────────────────────── */
function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (reduced() || window.matchMedia('(hover: none)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf
    const move = (e) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      document.body.dataset.hot = e.target.closest('a,button,.card') ? '1' : '0'
    }
    addEventListener('mousemove', move, { passive: true })
    addEventListener('mouseover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      removeEventListener('mousemove', move)
      removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor cursor--ring" ref={ring} aria-hidden="true" />
      <div className="cursor" ref={dot} aria-hidden="true" />
    </>
  )
}

/* ───────────────────────── nav ───────────────────────── */
function Nav() {
  const el = useRef(null)
  const last = useRef(0)

  useScrollDriver((y) => {
    const n = el.current
    if (!n) return
    n.dataset.solid = y > 40 ? 'true' : 'false'
    n.dataset.hidden = y > 320 && y > last.current ? 'true' : 'false'
    last.current = y
  })

  return (
    <nav className="nav" ref={el} data-solid="false" data-hidden="false">
      <a className="nav__mark" href="#top" aria-label="Moamen Gemee — home">
        MOAMEN<span>.</span>GEMEE
      </a>
      <div className="nav__links">
        <a href="#reels">Reels</a>
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
      </div>
      <a className="pill" href={INSTAGRAM} target="_blank" rel="noreferrer">
        <span className="dot" /> Booking
      </a>
    </nav>
  )
}

/* ───────────────────────── hero ───────────────────────── */
function Hero() {
  const bg = useRef(null)

  useScrollDriver((y) => {
    if (!bg.current || reduced()) return
    if (y < innerHeight * 1.2) {
      bg.current.style.transform = `translate3d(0,${y * 0.28}px,0) scale(1.12)`
    }
  })

  return (
    <header className="hero" id="top">
      <div className="hero__bg">
        <div ref={bg} style={{ position: 'absolute', inset: 0, transform: 'scale(1.12)' }}>
          <video src={HERO_VIDEO.src} poster={HERO_VIDEO.poster}
                 muted loop playsInline autoPlay preload="auto" aria-hidden="true" />
        </div>
      </div>

      <h1 className="hero__title">
        <span className="ln"><span>Moamen</span></span>
        <span className="ln"><span className="accent">Gemee</span></span>
      </h1>

      <div className="hero__sub">
        <span>Videographer</span><i className="sep" />
        <span>Editor</span><i className="sep" />
        <span>{CONTACT.location}</span>
      </div>

      <div className="hero__cta">
        <a className="btn btn--ember" href="#reels">Watch the work <Play /></a>
        <a className="btn btn--ghost" href={INSTAGRAM} target="_blank" rel="noreferrer">
          <Ig /> {CONTACT.handle}
        </a>
      </div>

      <a className="scrollcue" href="#reels" aria-label="Scroll to the reels">
        <span>Scroll</span><i />
      </a>
    </header>
  )
}

/* ───────────────────────── marquee ───────────────────────── */
const Marquee = () => {
  const row = (
    <div className="marquee__item" aria-hidden="true">
      {MARQUEE.map((m, i) => (
        <React.Fragment key={i}>{m}<b>✦</b></React.Fragment>
      ))}
    </div>
  )
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">{row}{row}</div>
    </div>
  )
}

/* ───────────────────────── one film card ───────────────────────── */
function Card({ film, i, onOpen, className = '' }) {
  return (
    <button
      className={`card ${className}`}
      onClick={() => onOpen(film)}
      aria-label={`Play ${film.title} — full film`}
    >
      <Media src={film.preview} poster={film.poster} label={film.title} alt={film.title} />
      <span className="card__veil" />
      <span className="card__idx">{String(i + 1).padStart(2, '0')}</span>
      <span className="card__kind">{film.kind}</span>
      <span className="card__play"><Play /></span>
      <span className="card__meta">
        <strong>{film.title}</strong>
        <em>{film.client}</em>
      </span>
    </button>
  )
}

/* ───────────────────────── swipe rail ───────────────────────── */
function Rail({ films, onOpen }) {
  const rail = useRef(null)
  const [active, setActive] = useState(0)

  const measure = useCallback(() => {
    const r = rail.current
    if (!r) return
    const mid = r.scrollLeft + r.clientWidth / 2
    let best = 0, bestD = Infinity
    Array.from(r.children).forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
      if (d < bestD) { bestD = d; best = i }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const r = rail.current
    if (!r) return
    let t = false
    const h = () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; measure() }) } }
    r.addEventListener('scroll', h, { passive: true })
    measure()
    return () => r.removeEventListener('scroll', h)
  }, [measure])

  return (
    <>
      <div className="rail" ref={rail}>
        {films.map((f, i) => (
          <Card key={f.id} film={f} i={i} onOpen={onOpen}
                className={'rv card--rail' + (i === active ? ' is-active' : '')} />
        ))}
      </div>
      <div className="raildots" aria-hidden="true">
        {films.map((f, i) => <i key={f.id} className={i === active ? 'on' : ''} />)}
      </div>
    </>
  )
}

/* ───────────────────────── sections ───────────────────────── */
const Services = () => (
  <section id="services" aria-labelledby="svc-h">
    <p className="eyebrow rv">What I do</p>
    <h2 className="h rv" data-d="1" id="svc-h">Pick your <em>poison</em></h2>
    <div className="svc">
      {SERVICES.map((s, i) => (
        <div className="svc__row rv" key={s.n} data-d={String(Math.min(i, 4))}>
          <span className="svc__n">{s.n}</span>
          <h3 className="svc__t">{s.t}</h3>
          <p className="svc__d">{s.d}</p>
        </div>
      ))}
    </div>

    <div className="clients rv">
      <p className="eyebrow" style={{ margin: '0 0 14px' }}>Worked with</p>
      <ul>{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  </section>
)

const About = () => (
  <section id="about" aria-labelledby="about-h">
    <div className="about">
      <div className="about__portrait rv">
        <Media label="Portrait" alt="Moamen Gemee on set" />
        <span className="about__badge"><Ig /> {CONTACT.handle}</span>
      </div>
      <div>
        <p className="eyebrow rv">The guy behind it</p>
        <h2 className="h rv" data-d="1" id="about-h">Moamen <em>Gemee</em></h2>
        <p className="lede rv" data-d="2">
          I shoot the version of a moment you remember — not the one that actually happened.
        </p>
        <p className="rv" data-d="2">
          Beauty campaigns, real-estate launches, race days and broadcast work — shot and cut
          for screens people hold in one hand. I run it end to end: concept, camera, edit and
          colour, so nothing gets lost in the handover.
        </p>
        <p className="rv" data-d="3">
          Based in Dubai, packed and ready for wherever the job is.
        </p>
        <div className="kit rv" data-d="3">
          <span>Sony FX</span><span>Primes</span><span>Gimbal</span>
          <span>FPV</span><span>DaVinci</span><span>Premiere</span>
        </div>
      </div>
    </div>
  </section>
)

const Contact = () => (
  <section className="contact" id="contact" aria-labelledby="contact-h">
    <p className="eyebrow rv" style={{ justifyContent: 'center' }}>Next one is yours</p>
    <h2 className="contact__big rv" data-d="1" id="contact-h">Let's<br /><em>roll</em></h2>
    <a className="contact__mail rv" data-d="2" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
    <div className="contact__row rv" data-d="3">
      <a className="btn btn--ember" href={INSTAGRAM} target="_blank" rel="noreferrer">
        <Ig /> DM on Instagram
      </a>
      <a className="btn btn--ghost" href={`mailto:${CONTACT.email}`}>
        Start a project <Arrow />
      </a>
    </div>
  </section>
)

/* ───────────────────────── app ───────────────────────── */
export default function App() {
  const bar = useRef(null)
  const [open, setOpen] = useState(null)
  useReveal()

  useScrollDriver((y) => {
    if (!bar.current) return
    const max = document.documentElement.scrollHeight - innerHeight
    bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  })

  const rail = FILMS.slice(0, RAIL_COUNT)
  const grid = FILMS.slice(RAIL_COUNT)

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />

        <section className="reels" id="reels" aria-labelledby="reels-h">
          <div className="reels__head">
            <div>
              <p className="eyebrow rv">Selected · swipe</p>
              <h2 className="h rv" id="reels-h" data-d="1">Thumb<br /><em>stoppers</em></h2>
            </div>
            <a className="pill rv" data-d="2" href={INSTAGRAM} target="_blank" rel="noreferrer">
              <Ig /> More on IG
            </a>
          </div>
          <Rail films={rail} onOpen={setOpen} />
        </section>

        <section id="work" aria-labelledby="work-h">
          <p className="eyebrow rv">The rest of it</p>
          <h2 className="h rv" data-d="1" id="work-h">Frames that <em>stay</em></h2>
          <div className="grid">
            {grid.map((f, i) => (
              <Card key={f.id} film={f} i={i + RAIL_COUNT} onOpen={setOpen}
                    className="rv" />
            ))}
          </div>
        </section>

        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Moamen Gemee</span>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">{CONTACT.handle}</a>
        <a href="#top">Back to top ↑</a>
      </footer>

      {open && <Lightbox film={open} onClose={() => setOpen(null)} />}
    </>
  )
}
