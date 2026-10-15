/**
 * SSL list prices in GHS (source of truth for marketing + cart).
 * Align with Namecheap reseller retail when you change pricing.
 * “Renews at” matches first-year list — no teaser first-year undercut.
 */
export type SslPackage = {
  id: string;
  name: string;
  planCode: string;
  tagline: string;
  priceAnnualGhs: number;
  /** Same as first-year list — Namecheap-style honesty. */
  renewsAtGhs: number;
  features: string[];
  idealFor: string;
  popular?: boolean;
};

export const SSL_PACKAGES: readonly SslPackage[] = [
  {
    id: "positivessl",
    name: "PositiveSSL",
    planCode: "ssl-positivessl-yearly",
    tagline: "Single-domain DV for most business sites",
    priceAnnualGhs: 45,
    renewsAtGhs: 45,
    popular: true,
    features: [
      "Covers one domain (www + apex when configured)",
      "Domain Validation (DV) — fast issuance",
      "Issued via Namecheap SSL API",
      "Install help on OceanCyber hosting",
      "Renews at the same GHS list price",
    ],
    idealFor: "Company sites, blogs, and most Ghana SME launches",
  },
  {
    id: "positivessl-wildcard",
    name: "PositiveSSL Wildcard",
    planCode: "ssl-positivessl-wildcard-yearly",
    tagline: "One cert for the domain and all first-level subdomains",
    priceAnnualGhs: 890,
    renewsAtGhs: 890,
    features: [
      "Wildcard coverage for *.yourdomain",
      "Useful for staging, app, and shop subdomains",
      "Domain Validation (DV)",
      "Issued via Namecheap SSL API",
      "Renews at the same GHS list price",
    ],
    idealFor: "Multi-subdomain apps, staging, and multi-site brands",
  },
  {
    id: "ev",
    name: "EV SSL",
    planCode: "ssl-ev-yearly",
    tagline: "Extended Validation for regulated and finance-facing sites",
    priceAnnualGhs: 1850,
    renewsAtGhs: 1850,
    features: [
      "Organization identity checks before issue",
      "Stronger trust signal for payments and compliance",
      "Ideal when legal or finance teams ask for EV",
      "Issued via Namecheap SSL API",
      "Renews at the same GHS list price",
    ],
    idealFor: "Banks, fintech, and compliance-led launches",
  },
] as const;

export const SSL_TRUST_POINTS: readonly { title: string; body: string }[] = [
  {
    title: "Renews at list price",
    body: "First-year and renewal GHS prices match on the packages above — no teaser undercut that jumps at renewal.",
  },
  {
    title: "Works with our hosting",
    body: "On OceanCyber cPanel plans, Let’s Encrypt is free. Paid PositiveSSL and EV are for when you need a named commercial cert or wildcard coverage.",
  },
  {
    title: "Accra install help",
    body: "Buy the cert, then we help point DNS and install on our stack — or advise your current host.",
  },
] as const;
