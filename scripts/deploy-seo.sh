#!/bin/bash

# SEO Deployment Script for Bookovia
# This script builds the project and generates SEO files

echo "🚀 Starting Bookovia SEO deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building Next.js project..."
npm run build

# Generate sitemap (this should happen automatically via postbuild)
echo "🗺️  Generating sitemap..."
npm run sitemap

# Verify files were created
echo "✅ Verifying generated files..."

if [ -f "public/sitemap.xml" ]; then
    echo "✓ sitemap.xml generated successfully"
    echo "📊 Sitemap contains $(grep -c '<url>' public/sitemap.xml) URLs"
else
    echo "❌ sitemap.xml not found"
    exit 1
fi

if [ -f "public/robots.txt" ]; then
    echo "✓ robots.txt generated successfully"
    cat public/robots.txt
else
    echo "❌ robots.txt not found"
    exit 1
fi

# Test sitemap accessibility (if running locally)
if command -v curl &> /dev/null; then
    echo "🧪 Testing sitemap accessibility..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml | grep -q "200"; then
        echo "✓ Sitemap accessible at /sitemap.xml"
    else
        echo "⚠️  Could not test sitemap accessibility (server may not be running)"
    fi
fi

echo "🎉 SEO deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy to production"
echo "2. Submit sitemap to Google Search Console"
echo "3. Submit sitemap to Bing Webmaster Tools"
echo "4. Monitor indexing status"
echo ""
echo "🔗 Sitemap URL: https://www.bookovia.com/sitemap.xml"
echo "🔗 Robots URL: https://www.bookovia.com/robots.txt"
