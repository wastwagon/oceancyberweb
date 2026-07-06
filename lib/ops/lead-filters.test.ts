import { describe, expect, it } from "vitest";
import { leadPresetCount } from "./lead-filters";

describe("leadPresetCount", () => {
  it("maps preset ids to backend count fields", () => {
    const counts = {
      all: 10,
      newOnly: 3,
      projectCalculator: 2,
      chat: 1,
      namecheapCheckout: 4,
      websiteToAppQuote: 5,
    };
    expect(leadPresetCount("all", counts)).toBe(10);
    expect(leadPresetCount("namecheap-checkout", counts)).toBe(4);
    expect(leadPresetCount("website-to-app", counts)).toBe(5);
  });
});
