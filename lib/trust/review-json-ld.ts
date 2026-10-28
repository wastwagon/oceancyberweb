import { getGoogleBusinessProfileUrl } from "@/lib/startup-agency/google-business";
import type { GooglePlaceReview } from "@/lib/google-places-stats";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const localBusinessId = `${site}/#localbusiness`;

/** Up to five public Google excerpts — linked to sitewide LocalBusiness @id. */
export function buildGoogleReviewJsonLdNodes(
  reviews: GooglePlaceReview[],
): Record<string, unknown>[] {
  return reviews.slice(0, 5).map((review, index) => ({
    "@type": "Review",
    "@id": `${site}/reviews#review-${index + 1}`,
    author: {
      "@type": "Person",
      name: review.name,
      ...(review.authorUrl ? { url: review.authorUrl } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.quote,
    itemReviewed: { "@id": localBusinessId },
    publisher: {
      "@type": "Organization",
      name: "Google",
      url: getGoogleBusinessProfileUrl(),
    },
  }));
}
