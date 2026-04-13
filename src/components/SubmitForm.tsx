'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PostCategory, PostType } from '@/lib/types'

const categories: { value: PostCategory; label: string; desc: string }[] = [
  { value: 'art', label: 'Art', desc: 'Drawings, paintings, digital art' },
  { value: 'poetry', label: 'Poetry', desc: 'Poems and verse' },
  { value: 'journal', label: 'Journal', desc: 'Personal reflections' },
  { value: 'story', label: 'Story', desc: 'Narratives and experiences' },
]

type Step = 'type' | 'category' | 'details' | 'done'

export default function SubmitForm() {
  const [step, setStep] = useState<Step>('type')
  const [postType, setPostType] = useState<PostType | null>(null)
  const [category, setCategory] = useState<PostCategory | null>(null)
  const [authorName, setAuthorName] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!postType || !category) return
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      let imageUrl: string | null = null

      if (postType === 'image' && imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('submissions')
          .upload(fileName, imageFile)

        if (uploadError) throw new Error('Image upload failed. Please try again.')

        const { data: urlData } = supabase.storage
          .from('submissions')
          .getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }

      const { error: insertError } = await supabase.from('posts').insert({
        author_name: authorName.trim() || 'Anonymous',
        title: title.trim(),
        content: postType === 'text' ? content.trim() : null,
        image_url: imageUrl,
        post_type: postType,
        category,
        status: 'pending',
      })

      if (insertError) throw new Error('Submission failed. Please try again.')
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // ── Done state ────────────────────────────────────────────────────────────
  if (step === 'done') {
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
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.75rem',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}
        >
          Thank you for sharing
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 420, margin: '0 auto 2rem' }}>
          Your submission is now waiting for review. Once approved, it will
          appear in the gallery. This usually takes 1–2 days.
        </p>
        <a
          href="/gallery"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Browse the Gallery
        </a>
      </div>
    )
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
      {/* Step: choose type */}
      {step === 'type' && (
        <div>
          <h2 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            What are you sharing?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Choose how you want to express your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {(['text', 'image'] as PostType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setPostType(t); setStep('category') }}
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  borderRadius: '14px',
                  border: `2px solid ${postType === t ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: postType === t ? 'var(--primary-faint)' : 'var(--surface)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {t === 'text' ? '✍️' : '🖼️'}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {t === 'text' ? 'Words' : 'Image'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t === 'text' ? 'Poetry, journal, story' : 'Art, photography, drawings'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: choose category */}
      {step === 'category' && (
        <div>
          <button
            onClick={() => setStep('type')}
            style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← Back
          </button>
          <h2 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            Choose a category
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            How would you describe this piece?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => { setCategory(c.value); setStep('details') }}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: `2px solid ${category === c.value ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: category === c.value ? 'var(--primary-faint)' : 'var(--surface)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>
                  {c.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: details */}
      {step === 'details' && (
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setStep('category')}
            style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← Back
          </button>

          <h2 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
            Tell us about your piece
          </h2>

          {/* Author name */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
              Your name (or leave blank to post anonymously)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Anonymous"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                fontSize: '0.9rem',
                color: 'var(--text)',
                backgroundColor: 'var(--bg)',
                outline: 'none',
              }}
            />
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
              Title <span style={{ color: 'var(--primary)' }}>*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your piece a title…"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                fontSize: '0.9rem',
                color: 'var(--text)',
                backgroundColor: 'var(--bg)',
                outline: 'none',
              }}
            />
          </div>

          {/* Text content */}
          {postType === 'text' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
                Your writing <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <textarea
                required
                rows={9}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your poem, journal entry, or story…"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  backgroundColor: 'var(--bg)',
                  lineHeight: 1.7,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          )}

          {/* Image upload */}
          {postType === 'image' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
                Upload your image <span style={{ color: 'var(--primary)' }}>*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${imagePreview ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: imagePreview ? 'var(--primary-faint)' : 'var(--bg)',
                  transition: 'all 0.15s ease',
                }}
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxHeight: 260, maxWidth: '100%', margin: '0 auto', borderRadius: 8, display: 'block' }}
                  />
                ) : (
                  <>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      Click to upload (JPG, PNG, GIF, WebP — max 10MB)
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null) }}
                  style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Remove image
                </button>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: '#fff0f3',
                border: '1px solid #ffccd5',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#c0392b',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
              }}
            >
              {error}
            </div>
          )}

          {/* Guidelines note */}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            By submitting, you confirm this is your original work and follows our{' '}
            <a href="/about" style={{ color: 'var(--primary)' }}>community guidelines</a>.
            All posts are moderated before appearing in the gallery.
          </p>

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
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Submitting…' : 'Submit for Review'}
          </button>
        </form>
      )}
    </div>
  )
}
