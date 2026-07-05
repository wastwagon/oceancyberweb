/** Marketing homepage content — structure aligned with Start-Up Agency; copy tailored for OceanCyber. */

import { serviceImages } from "./service-images";
import { googleReviewHighlights } from "./google-business";

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
  { name: "EGP Ghana", order: 0, thumb: "/images/EGP Ghana.webp", logo: "/images/clients/egp-ghana.svg", href: "/portfolio/egp-ghana" },
  { name: "Juelle Hair", order: 1, thumb: "/images/Juelle Hair.webp", logo: "/images/clients/juelle-hair.svg", href: "/portfolio/juelle-hair" },
  { name: "Tour World", order: 2, thumb: "/images/Tour World Tourism.webp", logo: "/images/clients/tour-world.svg", href: "/portfolio/tour-world-tourism" },
  { name: "Fitch Advisory", order: 3, thumb: "/images/Fitch Advisory.webp", logo: "/images/clients/fitch-advisory.svg", href: "/portfolio/fitch-advisory" },
  { name: "Fitch Attorneys", order: 4, thumb: "/images/Fitch Attorney.webp", logo: "/images/clients/fitch-attorneys.svg", href: "/portfolio/fitch-attorneys" },
  { name: "Africa Trade Chamber", order: 5, thumb: "/images/Africa Trade Chamber.webp", logo: "/images/clients/africa-trade-chamber.svg", href: "/portfolio/african-trade-chamber" },
] as const;

export const showreelSlides = [
  { src: "/images/creative-template.png", caption: "OceanCyber Creative Hub" },
  { src: "/images/EGP Ghana.webp", caption: "EGP Ghana — Financial Services" },
  { src: "/images/Juelle Hair.webp", caption: "Juelle Hair — E-commerce" },
  { src: "/images/Tour World Tourism.webp", caption: "Tour World Tourism" },
  { src: "/images/Fitch Advisory.webp", caption: "Fitch Advisory" },
] as const;

export const aboutWorkPreview = [
  {
    title: "Financial Services Platform",
    category: "Web · Dashboard",
    image: "/images/agency-bento/agency-bento-fintech-dashboard.webp",
  },
  {
    title: "Mobile Commerce Experience",
    category: "E‑commerce · iOS & Android",
    image: "/images/agency-bento/agency-bento-mobile-commerce.webp",
  },
  {
    title: "Brand & Design System",
    category: "UI/UX · Identity",
    image: "/images/agency-bento/agency-bento-brand-system.webp",
  },
  {
    title: "Travel Booking Platform",
    category: "Web · Hospitality",
    image: "/images/agency-bento/agency-bento-travel-platform.webp",
  },
  {
    title: "Secure Enterprise Portal",
    category: "Cyber Security · Web",
    image: "/images/agency-bento/agency-bento-cybersecurity-platform.webp",
  },
] as const;

export const aboutStats = [
  { value: "8+", label: "Years delivering" },
  { value: "50+", label: "Products launched" },
  { value: "5", label: "Industry verticals" },
] as const;

export const trustSignals = [
  {
    icon: "award" as const,
    stat: "8+",
    title: "Years in market",
    body: "Founded in Accra in 2018 — shipping for startups, SMEs, and enterprise teams.",
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

export const testimonials = [
  ...googleReviewHighlights,
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
    title: "Navigating the GH¢3 Trillion Mobile Money Economy",
    date: "May 2024",
    href: "/insights/ghana-momo-economy",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: "Fintech",
    author: "OceanCyber Research",
  },
  {
    title: "Why Cyberattacks on Ghanaian Businesses Rose 50% in 2024",
    date: "April 2024",
    href: "/insights/ghana-cybersecurity-trends",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    category: "Security",
    author: "OceanCyber Security",
  },
  {
    title: "Preparing for Ghana's US$1 Billion E‑commerce Boom in 2025",
    date: "March 2024",
    href: "/insights/ecommerce-growth-ghana",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Growth",
    author: "OceanCyber Product",
  },
] as const;
