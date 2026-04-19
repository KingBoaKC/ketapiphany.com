import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Post } from '@/lib/types'
import { ALL_DEMO_POSTS } from '@/lib/demo-posts'
import ShareButton from '@/components/ShareButton'

export async function generateStaticParams() {
  const demoIds = ALL_DEMO_POSTS.map((p) => ({ id: p.id }))
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts').select('id').eq('status', 'approved')
    if (data && data.length > 0) {
      const supabaseIds = data.map((r: { id: string }) => ({ id: r.id }))
      return [...supabaseIds, ...demoIds]
    }
  } catch { /* no Supabase at build time — use demo only */ }
  return demoIds
}

const categoryLabels: Record<string, string> = {
  art: 'Art', poetry: 'Poetry', journal: 'Journal', story: 'Story',
}
const categoryColors: Record<string, string> = {
  art: 'var(--primary-light)',
  poetry: 'var(--primary-light)',
  journal: 'var(--accent-peach)',
  story: 'var(--accent-mint)',
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .eq('status', 'approved')
      .single()
    if (!error && data) return data as Post
  } catch { /* fall through to demo */ }
  return ALL_DEMO_POSTS.find((p) => p.id === id) ?? null
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return { title: 'Not Found — Ketapiphany' }

  const ogImage = post.image_url
    ? { url: post.image_url, alt: post.title }
    : { url: '/logo.png', alt: 'Ketapiphany' }

  return {
    title: `${post.title} — Ketapiphany`,
    description: post.content
      ? post.content.slice(0, 160)
      : `${post.title} by ${post.author_name} — shared on Ketapiphany`,
    openGraph: {
      title: post.title,
      description: post.content
        ? post.content.slice(0, 160)
        : `Art by ${post.author_name}`,
      images: [ogImage],
    },
    twitter: {
      card: post.image_url ? 'summary_large_image' : 'summary',
      title: post.title,
      images: [ogImage.url],
    },
  }
}

export default async function PostPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const isPoetry = post.category === 'poetry'
  const backHref = post.post_type === 'image' ? '/gallery' : '/writings'
  const backLabel = post.post_type === 'image' ? '← Gallery' : '← Writings'

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      {/* Back link */}
      <Link
        href={backHref}
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '2rem',
        }}
      >
        {backLabel}
      </Link>

      {/* Category badge */}
      <div style={{ marginBottom: '1rem' }}>
        <span
          style={{
            backgroundColor: categoryColors[post.category] ?? 'var(--border)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.65rem',
            borderRadius: '999px',
          }}
        >
          {categoryLabels[post.category] ?? post.category}
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 400,
          color: 'var(--text)',
          lineHeight: 1.25,
          marginBottom: '0.5rem',
        }}
      >
        {post.title}
      </h1>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        by {post.author_name}
      </p>

      {/* Image post */}
      {post.post_type === 'image' && post.image_url && (
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--primary-faint)',
            marginBottom: '2rem',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image_url}
            alt={post.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      )}

      {/* Text post */}
      {post.post_type === 'text' && post.content && (
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <p
            style={{
              fontSize: isPoetry ? '1.1rem' : '1rem',
              color: 'var(--text)',
              lineHeight: isPoetry ? 2.1 : 1.85,
              whiteSpace: 'pre-wrap',
              fontFamily: isPoetry ? 'Georgia, serif' : 'inherit',
              fontStyle: isPoetry ? 'italic' : 'normal',
            }}
          >
            {post.content}
          </p>
        </div>
      )}

      {/* Footer: date + share */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </span>
        <ShareButton postId={post.id} title={post.title} />
      </div>
    </div>
  )
}
