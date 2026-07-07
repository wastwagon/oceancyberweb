/** Whether a portfolio entry is a delivered client engagement or in-house studio work. */
export type PortfolioSource = "client" | "studio";

export type SourceFilter = "All" | PortfolioSource;

export const PORTFOLIO_SOURCE_LABELS: Record<PortfolioSource, string> = {
  client: "Client work",
  studio: "Studio showcase",
};
