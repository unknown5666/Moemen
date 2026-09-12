import React from 'react'
import { usePlayWhenVisible } from '../hooks'

const FilmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M7 4.5v15M17 4.5v15M2.5 9.5h4.5M2.5 14.5h4.5M17 9.5h4.5M17 14.5h4.5" />
  </svg>
)

/**
 * Silent looping preview that only decodes while it's on screen. The poster
 * paints instantly; the video is fetched lazily. Falls back to a designed
 * placeholder frame when no src is supplied.
 */
export default function Media({ src, poster, label = 'Footage', alt }) {
  const ref = usePlayWhenVisible()

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
    <video
      ref={ref}
      src={src}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-label={alt || label}
    />
  )
}
