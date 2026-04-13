'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { PostCategory } from '@/lib/types'

const filters: { label: string; value: PostCategory | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Poetry', value: 'poetry' },
  { label: 'Journal', value: 'journal' },
  { label: 'Story', value: 'story' },
]

const categoryAccents: Record<string, string> = {
  poetry: 'var(--primary-light)',
  journal: 'var(--accent-peach)',
  story: 'var(--accent-mint)',
}

export default function WritingsFilters({ active }: { active?: PostCategory }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleFilter(value?: PostCategory) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {filters.map((f) => {
        const isActive = active === f.value || (!active && !f.value)
        const accentColor = f.value ? categoryAccents[f.value] : 'var(--primary)'

        return (
          <button
            key={f.label}
            onClick={() => handleFilter(f.value)}
            style={{
              backgroundColor: isActive ? accentColor : 'var(--surface)',
              color: isActive ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${isActive ? accentColor : 'var(--border)'}`,
              padding: '0.4rem 1.1rem',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
