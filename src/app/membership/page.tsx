import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Membership — Ketapiphany',
  description: 'Join the Ketapiphany community. Membership coming soon.',
}

export default function MembershipPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">

      {/* Orb decoration */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, rgba(248,180,217,0.12) 60%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          border: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '2.75rem' }}>🌿</span>
        </div>
      </div>

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
        Coming Soon
      </span>

      <h1
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
        }}
      >
        A space for members
      </h1>

      <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1.05rem', marginBottom: '1rem' }}>
        We&apos;re building a membership community for people on the ketamine
        therapy journey. Members will be able to submit directly, connect with
        others, and participate in a deeper way.
      </p>

      <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
        Membership will be reviewed and approved individually — to keep this
        space intentional, safe, and genuinely healing.
      </p>

      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2.5rem',
        }}
      >
        <h2 style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1rem', marginBottom: '0.5rem' }}>
          Want to be notified when it opens?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Send us an email and we&apos;ll let you know as soon as the membership
          application is live.
        </p>
        <a
          href="mailto:noodlenuggetllc@gmail.com?subject=Ketapiphany Membership Interest"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.7rem 1.75rem',
            borderRadius: '999px',
            fontWeight: 500,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Express interest by email
        </a>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          href="/gallery"
          style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}
        >
          Browse the gallery
        </Link>
        <span style={{ color: 'var(--border)' }}>·</span>
        <Link
          href="/about"
          style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}
        >
          Learn more about us
        </Link>
      </div>
    </div>
  )
}
