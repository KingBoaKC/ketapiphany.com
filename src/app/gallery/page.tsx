import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import GalleryGrid from '@/components/GalleryGrid'
import { Post } from '@/lib/types'
import { DEMO_IMAGE_POSTS } from '@/lib/demo-posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery — Ketapiphany',
  description: 'Browse artwork and images shared by the Ketapiphany community.',
}

export const revalidate = 60


async function getImagePosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .eq('post_type', 'image')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return DEMO_IMAGE_POSTS
    return data as Post[]
  } catch {
    return DEMO_IMAGE_POSTS
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
