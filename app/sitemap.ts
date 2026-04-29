import type { MetadataRoute } from "next";
import { getPortfolioSlugs } from "@/lib/data/portfolio-loader";
import { insightArticlePath, insightPosts } from "@/lib/insights/content";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const routes = [
  "",
  "/about",
  "/case-studies",
  "/contact",
  "/cookies",
  "/domains",
  "/get-started",
  "/help-center",
  "/hosting",
  "/insights",
  "/portfolio",
  "/privacy",
  "/security-journey",
  "/services",
  "/services/cybersecurity",
  "/services/ecommerce",
  "/services/mobile-apps",
  "/services/web-development",
  "/services/website-to-mobile-app",
  "/terms",
  "/tools/project-cost",
  "/tools/proposal",
  "/industries",
  "/industries/education",
  "/industries/financial-services",
  "/industries/healthcare",
  "/industries/retail",
];

const insightRoutes = insightPosts.map((p) => insightArticlePath(p.slug));

/** Align with portfolio revalidation so sitemap picks up new projects without redeploy. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const highIntent = new Set([
    "/get-started",
    "/tools/project-cost",
    "/contact",
    "/hosting",
    "/domains",
  ]);

  const legalPaths = new Set(["/privacy", "/terms", "/cookies"]);

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency:
      path === ""
        ? "weekly"
        : legalPaths.has(path)
          ? "yearly"
          : "monthly",
    priority:
      path === ""
        ? 1
        : highIntent.has(path)
          ? 0.75
          : legalPaths.has(path)
            ? 0.35
            : 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = insightRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const slugs = await getPortfolioSlugs();
  const projectEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) => [
    {
      url: `${base}/portfolio/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${base}/case-studies/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    },
  ]);

  return [...staticEntries, ...insightEntries, ...projectEntries];
}
