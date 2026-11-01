import { getGooglePlaceStats } from "@/lib/google-places-stats";
import {
  googleBusinessProfile,
  organizationSameAs,
} from "@/lib/startup-agency/google-business";
import { buildMapsAlignedBusinessDescription } from "@/lib/seo/ghana-local-market";
import {
  DWUMAPOS_SITE_URL,
  LEGAL_COMPANY_NAME,
} from "@/lib/marketing/company-identity";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

export async function OrganizationJsonLd() {
  const stats = await getGooglePlaceStats();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site}/#organization`,
    name: "OceanCyber",
    legalName: LEGAL_COMPANY_NAME,
    url: site,
    brand: {
      "@type": "Brand",
      name: "DwumaPOS",
      url: DWUMAPOS_SITE_URL,
    },
    foundingDate: String(googleBusinessProfile.foundedYear),
    logo: `${site}/images/og-image.jpg`,
    description: buildMapsAlignedBusinessDescription(stats),
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
