/** Marketing homepage content — structure aligned with Start-Up Agencyy; copy tailored for OceanCyber. */

export const heroServiceSlides = [
  {
    title: "Bespoke Web Platforms",
    href: "/services/web-development",
    imageAlt: "Developer workspace with laptop and code editor",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
  },
  {
    title: "Native Mobile Apps",
    href: "/services/mobile-apps",
    imageAlt: "Hands holding a smartphone in use outdoors",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
  },
  {
    title: "Zero‑Trust Security",
    href: "/services/cybersecurity",
    imageAlt: "Abstract digital security network visualization",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
  },
  {
    title: "Enterprise Cloud",
    href: "/services/ecommerce",
    imageAlt: "Retail checkout and shopping context",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
  },
] as const;

export const marqueeTags = [
  "Premium Web Development",
  "High‑Performance Mobile Apps",
  "Enterprise Cloud Solutions",
  "Zero‑Trust Cybersecurity",
  "Built for Africa · Built for Scale",
  "Disciplined Product Delivery",
  "Premium UI/UX Design",
  "Managed IT Infrastructure",
  "Web · Mobile · Cloud · Security",
  "Accra · Ghana · Regional Support",
] as const;

export const serviceCards = [
  {
    title: "Bespoke Web Development",
    desc: "Accelerating your growth with high‑performance, conversion‑optimised web platforms built on modern stacks.",
    href: "/services/web-development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    title: "Custom Mobile Solutions",
    desc: "Seamless iOS and Android experiences designed to engage users and scale effortlessly with your business.",
    href: "/services/mobile-apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    title: "E‑commerce Engineering",
    desc: "Powering regional commerce with secure, high‑availability storefronts and integrated payment ecosystems.",
    href: "/services/ecommerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    title: "SEO & Brand Growth",
    desc: "Dominating search results and driving organic traffic through data‑led content strategies and technical SEO.",
    href: "/services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Zero‑Trust Cybersecurity",
    desc: "Hardening your digital assets with enterprise‑grade security audits, penetration testing, and compliance monitoring.",
    href: "/services/cybersecurity",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    title: "Infrastructure & Cloud",
    desc: "Reliable cloud foundations and managed hosting with localized support for mission‑critical digital services.",
    href: "/hosting",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Strategic Discovery",
    body: "We dive deep into your business goals to map out a technical blueprint that prioritizes ROI and user experience.",
    bullets: ["Stakeholder Alignment", "Competitor Analysis", "Technical Roadmap"],
  },
  {
    step: 2,
    title: "Agile Development",
    body: "Iterative sprints with weekly demos ensure transparency and allow for rapid pivots based on real‑world feedback.",
    bullets: ["UI/UX Prototyping", "Scalable Engineering", "Continuous Integration"],
  },
  {
    step: 3,
    title: "Security Hardening",
    body: "Before go‑live, we perform rigorous security audits and performance stress tests to ensure a bulletproof launch.",
    bullets: ["Penetration Testing", "Load Balancing", "Launch Monitoring"],
  },
  {
    step: 4,
    title: "Growth & Optimization",
    body: "Launch is just the beginning. We provide ongoing support and data insights to continuously refine your product.",
    bullets: ["Post‑Launch Support", "Analytics Review", "Future Scaling"],
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
    title: "Cyber Resilience in the West African Digital Economy",
    date: "April 24, 2024",
    href: "/insights/cyber-resilience-ghana",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: "Security",
    author: "Ama Boateng",
  },
  {
    title: "Scaling Mobile Products for the Next Billion Users",
    date: "April 18, 2024",
    href: "/insights/scaling-mobile-products",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    category: "Product",
    author: "James Osei",
  },
  {
    title: "The Shift to Serverless: Modern Cloud Architectures",
    date: "April 10, 2024",
    href: "/insights/serverless-cloud-ghana",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    category: "Infrastructure",
    author: "Sarah Mensah",
  },
] as const;
