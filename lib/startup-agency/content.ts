/** Marketing homepage content — structure aligned with Start-Up Agency; copy tailored for OceanCyber. */

import { siteImagePaths } from "@/lib/seo/site-image-paths";
import { googleBusinessProfile, trustBlurb } from "@/lib/startup-agency/google-business";
import { serviceImages } from "./service-images";

export const heroTagline = trustBlurb.short;

export const companyPresence = `${trustBlurb.seo}`;

export const heroServiceSlides = [
  {
    title: "Web Development",
    href: "/services/web-development",
    imageAlt: "Premium web platform and dashboard interfaces built by OceanCyber",
    image: serviceImages.webDevelopment,
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    imageAlt: "Native iOS and Android app experiences designed by OceanCyber",
    image: serviceImages.mobileApps,
  },
  {
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    imageAlt: "Secure enterprise monitoring and protection systems by OceanCyber",
    image: serviceImages.cyberSecurity,
  },
  {
    title: "E-Commerce",
    href: "/services/ecommerce",
    imageAlt: "High-converting online storefront and checkout experiences by OceanCyber",
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

export const aboutWorkPreview = [
  {
    title: "Financial Services Platform",
    category: "Web · Dashboard",
    tags: ["Web"] as const,
    image: siteImagePaths.work.fintechDashboard,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Mobile Commerce Experience",
    category: "E-commerce · App",
    tags: ["Mobile"] as const,
    image: siteImagePaths.work.mobileCommerce,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Brand & Design System",
    category: "UI/UX · Identity",
    tags: ["Brand"] as const,
    image: siteImagePaths.work.brandSystem,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Travel Booking Platform",
    category: "Web · Hospitality",
    tags: ["Web"] as const,
    image: siteImagePaths.work.travelPlatform,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Secure Enterprise Portal",
    category: "Cybersecurity · Web",
    tags: ["Security", "Web"] as const,
    image: siteImagePaths.work.cybersecurityPlatform,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Creative Hub Concepts",
    category: "UI/UX · Brand",
    tags: ["Brand"] as const,
    image: siteImagePaths.portfolio.creativeHub,
    href: "/portfolio?tab=creative",
  },
] as const;

export const aboutStats = [
  { value: `Since ${googleBusinessProfile.foundedYear}`, label: "Accra office" },
  { value: String(googleBusinessProfile.teamSize), label: "People" },
  { value: "100+", label: "Clients served" },
] as const;

export const trustSignals = [
  {
    icon: "award" as const,
    stat: "18+",
    title: "Years delivering",
    body: `The company to hire in Accra and in Ghana. Founded in ${googleBusinessProfile.foundedYear}, with ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}.`,
  },
  {
    icon: "star" as const,
    stat: "4.9★",
    title: "Google rating",
    body: "54 verified Google reviews from clients across web, mobile, and digital projects.",
  },
  {
    icon: "shield" as const,
    stat: "100%",
    title: "Security-first builds",
    body: "Every engagement treats performance, privacy, and resilience as product requirements.",
  },
] as const;

export const marqueeTags = [
  "Web · Mobile · Cloud · Security",
  "Paystack & Mobile Money",
  "Accra office since 2008",
  "Fixed GHS packages",
  "cPanel hosting & SSL",
  "Store-ready mobile apps",
  "Security assessments",
  "Design and build in one team",
] as const;

export const serviceCards = [
  {
    title: "UI/UX & Brand",
    desc: "Interfaces your customers can use on a phone, with Figma files your developers can build from.",
    href: "/services/ui-ux-design",
    image: serviceImages.uiUxBrand,
  },
  {
    title: "Web Development",
    desc: "Fast company sites that show up on Google and take Paystack or MoMo when you sell online.",
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
    desc: "Storefronts that handle real volume — catalog, checkout, MoMo, and ops tooling that holds up.",
    href: "/services/ecommerce",
    image: serviceImages.ecommerce,
  },
  {
    title: "Cybersecurity",
    desc: "Find weak spots before attackers do — audits, hardening, and monitoring for Ghana businesses.",
    href: "/services/cybersecurity",
    image: serviceImages.cyberSecurity,
  },
  {
    title: "Cloud Hosting",
    desc: "Domains, SSL, and hosting with Accra support — billed in GHS so you stay online without forex drama.",
    href: "/hosting",
    image: serviceImages.cloudHosting,
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Discovery & scoping",
    body: "We clarify goals, users, and constraints up front — then agree scope, timeline, and success metrics before design or development begins.",
    bullets: ["Stakeholder alignment", "Technical feasibility", "Scope and milestones"],
  },
  {
    step: 2,
    title: "Design & prototyping",
    body: "Where design is in scope, we wireframe and prototype in Figma so you can review structure and flows before engineering commits to build.",
    bullets: ["UX/UI and brand systems", "Clickable prototypes", "Handoff specs for dev"],
  },
  {
    step: 3,
    title: "Build & integrate",
    body: "We ship in agreed phases with demo checkpoints — web, mobile, payments, APIs, and hosting connected to the tools your team already uses.",
    bullets: ["Phased delivery", "Integrations and APIs", "Staging previews"],
  },
  {
    step: 4,
    title: "QA, security & go-live",
    body: "We test on real devices, tune performance, apply security hardening where required, and deploy with documentation your team can run after handover.",
    bullets: ["QA and accessibility", "Performance and security", "Launch and handover"],
  },
] as const;

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "AWS",
  "Paystack",
] as const;

export const projectChips = [
  "Custom ERP for Logistics",
  "FinTech Mobile Wallet",
  "Healthcare Portal Hardening",
  "E‑commerce Platform Rebuild",
  "Government Digital Strategy",
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
    result: "Client engagement up 250% after a client portal, document sharing, and booking.",
    href: "https://www.fitchadvisory.com/",
    path: "/portfolio/fitch-advisory",
  },
  {
    client: "Fitch Attorneys",
    result: "Case-management efficiency up 180% after one platform for matters and client updates.",
    href: "https://www.fitchattorneys.com/",
    path: "/portfolio/fitch-attorneys",
  },
  {
    client: "ThinQ Shopping",
    result: "Mobile conversions up 165% with Paystack and MoMo checkout.",
    href: "https://thinqshopping.app/",
    path: "/portfolio/thinq-shopping",
  },
] as const;

export const faqItems = [
  {
    q: "Where is OceanCyber based?",
    a: `Accra — ${googleBusinessProfile.address.street}. A team of ${googleBusinessProfile.teamSize}, founded in ${googleBusinessProfile.foundedYear}, rated ${googleBusinessProfile.rating} from ${googleBusinessProfile.reviewCount} Google reviews. For hire pages by city, see web design in Accra and web design in Ghana.`,
  },
  {
    q: "How do we start a project?",
    a: "Share goals, budget range, and timeline on Get started or Contact. We reply with the right package or a scoped next step — the project calculator helps with a rough cedis range.",
  },
  {
    q: "What services do you offer?",
    a: "UI/UX, websites, mobile apps, ecommerce, cybersecurity, and hosting — all from the Accra office. See Services for detail.",
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes — retainers and milestone support after launch, sized to your site or app.",
  },
  {
    q: "How long does a typical build take?",
    a: "Depends on scope. Small marketing sites move faster; product work ships in milestones with regular demos.",
  },
  {
    q: "Do you require a deposit?",
    a: "Most work uses phased billing tied to milestones — spelled out in the proposal before we start.",
  },
  {
    q: "Can we customise a package?",
    a: "Yes. Startup, Professional, and Enterprise are starting points — we scope to your constraints. Compare inclusions on the pricing page.",
  },
  {
    q: "What is included in each pricing package?",
    a: "Startup from GHS 6,000 (up to 5 pages). Professional from GHS 14,500 adds custom UI/UX and analytics. Enterprise from GHS 30,000 covers complex platforms with a dedicated delivery lead.",
  },
  {
    q: "How do you measure success?",
    a: "We agree goals up front — traffic, sales, staff time saved, or security fixes — and review them after launch.",
  },
] as const;

export const blogTeasers = [
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
