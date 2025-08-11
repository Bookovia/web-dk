import { getServerSideSitemap } from "next-sitemap"

export async function GET() {
  const fields = [
    {
      loc: "https://www.bookovia.com/provider/4e15806e-d162-4e29-a658-631f5dd40f02",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "https://www.bookovia.com/provider/elite-auto-detailing",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "https://www.bookovia.com/provider/quick-clean-mobile",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "https://www.bookovia.com/provider/luxury-car-spa",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.9,
    },
  ]

  return getServerSideSitemap(fields)
}
