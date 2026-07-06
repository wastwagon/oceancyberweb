/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "https", hostname: "oceancyber.net", pathname: "/**" },
      { protocol: "https", hostname: "cdn.prod.website-files.com", pathname: "/**" },
      { protocol: "https", hostname: "d3e54v103j8qbb.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    instrumentationHook: true,
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/portfolio/:slug",
        permanent: true,
      },
      {
        source: "/ocean-legacy",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
