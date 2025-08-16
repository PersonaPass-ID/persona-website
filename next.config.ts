import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
