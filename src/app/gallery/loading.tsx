export default function GalleryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="skeleton h-10 w-48 mx-auto rounded-lg mb-4" />
        <div className="skeleton h-5 w-80 mx-auto rounded" />
      </div>
      <div className="flex justify-center gap-2 mb-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-9 w-20 rounded-full" />
        ))}
      </div>
      <div style={{ columnCount: 'auto' as unknown as number, columnWidth: '280px', columnGap: '1.25rem' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ breakInside: 'avoid', marginBottom: '1.25rem' }}>
            <div
              className="skeleton rounded-2xl"
              style={{ height: i % 3 === 0 ? 300 : i % 3 === 1 ? 200 : 260 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
