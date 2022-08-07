const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  eslint: {
    dirs: [
      "src/components",
      "src/globalStates",
      "src/hooks",
      "src/lib",
      "src/pages",
      "src/types",
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);
