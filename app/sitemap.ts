import type { MetadataRoute } from "next";
import { getInsightPosts } from "@/lib/data/insights-loader";
import { insightArticlePath } from "@/lib/insights/content";
import { industrySitemapPaths } from "@/lib/data/industries-catalog";
import { productSitemapPaths } from "@/lib/data/products-catalog";
import { intentSitemapPaths } from "@/lib/seo/intent-pages";

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
  "/services/web-design-in-ghana",
  "/services/web-design-in-accra",
  "/services/website-to-mobile-app",
  "/terms",
  "/team",
  "/tools/project-cost",
  "/tools/proposal",
  "/tools/security-assessment",
  ...productSitemapPaths,
  ...intentSitemapPaths(),
  "/industries",
  ...industrySitemapPaths,
];

/** Align with portfolio revalidation so sitemap picks up new projects without redeploy. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let insightPosts: Awaited<ReturnType<typeof getInsightPosts>> = [];
  try {
    insightPosts = await getInsightPosts();
  } catch {
    insightPosts = [];
  }
  const insightRoutes = insightPosts.map((p) => insightArticlePath(p.slug));
  const topSeo = new Set([
    "/services/web-design-in-accra",
    "/services/web-design-in-ghana",
    "/guides/website-cost-in-ghana",
    "/about",
    "/reviews",
    "/services/web-development",
  ]);

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
        : topSeo.has(path)
          ? 0.9
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

  let slugs: string[] = [];
  try {
    const { getPortfolioSlugs } = await import("@/lib/data/portfolio-loader");
    slugs = await getPortfolioSlugs();
  } catch {
    slugs = [];
  }
  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...insightEntries, ...projectEntries];
}
