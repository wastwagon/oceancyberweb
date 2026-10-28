import type { Metadata } from "next";
import {
  CONCEPT_PORTFOLIO_BADGE,
  conceptPortfolioMetaDescription,
  conceptPortfolioOpenGraphBrandSuffix,
} from "@/lib/marketing/concept-portfolio-copy";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { isConceptPortfolio, resolvePortfolioSource } from "@/lib/portfolio/portfolio-source";

export function portfolioSourceOf(project: PortfolioCaseStudy) {
  return resolvePortfolioSource(project);
}

export { isConceptPortfolio } from "@/lib/portfolio/portfolio-source";

export function portfolioDetailTitle(project: PortfolioCaseStudy): string {
  return isConceptPortfolio(project)
    ? `${project.title} — ${CONCEPT_PORTFOLIO_BADGE}`
    : `${project.title} — Client case study`;
}

export function portfolioOpenGraphTitle(project: PortfolioCaseStudy): string {
  return isConceptPortfolio(project)
    ? `${project.title} | ${conceptPortfolioOpenGraphBrandSuffix()}`
    : `${project.title} | OceanCyber case study`;
}

export function portfolioOgImageAlt(project: PortfolioCaseStudy): string {
  return isConceptPortfolio(project)
    ? `${project.title} — OceanCyber in-house design sample (illustrative)`
    : `${project.title} — OceanCyber client delivery`;
}

/** Meta description — concept pages must not use stale demo metrics from results fields. */
export function portfolioDetailDescription(
  project: PortfolioCaseStudy,
  narrative?: { impact?: string } | null,
): string {
  if (isConceptPortfolio(project)) {
    return conceptPortfolioMetaDescription();
  }
  const fromNarrative = narrative?.impact?.trim();
  if (fromNarrative) return fromNarrative.slice(0, 160);
  const fromResults = project.results?.trim();
  if (fromResults) return fromResults.slice(0, 160);
  return project.description.slice(0, 160);
}

export function portfolioDetailRobots(project: PortfolioCaseStudy): Metadata["robots"] {
  if (isConceptPortfolio(project)) {
    return { index: false, follow: true };
  }
  return undefined;
}
