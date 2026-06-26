export type DesignArtifact = {
  phase: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Design-process artifacts keyed by portfolio slug (static until stored in admin). */
export const caseStudyDesignBySlug: Record<string, DesignArtifact[]> = {
  "creative-hub-template": [
    {
      phase: "01",
      title: "Mood & direction",
      description: "Dark premium aesthetic with lime accent tokens aligned to the OceanCyber brand system.",
      image: "/images/creative-template.png",
      imageAlt: "Creative hub moodboard direction",
    },
    {
      phase: "02",
      title: "Dashboard wireframes",
      description: "Information architecture for analytics, project pipeline, and client activity modules.",
      image: "/images/design/wireframe-discovery.svg",
      imageAlt: "Dashboard wireframe structure",
    },
    {
      phase: "03",
      title: "High-fidelity UI",
      description: "Glassmorphism surfaces, data cards, and motion specs for engineering handoff.",
      image: "/images/creative-template.png",
      imageAlt: "High-fidelity dashboard UI",
    },
  ],
  "juelle-hair": [
    {
      phase: "01",
      title: "Customer journey map",
      description: "Mapped browse-to-checkout flows with MoMo payment and account recovery paths.",
      image: "/images/Juelle Hair.webp",
      imageAlt: "Juelle Hair customer journey",
    },
    {
      phase: "02",
      title: "Storefront UI",
      description: "Merchandising grids, product detail templates, and mobile-first cart patterns.",
      image: "/images/design/wireframe-mobile.svg",
      imageAlt: "Juelle Hair storefront wireframe",
    },
    {
      phase: "03",
      title: "Launch experience",
      description: "Production storefront with inventory sync and conversion-focused checkout.",
      image: "/images/Juelle Hair.webp",
      imageAlt: "Juelle Hair live storefront",
    },
  ],
  "egp-ghana": [
    {
      phase: "01",
      title: "Trust & compliance UX",
      description: "Security-first flows for authentication, session handling, and customer self-service.",
      image: "/images/EGP Ghana.webp",
      imageAlt: "EGP Ghana trust UX patterns",
    },
    {
      phase: "02",
      title: "Portal architecture",
      description: "Role-based dashboards for account management and transaction visibility.",
      image: "/images/design/wireframe-dashboard.svg",
      imageAlt: "EGP Ghana portal wireframes",
    },
    {
      phase: "03",
      title: "Shipped platform",
      description: "Hardened financial portal with measurable uplift in digital transactions.",
      image: "/images/EGP Ghana.webp",
      imageAlt: "EGP Ghana live platform",
    },
  ],
  "fitch-advisory": [
    {
      phase: "01",
      title: "Brand & IA",
      description: "Professional services narrative with clear service hierarchy and credibility markers.",
      image: "/images/design/wireframe-discovery.svg",
      imageAlt: "Fitch Advisory information architecture",
    },
    {
      phase: "02",
      title: "Client portal UX",
      description: "Secure document sharing and consultation scheduling with minimal friction.",
      image: "/images/Fitch Advisory.webp",
      imageAlt: "Fitch Advisory client portal",
    },
    {
      phase: "03",
      title: "Live experience",
      description: "Published site with engagement-focused content and portal access.",
      image: "/images/Fitch Advisory.webp",
      imageAlt: "Fitch Advisory live site",
    },
  ],
};

export function getDesignArtifactsBySlug(slug: string): DesignArtifact[] {
  return caseStudyDesignBySlug[slug] ?? [];
}
