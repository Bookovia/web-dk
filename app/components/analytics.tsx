"use client"

import { useEffect } from "react"

export default function AnalyticsComponent() {
  useEffect(() => {
    // Only load analytics in production and when available
    if (process.env.NODE_ENV === "production") {
      try {
        // Try to load Vercel Analytics dynamically
        import("@vercel/analytics/react")
          .then(({ Analytics }) => {
            // Analytics will be loaded if available
            console.log("Analytics loaded successfully")
          })
          .catch((error) => {
            console.warn("Analytics not available:", error)
          })
      } catch (error) {
        console.warn("Failed to load analytics:", error)
      }
    }
  }, [])

  return null
}
