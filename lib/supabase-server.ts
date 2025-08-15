import { createClient } from "@supabase/supabase-js"

// Direct configuration - using the values from your .env.local
const SUPABASE_URL = "https://ufkwxbgkxtlvkvxmogto.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVma3d4YmdreHRsdmt2eG1vZ3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5Njk2NzYsImV4cCI6MjA1MjU0NTY3Nn0.T6IE0KBS0vT5fhN7ulsADr7-P4gw5BnGJ5GC-0TYOpc"

// Try environment variables first, then use direct values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || SUPABASE_URL

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("=== Supabase Configuration ===")
console.log("URL Source:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "ENV_VAR" : "HARDCODED")
console.log("Key Source:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "ENV_VAR" : "HARDCODED")
console.log("URL:", supabaseUrl)
console.log("Key Present:", supabaseAnonKey ? "YES" : "NO")

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Supabase configuration missing:
    URL: ${supabaseUrl ? "✓" : "✗"}
    Key: ${supabaseAnonKey ? "✓" : "✗"}`)
}

// Use service role key if available, otherwise use anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey

// Create a single supabase client for server-side use
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Test function to verify connection
export async function testSupabaseConnection() {
  try {
    console.log("🔄 Testing Supabase connection...")
    console.log("Using URL:", supabaseUrl)

    const { data, error } = await supabase.from("providers").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ Supabase connection test failed:", error)
      return { success: false, error: error.message }
    }

    console.log("✅ Supabase connection successful!")
    return { success: true, count: data }
  } catch (err) {
    console.error("❌ Supabase connection test exception:", err)
    return { success: false, error: String(err) }
  }
}
