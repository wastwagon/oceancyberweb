import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import {
  LEGACY_CONCEPT_PORTFOLIO_SOURCE,
  type PortfolioSource,
  type SourceFilter,
} from "@/lib/types/portfolio-source";
import { enrichPortfolioCaseStudy } from "@/lib/portfolio/project-type";

/** Slugs that must always use canonical concept copy from fallback data (even if DB is stale). */
export const CONCEPT_PORTFOLIO_SLUGS = new Set(["creative-hub-template"]);

/** Top partner deliveries — homepage and client filter prioritize these. */
export const FEATURED_CLIENT_SLUGS = [
  "fitch-advisory",
  "fitch-attorneys",
  "africa-governance-centre",
  "thinq-shopping",
] as const;

export function normalizePortfolioSource(
  value: string | undefined | null,
): PortfolioSource | undefined {
  if (!value) return undefined;
  if (value === LEGACY_CONCEPT_PORTFOLIO_SOURCE) return "concept";
  if (value === "client" || value === "concept") return value;
  return undefined;
}

/** Maps legacy `?source=studio` and stored JSON to the concept filter. */
export function parseSourceFilterParam(value: string | null): SourceFilter | null {
  if (!value) return null;
  if (value === LEGACY_CONCEPT_PORTFOLIO_SOURCE) return "concept";
  if (value === "All" || value === "client" || value === "concept") {
    return value;
  }
  return null;
}

export function resolvePortfolioSource(project: PortfolioCaseStudy): PortfolioSource {
  const fromField = normalizePortfolioSource(project.portfolioSource);
  if (fromField) return fromField;
  if (CONCEPT_PORTFOLIO_SLUGS.has(project.slug)) return "concept";

  const client = project.client.toLowerCase();
  if (
    client.includes("internal") ||
    client.includes("prototype") ||
    client.includes("in-house sample") ||
    project.slug.includes("template")
  ) {
    return "concept";
  }

  return "client";
}

export function isConceptPortfolio(project: PortfolioCaseStudy): boolean {
  return resolvePortfolioSource(project) === "concept";
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
