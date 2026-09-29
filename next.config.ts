import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Keystatic local editing in development
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
};

export default nextConfig;
