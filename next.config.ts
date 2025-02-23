import type { NextConfig } from "next";

{/* TODO: Determine whether these config options are necessary */}
const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: ['html-loader'],
      });

      // Add the fallbacks for fs and child_process modules
      config.resolve.fallback = {
        fs: false,
        child_process: false,
      };
    }

    return config;
  },
};

export default nextConfig;
