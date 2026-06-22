/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ottimizzazione immagini — formati moderni
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },

  // Compressione
  compress: true,

  // Tree-shaking per pacchetti con barrel exports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Trailing slash — compatibile con Hostinger
  trailingSlash: false,

  // Headers di sicurezza e cache asset statici
  async headers() {
    const cacheOneYear = 'public, max-age=31536000, immutable';

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: cacheOneYear }],
      },
    ];
  },

  // Canonical non-www: www.vgresidence.com → vgresidence.com
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vgresidence.com' }],
        destination: 'https://vgresidence.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
