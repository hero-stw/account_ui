/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ADMIN_URL: process.env.ADMIN_URL,
        SHIPPER_URL: process.env.SHIPPER_URL,
        USER_URL: process.env.USER_URL,
    },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
