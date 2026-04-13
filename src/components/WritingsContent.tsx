'use client'

import { useState } from 'react'
import { Post, PostCategory } from '@/lib/types'
import ReportButton from '@/components/ReportButton'

const filters: { label: string; value: PostCategory | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Journal', value: 'journal' },
  { label: 'Story', value: 'story' },
]

const categoryColors: Record<string, string> = {
  poetry: 'var(--primary-light)',
  journal: 'var(--accent-peach)',
  story: 'var(--accent-mint)',
}

const categoryLabels: Record<string, string> = {
  poetry: 'Poetry',
  journal: 'Journal',
  story: 'Story',
}

export default function WritingsContent({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<PostCategory | undefined>(undefined)

  const filtered = active ? posts.filter((p) => p.category === active) : posts

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((f) => {
          const isActive = active === f.value
          const accentColors: Record<string, string> = {
            poetry: 'var(--primary-light)',
            journal: 'var(--accent-peach)',
            story: 'var(--accent-mint)',
          }
          const accentColor = f.value ? accentColors[f.value] : 'var(--primary)'

          return (
            <button
              key={f.label}
              onClick={() => setActive(f.value)}
              style={{
                backgroundColor: isActive ? accentColor : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${isActive ? accentColor : 'var(--border)'}`,
                padding: '0.4rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Nothing here yet.{' '}
            <a href="/submit" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
              Be the first to share.
            </a>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map((post) => {
            const tagColor = categoryColors[post.category] ?? 'var(--border)'
            const tagLabel = categoryLabels[post.category] ?? post.category
            const isPoetry = post.category === 'poetry'

            return (
              <article
                key={post.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem 2rem',
                }}
              >
                <span style={{ backgroundColor: tagColor, color: '#fff', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '999px', display: 'inline-block', marginBottom: '0.85rem' }}>
                  {tagLabel}
                </span>

                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: isPoetry ? '1.05rem' : '0.95rem', color: 'var(--text)', lineHeight: isPoetry ? 2 : 1.8, whiteSpace: 'pre-wrap', fontFamily: isPoetry ? 'Georgia, serif' : 'inherit' }}>
                  {post.content}
                </p>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    by {post.author_name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <ReportButton postId={post.id} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}
