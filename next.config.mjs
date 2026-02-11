/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aquaelectrical.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
