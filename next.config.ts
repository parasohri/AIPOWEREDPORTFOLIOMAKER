import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;