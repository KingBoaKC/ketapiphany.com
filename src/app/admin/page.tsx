import type { Metadata } from 'next'
import AdminPanel from '@/components/AdminPanel'

export const metadata: Metadata = {
  title: 'Admin — Ketapiphany',
}

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
          Moderation Panel
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review and approve or reject community submissions.
        </p>
      </div>
      <AdminPanel />
    </div>
  )
}
