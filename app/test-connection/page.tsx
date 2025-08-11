"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TestResult {
  success: boolean
  message: string
  error?: string
  providers?: any[]
  providerCount?: number
}

export default function TestConnectionPage() {
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
    testDatabase()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">🔄 Environment Variables Sync Test</h1>

        <div className="space-y-6">
          {/* Connection Test */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Database Connection Status</h2>

            <Button onClick={testDatabase} disabled={loading} className="mb-4">
              {loading ? "Testing..." : "🔄 Test Connection"}
            </Button>

            {testResult && (
              <div className={`p-4 rounded-lg ${testResult.success ? "bg-green-100" : "bg-red-100"}`}>
                <h3 className="font-semibold mb-2">
                  {testResult.success ? "✅ Connection Successful!" : "❌ Connection Failed"}
                </h3>
                <p className="mb-2">{testResult.message}</p>

                {testResult.error && (
                  <div className="bg-red-200 p-3 rounded text-sm mt-2">
                    <strong>Error Details:</strong> {testResult.error}
                  </div>
                )}

                {testResult.success && testResult.providers && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-green-800">📊 Found {testResult.providerCount} Providers:</h4>
                    <div className="grid gap-2 mt-2">
                      {testResult.providers.map((provider: any) => (
                        <div key={provider.id} className="bg-white p-2 rounded border">
                          <strong>{provider.name}</strong>
                          <br />
                          <span className="text-sm text-gray-600">Slug: {provider.slug}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Provider Page Tests */}
          {testResult?.success && (
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">🧪 Test Provider Pages</h2>
              <p className="mb-4 text-gray-700">Now that the connection is working, test these provider pages:</p>

              <div className="grid gap-3">
                <Link
                  href="/provider/4e15806e-d162-4e29-a658-631f5dd40f02"
                  className="block p-3 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <strong>Splash Super Wash Services</strong>
                  <br />
                  <span className="text-sm text-gray-600">/provider/4e15806e-d162-4e29-a658-631f5dd40f02</span>
                </Link>

                <Link
                  href="/provider/elite-auto-detailing"
                  className="block p-3 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <strong>Elite Auto Detailing</strong>
                  <br />
                  <span className="text-sm text-gray-600">/provider/elite-auto-detailing</span>
                </Link>

                <Link
                  href="/provider/quick-clean-mobile"
                  className="block p-3 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <strong>Quick Clean Mobile</strong>
                  <br />
                  <span className="text-sm text-gray-600">/provider/quick-clean-mobile</span>
                </Link>

                <Link
                  href="/provider/luxury-car-spa"
                  className="block p-3 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <strong>Luxury Car Spa</strong>
                  <br />
                  <span className="text-sm text-gray-600">/provider/luxury-car-spa</span>
                </Link>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">📋 Next Steps</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="mr-2">1.</span>
                <span>✅ Environment variables synced</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">2.</span>
                <span>{testResult?.success ? "✅" : "⏳"} Database connection verified</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">3.</span>
                <span>⏳ Test provider pages above</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">4.</span>
                <span>⏳ Deploy to production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
