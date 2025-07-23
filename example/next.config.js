/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-marquee-slider", "styled-components"],
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
