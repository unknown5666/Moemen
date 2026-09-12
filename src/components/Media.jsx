import React, { useState } from 'react'
import { usePlayWhenVisible } from '../hooks'

const FilmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M7 4.5v15M17 4.5v15M2.5 9.5h4.5M2.5 14.5h4.5M17 9.5h4.5M17 14.5h4.5" />
  </svg>
)

/**
 * Poster <img> always paints; the muted loop fades in on top once it actually
 * starts playing. Deliberately NOT relying on the video's own `poster`
 * attribute — iOS Safari refuses to draw it while preload is "none", and if
 * autoplay is blocked (Low Power Mode, Data Saver) you'd be left with a black
 * box. This way the still is always visible and the video is pure upgrade.
 */
export default function Media({ src, poster, label = 'Footage', alt, eager = false }) {
  const ref = usePlayWhenVisible()
  const [playing, setPlaying] = useState(false)

  if (!src) {
    return (
      <div className="ph" role="img" aria-label={alt || `${label} — placeholder`}>
        <span className="ph__label">
          <FilmIcon />
          {label}
        </span>
      </div>
    )
  }

  return (
    <>
      {poster && (
        <img
          className="media__poster"
          src={poster}
          alt={alt || label}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : 'auto'}
        />
      )}
      <video
        ref={ref}
        className={'media__vid' + (playing ? ' is-ready' : '')}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
      />
    </>
  )
}
