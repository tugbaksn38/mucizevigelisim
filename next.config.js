/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopier.com",
      },
      {
        protocol: "https",
        hostname: "www.shopier.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopier.app",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-1.amazonaws.com",
      },
    ],
  },

  transpilePackages: [
    "@tensorflow/tfjs",
    "@tensorflow/tfjs-backend-webgl",
    "@tensorflow/tfjs-converter",
  ],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;