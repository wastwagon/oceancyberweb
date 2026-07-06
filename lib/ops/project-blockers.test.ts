import { describe, expect, it } from "vitest";
import { projectHasOpenBlocker } from "./project-blockers";

describe("projectHasOpenBlocker", () => {
  it("returns false when no activities", () => {
    expect(projectHasOpenBlocker(undefined)).toBe(false);
    expect(projectHasOpenBlocker([])).toBe(false);
  });

  it("detects open blocker before resolution", () => {
    expect(
      projectHasOpenBlocker([
        { note: "Blocker resolved: DNS propagated", metadata: { category: "blocker" }, createdAt: "2026-01-02T00:00:00Z" },
        { note: "Waiting on client DNS", metadata: { category: "blocker" }, createdAt: "2026-01-01T00:00:00Z" },
      ]),
    ).toBe(false);
  });

  it("returns true for latest blocker activity", () => {
    expect(
      projectHasOpenBlocker([
        { note: "General update", metadata: { category: "general" }, createdAt: "2026-01-01T00:00:00Z" },
        { note: "SSL cert pending", metadata: { category: "blocker" }, createdAt: "2026-01-02T00:00:00Z" },
      ]),
    ).toBe(true);
  });
});
