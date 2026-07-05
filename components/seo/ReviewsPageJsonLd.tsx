import {
  getGoogleBusinessProfileUrl,
  googleBusinessProfile,
} from "@/lib/startup-agency/google-business";
import type { GooglePlaceStats } from "@/lib/google-places-stats";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

type Props = {
  stats: GooglePlaceStats;
};

/** Structured data for the dedicated reviews page — separate from sitewide LocalBusiness. */
export function ReviewsPageJsonLd({ stats }: Props) {
  const pageUrl = `${site}/reviews`;

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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: stats.rating,
          reviewCount: stats.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        sameAs: [getGoogleBusinessProfileUrl()],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
