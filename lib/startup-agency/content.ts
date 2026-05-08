/** Marketing homepage content — structure aligned with Start-Up Agencyy; copy tailored for OceanCyber. */

export const heroServiceSlides = [
  {
    title: "Platforms that Scale",
    href: "/services/web-development",
    imageAlt: "Developer workspace with laptop and code editor",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
  },
  {
    title: "Apps that Convert",
    href: "/services/mobile-apps",
    imageAlt: "Hands holding a smartphone in use outdoors",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
  },
  {
    title: "Security that Protects",
    href: "/services/cybersecurity",
    imageAlt: "Abstract digital security network visualization",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
  },
  {
    title: "Cloud that Lasts",
    href: "/services/ecommerce",
    imageAlt: "Retail checkout and shopping context",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
  },
] as const;

export const marqueeTags = [
  "Hard-Core Engineering",
  "GH¢3.01T+ MoMo Economy",
  "Zero‑Trust Security",
  "99.9% Uptime Hosting",
  "Built for Growth",
  "US$1B+ E‑commerce Market",
  "No-Fluff Product Delivery",
  "Managed IT Infrastructure",
  "Web · Mobile · Cloud · Security",
  "The Partner for Global Standards",
] as const;

export const serviceCards = [
  {
    title: "Web Platforms",
    desc: "We build the high-performance foundations that power your business. No templates, no shortcuts, just solid code.",
    href: "/services/web-development",
    image: "/images/EGP Ghana.webp",
  },
  {
    title: "Mobile Products",
    desc: "We ship native iOS and Android apps that users actually enjoy using. Built for speed and reliability.",
    href: "/services/mobile-apps",
    image: "/images/Juelle Hair.webp",
  },
  {
    title: "E‑commerce Engines",
    desc: "Secure storefronts that handle thousands of orders and MoMo payments without breaking a sweat.",
    href: "/services/ecommerce",
    image: "/images/Tour World Tourism.webp",
  },
  {
    title: "Search & SEO",
    desc: "Stop hiding on page 2. We use technical SEO and data to get your brand in front of the right people.",
    href: "/services",
    image: "/images/Fitch Advisory.webp",
  },
  {
    title: "Cyber Security",
    desc: "We find the holes in your security before the bad guys do. Audits, pentesting, and 24/7 monitoring.",
    href: "/services/cybersecurity",
    image: "/images/Fitch Attorney.webp",
  },
  {
    title: "Cloud Hosting",
    desc: "Bulletproof infrastructure with localized support. We keep your site live while you sleep.",
    href: "/hosting",
    image: "/images/Africa Trade Chamber.webp",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Product Roadmapping",
    body: "We skip the generic talk and get straight to your business requirements. We map out exactly what needs to be built.",
    bullets: ["No-Fluff Discovery", "System Design", "Technical Specs"],
  },
  {
    step: 2,
    title: "Building & Shipping",
    body: "Our engineers write clean code in weekly cycles. You get a private link to see the progress as it happens.",
    bullets: ["Weekly Demos", "Clean Engineering", "Real-Time Updates"],
  },
  {
    step: 3,
    title: "Stress Testing",
    body: "We try to break the software before your users do. Security audits and load tests are standard, not extra.",
    bullets: ["Security Audits", "Load Testing", "Final Polish"],
  },
  {
    step: 4,
    title: "Live Operations",
    body: "Launch is the first step. We stay on board to manage the servers and optimize for growth.",
    bullets: ["24/7 Monitoring", "Conversion Tuning", "Continuous Support"],
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
  {
    quote:
      "Clear communication, disciplined delivery, and a team that actually ships. Our launch landed on time.",
    name: "Sarah Mensah",
    role: "Operations Director",
    initials: "SM",
  },
  {
    quote:
      "They translated messy requirements into a clean product roadmap — rare in this market.",
    name: "James Osei",
    role: "Founder",
    initials: "JO",
  },
  {
    quote:
      "Security and performance were treated as first‑class, not an afterthought.",
    name: "Ama Boateng",
    role: "IT Lead",
    initials: "AB",
  },
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
      "Ongoing optimisation",
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
    a: "Web, mobile apps, e‑commerce, cybersecurity, hosting, and related delivery — see Services for detail.",
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
    q: "Can we customise a package?",
    a: "Packages are starting points; we scope to your constraints and priorities.",
  },
  {
    q: "How do you measure success?",
    a: "We agree KPIs up front — technical, commercial, or operational — and review them after launch.",
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
