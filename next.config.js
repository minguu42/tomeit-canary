const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: [
      "src/components",
      "src/globalStates",
      "src/lib",
      "src/pages",
      "src/styles",
      "src/types",
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);
