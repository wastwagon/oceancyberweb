/**
 * Shared user-facing labels for in-house portfolio samples (not client deliveries).
 * Source classification: `PortfolioSource` `"concept"` | `"client"`.
 */
export const CONCEPT_PORTFOLIO_BADGE = "In-house concept";
export const CONCEPT_PORTFOLIO_BADGE_LONG = "In-house concept — illustrative";
export const CONCEPT_PORTFOLIO_CLIENT_LABEL = "OceanCyber (in-house sample)";
export const CONCEPT_PORTFOLIO_DESCRIPTION_LEAD =
  "An in-house concept dashboard — illustrative UI patterns used in design proposals. Not a live client deployment.";

/** Portfolio Creative Hub tab + gallery figcaptions. */
export const CONCEPT_PORTFOLIO_TAB_LEAD =
  "In-house concept work and illustrative UI — not live client deployments.";

export const CONCEPT_PORTFOLIO_GALLERY_DISCLAIMER =
  "In-house concept — illustrative work by OceanCyber, not a live client deployment.";

/** JSON-LD for concept case study pages (noindex, but consistent if crawled). */
export const CONCEPT_PORTFOLIO_JSON_LD_GENRE = "In-house design sample";
export const CONCEPT_PORTFOLIO_JSON_LD_ABSTRACT =
  "Illustrative in-house UI from OceanCyber's development agency team — not a live third-party client deployment.";

export function conceptPortfolioOpenGraphBrandSuffix(): string {
  return "OceanCyber in-house concept";
}

export function conceptPortfolioMetaDescription(): string {
  return `${CONCEPT_PORTFOLIO_DESCRIPTION_LEAD} From OceanCyber, an Accra website and mobile app development agency.`;
}

export const CLIENT_PORTFOLIO_DETAIL_CTA = "View case study";
export const CONCEPT_PORTFOLIO_DETAIL_CTA = "View in-house concept";

export function portfolioDetailCtaLabel(isConcept: boolean): string {
  return isConcept ? CONCEPT_PORTFOLIO_DETAIL_CTA : CLIENT_PORTFOLIO_DETAIL_CTA;
}
