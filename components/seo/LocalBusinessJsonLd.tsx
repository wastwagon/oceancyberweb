import {
  googleBusinessProfile,
  organizationSameAs,
} from "@/lib/startup-agency/google-business";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { buildMapsAlignedBusinessDescription } from "@/lib/seo/ghana-local-market";
import { buildAggregateRatingJsonLd } from "@/lib/trust/review-trust";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const localBusinessId = `${site}/#localbusiness`;

export async function LocalBusinessJsonLd() {
  const stats = await getGooglePlaceStats();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": localBusinessId,
    name: googleBusinessProfile.name,
    alternateName: googleBusinessProfile.shortName,
    foundingDate: String(googleBusinessProfile.foundedYear),
    url: site,
    image: `${site}/images/og-image.jpg`,
    telephone: googleBusinessProfile.phone,
    description: buildMapsAlignedBusinessDescription(stats),
    aggregateRating: buildAggregateRatingJsonLd(stats),
    founder: {
      "@type": "Person",
      name: googleBusinessProfile.founderName,
      jobTitle: googleBusinessProfile.founderRole,
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: googleBusinessProfile.teamSize,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: googleBusinessProfile.address.street,
      addressLocality: googleBusinessProfile.address.locality,
      addressCountry: googleBusinessProfile.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: googleBusinessProfile.geo.latitude,
      longitude: googleBusinessProfile.geo.longitude,
    },
    sameAs: organizationSameAs(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
