/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    API_TOKEN: process.env.API_TOKEN
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net']
  }
};

module.exports = nextConfig;