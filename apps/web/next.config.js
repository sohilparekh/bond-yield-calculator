/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/api", "@repo/ui"],
  allowedDevOrigins: ['http://localhost:3000'],
};

export default nextConfig;
