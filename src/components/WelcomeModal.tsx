'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ketapiphany_agreed'

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function agree() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(45,45,62,0.55)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 24px 64px rgba(45,45,62,0.18)',
          textAlign: 'center',
        }}
      >
        {/* Logo mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Ketapiphany"
          style={{ height: 180, width: 'auto', margin: '0 auto 1.25rem', display: 'block' }}
        />

        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.6rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}
        >
          Welcome to Ketapiphany
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            marginBottom: '1.5rem',
          }}
        >
          This is a healing space for people sharing art, poetry, journals, and
          stories from their ketamine therapy journey.
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            textAlign: 'left',
          }}
        >
          {[
            'Treat all members and their experiences with kindness and respect',
            'Do not post hateful, discriminatory, or harmful content',
            'Honor the vulnerability it takes to share',
          ].map((rule) => (
            <li
              key={rule}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.9rem',
                color: 'var(--text)',
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: '0.15rem',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-faint)',
                  color: 'var(--primary)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✓
              </span>
              {rule}
            </li>
          ))}
        </ul>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          This community exists because people trust it to be safe.
          Help us keep it that way.
        </p>

        <button
          onClick={agree}
          style={{
            width: '100%',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.85rem 1.5rem',
            borderRadius: '999px',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          I understand, enter the space
        </button>
      </div>
    </div>
  )
}
