import type { MetadataRoute } from "next";
import { insightArticlePath, insightPosts } from "@/lib/insights/content";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const routes = [
  "",
  "/about",
  "/contact",
  "/portfolio",
  "/case-studies",
  "/insights",
  "/security-journey",
  "/services",
  "/services/web-development",
  "/services/mobile-apps",
  "/services/ecommerce",
  "/services/cybersecurity",
  "/industries",
  "/industries/healthcare",
  "/industries/financial-services",
  "/industries/retail",
  "/industries/education",
];

const insightRoutes = insightPosts.map((p) => insightArticlePath(p.slug));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = insightRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...insightEntries];
}
