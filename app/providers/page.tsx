import { Suspense } from "react"
import { ProvidersDirectory } from "./components/providers-directory"
import { supabase } from "@/lib/supabase"

interface Provider {
  id: string
  name: string
  slug: string
  address: string
  distance: string
  hero_image?: string
  phone?: string
  email?: string
  rating: number
  total_reviews: number
  specialty: string
  created_at: string
  updated_at: string
}

interface Service {
  id: string
  provider_id: string
  name: string
  description?: string
  price: number
  duration_minutes?: number
  category: string
  is_active: boolean
}

async function getProvidersData() {
  try {
    // Fetch all providers
    const { data: providers, error: providersError } = await supabase
      .from("providers")
      .select("*")
      .order("rating", { ascending: false })

    if (providersError) {
      console.error("❌ Providers query error:", providersError)
      return { providers: [], services: [] }
    }

    // Fetch all services
    const { data: services, error: servicesError } = await supabase.from("services").select("*").eq("is_active", true)

    if (servicesError) {
      console.error("❌ Services query error:", servicesError)
      return { providers: providers || [], services: [] }
    }

    return {
      providers: providers || [],
      services: services || [],
    }
  } catch (error) {
    console.error("❌ Error fetching providers data:", error)
    return { providers: [], services: [] }
  }
}

export default async function ProvidersPage() {
  const { providers, services } = await getProvidersData()

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
        <ProvidersDirectory initialProviders={providers} initialServices={services} />
      </Suspense>
    </div>
  )
}
