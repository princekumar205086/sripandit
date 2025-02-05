
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.okpuja.com",
      },
      {
        hostname: "www.randomuser.me",
      },
      {
        hostname: "randomuser.me",
      },
      {
        hostname: "https://api.phonepe.com",
      },
      {
        hostname: "https://api-preprod.phonepe.com"
      }
      // Add other valid hostnames if needed
    ],
  },
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
