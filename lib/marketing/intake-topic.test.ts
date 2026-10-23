import { describe, expect, it } from "vitest";
import { resolveIntakeInitialTopic } from "./intake-topic";

describe("resolveIntakeInitialTopic", () => {
  it("returns undefined when no params", () => {
    expect(resolveIntakeInitialTopic()).toBeUndefined();
  });

  it("maps known plan ids to a package line", () => {
    expect(resolveIntakeInitialTopic({ plan: "professional" })).toMatch(
      /Professional package/,
    );
  });

  it("combines plan and topic", () => {
    const result = resolveIntakeInitialTopic({
      plan: "startup",
      topic: "From pricing page",
    });
    expect(result).toContain("Startup package");
    expect(result).toContain("From pricing page");
  });
});
