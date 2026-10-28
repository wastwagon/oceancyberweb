import { describe, expect, it } from "vitest";
import { buildGoogleReviewJsonLdNodes } from "@/lib/trust/review-json-ld";

describe("buildGoogleReviewJsonLdNodes", () => {
  it("maps public Google reviews to schema.org Review nodes", () => {
    const nodes = buildGoogleReviewJsonLdNodes([
      {
        quote: "Professional team.",
        name: "Jane Doe",
        role: "Google review",
        rating: 5,
        initials: "JD",
      },
    ]);
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toMatchObject({
      "@type": "Review",
      reviewBody: "Professional team.",
      author: { "@type": "Person", name: "Jane Doe" },
    });
  });
});
