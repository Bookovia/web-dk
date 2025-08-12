
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Phone, Mail, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Provider {
  id?: string
  provider_id?: string
  name?: string
  business_name?: string
  address?: string
  distance?: string
  hero_image?: string
  phone?: string
  email?: string
  rating?: number
  total_reviews?: number
  specialty?: string
  slug?: string
  created_at?: string
  updated_at?: string
  is_public?: boolean
}

export default async function ProvidersPage() {
  console.log("=== Providers listing page accessed ===")

  try {
    // Fetch all providers
    const { data: providers, error: providersError } = await supabase
      .from("providers")
      .select("*")

    if (providersError) {
      console.error("❌ Providers query error:", providersError)
    }

    console.log(`✅ Found ${providers?.length || 0} providers`)
    console.log("Provider Details:", providers?.map(p => ({
      provider_id: p.provider_id,
      business_name: p.business_name,
      is_public: p.is_public,
      hero_image: p.hero_image
    })))

    // Fetch service images for all providers
    let serviceImagesMap = new Map<string, string>()
    if (providers && providers.length > 0) {
      const providerIds = providers.map(p => p.provider_id)
      const { data: serviceImages, error: imagesError } = await supabase
        .from("service_images")
        .select("provider_id, image_url")
        .in("provider_id", providerIds)
        .order("created_at", { ascending: true }) 

      if (imagesError) {
        console.error("❌ Service images query error:", imagesError)
      } else {
        console.log("All Service Images Data:", serviceImages)
        // Map the first image_url per provider_id
        serviceImages?.forEach(img => {
          if (!serviceImagesMap.has(img.provider_id)) {
            serviceImagesMap.set(img.provider_id, img.image_url)
          }
        })
        console.log("Mapped Service Images:", Array.from(serviceImagesMap.entries()))
      }
    }

    // Also get a count of services per provider
    let serviceCounts: any[] = []
    let serviceCountsError: any = null
    const { data: serviceCountsById, error: errorById } = await supabase
      .from("services")
      .select("provider_id")

    if (serviceCountsById) {
      const countMap = new Map()
      serviceCountsById.forEach((service: any) => {
        const id = service.provider_id
        countMap.set(id, (countMap.get(id) || 0) + 1)
      })
      serviceCounts = Array.from(countMap.entries()).map(([provider_id, count]) => ({ provider_id, count }))
    } else {
      serviceCountsError = errorById
      console.error("❌ Service counts query error:", serviceCountsError)
    }

    // Create a map of service counts
    const serviceCountMap = new Map()
    serviceCounts.forEach((item: any) => {
      serviceCountMap.set(item.provider_id, item.count)
    })

    // Base URL for Supabase storage bucket
    const bucketBaseUrl = "https://ufkwxbgkxtlvkvxmogto.supabase.co/storage/v1/object/public/"

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Back to Home</span>
              </Link>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/bookovia-logo.png" alt="Bookovia Logo" width={150} height={40} className="h-8 w-auto" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-4">All Service Providers</h1>
            <p className="text-gray-600">
              Found {providers?.length || 0} providers in the database. Click on any provider to view their details.
            </p>
          </div>

          {/* Providers List */}
          {providers && providers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider, index) => {
                const providerId = provider.id || provider.provider_id
                const providerName = provider.name || provider.business_name
                const serviceCount = serviceCountMap.get(providerId) || 0
                // Construct full image URL from service_images
                const serviceImageUrl = serviceImagesMap.get(providerId)
                const fullImageUrl = serviceImageUrl ? `${bucketBaseUrl}${serviceImageUrl}` : "/placeholder.svg?height=200&width=300"

                return (
                  <div
                    key={providerId || index}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Provider Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={fullImageUrl}
                        alt={`${providerName} hero image`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Provider Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-black mb-2">{providerName || "Unnamed Provider"}</h3>
                      {provider.specialty && (
                        <div className="mb-2">
                          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                            {provider.specialty}
                          </span>
                        </div>
                      )}
                      {provider.address && (
                        <div className="flex items-start text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            {provider.distance && `${provider.distance} • `}
                            {provider.address}
                          </span>
                        </div>
                      )}
                      {provider.rating && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium text-sm">{provider.rating}</span>
                          </div>
                          {provider.total_reviews && (
                            <span className="text-gray-500 ml-2 text-xs">({provider.total_reviews} reviews)</span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
                        {provider.phone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>{provider.phone}</span>
                          </div>
                        )}
                        {provider.email && (
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            <span className="truncate">{provider.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        {provider.id && (
                          <Link href={`/provider/${provider.id}`} className="block">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                              View by ID: {provider.id.substring(0, 8)}...
                            </Button>
                          </Link>
                        )}
                        {provider.provider_id && provider.provider_id !== provider.id && (
                          <Link href={`/provider/${provider.provider_id}`} className="block">
                            <Button variant="outline" className="w-full text-sm bg-transparent">
                              View
                            </Button>
                          </Link>
                        )}
                        {provider.slug && provider.slug !== provider.id && provider.slug !== provider.provider_id && (
                          <Link href={`/provider/${provider.slug}`} className="block">
                            <Button
                              variant="outline"
                              className="w-full text-sm bg-transparent border-secondary text-secondary"
                            >
                              View by Slug: {provider.slug}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Providers Found</h3>
                <p className="text-sm">There are no service providers in the database yet.</p>
              </div>
              {providersError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 max-w-md mx-auto">
                  <h4 className="text-red-800 font-medium mb-2">Database Error</h4>
                  <p className="text-red-600 text-sm">{providersError.message}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-primary/5 border-t mt-12">
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-white text-lg font-semibold mb-4">
              Download the Bookovia
              <br />
              app to book a service
            </h2>
            <Link href="https://bookovia.onelink.me/6MF9/yxg770e5">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-4 text-base font-medium mb-3">
                Download the app
              </Button>
            </Link>
            <div className="flex items-center justify-center text-white/70">
              <span className="text-xs mr-2">Powered by</span>
              <span className="text-sm font-semibold">bookovia</span>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("❌ Unexpected error in ProvidersPage:", error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
          <p className="text-gray-600 mb-6">Unable to fetch providers from the database.</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{String(error)}</p>
          </div>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    )
  }
}
