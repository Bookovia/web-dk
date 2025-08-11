import { NextResponse } from "next/server"
import { supabase, testSupabaseConnection } from "@/lib/supabase-server"

export async function GET() {
  try {
    console.log("=== Database Connection Test API ===")

    // Test the connection
    const connectionTest = await testSupabaseConnection()

    if (!connectionTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: connectionTest.error,
          message: "Database connection failed",
        },
        { status: 500 },
      )
    }

    // Try to fetch some providers
    const { data: providers, error: providersError } = await supabase
      .from("providers")
      .select("id, name, slug")
      .limit(5)

    if (providersError) {
      return NextResponse.json(
        {
          success: false,
          error: providersError.message,
          message: "Failed to fetch providers",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Database connection working!",
      connectionTest,
      providers: providers || [],
      providerCount: providers?.length || 0,
    })
  } catch (error) {
    console.error("Database test API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "API test failed",
      },
      { status: 500 },
    )
  }
}
