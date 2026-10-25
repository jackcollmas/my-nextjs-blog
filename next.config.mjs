/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  logging: {
    // Enable browser log forwarding
    browserToTerminal: true,
  },
  cacheComponents: true,
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
