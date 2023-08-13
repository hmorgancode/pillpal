/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp'], // ['image/avif', 'image/webp'],
    // default (16w, 32w, 48w)
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // logical pixels are 320, 375, 414 (iPhone XR), 540, 600, 960, 1024, 1920
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // env: {},
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '', // does not cover files in the public folder
  // generateBuildId: async () => nanoid(),
  poweredByHeader: false, // disable x-powered-by
};

module.exports = nextConfig;
