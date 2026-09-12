import React, { useEffect, useRef } from 'react'

/** Full cut with sound. Only mounted — so only downloaded — once someone taps a card. */
export default function Lightbox({ film, onClose }) {
  const vid = useRef(null)
  const close = useRef(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    close.current?.focus()

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)

    const p = vid.current?.play()
    if (p && p.catch) p.catch(() => {})

    return () => {
      document.body.style.overflow = prev
      removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${film.title} — full film`}
         onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <button className="lb__x" onClick={onClose} ref={close} aria-label="Close video">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <figure className="lb__stage">
        <video
          ref={vid}
          src={film.full}
          poster={film.poster}
          controls
          playsInline
          loop
          preload="auto"
        />
        <figcaption>
          <strong>{film.title}</strong>
          <span>{film.client}</span>
        </figcaption>
      </figure>
    </div>
  )
}
