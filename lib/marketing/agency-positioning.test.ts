import { describe, expect, it } from "vitest";
import { buildSiteMetaDescription, footerTagline } from "@/lib/marketing/agency-positioning";

describe("agency-positioning", () => {
  it("buildSiteMetaDescription leads with agency identity and Maps hook", () => {
    const d = buildSiteMetaDescription({
      reviewsOnly: "Rated 4.9 from 56 Google reviews",
      teamSize: 25,
      street: "47 Nii Kwashiefio Avenue",
    });
    expect(d.toLowerCase()).toContain("website and mobile app development agency");
    expect(d.toLowerCase()).toContain("web design company");
    expect(d).not.toMatch(/\bstudio\b/i);
  });

  it("footerTagline avoids studio positioning", () => {
    const t = footerTagline(25, 2008);
    expect(t.toLowerCase()).toContain("development agency");
    expect(t).not.toMatch(/\bstudio\b/i);
  });
});
