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
            source: '/bot/v1/:path*',
            destination: `${process.env.PROXY_URL}/:path*` // Proxy to Backend
          }
        ]
    }
}

module.exports = nextConfig
