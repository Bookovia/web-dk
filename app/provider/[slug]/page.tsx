
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Clock, Phone, Mail } from "lucide-react"
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
}

interface Service {
  id: string
  provider_id: string
  name: string
  description?: string
  price?: number
  cost?: number
  amount?: number
  duration_minutes?: number
  category?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

interface ServiceImage {
  id: string
  provider_id: string
  service_id: string | null
  image_url: string
  is_primary: boolean
  alt_text?: string
  created_at?: string
  updated_at?: string
}

interface PageProps {
  params: { slug: string }
}

// Helper function to check if string is UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

// Helper function to get price from service (try different column names)
function getServicePrice(service: Service): number {
  return service.price || service.cost || service.amount || 0
}

export default async function ProviderPage({ params }: PageProps) {
  try {
    const { slug } = params
    console.log(`=== Provider page accessed with slug: ${slug} ===`)

    // Fetch provider data - try multiple approaches
    console.log("🔍 Searching for provider with slug:", slug)
    let provider: Provider | null = null
    let providerError: any = null

    // Try different ways to find the provider
    if (isValidUUID(slug)) {
      // If slug looks like a UUID, try both id and provider_id columns
      const { data: providerById, error: errorById } = await supabase
        .from("providers")
        .select("*")
        .eq("id", slug)
        .maybeSingle()
      
      if (providerById) {
        provider = providerById
        console.log("✅ Found provider by id:", provider?.name || provider?.business_name)
      } else {
        // Try provider_id column
        const { data: providerByProviderId, error: errorByProviderId } = await supabase
          .from("providers")
          .select("*")
          .eq("provider_id", slug)
          .maybeSingle()

        if (providerByProviderId) {
          provider = providerByProviderId
          console.log("✅ Found provider by provider_id:", provider?.name || provider?.business_name)
        } else {
          providerError = errorById || errorByProviderId
        }
      }
    } else {
      // If slug is not a UUID, try slug column
      const { data: providerBySlug, error: errorBySlug } = await supabase
        .from("providers")
        .select("*")
        .eq("slug", slug)
        .maybeSingle()

      if (providerBySlug) {
        provider = providerBySlug
        console.log("✅ Found provider by slug:", provider?.name || provider?.business_name)
      } else {
        providerError = errorBySlug
      }
    }

    if (providerError) {
      console.error("❌ Provider query error:", providerError)
    }

    if (!provider) {
      console.log("❌ No provider found with slug:", slug)
      console.log("Provider error:", providerError)
      redirect("/not-found")
    }

    // Get the correct provider ID with type safety
    const providerId = provider.id || provider.provider_id
    if (!providerId) {
      console.error("❌ Provider ID is undefined for provider:", provider)
      redirect("/not-found")
    }
    console.log("🔍 Using provider ID for services and images:", providerId)

    // Fetch service images for the provider to use as hero image if needed
    let serviceImagesMap = new Map<string, string>()
    const { data: serviceImages, error: imagesError } = await supabase
      .from("service_images")
      .select("provider_id, image_url")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: true }) // Use the earliest image as hero

    if (imagesError) {
      console.error("❌ Service images query error:", imagesError)
    } else {
      console.log("All Service Images Data:", serviceImages)
      serviceImages?.forEach(img => {
        if (!serviceImagesMap.has(img.provider_id)) {
          serviceImagesMap.set(img.provider_id, img.image_url)
        }
      })
      console.log("Mapped Service Images:", Array.from(serviceImagesMap.entries()))
    }

    // Get services for this provider
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .eq("provider_id", providerId)
      .limit(100)

    if (servicesError) {
      console.error("❌ Services query error:", servicesError)
    } else {
      console.log(`✅ Found ${services?.length || 0} services`)
      console.log("Services Data:", services) // Debug services with IDs
    }

    // Get service images
    let serviceImagesList: ServiceImage[] = []
    const { data: images, error: imagesListError } = await supabase
      .from("service_images")
      .select("*")
      .eq("provider_id", providerId)

    if (imagesListError) {
      console.error("❌ Images query error:", imagesListError)
    } else {
      serviceImagesList = images || []
      console.log(`✅ Found ${serviceImagesList.length} service images`)
      console.log("Service Images List:", serviceImagesList) // Debug service_id mapping
    }

    // Create a map of service images for easy lookup by service_id, handle null/undefined
    const serviceImageMap = new Map<string, ServiceImage[]>()
    serviceImagesList.forEach((image) => {
      const serviceId = image.service_id || "unlinked" // Fallback for unlinked images
      if (!serviceImageMap.has(serviceId)) {
        serviceImageMap.set(serviceId, [])
      }
      serviceImageMap.get(serviceId)!.push(image)
    })
    console.log("Service Image Map:", Array.from(serviceImageMap.entries())) // Debug map contents

    // Fallback to provider images if no service-specific images
    const providerImages = serviceImagesList.length > 0 ? serviceImagesList : []

    // Sort services by price if price exists, otherwise by name
    const sortedServices = services?.sort((a, b) => {
      const priceA = getServicePrice(a)
      const priceB = getServicePrice(b)
      if (priceA && priceB) {
        return priceA - priceB
      }
      return (a.name || "").localeCompare(b.name || "")
    })

    // Base URL for Supabase storage bucket
    const bucketBaseUrl = "https://ufkwxbgkxtlvkvxmogto.supabase.co/storage/v1/object/public/"
    // Use the first service image as hero image if provider.hero_image is undefined
    const heroImageUrl = provider.hero_image || (serviceImagesMap.get(providerId) ? `${bucketBaseUrl}${serviceImagesMap.get(providerId)}` : "/placeholder.svg?height=280&width=400")

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <Image
            src={heroImageUrl}
            alt={`${provider.business_name || provider.name} hero image`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Provider Info */}
        <div className="px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">
              {provider.name || provider.business_name || "Service Provider"}
            </h1>

            {provider.specialty && (
              <div className="mb-3">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {provider.specialty}
                </span>
              </div>
            )}

            {provider.address && (
              <div className="flex items-start text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {provider.distance && `${provider.distance} • `}
                  {provider.address}
                </span>
              </div>
            )}

            {provider.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{provider.rating}</span>
                </div>
                {provider.total_reviews && (
                  <span className="text-gray-500 ml-2 text-sm">({provider.total_reviews} reviews)</span>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm mb-6">
              {provider.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{provider.phone}</span>
                </div>
              )}
              {provider.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{provider.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button className="flex-1 pb-3 text-center text-primary font-medium border-b-2 border-primary">
              Services
            </button>
            <button className="flex-1 pb-3 text-center text-gray-500 font-medium">Details</button>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            {sortedServices && sortedServices.length > 0 ? (
              <div className="space-y-6">
                {sortedServices.map((service) => {
                  const serviceImagesForService = serviceImageMap.get(service.id) || serviceImageMap.get("unlinked") || []
                  console.log(`Service ID: ${service.id}, Images:`, serviceImagesForService) // Debug per service
                  const primaryImage =
                    serviceImagesForService.find((img) => img.is_primary) || serviceImagesForService[0]
                  const servicePrice = getServicePrice(service)

                  return (
                    <div key={service.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        {/* Service Image */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image
                            src={primaryImage?.image_url ? `${bucketBaseUrl}${primaryImage.image_url}` : "/placeholder.svg?height=100&width=100"}
                            alt={primaryImage?.alt_text || service.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Service Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-black mb-1">{service.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{service.description || "Professional service"}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {servicePrice > 0 && (
                                <span className="text-lg font-semibold text-black">${servicePrice}</span>
                              )}
                              {service.duration_minutes && (
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{service.duration_minutes} min</span>
                                </div>
                              )}
                            </div>

                            {service.category && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                                {service.category}
                              </span>
                            )}
                          </div>

                          {/* Debug info for each service */}
                          <div className="mt-2 text-xs text-gray-500">
                            Price: {service.price || "N/A"} | Cost: {service.cost || "N/A"} | Amount:{" "}
                            {service.amount || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No services available at this time.</p>
                <p className="text-sm mt-2">Please contact the provider directly for service information.</p>
                {servicesError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                    <p className="text-red-600 text-sm">
                      <strong>Error:</strong> {servicesError.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-accent rounded-t-3xl p-6 shadow-lg">
          <div className="text-center">
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

        {/* Bottom padding to account for fixed CTA */}
        <div className="h-48"></div>
      </div>
    )
  } catch (error) {
    console.error("❌ Unexpected error in ProviderPage:", error)
    redirect("/not-found")
  }
}