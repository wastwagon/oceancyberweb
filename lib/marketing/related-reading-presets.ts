export type RelatedReadingLink = { href: string; label: string };

/** OceanCyber builds custom stores; DwumaPOS is the flagship POS product (short summaries on /guides/dwumapos-*). */
export const ecommerceServiceRelatedReading: RelatedReadingLink[] = [
  { href: "/guides/accept-mobile-money-paystack", label: "Accept Mobile Money and Paystack" },
  { href: "/guides/ecommerce-website-timeline-ghana", label: "How long a Ghana ecommerce store takes" },
  { href: "/guides/dwumapos-for-ghana-shops", label: "DwumaPOS summary (Ghana shops)" },
  { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS on DwumaPOS" },
  { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS on DwumaPOS" },
];

export const retailIndustryRelatedReading: RelatedReadingLink[] = [
  { href: "/services/ecommerce", label: "E-commerce development from OceanCyber" },
  { href: "/guides/accept-mobile-money-paystack", label: "Mobile Money and Paystack for checkout" },
  ...ecommerceServiceRelatedReading.filter((l) => l.href.startsWith("/guides/dwumapos")),
];

export const dwumaPosGuideLinks: RelatedReadingLink[] = [
  { href: "/guides/dwumapos-for-ghana-shops", label: "DwumaPOS for Ghana shops" },
  { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS (DwumaPOS)" },
  { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS (DwumaPOS)" },
];

export function geoPageRelatedReading(topicKey: string): RelatedReadingLink[] {
  const base: RelatedReadingLink[] = [
    { href: "/pricing", label: "Package pricing in Ghana cedis" },
    { href: "/tools/project-cost", label: "Project cost estimator" },
  ];
  if (topicKey === "ecommerce-development") {
    return [
      { href: "/services/ecommerce", label: "E-commerce service overview" },
      ...ecommerceServiceRelatedReading,
      ...base,
    ];
  }
  return base;
}
