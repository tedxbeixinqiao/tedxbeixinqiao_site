import type { NextConfig } from 'next';

// Allowed image quality for next/image (future-proof for Next.js 16)
const DEFAULT_IMAGE_QUALITY = 75;
// No user config to load, removed related code

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // Add allowed qualities for next/image (future-proof for Next.js 16)
    qualities: [DEFAULT_IMAGE_QUALITY],
    // Add localPatterns for images with query strings (future-proof for Next.js 16)
    localPatterns: [
      // Example: allow all query params for /photo.jpg
      // { pathname: '/photo.jpg' },
      // Add more patterns as needed
    ],
  },
  // Enable typed routes for type-safe navigation (Next.js 15.5+)
  typedRoutes: true,
  experimental: {
    // Removed experimental features
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,

    // Keeping serverActions as it may be needed for form submissions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
