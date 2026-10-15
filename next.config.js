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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
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
      {
        source: "/oceancyber",
        destination: "/",
        permanent: true,
      },
      {
        source: "/oceancyber/:path*",
        destination: "/",
        permanent: true,
      },
      /** Collapse website-development geo URLs into web-development (anti-cannibalization). */
      {
        source: "/services/website-development-in-accra",
        destination: "/services/web-development-in-accra",
        permanent: true,
      },
      {
        source: "/services/website-development-in-ghana",
        destination: "/services/web-development-in-ghana",
        permanent: true,
      },
      {
        source: "/products/pos",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
