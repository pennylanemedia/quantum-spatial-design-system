/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false
  },
  images: {
    domains: ['cdn.shopify.com'],
    unoptimized: true
  }
}

module.exports = nextConfig