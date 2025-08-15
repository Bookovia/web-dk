import type React from "react"
import type { Metadata } from "next"
import { Inter,  Plus_Jakarta_Sans } from "next/font/google"
import { Suspense } from "react"
import ChunkErrorBoundary from "./components/chunk-error-boundary"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bookovia | Book Trusted Car Detailers & Mechanics Near You",
  description:
    "Easily find and book reliable auto detailers and mechanics in your area with Bookovia. Compare prices, read reviews, and schedule car services in minutes.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bookovia | Book Trusted Car Detailers & Mechanics Near You",
    description:
      "Easily find and book reliable auto detailers and mechanics in your area with Bookovia. Compare prices, read reviews, and schedule car services in minutes.",
    images: [
      {
        url: "/bookovia-social-image.png",
        width: 1200,
        height: 630,
        alt: "Bookovia | Book Trusted Car Detailers & Mechanics Near You",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookovia | Book Trusted Car Detailers & Mechanics Near You",
    description:
      "Easily find and book reliable auto detailers and mechanics in your area with Bookovia. Compare prices, read reviews, and schedule car services in minutes.",
    images: [
      {
        url: "/bookovia-social-image.png",
        alt: "Bookovia | Book Trusted Car Detailers & Mechanics Near You",
      },
    ],
  },
    generator: 'v0.dev'
}

// Analytics component that handles the import safely
function Analytics() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    // Dynamic import to avoid SSR issues
    const { Analytics } = require("@vercel/analytics/react")
    return <Analytics />
  } catch (error) {
    console.warn("Analytics not available:", error)
    return null
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${plusJakartaSans.variable}`}>
        <ChunkErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ChunkErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
