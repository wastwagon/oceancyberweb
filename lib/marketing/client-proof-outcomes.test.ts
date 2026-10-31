import { describe, expect, it } from "vitest";
import { CLIENT_PROOF_LINES } from "@/lib/marketing/client-proof-outcomes";
import { UNVERIFIABLE_PERCENT_PATTERN } from "@/lib/marketing/long-term-trust-policy";

describe("client-proof-outcomes", () => {
  it("uses verifiable live URLs without percentage shortcuts", () => {
    for (const line of Object.values(CLIENT_PROOF_LINES)) {
      expect(line.toLowerCase()).toMatch(/live at|— live/);
      expect(line).not.toMatch(UNVERIFIABLE_PERCENT_PATTERN);
    }
  });
});
