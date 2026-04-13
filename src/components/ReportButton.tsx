'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const REASONS = [
  'Hateful or violent content',
  'Explicit or adult content',
  'Spam or self-promotion',
  'Harmful or dangerous content',
  'Other',
]

export default function ReportButton({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function submit() {
    if (!reason) return
    setLoading(true)
    try {
      const supabase = createClient()
      await supabase.from('reports').insert({ post_id: postId, reason })
    } catch {
      // Fail silently — report is best-effort in demo mode
    } finally {
      setLoading(false)
      setDone(true)
    }
  }

  function close() {
    setOpen(false)
    setDone(false)
    setReason('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Report this post"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '0.2rem 0.4rem',
          borderRadius: '6px',
          transition: 'color 0.15s, background-color 0.15s',
          opacity: 0.6,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#e53e3e'
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.backgroundColor = '#fff5f5'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)'
          e.currentTarget.style.opacity = '0.6'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        Report
      </button>

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            {done ? (
              <div className="text-center">
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>Report received</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Thank you. A moderator will review this content.
                </p>
                <button onClick={close} style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.4rem', fontSize: '1rem' }}>
                  Report this post
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Help us keep Ketapiphany safe. Select a reason and a moderator will review this content.
                </p>

                <div className="flex flex-col gap-2" style={{ marginBottom: '1.25rem' }}>
                  {REASONS.map((r) => (
                    <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: '10px', border: `1px solid ${reason === r ? 'var(--primary)' : 'var(--border)'}`, backgroundColor: reason === r ? 'var(--primary-faint)' : 'transparent', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text)', transition: 'all 0.1s ease' }}>
                      <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} style={{ accentColor: 'var(--primary)', margin: 0 }} />
                      {r}
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={close} style={{ flex: 1, padding: '0.6rem', borderRadius: '999px', border: '1px solid var(--border)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Cancel
                  </button>
                  <button onClick={submit} disabled={!reason || loading} style={{ flex: 1, padding: '0.6rem', borderRadius: '999px', border: 'none', backgroundColor: !reason ? 'var(--border)' : '#e53e3e', color: !reason ? 'var(--text-muted)' : '#fff', cursor: !reason ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                    {loading ? 'Sending…' : 'Submit Report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
