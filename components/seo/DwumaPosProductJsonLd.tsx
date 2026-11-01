import {
  DWUMAPOS_OFF_SITE_DESCRIPTOR,
  DWUMAPOS_ONE_LINE_PITCH,
  DWUMAPOS_SITE_URL,
  LEGAL_COMPANY_NAME,
} from "@/lib/marketing/company-identity";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

/** Product graph for DwumaPOS — publisher is OceanCyber; no review markup. */
export function DwumaPosProductJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${DWUMAPOS_SITE_URL}/#software`,
    name: "DwumaPOS",
    alternateName: DWUMAPOS_OFF_SITE_DESCRIPTOR,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, macOS, Android, iOS",
    url: DWUMAPOS_SITE_URL,
    description: DWUMAPOS_ONE_LINE_PITCH,
    offers: {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: "149",
      description: "Starter plan from GHS 149/month after 30-day trial — see dwumapos.com/pricing",
      url: `${DWUMAPOS_SITE_URL}/pricing`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "OceanCyber",
      legalName: LEGAL_COMPANY_NAME,
      url: site,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
