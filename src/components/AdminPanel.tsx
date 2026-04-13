'use client'

import { useState, useEffect, useCallback } from 'react'
import { Post, PostStatus } from '@/lib/types'

const categoryColors: Record<string, string> = {
  art: '#f8b4d9',
  poetry: '#9d97ff',
  journal: '#ffd8b4',
  story: '#b4f0e0',
}

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [token, setToken] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [activeTab, setActiveTab] = useState<PostStatus>('pending')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchPosts = useCallback(async (status: PostStatus, tok: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin?status=${status}`, {
        headers: { 'x-admin-token': tok },
      })
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      setPosts(data.posts ?? [])
    } catch {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchPosts(activeTab, token)
  }, [authed, activeTab, token, fetchPosts])

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    setActionLoading(id)
    try {
      await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ id, status, moderator_notes: notes[id] ?? null }),
      })
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  // Login gate
  if (!authed) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: '0 auto',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
        <h2 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '1.5rem' }}>Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          onKeyDown={(e) => {
            if (e.key === 'Enter') { setToken(password); setAuthed(true) }
          }}
          style={{
            width: '100%',
            padding: '0.65rem 0.9rem',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            outline: 'none',
          }}
        />
        <button
          onClick={() => { setToken(password); setAuthed(true) }}
          style={{
            width: '100%',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: '999px',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Enter
        </button>
      </div>
    )
  }

  const tabs: { label: string; value: PostStatus }[] = [
    { label: 'Pending Review', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              border: `1px solid ${activeTab === t.value ? 'var(--primary)' : 'var(--border)'}`,
              backgroundColor: activeTab === t.value ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === t.value ? '#fff' : 'var(--text-muted)',
              fontWeight: activeTab === t.value ? 600 : 400,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading…
        </div>
      )}

      {!loading && error && (
        <div style={{ color: '#c0392b', padding: '1rem', textAlign: 'center' }}>{error}</div>
      )}

      {!loading && posts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
          }}
        >
          No {activeTab} submissions.
        </div>
      )}

      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '1.5rem',
            }}
          >
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <span
                  style={{
                    backgroundColor: categoryColors[post.category] ?? 'var(--border)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    marginRight: '0.5rem',
                  }}
                >
                  {post.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {post.post_type}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>

            <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              by {post.author_name}
            </p>

            {/* Content preview */}
            {post.content && (
              <p
                style={{
                  backgroundColor: 'var(--bg)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  marginBottom: '0.75rem',
                  maxHeight: 180,
                  overflow: 'auto',
                }}
              >
                {post.content}
              </p>
            )}

            {post.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image_url}
                alt={post.title}
                style={{ maxHeight: 260, maxWidth: '100%', borderRadius: 10, marginBottom: '0.75rem' }}
              />
            )}

            {/* Moderator notes */}
            {activeTab === 'pending' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                  Moderator note (optional)
                </label>
                <input
                  type="text"
                  value={notes[post.id] ?? ''}
                  onChange={(e) => setNotes((n) => ({ ...n, [post.id]: e.target.value }))}
                  placeholder="Internal note…"
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    backgroundColor: 'var(--bg)',
                  }}
                />
              </div>
            )}

            {/* Actions */}
            {activeTab === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(post.id, 'approved')}
                  disabled={actionLoading === post.id}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleAction(post.id, 'rejected')}
                  disabled={actionLoading === post.id}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            )}

            {activeTab !== 'pending' && post.moderator_notes && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Note: {post.moderator_notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
