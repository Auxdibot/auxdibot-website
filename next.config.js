/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "cdn.discordapp.com",
          }, 
          {
            hostname: 'cdn.jsdelivr.net'
          }
        ]
    },
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
