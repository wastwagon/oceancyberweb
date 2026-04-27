/**
 * Project cost calculator — pricing engine config.
 * Tweak HOURLY_RATE and feature hours to match your delivery data.
 */

export const HOURLY_RATE_GHS = 85;

export const COMPLEXITY_OPTIONS = [
  { id: "simple" as const, label: "Simple", multiplier: 1 },
  { id: "medium" as const, label: "Medium", multiplier: 1.3 },
  { id: "complex" as const, label: "Complex", multiplier: 1.6 },
] as const;

export type ComplexityId = (typeof COMPLEXITY_OPTIONS)[number]["id"];

export const PLATFORM_OPTIONS = [
  { id: "web", label: "Web application", description: "Browser-first product (React, Next.js, etc.)", baseHours: 0 },
  { id: "mobile", label: "Mobile app", description: "iOS / Android (native or cross-platform)", baseHours: 32 },
  { id: "both", label: "Web + mobile", description: "Shared API, two client surfaces", baseHours: 72 },
  { id: "static_api", label: "Marketing site + API", description: "Landing pages plus lightweight backend", baseHours: 12 },
] as const;

export type PlatformId = (typeof PLATFORM_OPTIONS)[number]["id"];

export const DESIGN_OPTIONS = [
  { id: "template", label: "Template / UI kit", description: "Start from a polished template or design system you choose", addHours: 0 },
  { id: "custom", label: "Custom UI", description: "Bespoke layout and components, brand-led", addHours: 36 },
  { id: "design_system", label: "Full design system", description: "Components, tokens, states, and documentation", addHours: 64 },
] as const;

export type DesignId = (typeof DESIGN_OPTIONS)[number]["id"];

export type ProjectFeature = {
  id: string;
  label: string;
  description: string;
  hours: number;
  category: "auth" | "commerce" | "content" | "data" | "comms" | "platform" | "growth";
};

/**
 * Modular features. Hours are internal estimates; the customer sees GHS in the app and proforma.
 * Tweak hours to match how you actually quote.
 */
export const PROJECT_FEATURES: ProjectFeature[] = [
  { id: "auth_social", label: "Social login (OAuth)", description: "Sign in with Google, Microsoft, or Apple", hours: 30, category: "auth" },
  { id: "auth_email", label: "Email and password, plus reset", description: "Account sign-up, login, and password reset flows", hours: 16, category: "auth" },
  { id: "auth_mfa", label: "MFA (app or SMS)", description: "Extra sign-in step for better account security", hours: 28, category: "auth" },
  { id: "pay_stripe", label: "Stripe (cards)", description: "Checkout, webhooks, and receipts with Stripe", hours: 50, category: "commerce" },
  { id: "pay_paystack", label: "Paystack (cedis, MoMo, cards)", description: "Local checkout and webhooks with Paystack", hours: 40, category: "commerce" },
  { id: "subscription", label: "Subscriptions and billing", description: "Plans, renewals, and a simple customer portal", hours: 55, category: "commerce" },
  { id: "cms", label: "Headless CMS", description: "Structured content, roles, and live preview", hours: 32, category: "content" },
  { id: "blog", label: "Blog or help center", description: "Articles with tags, search, or rich text", hours: 22, category: "content" },
  { id: "i18n", label: "More than one language", description: "Language switching and a workflow for translated copy", hours: 40, category: "content" },
  { id: "search", label: "Search and filters", description: "Search across listings, articles, or records", hours: 24, category: "data" },
  { id: "admin", label: "Admin back office", description: "Internal screens to manage data and day-to-day work", hours: 48, category: "data" },
  { id: "api_public", label: "Public or partner API", description: "Stable REST API, keys, and fair use limits", hours: 40, category: "data" },
  { id: "realtime", label: "Live updates (chat or live data)", description: "WebSocket or server-sent events for live UI", hours: 36, category: "comms" },
  { id: "email", label: "Email automation", description: "System emails such as sign-up, receipts, and alerts", hours: 20, category: "comms" },
  { id: "notif", label: "Push and in-app alerts", description: "Notifications with simple user preferences", hours: 30, category: "comms" },
  { id: "file", label: "File storage and media", description: "Secure uploads, resizing or processing where needed", hours: 24, category: "platform" },
  { id: "maps", label: "Maps and location", description: "Map views, search by area, or directions", hours: 20, category: "platform" },
  { id: "analytics", label: "Product analytics", description: "Event tracking and product dashboards", hours: 16, category: "platform" },
  { id: "seo", label: "Technical SEO for the site", description: "Metadata, sitemaps, and performance for search engines", hours: 20, category: "platform" },
  { id: "reporting", label: "Reports and exports", description: "PDF or CSV exports, or scheduled summaries", hours: 32, category: "data" },
  { id: "gmb_setup", label: "Google Business Profile", description: "We create the business profile on Google (the listing on Search and Maps) using the name, address, phone, hours, and category the client provides.", hours: 16, category: "growth" },
  { id: "local_listings", label: "Local directory listings (citations)", description: "Name, address, and phone aligned across main local directories; reduces confusion for search engines", hours: 20, category: "growth" },
  { id: "review_requests", label: "Customer review requests", description: "Email or SMS flows that politely ask happy customers to leave a review (with your process)", hours: 14, category: "growth" },
  { id: "social_setup", label: "Social media profile setup", description: "Consistent name, logo, link in bio, and a short post plan for 2–3 key networks you choose", hours: 12, category: "growth" },
  { id: "local_landing", label: "Local service landing pages", description: "Extra pages for towns or services you want to be found for (written with your input)", hours: 20, category: "growth" },
  { id: "workspace_email", label: "Business email on your domain", description: "Set up Google Workspace or Microsoft 365: DNS, mail routing, and basic user mailboxes (license fees are separate)", hours: 12, category: "growth" },
  { id: "workshop", label: "Handover and training session", description: "Live walkthrough so your team can update content, orders, or settings without us each time", hours: 8, category: "growth" },
];

/** Server-side check: optional feature ids must be in this set. */
export const PROJECT_FEATURE_ID_SET: ReadonlySet<string> = new Set(
  PROJECT_FEATURES.map((f) => f.id),
);

export const PROFORMA_COMPANY = {
  name: "Ocean Cyber",
  addressLines: ["232 Nii Kwashiefo Avenue", "Abofu - Achimota, Accra", "Ghana"],
  email: "info@oceancyber.net",
  phone: "+233 242 565 695",
} as const;

/** Logo in `public/images/…` (same as site header). PDF generator encodes the URI for fetch. */
export const PROFORMA_LOGO_PATH = "/images/oceancyber logo.webp";

export const ESTIMATE_VARIANCE = 0.1;

/**
 * Tighter delivery windows add a labour premium (industry pattern: 15–35% for “rush” scope).
 * Longer timelines assume better calendar fit / parallelisation — a modest discount.
 */
export const TIMELINE_OPTIONS = [
  { value: "under-4w", label: "ASAP (under 4 weeks)", rushLabourMultiplier: 1.28 },
  { value: "1-3m", label: "1–3 months", rushLabourMultiplier: 1.0 },
  { value: "3-6m", label: "3–6 months", rushLabourMultiplier: 0.96 },
  { value: "6m-plus", label: "6+ months / flexible", rushLabourMultiplier: 0.92 },
] as const;

export type TimelineValue = (typeof TIMELINE_OPTIONS)[number]["value"];

export function getRushLabourMultiplier(timeline: string | undefined | null): number {
  if (!timeline) return 1;
  const t = TIMELINE_OPTIONS.find((o) => o.value === timeline);
  return t?.rushLabourMultiplier ?? 1;
}

export const PROFORMA_DISCLAIMER =
  "This is a proforma based on initial estimates and does not constitute a final binding contract. Scope, timeline, and pricing are confirmed in a written statement of work or agreement.";
