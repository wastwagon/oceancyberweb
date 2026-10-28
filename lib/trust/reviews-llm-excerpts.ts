import type { GooglePlaceReview } from "@/lib/google-places-stats";

const DEFAULT_MAX_CHARS = 220;

function truncateForLlms(text: string, maxChars = DEFAULT_MAX_CHARS): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars - 1).trim()}…`;
}

/** Short quoted excerpts for llms.txt — public Google text only, not curated testimonials. */
export function formatLlmsGoogleReviewExcerpts(
  reviews: GooglePlaceReview[],
  limit = 3,
): string {
  if (reviews.length === 0) {
    return "- (No review excerpts synced — use aggregate rating on /reviews and Google Business Profile.)";
  }

  return reviews
    .slice(0, limit)
    .map((r) => {
      const quote = truncateForLlms(r.quote);
      return `- ${r.name} (${r.rating}★): “${quote}”`;
    })
    .join("\n");
}
