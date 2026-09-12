import { useEffect, useRef, useState } from 'react'

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Adds .in to every .rv element once it enters the viewport. One observer, whole page. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    if (reduced()) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

/** Single rAF-throttled scroll loop shared by progress bar, nav and parallax. */
export function useScrollDriver(onScroll) {
  const cb = useRef(onScroll)
  cb.current = onScroll
  useEffect(() => {
    let ticking = false
    const run = () => {
      ticking = false
      cb.current(window.scrollY || 0)
    }
    const onS = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(run)
      }
    }
    onS()
    window.addEventListener('scroll', onS, { passive: true })
    window.addEventListener('resize', onS, { passive: true })
    return () => {
      window.removeEventListener('scroll', onS)
      window.removeEventListener('resize', onS)
    }
  }, [])
}

/** Counts 0 → target when the element first becomes visible. */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      setN(target)
      return
    }
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration)
          const eased = 1 - Math.pow(1 - p, 4)
          setN(Math.round(target * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])
  return [n, ref]
}

/** Plays a video only while it's on screen — keeps phones cool and scrolling smooth. */
export function usePlayWhenVisible() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const p = el.play()
          if (p && p.catch) p.catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
