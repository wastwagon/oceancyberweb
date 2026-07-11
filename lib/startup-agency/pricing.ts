/** Ghana-market pricing tiers — shared by homepage cards and /pricing comparison. */

export type PricingComparisonValue = boolean | string;

export type PricingPlan = {
  id: string;
  name: string;
  priceGhs: number;
  desc: string;
  idealFor: string;
  timeline: string;
  featured: boolean;
  /** Brief bullets for homepage cards */
  homepageFeatures: readonly string[];
  /** Full inclusions on the pricing page */
  features: readonly string[];
  comparison: Record<string, PricingComparisonValue>;
};

export const pricingComparisonCategories = [
  { key: "idealFor", label: "Best for" },
  { key: "timeline", label: "Typical timeline" },
  { key: "scope", label: "Pages / screens" },
  { key: "design", label: "UI/UX design" },
  { key: "webDev", label: "Web development" },
  { key: "mobileApp", label: "Mobile app (iOS / Android)" },
  { key: "payments", label: "Paystack / MoMo checkout" },
  { key: "seo", label: "SEO & content" },
  { key: "analytics", label: "Analytics & conversion tracking" },
  { key: "integrations", label: "Third-party integrations" },
  { key: "security", label: "Security & hardening" },
  { key: "support", label: "Post-launch support" },
  { key: "projectLead", label: "Delivery lead" },
] as const;

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "startup",
    name: "Startup",
    priceGhs: 6000,
    desc: "Launch fast with a credible first release.",
    idealFor: "MVPs, landing pages, and first customer validation",
    timeline: "3–5 weeks",
    featured: false,
    homepageFeatures: [
      "Up to 5-page responsive site",
      "Paystack or MoMo checkout",
      "Basic SEO & 30-day support",
    ],
    features: [
      "Up to 5 responsive pages or screens",
      "Template-led UI with brand colours & typography",
      "Contact forms and lead capture",
      "One Paystack or MoMo payment flow",
      "Basic on-page SEO and metadata",
      "One content / SEO sprint before launch",
      "Staging previews and handover docs",
      "30 days post-launch support",
    ],
    comparison: {
      idealFor: "MVPs, landing pages, and first customer validation",
      timeline: "3–5 weeks",
      scope: "Up to 5 pages",
      design: "Template-led with brand styling",
      webDev: "Marketing site or simple web app",
      mobileApp: false,
      payments: "Basic checkout (Paystack / MoMo)",
      seo: "On-page SEO + one content sprint",
      analytics: "Google Analytics setup",
      integrations: "1 integration (e.g. CRM or email)",
      security: "HTTPS, secure forms, baseline hardening",
      support: "30 days",
      projectLead: "Shared delivery team",
    },
  },
  {
    id: "professional",
    name: "Professional",
    priceGhs: 14500,
    desc: "Scale product, marketing, and conversion together.",
    idealFor: "Growing teams shipping multi-page products",
    timeline: "6–10 weeks",
    featured: true,
    homepageFeatures: [
      "Custom UI/UX (up to 12 pages)",
      "Analytics, QA & performance tuning",
      "90-day support window",
    ],
    features: [
      "Up to 12 pages or product screens",
      "Custom UI/UX in Figma with clickable prototypes",
      "CMS or lightweight admin panel",
      "Paystack / MoMo with webhook reconciliation",
      "Google Analytics 4 + conversion events",
      "Up to 3 API integrations (CRM, email, SMS, etc.)",
      "Extended QA, accessibility, and performance pass",
      "90 days post-launch support",
    ],
    comparison: {
      idealFor: "Growing teams shipping multi-page products",
      timeline: "6–10 weeks",
      scope: "Up to 12 pages",
      design: "Custom UI/UX in Figma",
      webDev: "Multi-page product or web application",
      mobileApp: "Add-on from GHS 12,000",
      payments: "Full checkout + webhook reconciliation",
      seo: "On-page SEO + structured data",
      analytics: "GA4 + conversion tracking",
      integrations: "Up to 3 scoped integrations",
      security: "Hardening pass + dependency review",
      support: "90 days",
      projectLead: "Shared project manager",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceGhs: 30000,
    desc: "Security-aware delivery for regulated and complex programmes.",
    idealFor: "Enterprises, fintech, and multi-stakeholder builds",
    timeline: "10–16+ weeks",
    featured: false,
    homepageFeatures: [
      "Web + optional native mobile app",
      "Compliance-friendly workflows & SLA options",
      "Dedicated delivery lead",
    ],
    features: [
      "Custom scope — web platform and/or mobile app",
      "Full design system with component documentation",
      "Advanced admin, roles, and audit-friendly workflows",
      "Ghana DPA–aligned data handling guidance",
      "Security review, penetration testing coordination",
      "Dedicated delivery lead and milestone reporting",
      "SLA options and priority incident response",
      "6 months support with optimisation sprints",
    ],
    comparison: {
      idealFor: "Enterprises, fintech, and multi-stakeholder builds",
      timeline: "10–16+ weeks",
      scope: "Custom (scoped in discovery)",
      design: "Full design system",
      webDev: "Complex platform or product suite",
      mobileApp: "Native or cross-platform included",
      payments: "Multi-rail payments + reconciliation",
      seo: "Ongoing SEO & content optimisation",
      analytics: "Full funnel + custom dashboards",
      integrations: "Unlimited within agreed scope",
      security: "Audit, hardening, and SLA options",
      support: "6 months + retainer options",
      projectLead: "Dedicated delivery lead",
    },
  },
] as const;

export const pricingAddOns = [
  {
    name: "Mobile app (single platform)",
    priceGhs: 12000,
    note: "iOS or Android — cross-platform quoted separately",
  },
  {
    name: "Extra API integration",
    priceGhs: 2500,
    note: "Per scoped third-party system",
  },
  {
    name: "Monthly care & hosting retainer",
    priceGhs: 850,
    note: "Updates, monitoring, and minor fixes billed monthly",
  },
] as const;

export function formatPlanPrice(priceGhs: number): string {
  return `From GHS ${priceGhs.toLocaleString("en-GH")}`;
}

export type ServicePricingTierHint = {
  planId?: string;
  label: string;
  priceGhs: number;
  note: string;
};

export type ServicePricingStripContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tiers: readonly ServicePricingTierHint[];
};

export const servicePricingHints = {
  webDevelopment: {
    eyebrow: "Investment",
    title: "Indicative web development tiers",
    subtitle:
      "Fixed-price milestones in Ghana cedis after discovery. Compare full inclusions on our pricing page or estimate scope with the project calculator.",
    tiers: [
      {
        planId: "startup",
        label: "Startup",
        priceGhs: 6000,
        note: "Up to 5 pages — landing sites and MVPs",
      },
      {
        planId: "professional",
        label: "Professional",
        priceGhs: 14500,
        note: "Up to 12 pages — custom UI, CMS, analytics",
      },
      {
        planId: "enterprise",
        label: "Enterprise",
        priceGhs: 30000,
        note: "Complex platforms, security, and SLA options",
      },
    ],
  },
  mobileApps: {
    eyebrow: "Investment",
    title: "Indicative mobile app investment",
    subtitle:
      "Mobile work is scoped per platform and feature set. Pair with a web package or ship standalone — full comparison on our pricing page.",
    tiers: [
      {
        label: "Single-platform app",
        priceGhs: 12000,
        note: "iOS or Android add-on — cross-platform quoted separately",
      },
      {
        planId: "professional",
        label: "Web + mobile bundle",
        priceGhs: 26500,
        note: "Professional web package plus one mobile platform",
      },
      {
        planId: "enterprise",
        label: "Enterprise",
        priceGhs: 30000,
        note: "Native or cross-platform mobile included in scope",
      },
    ],
  },
  ecommerce: {
    eyebrow: "Investment",
    title: "Indicative e-commerce tiers",
    subtitle:
      "Storefronts with Paystack and MoMo checkout, scoped for Ghana buyers. Compare package inclusions or estimate with the project calculator.",
    tiers: [
      {
        planId: "startup",
        label: "Starter store",
        priceGhs: 6000,
        note: "Up to 50 SKUs, checkout, and launch SEO basics",
      },
      {
        planId: "professional",
        label: "Growth store",
        priceGhs: 14500,
        note: "Full catalog, admin panel, analytics, 90-day support",
      },
      {
        planId: "enterprise",
        label: "Enterprise commerce",
        priceGhs: 30000,
        note: "Marketplace, B2B flows, reconciliation, and SLA options",
      },
    ],
  },
  cybersecurity: {
    eyebrow: "Investment",
    title: "Indicative security engagement tiers",
    subtitle:
      "Practical assessments and hardening for Ghana teams — sequenced by risk, not checkbox audits. Enterprise packages include security in broader delivery.",
    tiers: [
      {
        label: "Baseline assessment",
        priceGhs: 4500,
        note: "Vulnerability review, executive summary, and prioritized fix list",
      },
      {
        label: "Hardening programme",
        priceGhs: 12000,
        note: "Assessment plus remediation sprints and monitoring alignment",
      },
      {
        planId: "enterprise",
        label: "Enterprise security",
        priceGhs: 30000,
        note: "Continuous programme, compliance mapping, and SLA options",
      },
    ],
  },
  uiUx: {
    eyebrow: "Investment",
    title: "Indicative design engagement tiers",
    subtitle:
      "Brand and product design in Figma — standalone or bundled with web delivery. Full build packages are on our pricing page.",
    tiers: [
      {
        label: "Brand & landing UX",
        priceGhs: 3500,
        note: "Style guide, key screens, and handoff for up to 3 pages",
      },
      {
        label: "Product UI/UX",
        priceGhs: 8500,
        note: "Research, prototypes, and design system foundations",
      },
      {
        planId: "professional",
        label: "Design + build bundle",
        priceGhs: 14500,
        note: "Full UI/UX paired with Professional web delivery",
      },
    ],
  },
  websiteToMobile: {
    eyebrow: "Investment",
    title: "Indicative conversion tiers",
    subtitle:
      "From store-ready wrappers to full native shells — scoped after we audit your existing website.",
    tiers: [
      {
        label: "Store-ready wrapper",
        priceGhs: 8000,
        note: "Package your site for App Store and Play Store submission",
      },
      {
        label: "Enhanced native shell",
        priceGhs: 12000,
        note: "Push notifications, offline pages, and native navigation",
      },
      {
        planId: "professional",
        label: "Web + both stores",
        priceGhs: 26500,
        note: "Professional web delivery plus iOS and Android",
      },
    ],
  },
} as const satisfies Record<string, ServicePricingStripContent>;

/** Compact row for hub pages — the three core delivery packages */
export const corePackageSummary = pricingPlans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  priceGhs: plan.priceGhs,
  desc: plan.desc,
}));

/** Flat list for structured data — core packages plus service-specific starting offers */
export const pricingOfferCatalog = [
  ...pricingPlans.map((plan) => ({
    id: plan.id,
    name: `${plan.name} package`,
    description: plan.desc,
    priceGhs: plan.priceGhs,
    urlPath: `/pricing#${plan.id}`,
    category: "Core delivery package",
  })),
  ...Object.values(servicePricingHints).flatMap((hint) =>
    hint.tiers
      .filter((tier) => !("planId" in tier))
      .map((tier) => ({
        id: tier.label.toLowerCase().replace(/\s+/g, "-"),
        name: tier.label,
        description: tier.note,
        priceGhs: tier.priceGhs,
        urlPath: "/pricing",
        category: hint.title,
      })),
  ),
  ...pricingAddOns.map((addon) => ({
    id: addon.name.toLowerCase().replace(/\s+/g, "-"),
    name: addon.name,
    description: addon.note,
    priceGhs: addon.priceGhs,
    urlPath: "/pricing",
    category: "Add-on",
  })),
] as const;

export const pricingFaqItems = [
  {
    q: "Are these prices final?",
    a: "No — published tiers are starting anchors in Ghana cedis. After discovery and technical scoping we issue a fixed-price statement of work with milestone billing.",
  },
  {
    q: "What is included in each package?",
    a: "Startup covers up to 5 pages with basic SEO and 30-day support. Professional adds custom UI/UX, CMS, analytics, and 90-day support. Enterprise includes complex scope, security review, a dedicated delivery lead, and six months of support. See the comparison table for the full breakdown.",
  },
  {
    q: "Can I add a mobile app to a web package?",
    a: "Yes. A single-platform iOS or Android app starts from GHS 12,000 as an add-on. Cross-platform builds are quoted separately. Enterprise packages can include mobile in the core scope.",
  },
  {
    q: "Do you accept Paystack or mobile money for project payments?",
    a: "Yes. We bill in GHS and align milestone invoices with Paystack and local payment rails your finance team already uses.",
  },
  {
    q: "How does this compare to hiring in-house in Accra?",
    a: "Packages often cost less than a six-month in-house hire when you factor in recruitment, benefits, and tooling — especially for defined launches. Our insights article on agency vs in-house has a detailed cost map for Ghana teams.",
  },
  {
    q: "What if my project does not fit a tier?",
    a: "Use the project calculator for a tailored GHS range, or contact us. Most engagements mix package baselines with add-ons such as extra integrations or retainers.",
  },
  {
    q: "How much does a security assessment cost?",
    a: "Baseline vulnerability reviews start from GHS 4,500. Hardening programmes with remediation sprints start from GHS 12,000. Enterprise security is scoped within our GHS 30,000+ delivery tier.",
  },
] as const;

/** @deprecated Use `formatPlanPrice(plan.priceGhs)` — kept for any legacy string consumers */
export const pricingPlansLegacy = pricingPlans.map((plan) => ({
  ...plan,
  price: formatPlanPrice(plan.priceGhs),
}));
