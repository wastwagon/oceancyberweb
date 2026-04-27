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
    tagline: "One strong site, everything managed",
    priceMonthlyGhs: 79,
    billingNote: "Billed in GHS · annual & bundle discounts on request",
    features: [
      "1 cPanel account (isolated on WHM)",
      "20 GB NVMe SSD storage",
      "Unmetered bandwidth (fair use)",
      "Free Let’s Encrypt SSL",
      "10 professional email mailboxes",
      "Softaculous one-click apps",
      "Weekly backups (retain & restore on request)",
      "cPanel: files, DBs, DNS, email",
    ],
    idealFor: "SME sites, landing pages, and single-brand projects",
  },
  {
    id: "grow",
    name: "Grow",
    tagline: "More sites, more headroom",
    priceMonthlyGhs: 149,
    billingNote: "Billed in GHS · Paystack cards & mobile money where enabled",
    popular: true,
    features: [
      "Up to 5 cPanel accounts (WHM subaccounts)",
      "80 GB NVMe SSD pooled",
      "Unmetered bandwidth (fair use)",
      "Free SSL for every site",
      "50 email mailboxes (shared across accounts)",
      "Staging-friendly (extra DBs on request)",
      "Daily backups + priority restore",
      "Priority support during business hours",
    ],
    idealFor: "Growing businesses, e-commerce, and multi-site owners",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Agency-style capacity & SLAs",
    priceMonthlyGhs: 329,
    billingNote: "Custom quotes for large tenants · invoices in GHS",
    features: [
      "10+ cPanel accounts (we size WHM for you)",
      "200 GB+ NVMe (pool upgrades available)",
      "Dedicated IP option (where available)",
      "White-label cPanel branding (optional)",
      "Unlimited email (fair use policy applies)",
      "Imunify360 / Malware protection (where licensed)",
      "SLA & named technical contact",
      "Migration assistance from other hosts",
    ],
    idealFor: "Agencies, schools, and orgs with many properties",
  },
] as const;

export const HOSTING_TRUST_POINTS: readonly { title: string; body: string }[] = [
  {
    title: "Real WHM + cPanel",
    body: "We create isolated cPanel logins from our WHM—no shared FTP guesswork, proper backups, and room to grow.",
  },
  {
    title: "Namecheap-backed stack",
    body: "Your hosting sits on the same class of infrastructure you expect from a global registrar, with local support in Accra.",
  },
  {
    title: "Domains + hosting together",
    body: "Register domains, point DNS, and go live in one project—SSL, email, and hardening under one team.",
  },
] as const;
