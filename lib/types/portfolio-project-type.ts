export const PORTFOLIO_PROJECT_TYPES = ["design", "development", "hybrid"] as const;

export type PortfolioProjectType = (typeof PORTFOLIO_PROJECT_TYPES)[number];

export const PORTFOLIO_PROJECT_TYPE_LABELS: Record<PortfolioProjectType, string> = {
  design: "Design",
  development: "Development",
  hybrid: "Full delivery",
};
