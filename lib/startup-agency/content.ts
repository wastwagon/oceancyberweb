/** Marketing homepage content — structure aligned with Start-Up Agency; copy tailored for OceanCyber. */

import { siteImagePaths } from "@/lib/seo/site-image-paths";
import { serviceImages } from "./service-images";

export const heroTagline =
  "We design and build digital products that help African businesses grow — from brand and UX to launch.";

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
    title: "Cyber Security",
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
  { src: siteImagePaths.portfolio.creativeHub, caption: "Creative Hub — Studio concepts" },
] as const;

export const aboutWorkPreview = [
  {
    title: "Financial Services Platform",
    category: "Web · Dashboard",
    image: siteImagePaths.work.fintechDashboard,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Mobile Commerce Experience",
    category: "E-commerce · App",
    image: siteImagePaths.work.mobileCommerce,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Brand & Design System",
    category: "UI/UX · Identity",
    image: siteImagePaths.work.brandSystem,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Travel Booking Platform",
    category: "Web · Hospitality",
    image: siteImagePaths.work.travelPlatform,
    href: "/portfolio?tab=creative",
  },
  {
    title: "Secure Enterprise Portal",
    category: "Cyber Security · Web",
    image: siteImagePaths.work.cybersecurityPlatform,
    href: "/portfolio?tab=creative",
  },
] as const;

export const aboutStats = [
  { value: "15+", label: "Years delivering" },
  { value: "500+", label: "Projects launched" },
  { value: "12", label: "Industry verticals" },
] as const;

export const trustSignals = [
  {
    icon: "award" as const,
    stat: "15+",
    title: "Years delivering",
    body: "Deep delivery experience across software, design, infrastructure, and cybersecurity programs.",
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

export const featuredCaseStudies = [
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "250%",
    metricLabel: "Client engagement",
    sector: "Advisory",
  },
  {
    slug: "fitch-attorneys",
    title: "Fitch Attorneys",
    metric: "180%",
    metricLabel: "Case efficiency",
    sector: "Legal",
  },
  {
    slug: "africa-governance-centre",
    title: "Africa Governance Centre",
    metric: "220%",
    metricLabel: "Programme visibility",
    sector: "Governance",
  },
  {
    slug: "thinq-shopping",
    title: "ThinQ Shopping",
    metric: "165%",
    metricLabel: "Mobile conversions",
    sector: "E-commerce",
  },
] as const;

export const marqueeTags = [
  "Solid Software Engineering",
  "Trusted Payment Systems",
  "Zero‑Trust Security",
  "High-Performance Cloud Hosting",
  "Engineering for Growth",
  "Scalable E‑commerce Solutions",
  "Professional Product Delivery",
  "Managed ICT Services",
  "Web · Mobile · Cloud · Security",
  "Your Technology Partner",
] as const;

export const serviceCards = [
  {
    title: "UI/UX & Brand",
    desc: "Human-centered interfaces and brand systems in Figma — wireframes, prototypes, and design handoff your engineers can ship.",
    href: "/services/ui-ux-design",
    image: serviceImages.uiUxBrand,
  },
  {
    title: "Web Development",
    desc: "High-performance websites and web apps that convert visitors into customers — built for speed, SEO, and long-term growth.",
    href: "/services/web-development",
    image: serviceImages.webDevelopment,
  },
  {
    title: "Mobile Apps",
    desc: "Native-quality iOS and Android experiences users enjoy — offline flows, MoMo payments, and store-ready releases.",
    href: "/services/mobile-apps",
    image: serviceImages.mobileApps,
  },
  {
    title: "E‑commerce",
    desc: "Storefronts that handle real volume — catalog, checkout, MoMo, and ops tooling without breaking under pressure.",
    href: "/services/ecommerce",
    image: serviceImages.ecommerce,
  },
  {
    title: "Cyber Security",
    desc: "Find vulnerabilities before attackers do — audits, hardening, and monitoring that protect your reputation and revenue.",
    href: "/services/cybersecurity",
    image: serviceImages.cyberSecurity,
  },
  {
    title: "Cloud Hosting",
    desc: "Reliable infrastructure with local support — domains, SSL, and hosting that keeps your business online.",
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

export const pricingPlans = [
  {
    name: "Startup",
    price: "From GHS 6,000",
    desc: "Perfect for validation and first releases.",
    featured: false,
    features: [
      "Branding & landing experience",
      "Core integrations",
      "One SEO/content sprint",
      "30 days post‑launch support",
    ],
  },
  {
    name: "Professional",
    price: "From GHS 14,500",
    desc: "For teams scaling product and marketing.",
    featured: true,
    features: [
      "Multi‑page product surface",
      "Analytics & conversion tracking",
      "Extended QA & performance",
      "90 days support window",
    ],
  },
  {
    name: "Enterprise",
    price: "From GHS 30,000",
    desc: "Security‑aware and multi‑stakeholder delivery.",
    featured: false,
    features: [
      "Compliance‑friendly workflows",
      "Dedicated delivery lead",
      "SLA options",
      "Ongoing optimization",
    ],
  },
] as const;

export const faqItems = [
  {
    q: "How do we start a project?",
    a: "Contact us with goals and timeline. We reply with next steps and, where helpful, a rough range using our project calculator.",
  },
  {
    q: "What services do you offer?",
    a: "UI/UX design, brand identity, web, mobile apps, e‑commerce, cybersecurity, hosting, and related delivery — see Services for detail.",
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes — retainers and milestone‑based support after launch, tuned to your needs.",
  },
  {
    q: "How long does a typical build take?",
    a: "Depends on scope. Small marketing sites are faster; product work is milestone‑based with weekly visibility.",
  },
  {
    q: "Do you require a deposit?",
    a: "Most engagements use phased billing aligned to milestones — we’ll spell this out in the proposal.",
  },
  {
    q: "Can we customize a package?",
    a: "Packages are starting points; we scope to your constraints and priorities.",
  },
  {
    q: "How do you measure success?",
    a: "We agree KPIs upfront — technical, commercial, or operational — and review them after launch.",
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
