import type { MetadataRoute } from "next";
import { getPortfolioSlugs } from "@/lib/data/portfolio-loader";
import { getInsightPosts } from "@/lib/data/insights-loader";
import { insightArticlePath } from "@/lib/insights/content";
import { industrySitemapPaths } from "@/lib/data/industries-catalog";
import { productSitemapPaths } from "@/lib/data/products-catalog";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const routes = [
  "",
  "/about",
  "/contact",
  "/cookies",
  "/design-process",
  "/how-we-work",
  "/domains",
  "/get-started",
  "/help-center",
  "/hosting",
  "/insights",
  "/portfolio",
  "/creative-hub",
  "/pricing",
  "/reviews",
  "/privacy",
  "/security-journey",
  "/services",
  "/services/cybersecurity",
  "/services/ecommerce",
  "/services/mobile-apps",
  "/services/ui-ux-design",
  "/services/web-development",
  "/services/website-to-mobile-app",
  "/terms",
  "/team",
  "/tools/project-cost",
  "/tools/proposal",
  "/tools/security-assessment",
  ...productSitemapPaths,
  "/industries",
  ...industrySitemapPaths,
];

/** Align with portfolio revalidation so sitemap picks up new projects without redeploy. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const insightPosts = await getInsightPosts();
  const insightRoutes = insightPosts.map((p) => insightArticlePath(p.slug));
  const highIntent = new Set([
    "/get-started",
    "/tools/project-cost",
    "/tools/security-assessment",
    "/contact",
    "/hosting",
    "/domains",
    "/products",
    "/products/pos",
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
  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...insightEntries, ...projectEntries];
}
