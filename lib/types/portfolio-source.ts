/** Whether a portfolio entry is a delivered client engagement or in-house concept work. */
export type PortfolioSource = "client" | "concept";

export type SourceFilter = "All" | PortfolioSource;

export const PORTFOLIO_SOURCE_LABELS: Record<PortfolioSource, string> = {
  client: "Client work",
  concept: "Concept work",
};

/** Legacy value stored in older Project.details JSON — normalized at read time. */
export const LEGACY_CONCEPT_PORTFOLIO_SOURCE = "studio" as const;
