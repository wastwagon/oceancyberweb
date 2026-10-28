import { describe, expect, it } from "vitest";
import { overlayStudioFallbackCopy } from "@/lib/portfolio/studio-fallback-overlay";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";

describe("overlayStudioFallbackCopy", () => {
  it("strips stale demo metrics from creative-hub DB rows", () => {
    const stale: PortfolioCaseStudy = {
      title: "Creative Hub",
      slug: "creative-hub-template",
      category: "Dashboard",
      description: "Internal Prototype with 500% gains",
      tech: ["Next.js"],
      gradient: "from-red-500 to-red-600",
      image: "/images/bad.png",
      year: "2020",
      client: "Internal Prototype",
      rating: 5,
      metrics: { increase: "500%", metric: "Fake" },
      testimonial: "Fake quote",
      portfolioSource: "client",
    };

    const out = overlayStudioFallbackCopy(stale);
    expect(out.portfolioSource).toBe("studio");
    expect(out.metrics).toBeUndefined();
    expect(out.testimonial).toBeUndefined();
    expect(out.description.toLowerCase()).toContain("studio");
    expect(out.description).not.toContain("500%");
  });

  it("leaves client slugs unchanged", () => {
    const client: PortfolioCaseStudy = {
      title: "ThinQ Shopping",
      slug: "thinq-shopping",
      category: "Retail",
      description: "Live commerce app",
      tech: ["Next.js"],
      gradient: "from-blue-500 to-cyan-500",
      image: "/images/x.webp",
      year: "2024",
      client: "ThinQ",
      rating: 5,
    };
    expect(overlayStudioFallbackCopy(client)).toEqual(client);
  });
});
