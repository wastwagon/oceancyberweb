/** Services nav — human dropdown labels; geo owner URLs stay indexable on dedicated pages. */

export type ServicesGeoNavItem = {
  heading: string;
  description: string;
  link: string;
};

/** Every Accra/Ghana geo service owner URL — footer, sitemap, backend sync checks. */
export const GEO_SERVICE_OWNER_PATHS = [
  "/services/web-design-in-accra",
  "/services/web-design-in-ghana",
  "/services/web-development-in-accra",
  "/services/web-development-in-ghana",
  "/services/software-development-in-accra",
  "/services/software-development-in-ghana",
  "/services/mobile-app-development-in-accra",
  "/services/mobile-app-development-in-ghana",
  "/services/ecommerce-development-in-accra",
  "/services/ecommerce-development-in-ghana",
  "/services/ui-ux-design-in-accra",
  "/services/ui-ux-design-in-ghana",
  "/services/cybersecurity-in-accra",
  "/services/cybersecurity-in-ghana",
] as const;

/** Short “local guides” links in the Services menu — not fourteen “Best …” rows. */
export const servicesLocalGuideMenuItems: readonly ServicesGeoNavItem[] = [
  {
    heading: "Web design in Accra",
    description: "Company sites from GHS 6,000 — meet us at Nii Kwashiefio Avenue.",
    link: "/services/web-design-in-accra",
  },
  {
    heading: "Web design in Ghana",
    description: "Same Accra team for teams outside Greater Accra.",
    link: "/services/web-design-in-ghana",
  },
  {
    heading: "Web development in Accra",
    description: "Websites and web apps with Paystack or MoMo when you sell online.",
    link: "/services/web-development-in-accra",
  },
  {
    heading: "Web development in Ghana",
    description: "Nationwide delivery from one engineering office.",
    link: "/services/web-development-in-ghana",
  },
];

export const servicesCapabilityMenuItems: readonly ServicesGeoNavItem[] = [
  {
    heading: "Web design",
    description: "Company sites and landing pages from GHS 6,000.",
    link: "/services/web-design",
  },
  {
    heading: "UI/UX & brand design",
    description: "Figma screens and brand work from GHS 3,500.",
    link: "/services/ui-ux-design",
  },
  {
    heading: "Web development",
    description: "Marketing sites and web apps built for Ghana mobile networks.",
    link: "/services/web-development",
  },
  {
    heading: "Software development",
    description: "Internal tools and platforms from GHS 14,500.",
    link: "/services/software-development",
  },
  {
    heading: "Mobile apps",
    description: "iOS and Android from GHS 12,000 per platform.",
    link: "/services/mobile-apps",
  },
  {
    heading: "Website to app",
    description: "Turn an existing site into App Store and Play Store releases.",
    link: "/services/website-to-mobile-app",
  },
  {
    heading: "E-commerce",
    description: "Online stores with catalogue, checkout, and MoMo.",
    link: "/services/ecommerce",
  },
  {
    heading: "Security consulting",
    description: "Assessments and hardening from GHS 4,500.",
    link: "/services/cybersecurity",
  },
];

/** Canonical Services dropdown body — keep backend DEFAULT_CONFIG.services.items in sync. */
export function buildServicesDropdownItems(): ServicesGeoNavItem[] {
  return [
    {
      heading: "All services",
      description: "Hub for web, mobile, commerce, and security in cedis.",
      link: "/services",
    },
    ...servicesCapabilityMenuItems,
    {
      heading: "Pricing & packages",
      description: "Startup, Professional, and Enterprise tiers in GHS.",
      link: "/pricing",
    },
    {
      heading: "How we work",
      description: "Discovery, design, build, and launch from Accra.",
      link: "/how-we-work",
    },
    ...servicesLocalGuideMenuItems,
    {
      heading: "More local guides",
      description: "Apps, ecommerce, UI/UX, and security — Accra and Ghana pages on the hub.",
      link: "/services#local-guides",
    },
  ];
}

/** @deprecated Use servicesLocalGuideMenuItems — kept for grep/imports during transition. */
export const servicesGeoMegaMenuItems = servicesLocalGuideMenuItems;
