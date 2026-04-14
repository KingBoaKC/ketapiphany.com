import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WritingsContent from '@/components/WritingsContent'
import { Post } from '@/lib/types'
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
    content: 'There was this door. Made of light but not the blinding kind, more like morning light coming through curtains. I walked through it and there was another version of me on the other side. She looked happy. Actually happy. I started crying when I came out of the session because I realized I haven\'t felt like that in a really long time.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w2', created_at: '2026-04-11T20:15:00Z', author_name: 'Sol',
    title: 'Small Things',
    content: 'the kettle whistles\nand i think\nokay, i\'m still here\nstill soft somehow\nstill mine',
    image_url: null, post_type: 'text', category: 'poetry', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w3', created_at: '2026-04-10T11:30:00Z', author_name: 'Anonymous',
    title: 'I Forgave My Mother',
    content: 'It didn\'t happen all at once. During the second session I saw her as a little kid, maybe 7 or 8, and she was scared. I don\'t know where that image came from but I couldn\'t stay as angry after that. There\'s still stuff I\'m working through. But something in my chest loosened that I didn\'t even know was tight.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'w4', created_at: '2026-04-09T08:45:00Z', author_name: 'Elara',
    title: 'When I Was The Ocean',
    content: 'I know this sounds weird but at some point I just became the ocean. Not like a metaphor, it actually felt that way. I wasn\'t a person anymore, I was just water moving. There was nothing heavy in it. No anxiety, nothing. Just this feeling of going along with everything. I keep trying to remember what that felt like.',
    image_url: null, post_type: 'text', category: 'story', status: 'approved', moderator_notes: null,
  },
]

async function getTextPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .eq('post_type', 'text')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return DEMO_POSTS
    return data as Post[]
  } catch {
    return DEMO_POSTS
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
