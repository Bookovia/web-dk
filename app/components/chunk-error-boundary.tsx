"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function ChunkErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Listen for chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      if (event.error && event.error.toString().includes("ChunkLoadError")) {
        setHasError(true)
        // Prevent default error handling
        event.preventDefault()
      }
    }

    window.addEventListener("error", handleChunkError)
    return () => window.removeEventListener("error", handleChunkError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Error</h2>
          <p className="mb-6 text-gray-600">
            We're having trouble loading this page. This might be due to a temporary network issue.
          </p>
          <Button
            onClick={() => {
              setHasError(false)
              window.location.reload()
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
