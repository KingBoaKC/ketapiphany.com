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
    id: 'd1', created_at: '2025-03-10T14:22:00Z', author_name: 'River',
    title: 'The Door Was Made of Light',
    content: 'I saw a door made entirely of soft light — not blinding, just warm. Like sunlight through linen. I walked through and on the other side was a version of me I hadn\'t met yet. She was smiling. I think I\'ve been looking for her my whole life.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd2', created_at: '2025-03-08T09:00:00Z', author_name: 'Maeve',
    title: 'Untitled (violet)',
    content: null,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd3', created_at: '2025-03-07T20:15:00Z', author_name: 'Sol',
    title: 'Small Things',
    content: 'the kettle whistles\nand I am still here —\nstill tender,\nstill belonging\nto something\nlarger than fear.',
    image_url: null, post_type: 'text', category: 'poetry', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd4', created_at: '2025-03-05T11:30:00Z', author_name: 'Anonymous',
    title: 'I Forgave My Mother',
    content: 'Not all at once. It came in waves — first just seeing her as a child herself, scared and doing what she knew. Then something loosened in my chest I didn\'t know was there. Three sessions. A lifetime of holding.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd5', created_at: '2025-03-03T16:00:00Z', author_name: 'Thea',
    title: 'Watercolor Study No. 3',
    content: null,
    image_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd6', created_at: '2025-02-28T08:45:00Z', author_name: 'Elara',
    title: 'When I Was The Ocean',
    content: 'There is a story I need to tell about the day I became water. Not metaphorically — at least it didn\'t feel that way. I dissolved into something vast and there was no grief there, no weight. Just movement. I understood, briefly, what it means to be part of everything.',
    image_url: null, post_type: 'text', category: 'story', status: 'approved', moderator_notes: null,
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
