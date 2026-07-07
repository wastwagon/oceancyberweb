import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import type { PortfolioSource, SourceFilter } from "@/lib/types/portfolio-source";
import { enrichPortfolioCaseStudy } from "@/lib/portfolio/project-type";

const STUDIO_SLUGS = new Set(["creative-hub-template"]);

/** Top partner deliveries — homepage and client filter prioritize these. */
export const FEATURED_CLIENT_SLUGS = [
  "fitch-advisory",
  "fitch-attorneys",
  "africa-governance-centre",
  "thinq-shopping",
] as const;

export function resolvePortfolioSource(project: PortfolioCaseStudy): PortfolioSource {
  if (project.portfolioSource) return project.portfolioSource;
  if (STUDIO_SLUGS.has(project.slug)) return "studio";

  const client = project.client.toLowerCase();
  if (
    client.includes("internal") ||
    client.includes("prototype") ||
    project.slug.includes("template")
  ) {
    return "studio";
  }

  return "client";
}

export function enrichPortfolioEntry(project: PortfolioCaseStudy): PortfolioCaseStudy {
  const withType = enrichPortfolioCaseStudy(project);
  return {
    ...withType,
    portfolioSource: resolvePortfolioSource(withType),
  };
}

export function filterByPortfolioSource(
  projects: PortfolioCaseStudy[],
  filter: SourceFilter,
): PortfolioCaseStudy[] {
  if (filter === "All") return projects;
  return projects.filter((p) => resolvePortfolioSource(p) === filter);
}

export function sortPortfolioForDisplay(
  projects: PortfolioCaseStudy[],
): PortfolioCaseStudy[] {
  const featuredRank = (slug: string) => {
    const idx = FEATURED_CLIENT_SLUGS.indexOf(
      slug as (typeof FEATURED_CLIENT_SLUGS)[number],
    );
    return idx === -1 ? 999 : idx;
  };

  return [...projects].sort((a, b) => {
    const sourceA = resolvePortfolioSource(a);
    const sourceB = resolvePortfolioSource(b);
    if (sourceA !== sourceB) {
      return sourceA === "client" ? -1 : 1;
    }
    return featuredRank(a.slug) - featuredRank(b.slug);
  });
}

export function mergePortfolioBySlug(
  ...lists: PortfolioCaseStudy[][]
): PortfolioCaseStudy[] {
  const bySlug = new Map<string, PortfolioCaseStudy>();
  for (const list of lists) {
    for (const project of list) {
      bySlug.set(project.slug, project);
    }
  }
  return [...bySlug.values()];
}
