import { describe, expect, it } from "vitest";
import { publicApiUrl } from "./public-api";

describe("publicApiUrl", () => {
  it("prefixes shorthand paths with /api/v1", () => {
    expect(publicApiUrl("contact")).toMatch(/\/api\/v1\/contact$/);
    expect(publicApiUrl("/contact/intake")).toMatch(/\/api\/v1\/contact\/intake$/);
  });

  it("leaves fully qualified /api/v1 paths unchanged", () => {
    const url = publicApiUrl("/api/v1/domains/checkout");
    expect(url).toMatch(/\/api\/v1\/domains\/checkout$/);
    expect(url).not.toMatch(/\/api\/v1\/api\/v1\//);
  });
});
