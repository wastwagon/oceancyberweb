import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import {
  PORTFOLIO_PROJECT_TYPE_LABELS,
  type PortfolioProjectType,
} from "@/lib/types/portfolio-project-type";

export const PROJECT_TYPE_BY_SLUG: Record<string, PortfolioProjectType> = {
  "creative-hub-template": "design",
  "egp-ghana": "hybrid",
  "juelle-hair": "hybrid",
  "tour-world-tourism": "development",
  "fitch-advisory": "hybrid",
  "fitch-attorneys": "hybrid",
  "africa-governance-centre": "hybrid",
  "thinq-shopping": "hybrid",
  "africa-trade-awards": "development",
  "african-trade-chamber": "hybrid",
};

const DESIGN_KEYWORDS = ["ui/ux", "ui", "ux", "brand", "design", "prototype", "figma"];
const DEV_KEYWORDS = ["api", "engineering", "devops", "database", "security", "hosting"];

function servicesText(project: PortfolioCaseStudy): string {
  return (project.services ?? []).join(" ").toLowerCase();
}

export function inferProjectType(project: PortfolioCaseStudy): PortfolioProjectType {
  const text = servicesText(project);
  const hasDesign = DESIGN_KEYWORDS.some((k) => text.includes(k));
  const hasDev = DEV_KEYWORDS.some((k) => text.includes(k)) || project.tech.length > 0;

  if (hasDesign && !hasDev) return "design";
  if (hasDesign && hasDev) return "hybrid";
  if (project.category.toLowerCase().includes("creative")) return "design";
  return "development";
}

export function resolveProjectType(project: PortfolioCaseStudy): PortfolioProjectType {
  return project.projectType ?? PROJECT_TYPE_BY_SLUG[project.slug] ?? inferProjectType(project);
}

export function getProjectTypeLabel(type: PortfolioProjectType): string {
  return PORTFOLIO_PROJECT_TYPE_LABELS[type];
}

export function enrichPortfolioCaseStudy(project: PortfolioCaseStudy): PortfolioCaseStudy {
  return {
    ...project,
    projectType: resolveProjectType(project),
  };
}
