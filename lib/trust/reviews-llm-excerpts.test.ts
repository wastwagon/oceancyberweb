import { describe, expect, it } from "vitest";
import { formatLlmsGoogleReviewExcerpts } from "@/lib/trust/reviews-llm-excerpts";

describe("formatLlmsGoogleReviewExcerpts", () => {
  it("formats up to three excerpts with truncation", () => {
    const long = "word ".repeat(80);
    const out = formatLlmsGoogleReviewExcerpts([
      { quote: "Great web team.", name: "Ama", role: "Google review", rating: 5, initials: "AM" },
      { quote: long, name: "Kofi", role: "Google review", rating: 5, initials: "KO" },
    ]);
    expect(out).toContain("Ama (5★)");
    expect(out).toContain("Great web team.");
    expect(out).toContain("…");
  });

  it("handles empty reviews", () => {
    expect(formatLlmsGoogleReviewExcerpts([])).toContain("No review excerpts");
  });
});
