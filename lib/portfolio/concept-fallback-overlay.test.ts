import { describe, expect, it } from "vitest";
import { overlayConceptFallbackCopy } from "@/lib/portfolio/concept-fallback-overlay";

describe("overlayConceptFallbackCopy", () => {
  it("strips stale demo metrics from creative-hub DB rows", () => {
    const stale = {
      title: "OceanCyber Creative Hub",
      slug: "creative-hub-template",
      category: "Creative Dashboard",
      description: "Old inflated copy",
      tech: [],
      image: "/images/x.webp",
      gradient: "from-purple-500 to-cyan-500",
      year: "2026",
      client: "Fake client",
      rating: 5,
      metrics: { increase: "500%", metric: "Growth" },
      testimonial: "Fake quote",
      portfolioSource: "client" as const,
    };

    const out = overlayConceptFallbackCopy(stale);
    expect(out.portfolioSource).toBe("concept");
    expect(out.metrics).toBeUndefined();
    expect(out.testimonial).toBeUndefined();
    expect(out.description.toLowerCase()).toContain("in-house concept");
  });

  it("leaves client projects unchanged", () => {
    const client = {
      title: "EGP Ghana",
      slug: "egp-ghana",
      category: "Financial Services",
      description: "Real client",
      tech: ["Next.js"],
      image: "/images/x.webp",
      gradient: "from-ocean-500 to-cyan-500",
      year: "2024",
      client: "EGP Ghana",
      rating: 5,
      portfolioSource: "client" as const,
    };
    expect(overlayConceptFallbackCopy(client)).toEqual(client);
  });
});
