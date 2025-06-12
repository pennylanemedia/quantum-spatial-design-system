/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
    unoptimized: true
  }
}

module.exports = nextConfig