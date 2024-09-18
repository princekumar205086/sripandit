const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'randomuser.me',
            },
            {
                hostname: 'www.okpuja.in',
            },
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