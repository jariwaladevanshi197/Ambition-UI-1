import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Public pages read CMS content through `use cache` loaders (src/lib/cms/server.ts).
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
  },
};

export default nextConfig;
