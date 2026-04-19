import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WritingsContent from '@/components/WritingsContent'
import { Post } from '@/lib/types'
import { DEMO_TEXT_POSTS } from '@/lib/demo-posts'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Writings — Ketapiphany',
  description: 'Poetry, journals, and stories shared by the Ketapiphany community.',
}

export const revalidate = 60


async function getTextPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .eq('post_type', 'text')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return DEMO_TEXT_POSTS
    return data as Post[]
  } catch {
    return DEMO_TEXT_POSTS
  }
}

export default async function WritingsPage() {
  const posts = await getTextPosts()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
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

      <WritingsContent posts={posts} />
    </div>
  )
}
