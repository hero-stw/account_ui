/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_URL: process.env.ADMIN_URL,
    SHIPPER_URL: process.env.SHIPPER_URL,
    USER_URL: process.env.USER_URL,
    HTTP_ENDPOINT: process.env.HTTP_ENDPOINT,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
