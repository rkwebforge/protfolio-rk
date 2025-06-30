#!/bin/bash
# GitHub Pages Deployment Script for Portfolio

echo "🚀 Starting GitHub Pages deployment..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build completed successfully!"

# Check if gh-pages package is installed
if ! npm list gh-pages > /dev/null 2>&1; then
  echo "📦 Installing gh-pages..."
  npm install --save-dev gh-pages
fi

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "🌐 Your site will be available at: https://rkwebforge.github.io/protfolio-rk/"
  echo ""
  echo "📋 Deployment Summary:"
  echo "   - Base URL: /protfolio-rk/"
  echo "   - Assets: Properly configured for subdirectory"
  echo "   - CSP: Configured for GitHub Pages compatibility"
  echo "   - Manifest: Environment-aware paths"
else
  echo "❌ Deployment failed!"
  exit 1
fi
