// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  output: "standalone", // Streamline deployment for serverless functions
  swcMinify: true, // Use SWC minification for smaller bundles
  webpack(config, { isServer }) {
    config.externals = config.externals || {};

    // Example of excluding a large package (replace with specific packages if needed)
    config.externals["@next/env"] = "commonjs @next/env";

    // If you have other large packages that are not needed server-side, exclude them here
    if (isServer) {
      config.externals.push("@some-large-package"); // Replace with actual large package names, if any
    }

    return config;
  },
});
