import type { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Share Your Story — Ketapiphany',
  description: 'Submit your art, poetry, journal entry, or story to the Ketapiphany gallery.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
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
          Share
        </span>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2.25rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}
        >
          Add to the gallery
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
          Share a piece of art, a poem, a journal entry, or a story from your
          journey. All submissions are reviewed before going live.
        </p>
      </div>

      <SubmitForm />
    </div>
  )
}
