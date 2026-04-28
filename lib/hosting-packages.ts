/**
 * Marketing tiers for cPanel hosting provisioned from our Namecheap-linked
 * reseller + WHM stack. Prices are in Ghana cedis (GHS); the site can show
 * approximate conversions. Adjust numbers to match your Paystack catalog.
 */
export type HostingPackage = {
  id: "launch" | "grow" | "scale";
  name: string;
  tagline: string;
  /** Monthly price in GHS (source of truth). */
  priceMonthlyGhs: number;
  /** Percentage discount applied when billed annually. */
  annualDiscountPct: number;
  /** Short note under price */
  billingNote: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
};

export const HOSTING_PACKAGES: readonly HostingPackage[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Starter hosting for one serious business site",
    priceMonthlyGhs: 69,
    annualDiscountPct: 15,
    billingNote: "GHS monthly · discounts available on annual billing",
    features: [
      "1 cPanel account (isolated on WHM)",
      "25 GB SSD storage",
      "Unmetered bandwidth (fair use)",
      "Free Let’s Encrypt SSL",
      "15 professional email mailboxes",
      "Softaculous one-click apps",
      "Weekly backups (restore support included)",
      "cPanel: files, DBs, DNS, email",
    ],
    idealFor: "SME websites, portfolios, and single-brand projects",
  },
  {
    id: "grow",
    name: "Grow",
    tagline: "Multi-site hosting with stronger limits and support",
    priceMonthlyGhs: 129,
    annualDiscountPct: 18,
    billingNote: "GHS monthly · Paystack card & mobile money supported",
    popular: true,
    features: [
      "Up to 5 cPanel accounts (WHM subaccounts)",
      "100 GB SSD pooled",
      "Unmetered bandwidth (fair use)",
      "Free SSL for every site",
      "60 email mailboxes (shared across accounts)",
      "Staging-friendly (extra DBs on request)",
      "Daily backups + priority restore",
      "Priority support + migration help",
    ],
    idealFor: "Growing teams, e-commerce stores, and multi-site owners",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Agency-grade pool with enterprise style operations",
    priceMonthlyGhs: 249,
    annualDiscountPct: 20,
    billingNote: "GHS monthly · custom WHM pools and invoice billing available",
    features: [
      "10+ cPanel accounts (we size WHM for you)",
      "250 GB+ SSD pool (upgradeable)",
      "Dedicated IP option (where available)",
      "White-label cPanel branding (optional)",
      "Unlimited email (fair use policy applies)",
      "Malware hardening and advanced protection options",
      "SLA & named technical contact",
      "Migration assistance from other hosts",
    ],
    idealFor: "Agencies, schools, SaaS teams, and organizations with many sites",
  },
] as const;

export const HOSTING_TRUST_POINTS: readonly { title: string; body: string }[] = [
  {
    title: "Real WHM + cPanel",
    body: "We create isolated cPanel logins from our WHM—no shared FTP guesswork, proper backups, and room to grow.",
  },
  {
    title: "Namecheap-backed stack",
    body: "Your hosting runs on our Namecheap reseller + WHM stack with local support in Accra and pricing tuned for Ghana businesses.",
  },
  {
    title: "Domains + hosting together",
    body: "Register domains, point DNS, and go live in one project—SSL, email, and hardening under one team.",
  },
] as const;
