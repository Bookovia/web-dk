# SEO Setup Guide for Bookovia

## Sitemap and Robots.txt Configuration

This project uses `next-sitemap` to automatically generate sitemap.xml and robots.txt files after each build.

### Files Generated

- `/public/sitemap.xml` - Main sitemap with static pages
- `/public/robots.txt` - Search engine crawler instructions
- `/server-sitemap-index.xml` - Dynamic sitemap for provider pages

### Configuration

The sitemap configuration is in `next-sitemap.config.js`:

- **Site URL**: https://www.bookovia.com
- **Default Priority**: 0.7 for most pages
- **Provider Pages**: Priority 0.9 (higher importance)
- **Excluded Pages**: API routes, admin pages, error pages

### Build Process

1. Run `npm run build` to build the project
2. `next-sitemap` automatically runs after build (postbuild script)
3. Sitemap and robots.txt are generated in `/public/`

### Manual Generation

To generate sitemap without building:

\`\`\`bash
npm run sitemap
\`\`\`

### Google Search Console Setup

1. **Verify Domain Ownership**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: https://www.bookovia.com
   - Verify ownership using HTML file upload or DNS record

2. **Submit Sitemap**
   - In Search Console, go to "Sitemaps" in the left menu
   - Click "Add a new sitemap"
   - Enter: `sitemap.xml`
   - Click "Submit"

3. **Submit Additional Sitemaps**
   - Also submit: `server-sitemap-index.xml`
   - This contains dynamic provider pages

### Bing Webmaster Tools Setup

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: https://www.bookovia.com
3. Verify ownership
4. Submit sitemap: https://www.bookovia.com/sitemap.xml

### Generated URLs

The sitemap will include:
- Homepage (priority 1.0)
- Privacy policy and terms pages (priority 0.8)
- Provider pages (priority 0.9)
- Other static pages (priority 0.7)

### Additional SEO Recommendations

1. **Meta Tags**: Ensure all pages have proper title and description
2. **Open Graph**: Add OG tags for social media sharing
3. **Schema Markup**: Add structured data for local business
4. **Page Speed**: Optimize images and loading times
5. **Mobile Friendly**: Ensure responsive design
6. **SSL Certificate**: Use HTTPS (already configured)

### Monitoring and Maintenance

- Check Search Console weekly for new issues
- Update sitemap when adding new page types
- Monitor crawl errors and fix broken links
- Review and update meta descriptions regularly

### Troubleshooting

**Sitemap not generating?**
- Check that `next-sitemap` is installed: `npm list next-sitemap`
- Verify `postbuild` script in package.json
- Run manually: `npm run sitemap`

**Files not accessible?**
- Verify sitemap URL: https://www.bookovia.com/sitemap.xml
- Check robots.txt: https://www.bookovia.com/robots.txt
- Ensure files are in `/public/` directory
