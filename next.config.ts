import type { NextConfig } from "next";

module.exports = {
  basePath: '',
  assetPrefix: 'https://catalystiq.fun',  
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;