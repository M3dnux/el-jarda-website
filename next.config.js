/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // Allow base64 data URLs
  },
}

module.exports = nextConfig
