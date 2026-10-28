import { describe, expect, it } from "vitest";
import { portfolioDetailDescription } from "@/lib/portfolio/portfolio-seo-metadata";
import { CONCEPT_PORTFOLIO_SLUGS } from "@/lib/portfolio/portfolio-source";

describe("portfolioDetailDescription", () => {
  it("uses safe concept meta for in-house slugs even when results look like client proof", () => {
    const slug = [...CONCEPT_PORTFOLIO_SLUGS][0]!;
    const desc = portfolioDetailDescription({
      title: "OceanCyber Creative Hub",
      slug,
      category: "Creative Dashboard",
      description: "Short",
      tech: [],
      image: "/images/x.webp",
      gradient: "",
      year: "2026",
      client: "OceanCyber",
      rating: 5,
      results: "500% fake growth",
      portfolioSource: "concept",
    });
    expect(desc.toLowerCase()).toContain("in-house concept");
    expect(desc).not.toContain("500%");
  });
});
