import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Provider {
  id: string
  name: string
  slug: string
  address: string
  distance: string
  hero_image?: string
  phone?: string
  email?: string
  rating?: number
  total_reviews?: number
  specialty?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  provider_id: string
  name: string
  description: string
  price: number
  duration_minutes?: number
  category?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ServiceImage {
  id: string
  service_id: string
  image_url: string
  is_primary: boolean
  alt_text?: string
  created_at: string
  updated_at: string
}
