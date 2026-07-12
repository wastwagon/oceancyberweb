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
  { label: "Project Calculator", href: "/tools/project-cost" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Reviews", href: "/reviews" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Domains & SSL", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Checkout", href: "/checkout/cart" },
  { label: "Get Started", href: "/get-started" },
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
    activeMatch: ["/about", "/team", "/portfolio", "/pricing", "/reviews"],
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
    description: "Build, secure, and scale digital products with one delivery partner.",
    items: [
      {
        heading: "All services",
        description: "Overview of web, mobile, commerce, design, and security delivery.",
        link: "/services",
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
        heading: "UI/UX & Brand Design",
        description: "Research, Figma prototypes, and design systems ready for engineering.",
        link: "/services/ui-ux-design",
      },
      {
        heading: "Web Development",
        description: "Modern, high-performance websites built with proven technologies.",
        link: "/services/web-development",
      },
      {
        heading: "Mobile Apps",
        description: "Native and cross-platform applications designed for reliable user experiences.",
        link: "/services/mobile-apps",
      },
      {
        heading: "Website to App Conversion",
        description: "Convert your existing website into a scoped mobile app build.",
        link: "/services/website-to-mobile-app",
      },
      {
        heading: "E-commerce",
        description: "Scalable online stores with dependable checkout and payment flows.",
        link: "/services/ecommerce",
      },
      {
        heading: "Cybersecurity",
        description: "Comprehensive security solutions to protect your business.",
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
        heading: "Case Studies",
        description: "Delivery outcomes across sectors in Ghana and beyond.",
        link: "/portfolio",
      },
      {
        heading: "How we work",
        description: "Discovery, design, phased delivery, and security-aware launch — our full model.",
        link: "/how-we-work",
      },
      {
        heading: "Design Process",
        description: "Research, Figma prototypes, design systems, and engineering handoff.",
        link: "/how-we-work#design",
      },
      {
        heading: "Security Journey",
        description: "A practical path to strengthen your security posture.",
        link: "/security-journey",
      },
      {
        heading: "OceanCyber POS",
        description: "SaaS point of sale — trial signup, your MoMo keys, offline mode.",
        link: "/products/pos",
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
    description: "Get help, read reviews, estimate projects, and launch with confidence.",
    items: [
      {
        heading: "Get Started",
        description: "Begin your project intake and next steps with our team.",
        link: "/get-started",
      },
      {
        heading: "Pricing",
        description: "Compare packages and indicative investment ranges in GHS.",
        link: "/pricing",
      },
      {
        heading: "Project Calculator",
        description: "Estimate scope and investment for your next build.",
        link: "/tools/project-cost",
      },
      {
        heading: "Request Proposal",
        description: "Formal scope, timeline, and pricing sections for your project.",
        link: "/tools/proposal",
      },
      {
        heading: "Google Reviews",
        description: "Verified client ratings and recent feedback from Google.",
        link: "/reviews",
      },
      {
        heading: "Help Center",
        description: "Answers to common questions about onboarding and delivery.",
        link: "/help-center",
      },
      {
        heading: "Contact",
        description: "Talk to our team about your project or requirements.",
        link: "/contact",
      },
      {
        heading: "Domains & SSL",
        description: "Search domain availability and add SSL with secure checkout.",
        link: "/domains",
      },
      {
        heading: "Hosting",
        description: "Launch cPanel and WHM hosting plans with local support.",
        link: "/hosting",
      },
      {
        heading: "Security assessment",
        description: "Free self-assessment with downloadable maturity report.",
        link: "/tools/security-assessment",
      },
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    description: "Domains, SSL, and hosting foundations for reliable digital operations.",
    items: [
      {
        heading: "Domains & SSL",
        description: "Search domain availability and add SSL with secure checkout.",
        link: "/domains",
      },
      {
        heading: "Hosting",
        description: "Launch cPanel and WHM hosting plans with local support.",
        link: "/hosting",
      },
    ],
  },
  company: {
    title: "Company",
    description: "Who we are, the work we ship, and how we partner with clients.",
    items: [
      {
        heading: "About",
        description: "Our mission, team, and operating principles.",
        link: "/about",
      },
      {
        heading: "Team",
        description: "Meet the people behind design, engineering, and delivery.",
        link: "/team",
      },
      {
        heading: "Portfolio",
        description: "Delivery examples across sectors and product types.",
        link: "/portfolio",
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
    ],
  },
};

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
