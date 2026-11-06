/** Route-level loading UI (skeleton) shown during navigation. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <div className="h-56 bg-navy/90 sm:h-64" />
      <div className="container-page grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-[16/10] bg-navy-50" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-1/3 rounded bg-navy-50" />
              <div className="h-5 w-4/5 rounded bg-navy-100" />
              <div className="h-4 w-full rounded bg-navy-50" />
              <div className="h-9 w-full rounded-full bg-navy-50" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}
