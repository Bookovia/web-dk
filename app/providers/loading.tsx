export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-20" />
          <div className="h-8 bg-gray-200 animate-pulse rounded w-32" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="h-12 bg-gray-200 animate-pulse rounded-full" />
        </div>

        {/* Controls Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="h-10 bg-gray-200 animate-pulse rounded-full w-24" />
          <div className="h-10 bg-gray-200 animate-pulse rounded-full w-20" />
          <div className="h-10 bg-gray-200 animate-pulse rounded-full w-32" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 animate-pulse rounded-full flex-1" />
                  <div className="h-8 bg-gray-200 animate-pulse rounded-full flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
