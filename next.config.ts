import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
