/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ottimizzazione immagini — formati moderni
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },

  // Compressione
  compress: true,

  // Trailing slash — compatibile con Hostinger
  trailingSlash: false,

  // Headers di sicurezza
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
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
