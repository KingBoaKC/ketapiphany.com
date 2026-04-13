'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Send failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please email us directly at noodlenuggetllc@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💌</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.5rem' }}>
          Message sent
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>We&apos;ll get back to you as soon as we can.</p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.9rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.9rem',
    color: 'var(--text)',
    backgroundColor: 'var(--bg)',
    outline: 'none',
    fontFamily: 'inherit',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '2rem',
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
          Email <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
          Message <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      {error && (
        <div style={{ backgroundColor: '#fff0f3', border: '1px solid #ffccd5', borderRadius: '10px', padding: '0.75rem 1rem', color: '#c0392b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          backgroundColor: loading ? 'var(--primary-light)' : 'var(--primary)',
          color: '#fff',
          padding: '0.85rem',
          borderRadius: '999px',
          border: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
