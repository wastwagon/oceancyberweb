export type TechnologyPartner = {
  name: string;
  description: string;
};

export type DeliveryStandard = {
  title: string;
  description: string;
};

/** Platforms and standards OceanCyber integrates — update when formal partnerships are signed. */
export const technologyPartners: TechnologyPartner[] = [
  {
    name: "Paystack",
    description: "Card and mobile money checkout for Ghanaian commerce",
  },
  {
    name: "Mobile Money (MoMo)",
    description: "Telco wallet rails with reconciliation and dispute flows",
  },
  {
    name: "PostgreSQL",
    description: "Relational data with audit-friendly schemas",
  },
  {
    name: "AWS & cloud",
    description: "Hardened hosting, object storage, and observability",
  },
  {
    name: "Cloudflare",
    description: "Edge protection and performance for public apps",
  },
  {
    name: "Next.js & React",
    description: "Modern web and hybrid mobile delivery stacks",
  },
];

export const deliveryStandards: DeliveryStandard[] = [
  {
    title: "Security-first delivery",
    description: "Identity, logging, and resilience treated as product requirements",
  },
  {
    title: "Ghana regulatory context",
    description: "BoG, Data Protection Act, and local payment-rail experience",
  },
  {
    title: "Named delivery lead",
    description: "Enterprise engagements include a single accountable lead",
  },
  {
    title: "Post-launch support",
    description: "Retainers and milestone support after go-live",
  },
];

export type VideoTestimonial = {
  id: string;
  client: string;
  sector: string;
  quote: string;
  author: string;
  role: string;
  /** YouTube embed URL or direct mp4 — set via NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL */
  videoUrl?: string;
  posterImage?: string;
};

export const featuredVideoTestimonial: VideoTestimonial = {
  id: "fitch-advisory",
  client: "Fitch Advisory",
  sector: "Advisory & consultancy",
  quote:
    "OceanCyber created a sophisticated platform that perfectly represents our brand and enhances our client service capabilities.",
  author: "Fitch Advisory leadership",
  role: "Institutional advisory · Ghana",
  videoUrl: process.env.NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL?.trim() || undefined,
  posterImage: "/images/portfolio-live/fitch-advisory.webp",
};
