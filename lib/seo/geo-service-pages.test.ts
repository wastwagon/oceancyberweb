import { describe, expect, it } from "vitest";
import {
  geoServicePages,
  geoServiceRedirects,
  getGeoServicePage,
} from "@/lib/seo/geo-service-pages";

describe("geo service pages", () => {
  it("ships Accra and Ghana pages without website-development twins", () => {
    expect(geoServicePages.length).toBe(12);
    expect(getGeoServicePage("website-development-in-accra")).toBeUndefined();
    expect(getGeoServicePage("web-development-in-accra")?.h1).toBe(
      "Best web development company in Accra",
    );
    expect(getGeoServicePage("web-development-in-accra")?.title).toContain("from GHS");
  });

  it("gives Accra and Ghana unique intros", () => {
    const accra = getGeoServicePage("mobile-app-development-in-accra");
    const ghana = getGeoServicePage("mobile-app-development-in-ghana");
    expect(accra?.intro).not.toBe(ghana?.intro);
    expect(accra?.focus).not.toBe(ghana?.focus);
    expect(accra?.title).toMatch(/from GHS 12,000/);
  });

  it("redirects website-development to web-development", () => {
    expect(geoServiceRedirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/services/website-development-in-accra",
          destination: "/services/web-development-in-accra",
        }),
      ]),
    );
  });
});
