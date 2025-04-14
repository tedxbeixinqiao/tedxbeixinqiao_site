import type { NextConfig } from 'next'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

let userConfig: any = undefined
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// No user config to load, removing the related code

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

if (userConfig) {
  for (const key in userConfig) {
    if (
      typeof nextConfig[key as keyof NextConfig] === 'object' &&
      !Array.isArray(nextConfig[key as keyof NextConfig])
    ) {
      nextConfig[key as keyof NextConfig] = {
        ...(nextConfig[key as keyof NextConfig] as object),
        ...userConfig[key],
      } as any
    } else {
      (nextConfig as any)[key] = userConfig[key]
    }
  }
}

export default nextConfig