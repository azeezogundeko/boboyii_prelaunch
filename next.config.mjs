/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [];
  },
  webSocketTimeout: 30000,
};

export default nextConfig;
