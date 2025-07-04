/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // Allow serving from public directory
  },
}

module.exports = nextConfig
