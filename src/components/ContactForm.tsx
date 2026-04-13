'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const subject = encodeURIComponent(`Message from ${name || 'Ketapiphany visitor'}`)
  const body = encodeURIComponent(`Name: ${name || 'Not provided'}\nEmail: ${email}\n\n${message}`)
  const mailtoHref = `mailto:noodlenuggetllc@gmail.com?subject=${subject}&body=${body}`

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
    <div
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
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
          Message
        </label>
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      <a
        href={mailtoHref}
        style={{
          display: 'block',
          width: '100%',
          backgroundColor: 'var(--primary)',
          color: '#fff',
          padding: '0.85rem',
          borderRadius: '999px',
          fontWeight: 600,
          fontSize: '0.95rem',
          textDecoration: 'none',
          textAlign: 'center',
        }}
      >
        Send Message
      </a>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', marginTop: '0.75rem' }}>
        This will open your email app with the message pre-filled.
      </p>
    </div>
  )
}
