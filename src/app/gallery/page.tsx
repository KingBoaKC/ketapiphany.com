import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import GalleryGrid from '@/components/GalleryGrid'
import { Post } from '@/lib/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery — Ketapiphany',
  description: 'Browse artwork and images shared by the Ketapiphany community.',
}

export const revalidate = 60

const DEMO_POSTS: Post[] = [
  {
    id: 'd0', created_at: '2026-04-16T10:00:00Z', author_name: 'King Boaz',
    title: 'Eyes in the Threshold',
    content: null,
    image_url: '/gallery/eyes-in-the-threshold.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd1', created_at: '2026-04-12T14:22:00Z', author_name: 'King Boaz',
    title: 'The Dancer',
    content: null,
    image_url: '/gallery/IMG_5616.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd2', created_at: '2026-04-12T13:00:00Z', author_name: 'King Boaz',
    title: 'The Eye',
    content: null,
    image_url: '/gallery/IMG_5615.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd3', created_at: '2026-04-12T12:00:00Z', author_name: 'King Boaz',
    title: 'Seeing',
    content: null,
    image_url: '/gallery/IMG_5614.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd4', created_at: '2026-04-12T11:00:00Z', author_name: 'King Boaz',
    title: 'Language of the In-Between',
    content: null,
    image_url: '/gallery/IMG_5634.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd5', created_at: '2026-04-13T10:00:00Z', author_name: 'King Boaz',
    title: 'This Is Love',
    content: null,
    image_url: '/gallery/IMG_5632.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd6', created_at: '2026-04-13T09:00:00Z', author_name: 'King Boaz',
    title: 'Compass',
    content: null,
    image_url: '/gallery/IMG_5629.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd7', created_at: '2026-04-13T08:00:00Z', author_name: 'King Boaz',
    title: 'Expression',
    content: null,
    image_url: '/gallery/IMG_5631.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd8', created_at: '2026-04-13T07:00:00Z', author_name: 'King Boaz',
    title: 'Marks',
    content: null,
    image_url: '/gallery/IMG_5630.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'd9', created_at: '2026-04-13T06:00:00Z', author_name: 'King Boaz',
    title: 'Merkaba',
    content: null,
    image_url: '/gallery/IMG_4480.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
]

async function getImagePosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .eq('post_type', 'image')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return DEMO_POSTS
    return data as Post[]
  } catch {
    return DEMO_POSTS
  }
}

export default async function GalleryPage() {
  const posts = await getImagePosts()

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
          Art Gallery
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
          Paintings, drawings, and images from the community.
          Every piece emerged from a session of deep inner work.
        </p>
        <Link
          href="/writings"
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
          Looking for poetry & writing? →
        </Link>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            No artwork yet.{' '}
            <a href="/submit" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
              Be the first to share.
            </a>
          </p>
        </div>
      ) : (
        <GalleryGrid posts={posts} />
      )}
    </div>
  )
}
