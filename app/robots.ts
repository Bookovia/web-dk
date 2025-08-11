import type { MetadataRoute } from "next"

// This is a fallback robots.txt in case next-sitemap doesn't work
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/"],
    },
    sitemap: "https://www.bookovia.com/sitemap.xml",
  }
}
