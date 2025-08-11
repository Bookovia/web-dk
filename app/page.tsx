"use client"

import type React from "react"
import { Suspense } from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ErrorBoundary } from "./components/error-boundary"
import AnalyticsComponent from "./components/analytics"

// Simple SVG icons to replace Lucide icons
const CarIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
    />
  </svg>
)

const SmartphoneIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth={2} />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
  </svg>
)

const StarIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const MailIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MapPinIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LocationPinIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <polyline points="12,6 12,12 16,14" strokeWidth={2} />
  </svg>
)

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Home() {
  // Add this function at the beginning of the Home component
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/bookovia-logo.png" alt="Bookovia Logo" width={150} height={40} className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => scrollToSection(e, "features")}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => scrollToSection(e, "how-it-works")}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => scrollToSection(e, "testimonials")}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => scrollToSection(e, "contact")}
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button className="rounded-full bg-primary text-white" asChild>
                <Link href="https://bookovia.onelink.me/6MF9/yxg770e5">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10" />
            <div className="container grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-primary">On Demand</span> Auto Detailing
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                  Connect with professional detailing specialists in your area. Book appointments, track service, and
                  pay - all from your phone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="https://bookovia.onelink.me/6MF9/yxg770e5" className="no-underline">
                    <Button className="h-14 px-6 bg-black text-white hover:bg-black/90 rounded-full">
                      Download App
                      <svg className="ml-2 h-5 w-5" viewBox="0 0 384 512" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <svg className="ml-2 h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                {/* Map and App Screenshot Container */}
                <div className="relative h-[400px] md:h-[500px] w-full flex">
                  {/* Map-like interface with connection between provider and vehicle owner */}
                  <div className="absolute inset-0 right-[40%] rounded-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gray-100">
                      {/* Map background */}
                      <div className="absolute inset-0 bg-[#F2F5F8]">
                        {/* Horizontal roads */}
                        <div className="absolute top-[20%] left-0 right-0 h-[2px] bg-gray-300"></div>
                        <div className="absolute top-[40%] left-0 right-0 h-[2px] bg-gray-300"></div>
                        <div className="absolute top-[60%] left-0 right-0 h-[2px] bg-gray-300"></div>
                        <div className="absolute top-[80%] left-0 right-0 h-[2px] bg-gray-300"></div>

                        {/* Vertical roads */}
                        <div className="absolute left-[25%] top-0 bottom-0 w-[2px] bg-gray-300"></div>
                        <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gray-300"></div>
                        <div className="absolute left-[75%] top-0 bottom-0 w-[2px] bg-gray-300"></div>
                      </div>

                      {/* Vehicle owner location */}
                      <div className="absolute top-[30%] left-[30%]">
                        <div className="relative">
                          <div className="absolute -top-1 -left-1 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
                          <div className="relative z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <div className="h-3 w-3 text-white">🚗</div>
                          </div>
                          <div className="absolute top-8 -left-12 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium">
                            Vehicle Owner
                          </div>
                        </div>
                      </div>

                      {/* Detailing specialist location */}
                      <div className="absolute bottom-[30%] right-[30%]">
                        <div className="relative">
                          <div className="absolute -top-1 -left-1 w-8 h-8 bg-secondary/20 rounded-full animate-ping"></div>
                          <div className="relative z-10 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                            <div className="h-3 w-3 text-white">📱</div>
                          </div>
                          <div className="absolute top-8 -left-16 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium">
                            Detailing Specialist
                          </div>
                        </div>
                      </div>

                      {/* Connecting line */}
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M 33% 33% Q 50% 50%, 70% 70%"
                          stroke="#4562F8"
                          strokeWidth="3"
                          strokeDasharray="6 3"
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>

                      {/* App interface overlay */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-[80%] max-w-[300px]">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <LocationPinIcon />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold">Detailing Specialist Found</h3>
                            <p className="text-xs text-gray-500">Arriving in 15 minutes</p>
                          </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-primary rounded-full"></div>
                        </div>
                      </div>

                      {/* Bookovia logo watermark */}
                      <div className="absolute top-4 left-4 opacity-20">
                        <div className="text-lg font-bold text-primary">Bookovia</div>
                      </div>
                    </div>
                  </div>

                  {/* App Screenshot */}
                  <div className="absolute right-0 left-[55%] h-full flex items-center justify-center">
                    <div className="relative h-[90%] max-h-[600px] w-auto drop-shadow-2xl">
                      <Suspense fallback={<div className="w-[300px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />}>
                        <Image
                          src="/app-screenshot.png"
                          alt="Bookovia App Interface"
                          width={300}
                          height={600}
                          className="h-full w-auto object-contain"
                          priority
                        />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Bookovia</h2>
                <p className="text-muted-foreground max-w-[700px] mx-auto">
                  We connect vehicle owners with professional detailing specialists for a seamless booking experience.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CarIcon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Specialists</h3>
                  <p className="text-muted-foreground">
                    All detailing specialists are thoroughly vetted and reviewed to ensure quality service.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <SmartphoneIcon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                  <p className="text-muted-foreground">
                    Book, reschedule, or cancel appointments with just a few taps on your smartphone.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <CalendarIcon />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    Choose when and where you want your vehicle detailed, including at-home service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How Bookovia Works</h2>
                <p className="text-muted-foreground max-w-[700px] mx-auto">
                  Getting your vehicle detailed has never been easier. Follow these simple steps:
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Download the App</h3>
                  <p className="text-muted-foreground">Available on iOS and Android devices.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                  <p className="text-muted-foreground">Sign up and add your vehicle details.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Book a Service</h3>
                  <p className="text-muted-foreground">Choose a specialist and schedule a time.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enjoy the Results</h3>
                  <p className="text-muted-foreground">Rate and review your experience.</p>
                </div>
              </div>
            </div>
          </section>

          {/* App Showcase Section */}
          <section className="flex flex-col md:flex-row">
            {/* For Vehicle Owners */}
            <div className="w-full md:w-1/2 bg-[#dde2ff] py-16">
              <div className="container mx-auto px-4 md:pr-0">
                <div className="flex flex-col items-center text-center">
                  <div className="max-w-[346px] space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">For vehicle owners</h2>
                    <p className="text-base">Find and connect with expert detailing specialists near you.</p>
                  </div>
                  <div className="mt-8 relative h-[300px] w-full">
                    <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />}>
                      <Image
                        src="/vehicle-owner-app.png"
                        alt="Vehicle Owner App Interface"
                        width={600}
                        height={400}
                        className="object-contain absolute left-1/2 -translate-x-1/2"
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>

            {/* For Detailing Specialists */}
            <div className="w-full md:w-1/2 bg-[#daf8ee] py-16">
              <div className="container mx-auto px-4 md:pl-0">
                <div className="flex flex-col items-center text-center">
                  <div className="max-w-[398px] space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">For detailing specialist</h2>
                    <p className="text-base">Manage your bookings, get paid easily and grow your revenue</p>
                  </div>
                  <div className="mt-8 relative h-[300px] w-full">
                    <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />}>
                      <Image
                        src="/specialist-app.png"
                        alt="Specialist App Interface"
                        width={600}
                        height={400}
                        className="object-contain absolute left-1/2 -translate-x-1/2"
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-white">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Vehicle?</h2>
              <p className="text-xl mb-8 max-w-[700px] mx-auto opacity-90">
                Join thousands of satisfied customers who trust Bookovia for their vehicle detailing needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="https://bookovia.onelink.me/6MF9/yxg770e5" className="no-underline">
                  <Button className="h-14 px-6 bg-white text-primary hover:bg-gray-100 rounded-full">
                    Download App
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-20 bg-white">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-muted-foreground max-w-[700px] mx-auto">
                  Don't just take our word for it. Here's what our customers and detailing specialists have to say.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    "I love how easy it is to book a detailing appointment. The specialist arrived on time and did an
                    amazing job on my SUV."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                        alt="Sarah Johnson"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Vehicle Owner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    "As a detailing specialist, Bookovia has helped me grow my business and connect with new clients in
                    my area."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                        alt="Michael Rodriguez"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Michael Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Detailing Specialist</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    "The payment process is seamless, and I love being able to see the specialist's ratings before
                    booking."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                        alt="David Chen"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">David Chen</p>
                      <p className="text-sm text-muted-foreground">Vehicle Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact" className="py-20 bg-gray-50">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions about Bookovia? We're here to help. Fill out the form and our team will get back to
                    you shortly.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MailIcon />
                      <div className="ml-4">
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-muted-foreground">support@bookovia.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <PhoneIcon />
                      <div className="ml-4">
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-muted-foreground">(866) 691-4859</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPinIcon />
                      <div className="ml-4">
                        <h3 className="font-medium">Visit Us</h3>
                        <p className="text-muted-foreground">254 Chapman Rd, Ste 208, Newark, DE 19702</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border shadow-sm">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
                    </div>

                    <Button className="w-full bg-primary text-white">Send Message</Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className="py-20 bg-white">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-[700px] mx-auto">
                  Find answers to common questions about using Bookovia for vehicle detailing services.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      How does Bookovia work for vehicle owners?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      Bookovia connects you with qualified local detailing specialists based on your vehicle type,
                      service needs, and location. Simply create an account, select your desired services, choose an
                      available time slot, and book your appointment. You'll receive confirmation and updates throughout
                      the process, and can pay securely through our platform.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      I'm a detailing specialist - how can I join Bookovia?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      Joining Bookovia as a detailing specialist is simple. Create a professional profile highlighting
                      your services, experience, and pricing. Once approved, you'll appear in relevant customer searches
                      and can start accepting bookings. Our platform handles scheduling, payments, and communication so
                      you can focus on what you do best.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      What types of detailing services are available through Bookovia?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      Bookovia specialists offer a wide range of services including basic washing, interior cleaning,
                      full detailing packages, paint correction, ceramic coating application, headlight restoration, and
                      specialized treatments for luxury, vintage, or exotic vehicles. Each specialist lists their
                      specific service offerings and expertise in their profile.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      How are payments handled?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      All payments are processed securely through the Bookovia platform. Vehicle owners pay when
                      booking, and funds are released to specialists after service completion and customer satisfaction
                      is confirmed. This creates security for both parties and eliminates awkward payment discussions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      Can I book recurring detailing services?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      Yes! Bookovia makes it easy to schedule recurring appointments with your favorite detailing
                      specialists. You can set up weekly, bi-weekly, monthly, or custom schedules based on your needs
                      and the specialist's availability. Manage all your recurring bookings from your account dashboard.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                      What if I need to reschedule or cancel my appointment?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      Life happens! You can reschedule or cancel appointments through your Bookovia account. Please note
                      that specialists have individual cancellation policies that will be clearly displayed during
                      booking. Most specialists require 24-48 hours notice for cancellations to avoid fees. Rescheduling
                      is typically accommodated based on specialist availability.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section id="download" className="py-20 bg-gradient-to-r from-primary to-accent text-white">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Download the Bookovia App Today</h2>
              <p className="text-xl mb-8 max-w-[700px] mx-auto opacity-90">
                Available on iOS and Android. Start booking professional detailing services with just a few taps.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="https://bookovia.onelink.me/6MF9/yxg770e5" className="no-underline">
                  <Button className="h-14 px-6 bg-white text-primary hover:bg-gray-100 rounded-full">
                    Download App
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-dark text-white py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Image
                  src="/bookovia-logo.png"
                  alt="Bookovia Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto mb-4 brightness-0 invert"
                />
                <p className="text-gray-400 mb-4">Connecting vehicle owners with professional detailing specialists.</p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <FacebookIcon />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <TwitterIcon />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <InstagramIcon />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <LinkedinIcon />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Safety
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms/users" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/data-deletion" className="text-gray-400 hover:text-white">
                      Data Deletion
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Get the App</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      iOS App
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Android App
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Become a Specialist
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Partnerships
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Bookovia. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Analytics Component */}
        <AnalyticsComponent />
      </div>
    </ErrorBoundary>
  )
}
