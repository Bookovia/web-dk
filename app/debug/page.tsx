"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface TestResult {
  success: boolean
  message: string
  error?: string
  connectionTest?: any
  providers?: any[]
  providerCount?: number
}

export default function DebugPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-db")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Failed to test database",
        error: String(error),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto-test on page load
    testDatabase()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Connection Debug</h1>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Environment Variables Check</h2>
            <div className="space-y-2 text-sm font-mono">
              <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</div>
              <div>
                NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Database Connection Test</h2>
            <Button onClick={testDatabase} disabled={loading} className="mb-4">
              {loading ? "Testing..." : "Test Database Connection"}
            </Button>

            {testResult && (
              <div className={`p-4 rounded-lg ${testResult.success ? "bg-green-100" : "bg-red-100"}`}>
                <h3 className="font-semibold mb-2">{testResult.success ? "✅ Success" : "❌ Failed"}</h3>
                <p className="mb-2">{testResult.message}</p>

                {testResult.error && (
                  <div className="bg-red-200 p-2 rounded text-sm">
                    <strong>Error:</strong> {testResult.error}
                  </div>
                )}

                {testResult.success && testResult.providers && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Available Providers ({testResult.providerCount}):</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {testResult.providers.map((provider: any) => (
                        <li key={provider.id} className="text-sm">
                          <strong>{provider.name}</strong> (slug: {provider.slug})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Fixes</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold">Option 1: Add Supabase Integration</h3>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Go to your project dashboard</li>
                  <li>Click "Integrations" tab</li>
                  <li>Find "Supabase" and click "Add"</li>
                  <li>Connect your Supabase project</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold">Option 2: Manual Environment Variables</h3>
                <p>Add these to your project environment variables:</p>
                <div className="bg-gray-100 p-2 rounded font-mono text-xs mt-2">
                  NEXT_PUBLIC_SUPABASE_URL=https://ufkwxbgkxtlvkvxmogto.supabase.co
                  <br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Provider Links</h2>
            <div className="space-y-2">
              <a href="/provider/4e15806e-d162-4e29-a658-631f5dd40f02" className="block text-blue-600 hover:underline">
                Splash Super Wash Services
              </a>
              <a href="/provider/elite-auto-detailing" className="block text-blue-600 hover:underline">
                Elite Auto Detailing
              </a>
              <a href="/provider/quick-clean-mobile" className="block text-blue-600 hover:underline">
                Quick Clean Mobile
              </a>
              <a href="/provider/luxury-car-spa" className="block text-blue-600 hover:underline">
                Luxury Car Spa
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
