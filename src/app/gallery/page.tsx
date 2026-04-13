import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import GalleryCard from '@/components/GalleryCard'
import GalleryFilters from '@/components/GalleryFilters'
import { Post, PostCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Gallery — Ketapiphany',
  description: 'Browse art, poetry, journals, and stories shared by the Ketapiphany community.',
}

export const revalidate = 60

const DEMO_POSTS: Post[] = [
  {
    id: 'd1', created_at: '2026-04-12T14:22:00Z', author_name: 'Anonymous',
    title: 'The Dancer',
    content: null,
    image_url: '/gallery/IMG_5616.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd2', created_at: '2026-04-12T13:00:00Z', author_name: 'Anonymous',
    title: 'The Eye',
    content: null,
    image_url: '/gallery/IMG_5615.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd3', created_at: '2026-04-12T12:00:00Z', author_name: 'Anonymous',
    title: 'Seeing',
    content: null,
    image_url: '/gallery/IMG_5614.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
]

async function getPosts(category?: PostCategory): Promise<Post[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
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

export default async function GalleryPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const validCategories: PostCategory[] = ['art', 'poetry', 'journal', 'story']
  const activeCategory = validCategories.includes(category as PostCategory)
    ? (category as PostCategory)
    : undefined

  const posts = await getPosts(activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
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
          The Gallery
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
          Art, poetry, journals, and stories from the community.
          Every piece is a moment of discovery.
        </p>
      </div>

      {/* Filters */}
      <GalleryFilters active={activeCategory} />

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            No posts in this category yet.{' '}
            <a href="/submit" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
              Be the first to share.
            </a>
          </p>
        </div>
      ) : (
        <div
          style={{
            columnCount: 'auto' as unknown as number,
            columnWidth: '280px',
            columnGap: '1.25rem',
          }}
        >
          {posts.map((post) => (
            <div key={post.id} style={{ breakInside: 'avoid', marginBottom: '1.25rem' }}>
              <GalleryCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
