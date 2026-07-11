import { pricingOfferCatalog } from "@/lib/startup-agency/pricing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oceancyber.net";

export function PricingPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "OceanCyber",
    url: siteUrl,
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    priceRange: "GHS 3500 - GHS 30000+",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web, mobile, and security packages for Ghana",
      itemListElement: pricingOfferCatalog.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        priceCurrency: "GHS",
        price: offer.priceGhs,
        url: `${siteUrl}${offer.urlPath}`,
        category: offer.category,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "OceanCyber",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
