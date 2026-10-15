import { describe, expect, it } from "vitest";
import { servicePageSeoEntries } from "@/lib/seo/service-page-seo";
import { geoServicePages } from "@/lib/seo/geo-service-pages";
import {
  capabilityPathsForbiddenBestHire,
  keywordOwners,
  normalizePhrase,
} from "@/lib/seo/keyword-ownership";

describe("keyword ownership anti-cannibalization", () => {
  it("assigns each Best hire phrase to exactly one owner path", () => {
    const hire = keywordOwners.filter((row) => row.role === "geo-hire" || row.role === "homepage");
    const phrases = hire.map((row) => row.phrase);
    expect(new Set(phrases).size).toBe(phrases.length);
  });

  it("keeps capability service SEO free of Best Accra/Ghana hire titles", () => {
    const bestHire = /best .{0,40} company in (accra|ghana)/i;
    for (const path of capabilityPathsForbiddenBestHire) {
      const entry = servicePageSeoEntries.find((row) => row.path === path);
      if (!entry) continue;
      expect(bestHire.test(entry.name)).toBe(false);
      expect(bestHire.test(entry.description)).toBe(false);
    }
  });

  it("geo hire pages own Best company titles and Accra≠Ghana copy", () => {
    for (const topic of ["web-development", "mobile-app-development", "software-development"]) {
      const accra = geoServicePages.find((p) => p.slug === `${topic}-in-accra`);
      const ghana = geoServicePages.find((p) => p.slug === `${topic}-in-ghana`);
      expect(accra).toBeTruthy();
      expect(ghana).toBeTruthy();
      expect(normalizePhrase(accra!.h1)).toContain("best");
      expect(accra!.intro).not.toEqual(ghana!.intro);
      expect(accra!.focus).not.toEqual(ghana!.focus);
    }
  });

  it("does not publish website-development geo pages", () => {
    expect(geoServicePages.some((p) => p.topicKey === "website-development")).toBe(false);
  });
});
