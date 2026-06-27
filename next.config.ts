import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all local images from the public directory without optimization issues
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
