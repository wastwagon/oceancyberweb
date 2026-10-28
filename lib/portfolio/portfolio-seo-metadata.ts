import type { Metadata } from "next";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { resolvePortfolioSource } from "@/lib/portfolio/portfolio-source";

export function portfolioSourceOf(project: PortfolioCaseStudy) {
  return resolvePortfolioSource(project);
}

export function isStudioPortfolio(project: PortfolioCaseStudy): boolean {
  return portfolioSourceOf(project) === "studio";
}

export function portfolioDetailTitle(project: PortfolioCaseStudy): string {
  return isStudioPortfolio(project)
    ? `${project.title} — Studio concept`
    : `${project.title} — Case study`;
}

export function portfolioOpenGraphTitle(project: PortfolioCaseStudy): string {
  return isStudioPortfolio(project)
    ? `${project.title} | OceanCyber studio concept`
    : `${project.title} | OceanCyber case study`;
}

export function portfolioOgImageAlt(project: PortfolioCaseStudy): string {
  return isStudioPortfolio(project)
    ? `${project.title} — OceanCyber studio design concept (illustrative)`
    : `${project.title} — OceanCyber client delivery`;
}

export function portfolioDetailRobots(project: PortfolioCaseStudy): Metadata["robots"] {
  if (isStudioPortfolio(project)) {
    return { index: false, follow: true };
  }
  return undefined;
}
