import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import GalleryCard from '@/components/GalleryCard'
import { Post } from '@/lib/types'

const DEMO_POSTS: Post[] = [
  {
    id: 'demo-1',
    created_at: new Date().toISOString(),
    author_name: 'River',
    title: 'The Door Was Made of Light',
    content:
      'I saw a door made entirely of soft light — not blinding, just warm. Like sunlight through linen. I walked through and on the other side was a version of me I hadn\'t met yet. She was smiling. I think I\'ve been looking for her my whole life.',
    image_url: null,
    post_type: 'text',
    category: 'journal',
    status: 'approved',
    moderator_notes: null,
  },
  {
    id: 'demo-2',
    created_at: new Date().toISOString(),
    author_name: 'Maeve',
    title: 'Untitled (violet)',
    content: null,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    post_type: 'image',
    category: 'art',
    status: 'approved',
    moderator_notes: null,
  },
  {
    id: 'demo-3',
    created_at: new Date().toISOString(),
    author_name: 'Sol',
    title: 'Small Things',
    content:
      'the kettle whistles\nand I am still here —\nstill tender,\nstill belonging\nto something\nlarger than fear.',
    image_url: null,
    post_type: 'text',
    category: 'poetry',
    status: 'approved',
    moderator_notes: null,
  },
]

async function getRecentPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error || !data || data.length === 0) return DEMO_POSTS
    return data as Post[]
  } catch {
    return DEMO_POSTS
  }
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts()

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Background orbs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="orb-1 absolute"
            style={{
              width: 480,
              height: 480,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)',
              top: '-120px',
              right: '-80px',
            }}
          />
          <div
            className="orb-2 absolute"
            style={{
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(248,180,217,0.22) 0%, transparent 70%)',
              bottom: '60px',
              left: '-60px',
            }}
          />
          <div
            className="orb-3 absolute"
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(180,240,224,0.25) 0%, transparent 70%)',
              top: '40%',
              left: '45%',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="fade-up">
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--primary-faint)',
                color: 'var(--primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.35rem 1rem',
                borderRadius: '999px',
                marginBottom: '1.5rem',
              }}
            >
              A Community Gallery
            </span>
          </div>

          <h1
            className="fade-up-delay-1"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            Where healing{' '}
            <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>becomes</em>
            <br />
            something beautiful.
          </h1>

          <p
            className="fade-up-delay-2"
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '0 auto 2.5rem',
            }}
          >
            Ketapiphany is a gallery for art, poetry, journals, and stories
            discovered during ketamine therapy. Share your epiphany. Find
            yourself in someone else&apos;s words.
          </p>

          <div className="fade-up-delay-3 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/gallery"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#fff',
                padding: '0.8rem 2rem',
                borderRadius: '999px',
                fontWeight: 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.15s',
              }}
            >
              Explore the Gallery
            </Link>
            <Link
              href="/submit"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                padding: '0.8rem 2rem',
                borderRadius: '999px',
                fontWeight: 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-block',
                border: '1px solid var(--border)',
                transition: 'background-color 0.15s',
              }}
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Recent pieces */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'Georgia, serif' }}>
              Recent from the gallery
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Moments of insight shared by our community
            </p>
          </div>
          <Link
            href="/gallery"
            style={{
              color: 'var(--primary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            View all →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {recentPosts.map((post) => (
            <GalleryCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--primary-faint) 0%, rgba(248,180,217,0.15) 100%)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
        className="py-20"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            Have something to share?
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
            Your experience — however quiet or strange — might be exactly what
            someone else needs to hear. All submissions are reviewed before
            going live to keep this a safe, gentle space.
          </p>
          <Link
            href="/submit"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              padding: '0.85rem 2.25rem',
              borderRadius: '999px',
              fontWeight: 500,
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Submit to the Gallery
          </Link>
        </div>
      </section>
    </>
  )
}
