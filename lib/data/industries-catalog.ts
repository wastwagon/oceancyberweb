/** Shared industry cards for /industries, footer, and navigation. */
export type IndustryCatalogEntry = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  navDescription: string;
  image: string;
  services: string[];
  href: `/industries/${string}`;
};

export const industryCatalog: IndustryCatalogEntry[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    shortTitle: "Financial Services",
    description:
      "Banking-grade platforms, payments, and risk tooling designed for Ghana's regulatory reality.",
    navDescription: "Secure banking solutions and fintech innovations.",
    image: "/images/industries/finance.png",
    services: [
      "Digital banking platforms",
      "Payment gateway integration",
      "Fraud detection systems",
      "Compliance solutions",
    ],
    href: "/industries/financial-services",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortTitle: "Healthcare",
    description:
      "Healthcare technology that improves access and operations while respecting privacy and uptime.",
    navDescription: "Compliant healthcare technology solutions.",
    image: "/images/industries/healthcare.png",
    services: [
      "Electronic health records",
      "Telemedicine platforms",
      "Medical data analytics",
      "Patient management systems",
    ],
    href: "/industries/healthcare",
  },
  {
    slug: "education",
    title: "Education",
    shortTitle: "Education",
    description:
      "E-learning platforms and tools that scale from institutions to national programs.",
    navDescription: "E-learning platforms that improve delivery and outcomes.",
    image: "/images/industries/education.png",
    services: [
      "Learning management systems",
      "Virtual classrooms",
      "Educational apps",
      "Student analytics",
    ],
    href: "/industries/education",
  },
  {
    slug: "tourism",
    title: "Tourism & Hospitality",
    shortTitle: "Tourism",
    description:
      "Booking, guest experience, and operations software for travel brands.",
    navDescription: "Booking and guest experience platforms for travel brands.",
    image: "/images/industries/tourism.png",
    services: [
      "Booking systems",
      "Hotel management software",
      "Travel apps",
      "Customer experience platforms",
    ],
    href: "/industries/tourism",
  },
  {
    slug: "retail",
    title: "Retail & E-commerce",
    shortTitle: "Retail & Commerce",
    description:
      "Omnichannel commerce and retail systems that convert and scale.",
    navDescription: "Retail technology to boost online sales and engagement.",
    image: "/images/industries/retail.png",
    services: [
      "E-commerce platforms",
      "Inventory management",
      "Customer analytics",
      "Mobile shopping apps",
    ],
    href: "/industries/retail",
  },
  {
    slug: "legal",
    title: "Legal Services",
    shortTitle: "Legal",
    description:
      "Case management, portals, and secure document workflows for modern firms.",
    navDescription: "Case management and secure client portals for law firms.",
    image: "/images/industries/legal.png",
    services: [
      "Case management systems",
      "Document automation",
      "Client portals",
      "Legal analytics",
    ],
    href: "/industries/legal",
  },
  {
    slug: "logistics",
    title: "Logistics & Supply Chain",
    shortTitle: "Logistics",
    description:
      "Fleet, warehouse, and last-mile platforms that improve visibility from depot to doorstep.",
    navDescription: "Tracking, dispatch, and fulfillment software for movers of goods.",
    image: "/images/industries/logistics.png",
    services: [
      "Fleet & dispatch systems",
      "Warehouse management",
      "Last-mile delivery apps",
      "Supply chain analytics",
    ],
    href: "/industries/logistics",
  },
  {
    slug: "real-estate",
    title: "Real Estate & Property",
    shortTitle: "Real Estate",
    description:
      "Listings, tenant portals, and property operations built for Ghana's growing housing market.",
    navDescription: "Property listings, CRM, and tenant management platforms.",
    image: "/images/industries/real-estate.png",
    services: [
      "Property listing platforms",
      "Tenant & landlord portals",
      "Lease & payment workflows",
      "Facility management tools",
    ],
    href: "/industries/real-estate",
  },
  {
    slug: "agriculture",
    title: "Agriculture & AgriTech",
    shortTitle: "Agriculture",
    description:
      "Farmer-facing apps, market linkage, and traceability for Africa's agricultural value chains.",
    navDescription: "Agri marketplaces, cooperatives, and field data platforms.",
    image: "/images/industries/agriculture.png",
    services: [
      "Farmer & cooperative apps",
      "Produce marketplaces",
      "Supply chain traceability",
      "Weather & yield analytics",
    ],
    href: "/industries/agriculture",
  },
  {
    slug: "media-entertainment",
    title: "Media & Entertainment",
    shortTitle: "Media",
    description:
      "Streaming, content platforms, and audience products for creators and broadcasters.",
    navDescription: "Content platforms, streaming, and digital publishing.",
    image: "/images/industries/media.png",
    services: [
      "Streaming & OTT platforms",
      "Content management systems",
      "Creator & fan engagement apps",
      "Subscription billing",
    ],
    href: "/industries/media-entertainment",
  },
  {
    slug: "government",
    title: "Government & Public Sector",
    shortTitle: "Government",
    description:
      "Citizen services, permits, and internal systems with accessibility and audit trails.",
    navDescription: "Citizen portals, e-services, and secure public platforms.",
    image: "/images/industries/government.png",
    services: [
      "Citizen service portals",
      "Permit & licensing workflows",
      "Internal operations systems",
      "Open data dashboards",
    ],
    href: "/industries/government",
  },
  {
    slug: "energy",
    title: "Energy & Utilities",
    shortTitle: "Energy",
    description:
      "Metering, billing, and field operations for power, water, and renewable providers.",
    navDescription: "Utility billing, smart metering, and operations software.",
    image: "/images/industries/energy.png",
    services: [
      "Customer billing portals",
      "Metering & usage dashboards",
      "Field technician apps",
      "Outage & service management",
    ],
    href: "/industries/energy",
  },
];

export function getIndustryBySlug(slug: string): IndustryCatalogEntry | undefined {
  return industryCatalog.find((item) => item.slug === slug);
}

export const industryNavItems = industryCatalog.map((item) => ({
  heading: item.title,
  description: item.navDescription,
  link: item.href,
}));

export const industryFooterLinks = [
  ...industryCatalog.map((item) => ({
    label: item.shortTitle,
    href: item.href,
  })),
  { label: "All Sectors", href: "/industries" as const },
];

export const industrySitemapPaths = industryCatalog.map((item) => item.href);
