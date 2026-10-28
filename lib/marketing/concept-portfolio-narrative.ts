import { CONCEPT_PORTFOLIO_SLUGS } from "@/lib/portfolio/portfolio-source";

/** In-house sample pages — not client challenge/solution/impact story arcs. */
export type ConceptPortfolioNarrative = {
  purpose: string;
  whatItShows: string;
  labelling: string;
};

export const CONCEPT_PORTFOLIO_NARRATIVES: Record<string, ConceptPortfolioNarrative> = {
  "creative-hub-template": {
    purpose:
      "Prospects and partners often ask how dense analytics and brand UI could look before they commit to a full build.",
    whatItShows:
      "An in-house Creative Hub layout with motion, glass surfaces, and component patterns aligned to the OceanCyber brand system — used in pitches, not shipped as a product.",
    labelling:
      "Always labelled in-house concept work on the portfolio hub and in metadata. It is not a live client deployment and must not be quoted as client proof.",
  },
};

export function getConceptPortfolioNarrative(
  slug: string,
): ConceptPortfolioNarrative | null {
  if (!CONCEPT_PORTFOLIO_SLUGS.has(slug)) return null;
  return CONCEPT_PORTFOLIO_NARRATIVES[slug] ?? null;
}
