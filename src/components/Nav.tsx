'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/writings', label: 'Writings' },
  { href: '/membership', label: 'Membership' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        backgroundColor: 'rgba(253,248,246,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ketapiphany"
            style={{ height: 144, width: 'auto' }}
          />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--primary)',
            }}
          >
            Ketapiphany
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: active ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: active ? 'var(--primary-faint)' : 'transparent',
                  fontWeight: active ? 500 : 400,
                  fontSize: '0.9rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            href="/submit"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: 500,
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              marginLeft: '0.5rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Share
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span style={{ width: 22, height: 2, backgroundColor: 'var(--text)', display: 'block', borderRadius: 2 }} />
          <span style={{ width: 22, height: 2, backgroundColor: 'var(--text)', display: 'block', borderRadius: 2 }} />
          <span style={{ width: 22, height: 2, backgroundColor: 'var(--text)', display: 'block', borderRadius: 2 }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)' }}
          className="md:hidden px-6 py-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: pathname === l.href ? 'var(--primary)' : 'var(--text)',
                textDecoration: 'none',
                fontWeight: pathname === l.href ? 500 : 400,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Share Your Story
          </Link>
        </div>
      )}
    </header>
  )
}
