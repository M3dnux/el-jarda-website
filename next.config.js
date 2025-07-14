/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
      'eljarda.com',
      'www.eljarda.com'
    ],
    unoptimized: true, // Allow base64 data URLs
  },
}

module.exports = nextConfig
