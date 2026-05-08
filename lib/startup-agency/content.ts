/** Marketing homepage content — structure aligned with Start-Up Agency; copy tailored for OceanCyber. */

export const heroServiceSlides = [
  {
    title: "Web Development",
    href: "/services/web-development",
    imageAlt: "Developer workspace with laptop and code editor",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    imageAlt: "Hands holding a smartphone in use outdoors",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
  },
  {
    title: "Cyber Security",
    href: "/services/cybersecurity",
    imageAlt: "Abstract digital security network visualization",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
  },
  {
    title: "E-Commerce",
    href: "/services/ecommerce",
    imageAlt: "Retail checkout and shopping context",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
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
    title: "Web Development",
    desc: "We build the high-performance foundations that power your business. No templates, no shortcuts, just solid code.",
    href: "/services/web-development",
    image: "/images/EGP Ghana.webp",
  },
  {
    title: "Mobile Apps",
    desc: "We ship native iOS and Android apps that users actually enjoy using. Built for speed and reliability.",
    href: "/services/mobile-apps",
    image: "/images/Juelle Hair.webp",
  },
  {
    title: "E‑commerce",
    desc: "Secure storefronts that handle thousands of orders and MoMo payments without breaking a sweat.",
    href: "/services/ecommerce",
    image: "/images/Tour World Tourism.webp",
  },
  {
    title: "SEO & Growth",
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
    title: "Strategic Discovery",
    body: "We start by understanding your goals and business requirements to build a clear roadmap for success.",
    bullets: ["Requirements Analysis", "System Design", "Technical Specs"],
  },
  {
    step: 2,
    title: "Design & Prototyping",
    body: "We transform your vision into intuitive user experiences and interactive prototypes that validate the direction.",
    bullets: ["UX/UI Design", "Interactive Mockups", "Brand Alignment"],
  },
  {
    step: 3,
    title: "Iterative Engineering",
    body: "Our engineers build your product in transparent, weekly cycles with regular updates and live demos.",
    bullets: ["Weekly Sprints", "Clean Architecture", "Progress Updates"],
  },
  {
    step: 4,
    title: "Testing & Launch",
    body: "We perform rigorous quality checks and final optimizations to ensure your product is ready for the world.",
    bullets: ["Quality Assurance", "Performance Tuning", "Seamless Deployment"],
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
