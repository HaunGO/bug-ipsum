import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  basePath: '/bugipsum',
  assetPrefix: '/bugipsum',
  trailingSlash: true,
};

export default nextConfig;
