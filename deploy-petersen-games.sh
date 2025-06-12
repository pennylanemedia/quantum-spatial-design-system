#!/bin/bash

# 🚀 PETERSEN GAMES DEPLOYMENT SCRIPT
# Run this script to deploy your store to Vercel

echo "🎮 Deploying Petersen Games Store..."
echo "=================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "📝 Please copy .env.example to .env.local and add your Shopify credentials:"
    echo "   cp .env.example .env.local"
    echo "   Then edit .env.local with your store domain and access token"
    exit 1
fi

# Check if environment variables are set
if ! grep -q "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=" .env.local || ! grep -q "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=" .env.local; then
    echo "❌ Environment variables not configured!"
    echo "📝 Please edit .env.local and add your Shopify credentials"
    exit 1
fi

echo "✅ Environment variables found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Test build locally
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    echo "🐛 Please check for errors and fix them before deploying"
    exit 1
fi

echo "✅ Build successful"

# Test locally (optional)
echo "🧪 Would you like to test locally first? (y/n)"
read -r test_local

if [ "$test_local" = "y" ] || [ "$test_local" = "Y" ]; then
    echo "🌐 Starting local development server..."
    echo "📝 Open http://localhost:3000 in your browser to test"
    echo "   Press Ctrl+C when done testing, then run this script again"
    npm run dev
    exit 0
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "========================="
    echo "✅ Your Petersen Games store is now live!"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "1. Visit your Vercel URL to test the live site"
    echo "2. Make sure your products are tagged correctly in Shopify"
    echo "3. Test categories, filtering, search, and cart functionality"
    echo "4. Remove password protection from Shopify admin"
    echo "5. Your store is ready for customers! 🎮"
    echo ""
    echo "🛒 FEATURES DEPLOYED:"
    echo "- Category navigation and filtering"
    echo "- Advanced miniature filtering system"
    echo "- Real-time product search"
    echo "- Shopping cart with Shopify checkout"
    echo "- Mobile responsive design"
    echo "- Glassmorphic hover effects"
    echo ""
else
    echo "❌ Deployment failed"
    echo "🐛 Please check the error messages above and try again"
    exit 1
fi