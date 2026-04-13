import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Ketapiphany',
  description: 'Learn about Ketapiphany, a safe community gallery for sharing healing experiences from ketamine therapy.',
}

const guidelines = [
  {
    icon: '🕊️',
    title: 'Be kind',
    desc: 'This is a space of healing. Words here should uplift, not harm.',
  },
  {
    icon: '🎨',
    title: 'Share authentically',
    desc: 'Your real experience — messy, quiet, strange, or profound — is welcome.',
  },
  {
    icon: '🚫',
    title: 'No hate or violence',
    desc: 'Content that demeans, threatens, or promotes harm will not be approved.',
  },
  {
    icon: '🔒',
    title: 'Respect privacy',
    desc: 'You may share anonymously. Do not share others\' private details.',
  },
  {
    icon: '🌿',
    title: 'No explicit content',
    desc: 'Keep submissions safe for a general healing-focused audience.',
  },
  {
    icon: '✅',
    title: 'All posts are moderated',
    desc: 'Every submission is reviewed by a human before appearing in the gallery.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
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
            marginBottom: '1.25rem',
          }}
        >
          Our Story
        </span>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}
        >
          A gallery born from the inside
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Ketamine therapy opens doors that are hard to describe — to places,
          feelings, and insights that often don&apos;t fit neatly into words.
          Ketapiphany exists to hold those moments. To give them a home.
        </p>
      </div>

      {/* The origin story */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(248,180,217,0.1) 100%)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
          }}
        />
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>✨</span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Ketapiphany was itself a ketapiphany.
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1rem' }}>
          The idea for this space didn&apos;t come from a boardroom or a business plan.
          It came through — the way the most real things do — during a ketamine session.
          A moment of sudden, quiet clarity: <em style={{ color: 'var(--text)' }}>what if the things we discover in here could reach the people who need them out there?</em>
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
          That&apos;s what a ketapiphany is. An epiphany that arrives through the medicine.
          And that&apos;s what this whole place is — a ketapiphany made real, shared with you.
        </p>
      </div>

      {/* Mission */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          What is this place?
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          Ketapiphany is a community gallery — a soft, curated space where
          people in ketamine therapy can share the art, poetry, journaling,
          and stories that emerge from their sessions.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          Whether your experience was a single image, a feeling you tried to
          paint, a poem that fell out at 2am, or a journal entry you weren&apos;t
          sure anyone would understand — it belongs here.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          This is for self-care. For self-discovery. For the quiet, profound,
          sometimes unexplainable things that surface when we go inward.
        </p>
      </div>

      {/* What is ketamine therapy */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-faint), rgba(248,180,217,0.1))',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          What is ketamine therapy?
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          Ketamine-assisted therapy is a clinically supervised treatment used
          for depression, anxiety, PTSD, and other conditions. During sessions,
          patients often experience altered states of consciousness that can
          facilitate emotional processing and insight.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Many people find that these sessions unlock creativity, emotional
          release, or profound personal realizations. Ketapiphany is a place to
          honor and share those experiences.
        </p>
      </div>

      {/* Guidelines */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.75rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          Community guidelines
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Every submission is reviewed by a moderator. Here&apos;s what we look for.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {guidelines.map((g) => (
            <div
              key={g.title}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>
                {g.icon}
              </span>
              <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                {g.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/submit"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.85rem 2.25rem',
            borderRadius: '999px',
            fontWeight: 500,
            fontSize: '0.95rem',
            textDecoration: 'none',
            display: 'inline-block',
            marginRight: '1rem',
          }}
        >
          Share your experience
        </Link>
        <Link
          href="/gallery"
          style={{
            color: 'var(--primary)',
            fontWeight: 500,
            fontSize: '0.95rem',
            textDecoration: 'none',
          }}
        >
          Browse the gallery →
        </Link>
      </div>
    </div>
  )
}
