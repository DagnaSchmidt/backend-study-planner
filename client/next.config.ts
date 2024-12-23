import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: 'http://localhost:8000/api/:path*/'
      },
      {
        source: '/login/api/auth/:path*/',
        destination: 'http://localhost:8000/api/auth/:path*/'
      },
      {
        source: '/register/api/auth/:path*/',
        destination: 'http://localhost:8000/api/auth/:path*/'
      }
    ]
  },
  trailingSlash: true
};

export default nextConfig;
