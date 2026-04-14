import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Post } from '@/lib/types'

const DEMO_IMAGE_POSTS: Post[] = [
  {
    id: 'demo-1', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'The Dancer', content: null,
    image_url: '/gallery/IMG_5616.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-2', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'The Eye', content: null,
    image_url: '/gallery/IMG_5615.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-3', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Seeing', content: null,
    image_url: '/gallery/IMG_5614.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-4', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Language of the In-Between', content: null,
    image_url: '/gallery/IMG_5634.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-5', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'This Is Love', content: null,
    image_url: '/gallery/IMG_5632.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-6', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Compass', content: null,
    image_url: '/gallery/IMG_5629.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-7', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Expression', content: null,
    image_url: '/gallery/IMG_5631.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-8', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Marks', content: null,
    image_url: '/gallery/IMG_5630.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-9', created_at: new Date().toISOString(), author_name: 'King Boaz',
    title: 'Merkaba', content: null,
    image_url: '/gallery/IMG_4480.png',
    post_type: 'image', category: 'art', status: 'approved', moderator_notes: null,
  },
]

const DEMO_TEXT_POSTS: Post[] = [
  {
    id: 'demo-t1', created_at: new Date().toISOString(), author_name: 'River',
    title: 'The Door Was Made of Light',
    content: 'There was this door. Made of light but not the blinding kind, more like morning light coming through curtains. I walked through it and there was another version of me. She looked actually happy. I started crying when I came out of the session.',
    image_url: null, post_type: 'text', category: 'journal', status: 'approved', moderator_notes: null,
  },
  {
    id: 'demo-t2', created_at: new Date().toISOString(), author_name: 'Sol',
    title: 'Small Things',
    content: 'the kettle whistles\nand i think\nokay, i\'m still here\nstill soft somehow\nstill mine',
    image_url: null, post_type: 'text', category: 'poetry', status: 'approved', moderator_notes: null,
  },
]

async function getRecentImagePosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts').select('*')
      .eq('status', 'approved').eq('post_type', 'image')
      .order('created_at', { ascending: false }).limit(3)
    if (error || !data || data.length === 0) return DEMO_IMAGE_POSTS
    return data as Post[]
  } catch { return DEMO_IMAGE_POSTS }
}

async function getRecentTextPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts').select('*')
      .eq('status', 'approved').eq('post_type', 'text')
      .order('created_at', { ascending: false }).limit(2)
    if (error || !data || data.length === 0) return DEMO_TEXT_POSTS
    return data as Post[]
  } catch { return DEMO_TEXT_POSTS }
}

const categoryLabels: Record<string, string> = {
  poetry: 'Poetry', journal: 'Journal', story: 'Story',
}
const categoryColors: Record<string, string> = {
  poetry: 'var(--primary-light)', journal: 'var(--accent-peach)', story: 'var(--accent-mint)',
}

export default async function HomePage() {
  const [imagePosts, textPosts] = await Promise.all([
    getRecentImagePosts(),
    getRecentTextPosts(),
  ])

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute" style={{ width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)', top: '-120px', right: '-80px' }} />
          <div className="orb-2 absolute" style={{ width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,180,217,0.22) 0%, transparent 70%)', bottom: '60px', left: '-60px' }} />
          <div className="orb-3 absolute" style={{ width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,240,224,0.25) 0%, transparent 70%)', top: '40%', left: '45%' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="fade-up">
            <span style={{ display: 'inline-block', backgroundColor: 'var(--primary-faint)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: '999px', marginBottom: '1.5rem' }}>
              A Community Gallery
            </span>
          </div>

          <h1 className="fade-up-delay-1" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1.5rem' }}>
            Where healing{' '}
            <span style={{ color: 'var(--primary)' }}>becomes</span>
            <br />something beautiful.
          </h1>

          <p className="fade-up-delay-2" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 2.5rem' }}>
            Ketapiphany is a space for art, poetry, journals, and stories
            discovered during ketamine therapy. Share your epiphany. Find
            yourself in someone else&apos;s words.
          </p>

          <div className="fade-up-delay-3 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/gallery" style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}>
              Art Gallery
            </Link>
            <Link href="/writings" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block', border: '1px solid var(--border)' }}>
              Writings
            </Link>
            <Link href="/submit" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block', border: '1px solid var(--border)' }}>
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Art */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
              Recent Art
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Paintings, drawings, and images from the community
            </p>
          </div>
          <Link href="/gallery" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {imagePosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href="/gallery"
              style={{
                display: 'block',
                aspectRatio: '1 / 1',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: 'var(--primary-faint)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_url ?? ''}
                alt={post.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: '6rem', margin: '0 auto 4rem', height: 2, background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />

      {/* Recent Writings */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
              Recent Writings
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Poetry, journals, and stories
            </p>
          </div>
          <Link href="/writings" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {textPosts.map((post) => {
            const tagColor = categoryColors[post.category] ?? 'var(--border)'
            const tagLabel = categoryLabels[post.category] ?? post.category
            const isPoetry = post.category === 'poetry'
            return (
              <article key={post.id} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem 1.75rem' }}>
                <span style={{ backgroundColor: tagColor, color: '#fff', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '999px', display: 'inline-block', marginBottom: '0.75rem' }}>
                  {tagLabel}
                </span>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.6rem' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: isPoetry ? '1rem' : '0.9rem', color: 'var(--text)', lineHeight: isPoetry ? 2 : 1.75, whiteSpace: 'pre-wrap', fontFamily: isPoetry ? 'Georgia, serif' : 'inherit', fontStyle: isPoetry ? 'italic' : 'normal', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  by {post.author_name}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-faint) 0%, rgba(248,180,217,0.15) 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: 'var(--text)', marginBottom: '1rem' }}>
            Have something to share?
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
            Your experience — however quiet or strange — might be exactly what
            someone else needs to hear. All submissions are reviewed before
            going live to keep this a safe, gentle space.
          </p>
          <Link href="/submit" style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '0.85rem 2.25rem', borderRadius: '999px', fontWeight: 500, fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>
            Submit to the Gallery
          </Link>
        </div>
      </section>
    </>
  )
}
