import type { NextConfig } from "next";

// Allowed image quality for next/image (future-proof for Next.js 16)
const DEFAULT_IMAGE_QUALITY = 75;
// No user config to load, removed related code

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [DEFAULT_IMAGE_QUALITY],
    localPatterns: [],
  },
  // Enable typed routes for type-safe navigation (Next.js 15.5+)
  typedRoutes: true,
  // Enable Cache Components for Next.js 16 optimization
  cacheComponents: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
