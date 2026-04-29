/** Marketing homepage content — structure aligned with Start-Up Agencyy; copy tailored for OceanCyber. */

/** Primary bar: Home routes to `/`; other items scroll to section anchors on `/`. */
export type StartupNavLink =
  | { readonly label: "Home"; readonly href: "/" }
  | { readonly label: string; readonly sectionId: string };

export const startupNav: StartupNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Portfolio", sectionId: "projects" },
];

export const startupMegaLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Project calculator", href: "/tools/project-cost" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Get started", href: "/get-started" },
] as const;

export const heroServiceSlides = [
  {
    title: "Web development",
    href: "/services/web-development",
    imageAlt: "Developer workspace with laptop and code editor",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
  },
  {
    title: "Mobile apps",
    href: "/services/mobile-apps",
    imageAlt: "Hands holding a smartphone in use outdoors",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
  },
  {
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    imageAlt: "Abstract digital security network visualization",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
  },
  {
    title: "E‑commerce",
    href: "/services/ecommerce",
    imageAlt: "Retail checkout and shopping context",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
  },
] as const;

export const marqueeTags = [
  "Web · Mobile · Cloud",
  "Accra · Ghana · Regional",
  "Ship with clarity",
  "Security‑minded delivery",
  "Design studio",
  "ICT partner",
  "Web · Mobile · Cloud",
  "Proof over promises",
] as const;

export const serviceCards = [
  {
    title: "Web development",
    desc: "Modern, high‑performance websites with measurable delivery standards.",
    href: "/services/web-development",
  },
  {
    title: "Mobile apps",
    desc: "Native and cross‑platform apps built for reliable performance.",
    href: "/services/mobile-apps",
  },
  {
    title: "E‑commerce",
    desc: "Scalable stores with dependable checkout and payments.",
    href: "/services/ecommerce",
  },
  {
    title: "SEO & growth",
    desc: "Visibility and conversion paths tuned for your market.",
    href: "/services",
  },
  {
    title: "Cybersecurity",
    desc: "Audits, hardening, and practical protection for your operations.",
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud & hosting",
    desc: "Domains, SSL, and hosting foundations with local support.",
    href: "/hosting",
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Discovery & strategy",
    body: "We align on goals, users, constraints, and a realistic roadmap.",
    bullets: ["Stakeholder workshop", "Technical discovery", "Scope & milestones"],
  },
  {
    step: 2,
    title: "Design & build",
    body: "Iterative UI and engineering with weekly checkpoints and demos.",
    bullets: ["UX & UI system", "Implementation", "QA & performance"],
  },
  {
    step: 3,
    title: "Review & launch",
    body: "Hardening, documentation, and go‑live runbooks your team can trust.",
    bullets: ["Security review", "Launch checklist", "Monitoring"],
  },
  {
    step: 4,
    title: "Support & iterate",
    body: "Post‑launch improvements, analytics, and ongoing partnership.",
    bullets: ["SLAs where needed", "Roadmap reviews", "Training"],
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
  "Portfolio for creative studio",
  "Mobile app UX refresh",
  "Secure customer portal",
  "E‑commerce launch",
  "SEO uplift programme",
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
    price: "From $500",
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
    price: "From $1,200",
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
    price: "From $2,500",
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
    title: "Digital Transformation: A Ghanaian Perspective",
    date: "March 10, 2024",
    href: "/insights/digital-transformation-ghana",
  },
  {
    title: "The Future of Cybersecurity in Africa",
    date: "March 15, 2024",
    href: "/insights/future-cybersecurity-africa",
  },
  {
    title: "E-commerce Growth in Emerging Markets",
    date: "February 28, 2024",
    href: "/insights/ecommerce-emerging-markets",
  },
] as const;
