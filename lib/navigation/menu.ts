export type StartupNavLink = { readonly label: string; readonly href: string };

export const startupPrimaryNav: StartupNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

export const startupPagesMenu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Get started", href: "/get-started" },
  { label: "Project cost calculator", href: "/tools/project-cost" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Web design in Ghana", href: "/services/web-design-in-ghana" },
  { label: "Web design in Accra", href: "/services/web-design-in-accra" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Reviews", href: "/reviews" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Domains & SSL", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Checkout", href: "/checkout/cart" },
] as const;

export type HeaderDropdownKey =
  | "services"
  | "products"
  | "industries"
  | "infrastructure"
  | "resources"
  | "support"
  | "company";

export type HeaderNavItem = {
  href: string;
  label: string;
  dropdownKey?: HeaderDropdownKey;
  activeMatch?: string[];
};

export const mainHeaderNav: HeaderNavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    dropdownKey: "services",
    activeMatch: ["/services", "/pricing", "/how-we-work", "/design-process"],
  },
  {
    href: "/products",
    label: "Products",
    dropdownKey: "products",
    activeMatch: ["/products"],
  },
  { href: "/industries", label: "Industries", dropdownKey: "industries" },
  {
    href: "/insights",
    label: "Resources",
    dropdownKey: "resources",
    activeMatch: [
      "/insights",
      "/portfolio",
      "/how-we-work",
      "/design-process",
      "/security-journey",
      "/tools/security-assessment",
    ],
  },
  {
    href: "/help-center",
    label: "Support",
    dropdownKey: "support",
    activeMatch: [
      "/help-center",
      "/contact",
      "/reviews",
      "/tools/project-cost",
      "/tools/proposal",
      "/domains",
      "/hosting",
      "/get-started",
      "/pricing",
    ],
  },
  {
    href: "/about",
    label: "Company",
    dropdownKey: "company",
    activeMatch: ["/about", "/team", "/pricing", "/reviews", "/get-started"],
  },
];

import { industryNavItems } from "@/lib/data/industries-catalog";

export const mainHeaderDropdownContent: Record<
  HeaderDropdownKey,
  {
    title: string;
    description: string;
    items: Array<{ heading: string; description: string; link: string }>;
  }
> = {
  services: {
    title: "Our Services",
    description:
      "Web design, development, apps, and security for businesses across Ghana—from Accra nationwide.",
    items: [
      {
        heading: "All services",
        description: "Web design, development, mobile apps, commerce, and cybersecurity.",
        link: "/services",
      },
      {
        heading: "Web design in Ghana",
        description: "Web designers and website developers for businesses nationwide.",
        link: "/services/web-design-in-ghana",
      },
      {
        heading: "Web design in Accra",
        description: "Accra studio on Nii Kwashiefio Avenue—local meetings, same delivery team.",
        link: "/services/web-design-in-accra",
      },
      {
        heading: "Pricing & packages",
        description: "Transparent GHS tiers for Startup, Professional, and Enterprise.",
        link: "/pricing",
      },
      {
        heading: "How we work",
        description: "Discovery, design, phased delivery, and security-aware launch.",
        link: "/how-we-work",
      },
      {
        heading: "UI/UX & brand design",
        description: "Research, Figma prototypes, and design systems ready for engineering.",
        link: "/services/ui-ux-design",
      },
      {
        heading: "Web development",
        description: "Marketing sites and web apps built for speed, search, and maintenance.",
        link: "/services/web-development",
      },
      {
        heading: "Mobile apps",
        description: "iOS and Android apps, including converting an existing website.",
        link: "/services/mobile-apps",
      },
      {
        heading: "Website to app",
        description: "Scoped quotes to turn your current website into a mobile app.",
        link: "/services/website-to-mobile-app",
      },
      {
        heading: "E-commerce",
        description: "Online stores with catalog, checkout, and local payment flows.",
        link: "/services/ecommerce",
      },
      {
        heading: "Cybersecurity",
        description: "Hardening and reviews for the sites and apps we ship.",
        link: "/services/cybersecurity",
      },
    ],
  },
  products: {
    title: "Products",
    description: "Subscription software and SaaS platforms from OceanCyber.",
    items: [
      {
        heading: "Software products",
        description: "Explore OceanCyber subscription products for African operators.",
        link: "/products",
      },
      {
        heading: "OceanCyber POS",
        description: "Ghana-ready point of sale — MoMo, offline mode, and multi-branch.",
        link: "/products/pos",
      },
    ],
  },
  industries: {
    title: "Industries We Serve",
    description: "Proven delivery patterns for regulated and growth-focused sectors.",
    items: industryNavItems,
  },
  resources: {
    title: "Resources",
    description: "Guides, delivery stories, and practical playbooks for your team.",
    items: [
      {
        heading: "Insights",
        description: "Strategy notes, platform updates, and practical guides.",
        link: "/insights",
      },
      {
        heading: "Portfolio",
        description: "Selected websites and platforms for clients across Ghana.",
        link: "/portfolio",
      },
      {
        heading: "How we work",
        description: "Discovery, design, phased delivery, and security-aware launch — our full model.",
        link: "/how-we-work",
      },
      {
        heading: "Design process",
        description: "Research, Figma prototypes, design systems, and engineering handoff.",
        link: "/how-we-work#design",
      },
      {
        heading: "Security journey",
        description: "A practical path to strengthen your security posture.",
        link: "/security-journey",
      },
      {
        heading: "Security self-assessment",
        description: "Score your maturity in minutes and download a PDF report.",
        link: "/tools/security-assessment",
      },
    ],
  },
  support: {
    title: "Support",
    description:
      "Start with guided intake. Use pricing or the estimator to plan — talk to us anytime.",
    items: [
      {
        heading: "Get started",
        description: "Primary path — share goals, budget, and timeline.",
        link: "/get-started",
      },
      {
        heading: "Talk to our team",
        description: "Questions or a quick call before you start.",
        link: "/contact",
      },
      {
        heading: "Pricing",
        description: "Compare packages and indicative investment ranges in GHS.",
        link: "/pricing",
      },
      {
        heading: "Project cost calculator",
        description: "Optional tool — estimate scope and a GHS range.",
        link: "/tools/project-cost",
      },
      {
        heading: "Request a proposal",
        description: "Formal RFQ after you know approximate scope.",
        link: "/tools/proposal",
      },
      {
        heading: "Help center",
        description: "Answers to common questions about onboarding and delivery.",
        link: "/help-center",
      },
      {
        heading: "Google reviews",
        description: "Verified client ratings and recent feedback from Google.",
        link: "/reviews",
      },
      {
        heading: "Domains & SSL",
        description: "Search domain availability and add SSL with secure checkout.",
        link: "/domains",
      },
      {
        heading: "Hosting",
        description: "cPanel hosting plans priced in Ghana cedis.",
        link: "/hosting",
      },
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    description: "Domains, SSL, and hosting for reliable digital operations.",
    items: [
      {
        heading: "Domains & SSL",
        description: "Search domain availability and add SSL with secure checkout.",
        link: "/domains",
      },
      {
        heading: "Hosting",
        description: "cPanel hosting plans priced in Ghana cedis.",
        link: "/hosting",
      },
    ],
  },
  company: {
    title: "Company",
    description: "Who we are and how we partner with clients.",
    items: [
      {
        heading: "About",
        description: "Accra studio delivering websites and apps across Ghana.",
        link: "/about",
      },
      {
        heading: "Team",
        description: "Meet the people behind design, engineering, and delivery.",
        link: "/team",
      },
      {
        heading: "Pricing",
        description: "Transparent tiers and indicative investment ranges in GHS.",
        link: "/pricing",
      },
      {
        heading: "Reviews",
        description: "Verified Google ratings and client feedback.",
        link: "/reviews",
      },
      {
        heading: "Get started",
        description: "Guided intake for your next project.",
        link: "/get-started",
      },
    ],
  },
};

/** Footer company column — single source with header company/support CTAs. */
export const footerCompanyLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Get started", href: "/get-started" },
  { label: "Insights", href: "/insights" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer services column — mirrors primary services mega-menu destinations. */
export const footerServiceLinks = [
  { label: "Software products", href: "/products" },
  { label: "OceanCyber POS", href: "/products/pos" },
  { label: "Web design in Ghana", href: "/services/web-design-in-ghana" },
  { label: "Web design in Accra", href: "/services/web-design-in-accra" },
  { label: "UI/UX & brand design", href: "/services/ui-ux-design" },
  { label: "Web development", href: "/services/web-development" },
  { label: "Mobile apps", href: "/services/mobile-apps" },
  { label: "Website to app", href: "/services/website-to-mobile-app" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "E-commerce", href: "/services/ecommerce" },
  { label: "Hosting", href: "/hosting" },
] as const;

export type NavigationConfig = {
  startupPrimaryNav: StartupNavLink[];
  startupPagesMenu: ReadonlyArray<{ label: string; href: string }>;
  mainHeaderNav: HeaderNavItem[];
  mainHeaderDropdownContent: typeof mainHeaderDropdownContent;
};

export const defaultNavigationConfig: NavigationConfig = {
  startupPrimaryNav,
  startupPagesMenu,
  mainHeaderNav,
  mainHeaderDropdownContent,
};
