import { fallbackPortfolioCaseStudies } from "@/lib/data/projects";
import { STUDIO_PORTFOLIO_SLUGS } from "@/lib/portfolio/portfolio-source";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";

const canonicalStudioBySlug = new Map(
  fallbackPortfolioCaseStudies
    .filter((p) => STUDIO_PORTFOLIO_SLUGS.has(p.slug))
    .map((p) => [p.slug, p] as const),
);

/**
 * Production DB rows may predate studio hygiene — force index-safe copy for known studio slugs.
 */
export function overlayStudioFallbackCopy(project: PortfolioCaseStudy): PortfolioCaseStudy {
  const canonical = canonicalStudioBySlug.get(project.slug);
  if (!canonical) return project;

  return {
    ...project,
    title: canonical.title,
    category: canonical.category,
    description: canonical.description,
    client: canonical.client,
    results: canonical.results,
    services: canonical.services,
    image: canonical.image,
    tech: canonical.tech,
    gradient: canonical.gradient,
    year: canonical.year,
    rating: canonical.rating,
    metrics: undefined,
    testimonial: undefined,
    portfolioSource: "studio",
  };
}
