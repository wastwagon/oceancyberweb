import { afterEach, describe, expect, it } from "vitest";
import {
  getGoogleBusinessProfileUrl,
  getGoogleWriteReviewUrl,
} from "./google-business";

describe("google-business URLs", () => {
  const env = process.env;

  afterEach(() => {
    process.env = env;
  });

  it("uses GBP profile URL for read/reviews links", () => {
    process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL =
      "https://g.page/r/CTpsyAyrQ3FIEAI";
    expect(getGoogleBusinessProfileUrl()).toBe(
      "https://g.page/r/CTpsyAyrQ3FIEAI",
    );
  });

  it("prefers g.page write link over Place ID writereview URL", () => {
    process.env.NEXT_PUBLIC_GOOGLE_WRITE_REVIEW_URL =
      "https://g.page/r/CTpsyAyrQ3FIEAI/review";
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID = "ChIJtest";
    expect(getGoogleWriteReviewUrl()).toBe(
      "https://g.page/r/CTpsyAyrQ3FIEAI/review",
    );
  });
});
