/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure public folder is properly served
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
};

module.exports = nextConfig;