/** Marketing homepage content — structure aligned with Start-Up Agency; copy tailored for OceanCyber. */

import { siteImagePaths } from "@/lib/seo/site-image-paths";
import { publishedLivePortfolioCount } from "@/lib/site-facts";
import { googleBusinessProfile, trustBlurb } from "@/lib/startup-agency/google-business";
import {
  buildHomeFaqItems,
  buildTrustSignals,
  fallbackPlaceStats,
} from "@/lib/trust/review-trust";
import { CLIENT_PROOF_LINES } from "@/lib/marketing/client-proof-outcomes";
import { serviceImages } from "./service-images";

export const heroTagline = trustBlurb.short;

export const companyPresence = `${trustBlurb.seo}`;

export const heroServiceSlides = [
  {
    title: "Web Development",
    href: "/services/web-development",
    imageAlt: "Web platform and dashboard interfaces built by OceanCyber",
    image: serviceImages.webDevelopment,
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    imageAlt: "Native iOS and Android app experiences designed by OceanCyber",
    image: serviceImages.mobileApps,
  },
  {
    title: "Security Consulting",
    href: "/services/cybersecurity",
    imageAlt: "Security consulting — assessments and hardening by OceanCyber",
    image: serviceImages.cyberSecurity,
  },
  {
    title: "E-commerce",
    href: "/services/ecommerce",
    imageAlt: "Online storefront and checkout experiences built by OceanCyber",
    image: serviceImages.ecommerce,
  },
] as const;

export const clientLogos = [
  {
    name: "Fitch Advisory",
    order: 0,
    thumb: siteImagePaths.portfolioLive.fitchAdvisory,
    logo: "/images/clients/fitch-advisory.svg",
    href: "/portfolio/fitch-advisory",
  },
  {
    name: "Fitch Attorneys",
    order: 1,
    thumb: siteImagePaths.portfolioLive.fitchAttorneys,
    logo: "/images/clients/fitch-attorneys.svg",
    href: "/portfolio/fitch-attorneys",
  },
  {
    name: "Africa Governance Centre",
    order: 2,
    thumb: siteImagePaths.portfolioLive.africaGovernanceCentre,
    logo: "/images/clients/africa-governance-centre.svg",
    href: "/portfolio/africa-governance-centre",
  },
  {
    name: "ThinQ Shopping",
    order: 3,
    thumb: siteImagePaths.portfolioLive.thinqShopping,
    logo: "/images/clients/thinq-shopping.svg",
    href: "/portfolio/thinq-shopping",
  },
] as const;

export const showreelSlides = [
  { src: siteImagePaths.portfolioLive.fitchAdvisory, caption: "Fitch Advisory — Live client" },
  { src: siteImagePaths.portfolioLive.fitchAttorneys, caption: "Fitch Attorneys — Live client" },
  { src: siteImagePaths.portfolioLive.africaGovernanceCentre, caption: "Africa Governance Centre — Live client" },
  { src: siteImagePaths.portfolioLive.thinqShopping, caption: "ThinQ Shopping — Live client" },
  { src: siteImagePaths.portfolio.creativeHub, caption: "Creative Hub — Concept work" },
] as const;

export type WorkPreviewItem = {
  title: string;
  category: string;
  tags: readonly ("Web" | "Mobile" | "Brand" | "Security")[];
  image: string;
  href: string;
  kind: "live" | "concept";
};

/** Public client sites — same four names as /facts and llms.txt. */
export const portfolioLiveWork: readonly WorkPreviewItem[] = [
  {
    title: "Fitch Advisory",
    category: "Live client · Portal & booking",
    tags: ["Web"],
    image: siteImagePaths.portfolioLive.fitchAdvisory,
    href: "/portfolio/fitch-advisory",
    kind: "live",
  },
  {
    title: "Fitch Attorneys",
    category: "Live client · Case management",
    tags: ["Web"],
    image: siteImagePaths.portfolioLive.fitchAttorneys,
    href: "/portfolio/fitch-attorneys",
    kind: "live",
  },
  {
    title: "Africa Governance Centre",
    category: "Live client · Programmes site",
    tags: ["Web"],
    image: siteImagePaths.portfolioLive.africaGovernanceCentre,
    href: "/portfolio/africa-governance-centre",
    kind: "live",
  },
  {
    title: "ThinQ Shopping",
    category: "Live client · MoMo commerce",
    tags: ["Mobile", "Web"],
    image: siteImagePaths.portfolioLive.thinqShopping,
    href: "/portfolio/thinq-shopping",
    kind: "live",
  },
];

/** Internal concept work — never presented as live clients. */
export const portfolioConceptWork: readonly WorkPreviewItem[] = [
  {
    title: "Brand system study",
    category: "Concept · UI/UX",
    tags: ["Brand"],
    image: siteImagePaths.work.brandSystem,
    href: "/portfolio?tab=creative",
    kind: "concept",
  },
  {
    title: "Dashboard layout study",
    category: "Concept · Web",
    tags: ["Web"],
    image: siteImagePaths.work.fintechDashboard,
    href: "/portfolio?tab=creative",
    kind: "concept",
  },
];

export const aboutStats = [
  { value: `Since ${googleBusinessProfile.foundedYear}`, label: "Accra studio" },
  { value: String(googleBusinessProfile.teamSize), label: "In-house team" },
  { value: "Design to launch", label: "One accountable team" },
] as const;

/** Homepage “Our Agency” — how we work, not portfolio tiles. */
export const agencyPillars = [
  {
    title: "Design in Figma, build in-house",
    body: "You approve real screens before we write production code.",
  },
  {
    title: "One Accra team end to end",
    body: "Same people from discovery through launch — design, engineering, hosting, and security consulting.",
  },
  {
    title: "Ghana-ready checkout and hosting",
    body: "Paystack, MoMo (Mobile Money), and cPanel hosting with prices in cedis on our pricing page.",
  },
] as const;

export const portfolioSectionIntro = {
  eyebrow: "Selected work",
  title: "A few highlights from many projects",
  subtitle:
    `We have delivered sites and apps across law, retail, advisory, and public sector. These ${publishedLivePortfolioCount} live clients are a sample, not our full client list.`,
} as const;

export const trustSignals = buildTrustSignals(fallbackPlaceStats());

export const marqueeTags = [
  "Web · Mobile · Cloud · Security",
  "Paystack & Mobile Money",
  "Accra office since 2008",
  "Fixed GHS packages",
  "cPanel hosting & SSL",
  "Store-ready mobile apps",
  "Security assessments",
  "Design and build in one Accra team",
] as const;

export const serviceCards = [
  {
    title: "Web Design",
    desc: "Company sites and landing pages from GHS 6,000 — mobile-first layouts and SEO-ready builds.",
    href: "/services/web-design",
    image: serviceImages.webDevelopment,
  },
  {
    title: "UI/UX & Brand",
    desc: "Interfaces your customers can use on a phone, with Figma files your developers can build from.",
    href: "/services/ui-ux-design",
    image: serviceImages.uiUxBrand,
  },
  {
    title: "Web Development",
    desc: "Fast company websites that rank on Google and take Paystack or MoMo when you sell online.",
    href: "/services/web-development",
    image: serviceImages.webDevelopment,
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android apps with offline flows, MoMo payments, and store-ready releases.",
    href: "/services/mobile-apps",
    image: serviceImages.mobileApps,
  },
  {
    title: "E‑commerce",
    desc: "Storefronts that handle real volume — catalogue, checkout, MoMo, and ops tooling that holds up.",
    href: "/services/ecommerce",
    image: serviceImages.ecommerce,
  },
  {
    title: "Security Consulting",
    desc: "Consultation from GHS 4,500 — assessments and hardening, not managed security services or 24/7 monitoring.",
    href: "/services/cybersecurity",
    image: serviceImages.cyberSecurity,
  },
  {
    title: "Cloud Hosting",
    desc: "Domains, SSL, and hosting with Accra support — billed in GHS so you stay online without unpredictable forex costs.",
    href: "/hosting",
    image: serviceImages.cloudHosting,
  },
] as const;

export { deliveryPhases as processSteps } from "@/lib/marketing/delivery-phases";

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "AWS",
  "Paystack",
] as const;

export const projectChips = [
  "ThinQ Shopping · MoMo store",
  "Fitch Advisory · Client portal",
  "Website from GHS 6,000",
  "Paystack + MoMo checkout",
  "cPanel hosting in GHS",
  "Security assessments from GHS 4,500",
] as const;

export {
  formatPlanPrice,
  pricingAddOns,
  pricingComparisonCategories,
  pricingFaqItems,
  pricingPlans,
  servicePricingHints,
  corePackageSummary,
  pricingOfferCatalog,
} from "@/lib/startup-agency/pricing";
export type {
  PricingComparisonValue,
  PricingPlan,
  ServicePricingStripContent,
  ServicePricingTierHint,
} from "@/lib/startup-agency/pricing";

export const proofOutcomes = [
  {
    client: "Fitch Advisory",
    result: CLIENT_PROOF_LINES.fitchAdvisory,
    href: "https://www.fitchadvisory.com/",
    path: "/portfolio/fitch-advisory",
  },
  {
    client: "Fitch Attorneys",
    result: CLIENT_PROOF_LINES.fitchAttorneys,
    href: "https://www.fitchattorneys.com/",
    path: "/portfolio/fitch-attorneys",
  },
  {
    client: "ThinQ Shopping",
    result: CLIENT_PROOF_LINES.thinqShopping,
    href: "https://thinqshopping.app/",
    path: "/portfolio/thinq-shopping",
  },
] as const;

export const faqItems = buildHomeFaqItems(fallbackPlaceStats());

export const blogTeasers = [
  {
    title: "In-store POS vs an ecommerce website in Ghana",
    date: "October 2026",
    href: "/insights/pos-vs-ecommerce-ghana-2026",
    image: siteImagePaths.insights["pos-vs-ecommerce-ghana-2026"],
    category: "Business",
    author: "OceanCyber",
  },
  {
    title: "How Ghanaians pick a web design company on Google Maps",
    date: "October 2026",
    href: "/insights/google-maps-web-design-ghana-2026",
    image: siteImagePaths.insights["digital-transformation-ghana"],
    category: "Business",
    author: "OceanCyber",
  },
  {
    title: "Cybersecurity Baseline for Ghanaian SMEs in 2026",
    date: "August 2026",
    href: "/insights/ghana-sme-cybersecurity-baseline",
    image: siteImagePaths.insights["ghana-sme-cybersecurity-baseline"],
    category: "Security",
    author: "OceanCyber Security",
  },
  {
    title: "Agency vs Hiring In-House: A Cost Map for Accra Teams",
    date: "July 2026",
    href: "/insights/agency-vs-hire-ghana",
    image: siteImagePaths.insights["agency-vs-hire-ghana"],
    category: "Strategy",
    author: "OceanCyber",
  },
  {
    title: "Ghana Data Protection Act: What SaaS and Fintech Teams Must Do in 2026",
    date: "June 2026",
    href: "/insights/ghana-data-protection-act-2026",
    image: siteImagePaths.insights["ghana-data-protection-act-2026"],
    category: "Compliance",
    author: "OceanCyber Compliance",
  },
] as const;
