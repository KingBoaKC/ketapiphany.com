'use client'

import { Post } from '@/lib/types'
import ReportButton from '@/components/ReportButton'

const categoryColors: Record<string, string> = {
  art: 'var(--accent-pink)',
  poetry: 'var(--primary-light)',
  journal: 'var(--accent-peach)',
  story: 'var(--accent-mint)',
}

const categoryLabels: Record<string, string> = {
  art: 'Art',
  poetry: 'Poetry',
  journal: 'Journal',
  story: 'Story',
}

interface GalleryCardProps {
  post: Post
}

export default function GalleryCard({ post }: GalleryCardProps) {
  const tagColor = categoryColors[post.category] ?? 'var(--border)'
  const tagLabel = categoryLabels[post.category] ?? post.category

  return (
    <article
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="group hover:shadow-lg"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 12px 40px rgba(108,99,255,0.12)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      {post.post_type === 'image' && post.image_url && (
        <div style={{ backgroundColor: 'var(--primary-faint)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image_url}
            alt={post.title}
            style={{ width: '100%', display: 'block', maxHeight: 360, objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Text content */}
      <div className="p-5">
        {/* Category tag */}
        <span
          style={{
            backgroundColor: tagColor,
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '0.6rem',
          }}
        >
          {tagLabel}
        </span>

        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.4,
            marginBottom: '0.4rem',
          }}
        >
          {post.title}
        </h3>

        {post.content && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
            }}
          >
            {post.content}
          </p>
        )}

        <div
          style={{
            marginTop: '0.85rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            by {post.author_name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <ReportButton postId={post.id} />
          </div>
        </div>
      </div>
    </article>
  )
}
