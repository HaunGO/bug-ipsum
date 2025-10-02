import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/api/**',
      },
    ],
  },
};

export default nextConfig;
