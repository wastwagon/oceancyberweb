import {
  getGoogleBusinessProfileUrl,
  googleBusinessProfile,
} from "@/lib/startup-agency/google-business";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: googleBusinessProfile.name,
    alternateName: googleBusinessProfile.shortName,
    url: site,
    image: `${site}/images/og-image.jpg`,
    telephone: googleBusinessProfile.phone,
    description:
      "Website and mobile app development, UI/UX design, e-commerce, cybersecurity, and hosting for businesses in Ghana and abroad.",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleBusinessProfile.rating,
      reviewCount: googleBusinessProfile.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [getGoogleBusinessProfileUrl(), "https://twitter.com/oceancyber"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
