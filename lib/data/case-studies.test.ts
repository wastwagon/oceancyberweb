import { describe, expect, it } from "vitest";
import { getCaseStudyNarrativeBySlug } from "@/lib/data/case-studies";
import { getConceptPortfolioNarrative } from "@/lib/marketing/concept-portfolio-narrative";

describe("case study narratives", () => {
  it("does not attach client win narrative to in-house concept slugs", () => {
    expect(getCaseStudyNarrativeBySlug("creative-hub-template")).toBeNull();
    expect(getConceptPortfolioNarrative("creative-hub-template")?.labelling).toMatch(
      /in-house concept/i,
    );
  });

  it("still serves client narratives", () => {
    expect(getCaseStudyNarrativeBySlug("fitch-advisory")?.impact).toBeTruthy();
  });
});
