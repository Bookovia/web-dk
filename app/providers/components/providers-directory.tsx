"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  Share2,
  Grid3X3,
  List,
  X,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react"

interface Provider {
  id: string
  name: string
  slug: string
  address: string
  distance: string
  hero_image?: string
  phone?: string
  email?: string
  rating: number
  total_reviews: number
  specialty: string
  created_at: string
  updated_at: string
}

interface Service {
  id: string
  provider_id: string
  name: string
  description?: string
  price: number
  duration_minutes?: number
  category: string
  is_active: boolean
}

interface ProvidersDirectoryProps {
  initialProviders: Provider[]
  initialServices: Service[]
}

type ViewMode = "grid" | "list"
type SortOption = "best-match" | "top-rated" | "most-booked" | "price-low" | "price-high"

export function ProvidersDirectory({ initialProviders, initialServices }: ProvidersDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("best-match")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)

  // Get unique categories from services
  const categories = useMemo(() => {
    const cats = new Set(initialServices.map((service) => service.category))
    return Array.from(cats).filter(Boolean)
  }, [initialServices])

  // Create provider-service mapping
  const providerServices = useMemo(() => {
    const mapping = new Map<string, Service[]>()
    initialServices.forEach((service) => {
      if (!mapping.has(service.provider_id)) {
        mapping.set(service.provider_id, [])
      }
      mapping.get(service.provider_id)!.push(service)
    })
    return mapping
  }, [initialServices])

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    const filtered = initialProviders.filter((provider) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = provider.name.toLowerCase().includes(query)
        const matchesSpecialty = provider.specialty?.toLowerCase().includes(query)
        const matchesAddress = provider.address?.toLowerCase().includes(query)
        const services = providerServices.get(provider.id) || []
        const matchesService = services.some(
          (service) => service.name.toLowerCase().includes(query) || service.description?.toLowerCase().includes(query),
        )

        if (!matchesName && !matchesSpecialty && !matchesAddress && !matchesService) {
          return false
        }
      }

      // Category filter
      if (selectedCategories.size > 0) {
        const services = providerServices.get(provider.id) || []
        const hasMatchingCategory = services.some((service) => selectedCategories.has(service.category))
        if (!hasMatchingCategory) return false
      }

      // Rating filter
      if (selectedRating && provider.rating < selectedRating) {
        return false
      }

      // Price range filter
      const services = providerServices.get(provider.id) || []
      if (services.length > 0) {
        const minPrice = Math.min(...services.map((s) => s.price))
        const maxPrice = Math.max(...services.map((s) => s.price))
        if (maxPrice < priceRange[0] || minPrice > priceRange[1]) {
          return false
        }
      }

      return true
    })

    // Sort providers
    switch (sortBy) {
      case "top-rated":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => {
          const aServices = providerServices.get(a.id) || []
          const bServices = providerServices.get(b.id) || []
          const aMinPrice = aServices.length > 0 ? Math.min(...aServices.map((s) => s.price)) : 0
          const bMinPrice = bServices.length > 0 ? Math.min(...bServices.map((s) => s.price)) : 0
          return aMinPrice - bMinPrice
        })
        break
      case "price-high":
        filtered.sort((a, b) => {
          const aServices = providerServices.get(a.id) || []
          const bServices = providerServices.get(b.id) || []
          const aMaxPrice = aServices.length > 0 ? Math.max(...aServices.map((s) => s.price)) : 0
          const bMaxPrice = bServices.length > 0 ? Math.max(...bServices.map((s) => s.price)) : 0
          return bMaxPrice - aMaxPrice
        })
        break
      case "most-booked":
        filtered.sort((a, b) => b.total_reviews - a.total_reviews)
        break
      default: // best-match
        filtered.sort((a, b) => {
          // Combine rating and review count for best match
          const aScore = a.rating * Math.log(a.total_reviews + 1)
          const bScore = b.rating * Math.log(b.total_reviews + 1)
          return bScore - aScore
        })
    }

    return filtered
  }, [initialProviders, searchQuery, selectedCategories, selectedRating, priceRange, sortBy, providerServices])

  const toggleFavorite = (providerId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(providerId)) {
        newFavorites.delete(providerId)
      } else {
        newFavorites.add(providerId)
      }
      return newFavorites
    })
  }

  const shareProvider = async (provider: Provider) => {
    const url = `${window.location.origin}/provider/${provider.slug}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: provider.name,
          text: `Check out ${provider.name} on Bookovia`,
          url: url,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url)
      }
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  const getProviderMinPrice = (providerId: string) => {
    const services = providerServices.get(providerId) || []
    return services.length > 0 ? Math.min(...services.map((s) => s.price)) : 0
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setSelectedRating(null)
    setPriceRange([0, 1000])
    setShowVerifiedOnly(false)
    setSearchQuery("")
  }

  const activeFiltersCount =
    selectedCategories.size +
    (selectedRating ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (showVerifiedOnly ? 1 : 0)

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back</span>
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/bookovia-logo.png" alt="Bookovia Logo" width={150} height={40} className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search providers, services, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-full border-gray-300"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 bg-primary text-white">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-full p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-full"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-full"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="best-match">Best Match</option>
              <option value="top-rated">Top Rated</option>
              <option value="most-booked">Most Booked</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">{filteredProviders.length} providers found</div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-6 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Service Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(category)}
                          onChange={(e) => {
                            const newCategories = new Set(selectedCategories)
                            if (e.target.checked) {
                              newCategories.add(category)
                            } else {
                              newCategories.delete(category)
                            }
                            setSelectedCategories(newCategories)
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                          className="border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="ml-2 flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{rating}+</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                        className="text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h4 className="font-medium mb-3">Additional</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showVerifiedOnly}
                        onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">Verified Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Providers Grid/List */}
        <div
          className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}
        >
          {filteredProviders.map((provider) => {
            const services = providerServices.get(provider.id) || []
            const minPrice = getProviderMinPrice(provider.id)
            const isFavorite = favorites.has(provider.id)

            return (
              <Card
                key={provider.id}
                className={`group hover:shadow-lg transition-all duration-200 border-gray-200 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                  {/* Provider Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-48 w-full"
                    } rounded-t-lg`}
                  >
                    <Image
                      src={provider.hero_image || "/placeholder.svg?height=200&width=300"}
                      alt={provider.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Favorite & Share Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(provider.id)}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite ? "text-red-500 fill-current" : "text-gray-600"}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                        onClick={() => shareProvider(provider)}
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>

                    {/* Verified Badge */}
                    {provider.rating >= 4.5 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-secondary text-white">Verified</Badge>
                      </div>
                    )}
                  </div>

                  {/* Provider Info */}
                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-black group-hover:text-primary transition-colors">
                        {provider.name}
                      </h3>
                      {minPrice > 0 && (
                        <div className="text-right">
                          <div className="text-sm text-gray-500">from</div>
                          <div className="text-lg font-semibold text-primary">${minPrice}</div>
                        </div>
                      )}
                    </div>

                    {/* Specialty */}
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {provider.specialty}
                      </Badge>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {provider.distance} • {provider.address}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium text-sm">{provider.rating}</span>
                      </div>
                      <span className="text-gray-500 ml-2 text-sm">({provider.total_reviews} reviews)</span>
                    </div>

                    {/* Service Categories */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {services.slice(0, 3).map((service) => (
                        <Badge key={service.id} variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      ))}
                      {services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{services.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full bg-transparent"
                        onClick={() => setSelectedProvider(provider)}
                      >
                        Quick View
                      </Button>
                      <Link href={`/provider/${provider.slug}`} className="flex-1">
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 rounded-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No providers found</h3>
              <p className="text-sm">Try adjusting your search or filters to find more providers.</p>
            </div>
            <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-0">
              {/* Header */}
              <div className="relative h-48 w-full">
                <Image
                  src={selectedProvider.hero_image || "/placeholder.svg?height=200&width=400"}
                  alt={selectedProvider.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setSelectedProvider(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">{selectedProvider.name}</h2>
                    <Badge variant="outline">{selectedProvider.specialty}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{selectedProvider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({selectedProvider.total_reviews} reviews)</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {selectedProvider.distance} • {selectedProvider.address}
                    </span>
                  </div>
                  {selectedProvider.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{selectedProvider.phone}</span>
                    </div>
                  )}
                  {selectedProvider.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{selectedProvider.email}</span>
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Services Offered</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(providerServices.get(selectedProvider.id) || []).map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{service.name}</div>
                          {service.duration_minutes && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {service.duration_minutes} min
                            </div>
                          )}
                        </div>
                        <div className="text-primary font-semibold">${service.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full bg-transparent"
                    onClick={() => setSelectedProvider(null)}
                  >
                    Close
                  </Button>
                  <Link href={`/provider/${selectedProvider.slug}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">View Full Profile</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
