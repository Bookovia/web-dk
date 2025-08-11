import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, Search, MapPin, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with logo */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/bookovia-logo.png" alt="Bookovia Logo" width={150} height={40} className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          {/* 404 illustration area */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              {/* Stylized 404 with car icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/20 select-none">404</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            </div>
            <div className="absolute top-8 right-1/4">
              <div
                className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="absolute top-6 left-1/4">
              <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-dark">Page Not Found</h1>
            <p className="text-gray-600 text-lg">Oops! The page you're looking for doesn't exist.</p>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              The provider or page you're trying to access may have been moved, deleted, or the link might be incorrect.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-base font-medium">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </Link>

              <Link href="https://bookovia.onelink.me/6MF9/yxg770e5" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 rounded-full bg-transparent"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Providers
                </Button>
              </Link>
            </div>
          </div>

          {/* Help text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Looking for a service provider?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Download the Bookovia app to find and book trusted car detailers and mechanics near you.
            </p>
            <Link
              href="https://bookovia.onelink.me/6MF9/yxg770e5"
              className="text-primary hover:underline text-sm font-medium"
            >
              Download the app →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer branding */}
      <footer className="border-t bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/bookovia-logo.png"
                alt="Bookovia Logo"
                width={120}
                height={32}
                className="h-6 w-auto opacity-60"
              />
            </div>
            <p className="text-xs text-gray-500">Connecting vehicle owners with professional detailing specialists</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms/users" className="text-xs text-gray-500 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="mailto:support@bookovia.com" className="text-xs text-gray-500 hover:text-primary">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
