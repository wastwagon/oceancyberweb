import { describe, expect, it } from "vitest";
import {
  normalizePortfolioSource,
  parseSourceFilterParam,
  resolvePortfolioSource,
} from "@/lib/portfolio/portfolio-source";
import { LEGACY_CONCEPT_PORTFOLIO_SOURCE } from "@/lib/types/portfolio-source";

describe("normalizePortfolioSource", () => {
  it("maps legacy studio JSON to concept", () => {
    expect(normalizePortfolioSource("studio")).toBe("concept");
  });

  it("passes through canonical values", () => {
    expect(normalizePortfolioSource("client")).toBe("client");
    expect(normalizePortfolioSource("concept")).toBe("concept");
  });
});

describe("parseSourceFilterParam", () => {
  it("maps legacy ?source=studio to concept filter", () => {
    expect(parseSourceFilterParam("studio")).toBe("concept");
  });
});

describe("resolvePortfolioSource", () => {
  it("normalizes stored legacy studio on projects", () => {
    expect(
      resolvePortfolioSource({
        title: "X",
        slug: "egp-ghana",
        category: "Fin",
        description: "d",
        tech: [],
        image: "",
        gradient: "",
        year: "",
        client: "EGP",
        rating: 5,
        portfolioSource: LEGACY_CONCEPT_PORTFOLIO_SOURCE,
      }),
    ).toBe("concept");
  });
});
