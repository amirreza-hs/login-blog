/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nabsteel.rahkartest.ir",
        port: "", // Leave empty if no custom port is used
        pathname: "/wp-content/uploads/**", // Match the path pattern for your images
      },
    ],
  },
};

export default nextConfig;
