import {
  googleBusinessProfile,
  organizationSameAs,
} from "@/lib/startup-agency/google-business";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OceanCyber",
  url: site,
  foundingDate: String(googleBusinessProfile.foundedYear),
  logo: `${site}/images/og-image.jpg`,
  description: `Best web, mobile, and cybersecurity company in Accra and Ghana. ${googleBusinessProfile.teamSize} people, founded in ${googleBusinessProfile.foundedYear}, rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews. One office at ${googleBusinessProfile.address.street}, Accra.`,
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
  sameAs: organizationSameAs(),
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
