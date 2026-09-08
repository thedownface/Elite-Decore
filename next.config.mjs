import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Pin the workspace root to this directory. Without this, Next infers it by
  // walking up for the nearest lockfile — a stray one in a parent folder (e.g.
  // an unrelated `npm install` run one directory up) gets picked instead, and
  // the dev server then occasionally resolves build output against the wrong
  // root under rapid concurrent compiles (a transient ENOENT on `page.js`).
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Every distinct `quality` prop used on an <Image> across the app —
    // required explicitly from Next.js 16 onward.
    qualities: [76, 78, 80],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@react-three/drei'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
