const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

/** WebSite + SearchAction — insights search (`q`) matches navbar and `/insights` UI. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OceanCyber",
  url: site,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site}/insights?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function WebSiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
