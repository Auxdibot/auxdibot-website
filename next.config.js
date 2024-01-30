/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.discordapp.com", 'cdn.jsdelivr.net']
    },
    swcMinify: false,
    async rewrites() {
        return [
          {
            source: '/api/v1/:path*',
            destination: 'http://localhost:1080/:path*' // Proxy to Backend
          }
        ]
    }
}

module.exports = nextConfig
