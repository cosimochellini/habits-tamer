/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true
    },
    generateEtags: false,
}

module.exports = nextConfig
