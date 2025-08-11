/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.bookovia.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/dashboard/*", "/_next/*", "/404", "/500", "/server-sitemap-index.xml"],
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/404", "/500"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
    ],
    additionalSitemaps: ["https://www.bookovia.com/server-sitemap-index.xml"],
  },
  additionalPaths: async () => {
    return [
      {
        loc: "/provider/4e15806e-d162-4e29-a658-631f5dd40f02",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/provider/elite-auto-detailing",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/provider/quick-clean-mobile",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/provider/luxury-car-spa",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
    ]
  },
}
