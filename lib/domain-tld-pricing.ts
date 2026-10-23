/**
 * Annual “from” prices in GHS (source of truth for marketing chips).
 * Align with your Namecheap / reseller retail when you change pricing.
 */

/** Override in Coolify with OCEAN_COM_GH_ANNUAL_GHS when registrar list price is final. */
export function readComGhAnnualListGhs(): number {
  const raw = process.env.OCEAN_COM_GH_ANNUAL_GHS?.trim();
  if (raw && /^\d+$/.test(raw)) return Number(raw);
  return 280;
}

export const COM_GH_ANNUAL_LIST_GHS = readComGhAnnualListGhs();

export function formatComGhListPriceLabel(): string {
  return `GHS ${COM_GH_ANNUAL_LIST_GHS} / year`;
}

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
  { tld: ".com.gh", priceAnnualGhs: COM_GH_ANNUAL_LIST_GHS, highlight: true },
];

/** Subset for compact header / toolbar (Namecheap-style “search bar” feel). */
export const HEADER_TLD_PRICING_SNAPSHOT = HERO_TLD_PRICING.filter(({ tld }) =>
  [".com", ".net", ".africa"].includes(tld),
);
