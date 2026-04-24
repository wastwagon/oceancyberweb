interface Project {
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
}

export const projects: Project[] = [
  {
    title: "EGP Ghana",
    category: "Financial Services",
    description: "Comprehensive digital transformation for a leading financial institution, implementing secure online banking solutions and customer portal systems.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    gradient: "from-ocean-500 to-cyan-500",
    image: "/images/EGP Ghana.webp",
    metrics: { increase: "200%", metric: "Online Transactions" },
    year: "2024",
    client: "EGP Ghana",
    rating: 5,
    slug: "egp-ghana",
    services: ["Web Design", "Security", "Database Architecture", "API Development"],
    testimonial: "OceanCyber delivered a robust banking platform that exceeded our security requirements while providing an exceptional user experience for our customers.",
    results: "Enhanced customer satisfaction and reduced operational costs by 40%"
  },
  {
    title: "Juelle Hair",
    category: "E-commerce",
    description: "Complete e-commerce platform for premium hair products with inventory management, customer accounts, and integrated payment processing.",
    tech: ["React", "Next.js", "Stripe", "MongoDB", "Cloudinary"],
    gradient: "from-teal-500 to-cyan-500",
    image: "/images/Juelle Hair.webp",
    metrics: { increase: "150%", metric: "Sales Growth" },
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
    image: "/images/Tour World Tourism.webp",
    metrics: { increase: "300%", metric: "Booking Conversions" },
    year: "2023",
    client: "Tour World Tourism",
    rating: 5,
    slug: "tour-world-tourism",
    services: ["Booking System", "Real-time Availability", "Payment Processing", "Customer Management"],
    testimonial: "Our booking system now handles high traffic seamlessly and has improved our customer retention significantly.",
    results: "Improved customer retention and reduced booking errors by 90%"
  },
  {
    title: "Fitch Advisory",
    category: "Financial Consulting",
    description: "Professional advisory firm website with client portal, secure document sharing, and integrated scheduling system for financial consultations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS S3"],
    gradient: "from-blue-500 to-indigo-500",
    image: "/images/Fitch Advisory.webp",
    metrics: { increase: "250%", metric: "Client Engagement" },
    year: "2024",
    client: "Fitch Advisory",
    rating: 5,
    slug: "fitch-advisory",
    services: ["Web Design", "Security", "Client Portal", "Document Management", "SEO"],
    testimonial: "OceanCyber created a sophisticated platform that perfectly represents our brand and enhances our client service capabilities.",
    results: "Increased client engagement and streamlined consultation scheduling process"
  },
  {
    title: "Fitch Attorneys",
    category: "Legal Services",
    description: "Comprehensive law firm website with case management system, client communication portal, and legal resource library.",
    tech: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Express.js", "Cloudflare"],
    gradient: "from-gray-600 to-blue-600",
    image: "/images/Fitch Attorney.webp",
    metrics: { increase: "180%", metric: "Case Management Efficiency" },
    year: "2024",
    client: "Fitch Attorneys",
    rating: 5,
    slug: "fitch-attorneys",
    services: ["Web Design", "Security", "Case Management", "Client Portal", "SEO"],
    testimonial: "The new system has revolutionized how we manage cases and communicate with clients, significantly improving our workflow.",
    results: "Enhanced case management efficiency and improved client communication"
  },
  {
    title: "Africa Trade Awards",
    category: "Event Management",
    description: "Award ceremony website with nomination system, voting platform, sponsor management, and live event streaming capabilities.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "React Query", "Tailwind CSS", "Vercel"],
    gradient: "from-orange-500 to-red-500",
    image: "/images/Africa Trade Chamber.webp",
    metrics: { increase: "400%", metric: "Nomination Submissions" },
    year: "2023",
    client: "Africa Trade Awards",
    rating: 5,
    slug: "africa-trade-awards",
    services: ["Event Management", "Voting System", "Sponsor Management", "Live Streaming", "SEO"],
    testimonial: "The platform handled thousands of nominations seamlessly and provided an excellent experience for all participants.",
    results: "Increased nomination submissions and enhanced event participant engagement"
  },
  {
    title: "African Trade Chamber",
    category: "Business Association",
    description: "Business chamber website with member directory, event calendar, trade resources, and networking platform for African businesses.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Redis"],
    gradient: "from-green-500 to-teal-500",
    image: "/images/Africa Trade Chamber.webp",
    metrics: { increase: "350%", metric: "Member Engagement" },
    year: "2024",
    client: "African Trade Chamber",
    rating: 5,
    slug: "african-trade-chamber",
    services: ["Web Design", "Member Management", "Event Calendar", "Networking Platform", "SEO"],
    testimonial: "OceanCyber delivered a powerful platform that has significantly increased member engagement and streamlined our operations.",
    results: "Enhanced member engagement and streamlined business operations"
  },
];
