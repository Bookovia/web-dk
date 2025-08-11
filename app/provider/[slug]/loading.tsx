export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Skeleton */}
      <div className="h-[280px] w-full bg-gray-200 animate-pulse" />

      {/* Provider Info Skeleton */}
      <div className="px-6 py-6">
        <div className="h-8 bg-gray-200 animate-pulse rounded mb-3 w-3/4" />
        <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-1/3" />
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-6 w-1/2" />

        {/* Services Skeleton */}
        <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/4" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-full" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-300 animate-pulse rounded-t-3xl p-6">
        <div className="h-6 bg-gray-400 animate-pulse rounded mb-4 w-3/4 mx-auto" />
        <div className="h-12 bg-gray-400 animate-pulse rounded-full" />
      </div>
    </div>
  )
}
