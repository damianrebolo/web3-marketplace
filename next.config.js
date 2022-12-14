/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "gateway.ipfscdn.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.decentraland.org",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
