"use client"

import { useEffect, useRef } from "react"

export default function AppsFlyerScript() {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return

    try {
      const script = document.createElement("script")
      script.src = "/appsflyer-init.js"
      script.async = true
      script.crossOrigin = "anonymous"

      // Add error handling
      script.onerror = (error) => {
        console.error("AppsFlyer script failed to load:", error)
      }

      document.body.appendChild(script)
      scriptLoaded.current = true

      return () => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    } catch (error) {
      console.error("Error adding AppsFlyer script:", error)
    }
  }, [])

  return null
}
