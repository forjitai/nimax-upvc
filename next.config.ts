import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Product ranges removed on 24 Oct 2026 (business is UPVC profiles and windows only).
  // Send any old links to the products page instead of a 404.
  async redirects() {
    return [
      { source: "/products/upvc-doors/:path*", destination: "/products", permanent: true },
      { source: "/products/aluminium/:path*", destination: "/products", permanent: true },
      { source: "/products/glass-systems/:path*", destination: "/products", permanent: true },
      { source: "/products/upvc-doors", destination: "/products", permanent: true },
      { source: "/products/aluminium", destination: "/products", permanent: true },
      { source: "/products/glass-systems", destination: "/products", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
