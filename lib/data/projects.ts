import {
  CONCEPT_PORTFOLIO_CLIENT_LABEL,
  CONCEPT_PORTFOLIO_DESCRIPTION_LEAD,
} from "@/lib/marketing/concept-portfolio-copy";
import { liveDeliveryMetric } from "@/lib/marketing/long-term-trust-policy";
import { siteImagePaths } from "@/lib/seo/site-image-paths";

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  metrics?: {
    increase: string;
    metric: string;
  };
  year: string;
  client: string;
  rating: number;
  testimonial?: string;
  services?: string[];
  slug: string;
  results?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "OceanCyber Creative Hub",
    category: "Creative Dashboard",
    description: CONCEPT_PORTFOLIO_DESCRIPTION_LEAD,
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    gradient: "from-purple-500 to-cyan-500",
    image: siteImagePaths.portfolio.creativeHub,
    year: "2026",
    client: CONCEPT_PORTFOLIO_CLIENT_LABEL,
    rating: 5,
    slug: "creative-hub-template",
    services: ["UI/UX direction", "Dashboard layout", "Design system tokens"],
    results:
      "Reference for how we present analytics-heavy interfaces in pitches — labelled as concept work on the portfolio hub.",
  },
  {
    title: "EGP Ghana",
    category: "Financial Services",
    description: "Secure online banking and customer portal for a financial institution — login, statements, and support flows built for Ghana users.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    gradient: "from-ocean-500 to-cyan-500",
    image: siteImagePaths.portfolio.egpGhana,
    metrics: liveDeliveryMetric("Banking portal"),
    year: "2024",
    client: "EGP Ghana",
    rating: 5,
    slug: "egp-ghana",
    services: ["Web Design", "Security", "Database Architecture", "API Development"],
    testimonial: "OceanCyber delivered a robust banking platform that exceeded our security requirements while providing an exceptional user experience for our customers.",
    results: "Secure login, statements, and support flows for Ghana banking customers"
  },
  {
    title: "Juelle Hair",
    category: "E-commerce",
    description: "Complete e-commerce platform for premium hair products with inventory management, customer accounts, and integrated payment processing.",
    tech: ["React", "Next.js", "Stripe", "MongoDB", "Cloudinary"],
    gradient: "from-teal-500 to-cyan-500",
    image: siteImagePaths.portfolio.juelleHair,
    metrics: liveDeliveryMetric("Online store"),
    year: "2024",
    client: "Juelle Hair",
    rating: 5,
    slug: "juelle-hair",
    services: ["E-commerce Development", "Payment Integration", "Inventory Management", "Cloud Storage"],
    testimonial: "The platform has transformed our business operations and significantly increased our online sales. The team was professional and delivered on time.",
    results: "Streamlined operations and expanded customer reach across multiple countries"
  },
  {
    title: "Tour World Tourism",
    category: "Travel & Hospitality",
    description: "Booking platform for tour operators with real-time availability, payment integration, and customer management dashboard.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "React Query", "Tailwind"],
    gradient: "from-cyan-500 to-ocean-500",
    image: siteImagePaths.portfolio.tourWorld,
    metrics: liveDeliveryMetric("Tour booking"),
    year: "2023",
    client: "Tour World Tourism",
    rating: 5,
    slug: "tour-world-tourism",
    services: ["Booking System", "Real-time Availability", "Payment Processing", "Customer Management"],
    testimonial: "Our booking system now handles busy days without slowing down, and customers book online more often.",
    results: "Online booking with availability and payments for tour customers"
  },
  {
    title: "Fitch Advisory",
    category: "Financial Consulting",
    description: "Professional advisory firm website with client portal, secure document sharing, and integrated scheduling system for financial consultations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS S3"],
    gradient: "from-blue-500 to-indigo-500",
    image: siteImagePaths.portfolio.fitchAdvisory,
    metrics: liveDeliveryMetric("Portal, booking & documents"),
    year: "2024",
    client: "Fitch Advisory",
    rating: 5,
    slug: "fitch-advisory",
    liveUrl: "https://www.fitchadvisory.com/",
    services: ["Web Design", "Security", "Client Portal", "Document Management", "SEO"],
    testimonial: "OceanCyber created a sophisticated platform that perfectly represents our brand and enhances our client service capabilities.",
    results: "Self-serve booking and document sharing for advisory clients"
  },
  {
    title: "Fitch Attorneys",
    category: "Legal Services",
    description: "Comprehensive law firm website with case management system, client communication portal, and legal resource library.",
    tech: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Express.js", "Cloudflare"],
    gradient: "from-gray-600 to-blue-600",
    image: siteImagePaths.portfolio.fitchAttorneys,
    metrics: liveDeliveryMetric("Case & client portal"),
    year: "2024",
    client: "Fitch Attorneys",
    rating: 5,
    slug: "fitch-attorneys",
    liveUrl: "https://www.fitchattorneys.com/",
    services: ["Web Design", "Security", "Case Management", "Client Portal", "SEO"],
    testimonial: "The new system has revolutionized how we manage cases and communicate with clients, significantly improving our workflow.",
    results: "Matter workflow and client updates on one platform"
  },
  {
    title: "Africa Governance Centre",
    category: "Governance & Policy",
    description:
      "Continental governance centre platform for programmes, research, events, and policy engagement across Africa.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
    gradient: "from-emerald-500 to-teal-500",
    image: siteImagePaths.portfolioLive.africaGovernanceCentre,
    metrics: liveDeliveryMetric("Programmes & events"),
    year: "2024",
    client: "Africa Governance Centre",
    rating: 5,
    slug: "africa-governance-centre",
    liveUrl: "https://www.africagovernancecentre.org/",
    services: ["Web Design", "Content Architecture", "Event Workflows", "SEO", "Performance"],
    testimonial:
      "OceanCyber delivered a platform that reflects our continental mandate and makes our programmes accessible to partners worldwide.",
    results: "One site for programmes and events — partners find schedules and register in one place",
  },
  {
    title: "ThinQ Shopping",
    category: "E-Commerce & Services",
    description:
      "Mobile-first e-commerce and services app with product discovery, checkout flows, and merchant operations tooling.",
    tech: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Paystack", "MoMo"],
    gradient: "from-violet-500 to-fuchsia-500",
    image: siteImagePaths.portfolioLive.thinqShopping,
    metrics: liveDeliveryMetric("MoMo & Paystack store"),
    year: "2024",
    client: "ThinQ Shopping",
    rating: 5,
    slug: "thinq-shopping",
    liveUrl: "https://thinqshopping.app/",
    services: ["Mobile Apps", "E-commerce", "Payment Integration", "UI/UX Design"],
    testimonial:
      "The app transformed how customers discover products and book services — checkout is fast and the team can manage orders with confidence.",
    results: "Mobile checkout and order handling for retail and services"
  },
  {
    title: "Africa Trade Awards",
    category: "Event Management",
    description: "Award ceremony website with nomination system, voting platform, sponsor management, and live event streaming capabilities.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "React Query", "Tailwind CSS", "Vercel"],
    gradient: "from-orange-500 to-red-500",
    image: siteImagePaths.portfolio.africaTradeAwards,
    metrics: liveDeliveryMetric("Nominations & voting"),
    year: "2023",
    client: "Africa Trade Awards",
    rating: 5,
    slug: "africa-trade-awards",
    services: ["Event Management", "Voting System", "Sponsor Management", "Live Streaming", "SEO"],
    testimonial: "The platform handled thousands of nominations without breaking down — voters and admins both had a smooth experience.",
    results: "Public nominations and voting for a large awards programme"
  },
  {
    title: "African Trade Chamber",
    category: "Business Association",
    description: "Business chamber website with member directory, event calendar, trade resources, and networking platform for African businesses.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Redis"],
    gradient: "from-green-500 to-teal-500",
    image: siteImagePaths.portfolio.africaTradeAwards,
    metrics: liveDeliveryMetric("Member directory"),
    year: "2024",
    client: "African Trade Chamber",
    rating: 5,
    slug: "african-trade-chamber",
    services: ["Web Design", "Member Management", "Event Calendar", "Networking Platform", "SEO"],
    testimonial: "OceanCyber delivered a powerful platform that has significantly increased member engagement and streamlined our operations.",
    results: "Enhanced member engagement and streamlined business operations"
  },
];

/** Same dataset as `projects`; used when Prisma has no rows and by `prisma/seed.ts`. */
export const fallbackPortfolioCaseStudies = projects;
