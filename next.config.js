/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mevcut image ayarlarınız
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopier.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shopier.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopier.app',
      },
      {
        protocol: 'https',
        hostname: 's3.eu-central-1.amazonaws.com',
      },

    ],
  },

  // TensorFlow.js ve MediaPipe için gerekli ayarlar
  transpilePackages: [
    '@tensorflow/tfjs',
    '@tensorflow-models/pose-detection',
    '@mediapipe/pose',
    '@tensorflow/tfjs-backend-webgl',
    '@tensorflow/tfjs-converter'
  ],

  // Webpack ayarı: npm link ile bağlı paketleri tanı
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = true; // ← burayı ekledik
    return config;
  },

  // Güvenlik headers (opsiyonel)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      }
    ]
  }
};

module.exports = nextConfig;
