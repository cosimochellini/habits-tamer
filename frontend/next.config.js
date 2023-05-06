/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true
    },
    generateEtags: false,
    experimental: {
        typedRoutes: true
    }
}

module.exports = nextConfig
