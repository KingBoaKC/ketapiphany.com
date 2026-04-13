import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
      }}
      className="mt-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--primary)',
            }}
          >
            Ketapiphany
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            A space for healing, art, and discovery.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: '/', label: 'Home' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/about', label: 'About' },
            { href: '/submit', label: 'Share' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Ketapiphany. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
