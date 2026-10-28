import {
  getGoogleBusinessProfileUrl,
  googleBusinessProfile,
} from "@/lib/startup-agency/google-business";
import type { GooglePlaceReview, GooglePlaceStats } from "@/lib/google-places-stats";
import { buildGoogleReviewJsonLdNodes } from "@/lib/trust/review-json-ld";
import { buildAggregateRatingJsonLd } from "@/lib/trust/review-trust";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

type Props = {
  stats: GooglePlaceStats;
  reviews?: GooglePlaceReview[];
};

/** Structured data for the dedicated reviews page — separate from sitewide LocalBusiness. */
export function ReviewsPageJsonLd({ stats, reviews = [] }: Props) {
  const pageUrl = `${site}/reviews`;
  const reviewNodes = buildGoogleReviewJsonLdNodes(reviews);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${googleBusinessProfile.shortName} Google Reviews`,
        description:
          "Verified Google reviews and ratings for OceanCyber — website and mobile app development in Accra, Ghana.",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#localbusiness` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site}/#localbusiness`,
        name: googleBusinessProfile.name,
        alternateName: googleBusinessProfile.shortName,
        url: site,
        image: `${site}/images/og-image.jpg`,
        telephone: googleBusinessProfile.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: googleBusinessProfile.address.street,
          addressLocality: googleBusinessProfile.address.locality,
          addressCountry: googleBusinessProfile.address.countryCode,
        },
        aggregateRating: buildAggregateRatingJsonLd(stats),
        sameAs: [getGoogleBusinessProfileUrl()],
      },
      ...reviewNodes,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
