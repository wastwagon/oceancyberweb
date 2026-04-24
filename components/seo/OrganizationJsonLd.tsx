const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OceanCyber",
  url: site,
  logo: `${site}/images/og-image.jpg`,
  description:
    "Ghana's leading technology solutions provider for web, mobile, cybersecurity, and digital transformation.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GH",
    addressLocality: "Accra",
  },
  sameAs: ["https://twitter.com/oceancyber"],
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
