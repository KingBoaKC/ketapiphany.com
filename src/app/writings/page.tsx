import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WritingsFilters from '@/components/WritingsFilters'
import ReportButton from '@/components/ReportButton'
import { Post, PostCategory } from '@/lib/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Writings — Ketapiphany',
  description: 'Poetry, journals, and stories shared by the Ketapiphany community.',
}

export const revalidate = 60

const DEMO_POSTS: Post[] = [
  {
    id: 'w1', created_at: '2026-04-12T10:00:00Z', author_name: 'River',
    title: 'The Door Was Made of Light',
    content: 'I saw a door made entirely of soft light — not blinding, just warm. Like sunlight through linen. I walked through and on the other side was a version of me I hadn\'t met yet. She was smiling. I think I\'ve been looking for her my whole life.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w2', created_at: '2026-04-11T20:15:00Z', author_name: 'Sol',
    title: 'Small Things',
    content: 'the kettle whistles\nand I am still here —\nstill tender,\nstill belonging\nto something\nlarger than fear.',
    image_url: null, post_type: 'text', category: 'poetry', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w3', created_at: '2026-04-10T11:30:00Z', author_name: 'Anonymous',
    title: 'I Forgave My Mother',
    content: 'Not all at once. It came in waves — first just seeing her as a child herself, scared and doing what she knew. Then something loosened in my chest I didn\'t know was there. Three sessions. A lifetime of holding.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w4', created_at: '2026-04-09T08:45:00Z', author_name: 'Elara',
    title: 'When I Was The Ocean',
    content: 'There is a story I need to tell about the day I became water. Not metaphorically — at least it didn\'t feel that way. I dissolved into something vast and there was no grief there, no weight. Just movement. I understood, briefly, what it means to be part of everything.',
    image_url: null, post_type: 'text', category: 'story', status: 'approved', moderator_notes: null,
  },
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

async function getTextPosts(category?: PostCategory): Promise<Post[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .eq('post_type', 'text')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error || !data || data.length === 0) {
      return category ? DEMO_POSTS.filter((p) => p.category === category) : DEMO_POSTS
    }
    return data as Post[]
  } catch {
    return category ? DEMO_POSTS.filter((p) => p.category === category) : DEMO_POSTS
  }
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function WritingsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const validCategories: PostCategory[] = ['poetry', 'journal', 'story']
  const activeCategory = validCategories.includes(category as PostCategory)
    ? (category as PostCategory)
    : undefined

  const posts = await getTextPosts(activeCategory)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}
        >
          Writings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
          Poetry, journals, and stories from moments of deep discovery.
        </p>
        <Link
          href="/gallery"
          style={{
            color: 'var(--primary)',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            border: '1px solid var(--border)',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            display: 'inline-block',
          }}
        >
          Looking for artwork? →
        </Link>
      </div>

      {/* Filters */}
      <WritingsFilters active={activeCategory} />

      {/* Posts */}
      {posts.length === 0 ? (
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
          {posts.map((post) => {
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
                    marginBottom: '0.85rem',
                  }}
                >
                  {tagLabel}
                </span>

                <h2
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginBottom: '1rem',
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontSize: isPoetry ? '1.05rem' : '0.95rem',
                    color: 'var(--text)',
                    lineHeight: isPoetry ? 2 : 1.8,
                    whiteSpace: 'pre-wrap',
                    fontFamily: isPoetry ? 'Georgia, serif' : 'inherit',
                    fontStyle: isPoetry ? 'italic' : 'normal',
                  }}
                >
                  {post.content}
                </p>

                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    by {post.author_name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <ReportButton postId={post.id} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
