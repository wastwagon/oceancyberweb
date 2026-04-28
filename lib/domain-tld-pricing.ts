/**
 * Annual “from” prices in GHS (source of truth for marketing chips).
 * Align with your Namecheap / reseller retail when you change pricing.
 */
export const HERO_TLD_PRICING: ReadonlyArray<{
  tld: string;
  priceAnnualGhs: number;
  highlight?: boolean;
}> = [
  { tld: ".com", priceAnnualGhs: 120 },
  { tld: ".net", priceAnnualGhs: 140 },
  { tld: ".org", priceAnnualGhs: 99 },
  { tld: ".io", priceAnnualGhs: 450 },
  { tld: ".africa", priceAnnualGhs: 100, highlight: true },
  { tld: ".info", priceAnnualGhs: 45 },
];

/** Subset for compact header / toolbar (Namecheap-style “search bar” feel). */
export const HEADER_TLD_PRICING_SNAPSHOT = HERO_TLD_PRICING.filter(({ tld }) =>
  [".com", ".net", ".africa"].includes(tld),
);
