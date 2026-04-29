import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/checkout",
        "/dashboard",
        "/ocean-legacy",
        "/signin",
        "/signup",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
