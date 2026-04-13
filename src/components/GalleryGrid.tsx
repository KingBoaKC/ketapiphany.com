'use client'

import { useState, useEffect, useCallback } from 'react'
import { Post } from '@/lib/types'

interface GalleryGridProps {
  posts: Post[]
}

export default function GalleryGrid({ posts }: GalleryGridProps) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(() =>
    setActive((i) => (i === null ? null : (i - 1 + posts.length) % posts.length)), [posts.length])
  const next = useCallback(() =>
    setActive((i) => (i === null ? null : (i + 1) % posts.length)), [posts.length])

  useEffect(() => {
    if (active === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, prev, next])

  const activePost = active !== null ? posts[active] : null

  return (
    <>
      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
        }}
        className="gallery-grid"
      >
        {posts.map((post, i) => (
          <button
            key={post.id}
            onClick={() => setActive(i)}
            aria-label={`View ${post.title}`}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '1 / 1',
              backgroundColor: 'var(--primary-faint)',
              display: 'block',
              width: '100%',
            }}
            className="gallery-thumb"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url ?? ''}
              alt={post.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.25s ease',
              }}
              className="gallery-thumb-img"
            />
            {/* Hover overlay */}
            <div
              className="gallery-thumb-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(45,45,62,0.75) 0%, transparent 55%)',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '0.6rem',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  textAlign: 'left',
                }}
              >
                {post.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activePost && active !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15,12,25,0.96)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={close}
        >
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '999px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              ← Gallery
            </button>

            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              {active + 1} / {posts.length}
            </span>
          </div>

          {/* Image area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: 0,
              padding: '0 3.5rem',
            }}
            onClick={close}
          >
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              style={{
                position: 'absolute',
                left: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: 44,
                height: 44,
                borderRadius: '50%',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePost.image_url ?? ''}
              alt={activePost.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                display: 'block',
              }}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              style={{
                position: 'absolute',
                right: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: 44,
                height: 44,
                borderRadius: '50%',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Caption */}
          <div
            style={{
              padding: '0.85rem 1.25rem 1.25rem',
              textAlign: 'center',
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ color: '#fff', fontWeight: 500, fontSize: '1rem', marginBottom: '0.2rem' }}>
              {activePost.title}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              by {activePost.author_name}
            </p>
          </div>
        </div>
      )}

      {/* Responsive + hover styles */}
      <style>{`
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .gallery-thumb:hover .gallery-thumb-img {
          transform: scale(1.04);
        }
        .gallery-thumb:hover .gallery-thumb-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}
