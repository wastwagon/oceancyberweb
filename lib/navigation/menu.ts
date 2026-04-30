export type StartupNavLink =
  | { readonly label: "Home"; readonly href: "/" }
  | { readonly label: string; readonly sectionId: string };

export const startupPrimaryNav: StartupNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Portfolio", sectionId: "projects" },
];

export const startupPagesMenu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Projects", href: "/projects" },
  { label: "Project calculator", href: "/tools/project-cost" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Domains & SSL", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Checkout", href: "/checkout/cart" },
  { label: "Get started", href: "/get-started" },
] as const;

export type HeaderDropdownKey =
  | "services"
  | "industries"
  | "infrastructure"
  | "resources"
  | "company";

export type HeaderNavItem = {
  href: string;
  label: string;
  dropdownKey?: HeaderDropdownKey;
  activeMatch?: string[];
};

export const mainHeaderNav: HeaderNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", dropdownKey: "services" },
  { href: "/industries", label: "Industries", dropdownKey: "industries" },
  {
    href: "/domains",
    label: "Infrastructure",
    dropdownKey: "infrastructure",
    activeMatch: ["/domains", "/hosting"],
  },
  {
    href: "/insights",
    label: "Resources",
    dropdownKey: "resources",
    activeMatch: ["/insights", "/case-studies", "/security-journey", "/help-center"],
  },
  {
    href: "/about",
    label: "Company",
    dropdownKey: "company",
    activeMatch: ["/about", "/portfolio", "/contact"],
  },
];

export const mainHeaderDropdownContent: Record<
  HeaderDropdownKey,
  {
    title: string;
    description: string;
    items: Array<{ heading: string; description: string; link: string }>;
  }
> = {
  services: {
    title: "Our services",
    description: "Build, secure, and scale digital products with one delivery partner.",
    items: [
      {
        heading: "Web Development",
        description: "Modern, high-performance websites built with proven technologies.",
        link: "/services/web-development",
      },
      {
        heading: "Mobile apps",
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
  industries: {
    title: "Industries we serve",
    description: "Proven delivery patterns for regulated and growth-focused sectors.",
    items: [
      {
        heading: "Financial Services",
        description: "Secure banking solutions and fintech innovations.",
        link: "/industries/financial-services",
      },
      {
        heading: "Healthcare",
        description: "HIPAA-compliant healthcare technology solutions.",
        link: "/industries/healthcare",
      },
      {
        heading: "Education",
        description: "Practical e-learning platforms that improve delivery and outcomes.",
        link: "/industries/education",
      },
      {
        heading: "Retail & E-commerce",
        description: "Retail technology to boost online sales and engagement.",
        link: "/industries/retail",
      },
    ],
  },
  resources: {
    title: "Insights and guidance",
    description: "Planning playbooks, delivery stories, and practical security guidance.",
    items: [
      {
        heading: "Insights",
        description: "Strategy notes, platform updates, and practical guides.",
        link: "/insights",
      },
      {
        heading: "Case studies",
        description: "Delivery outcomes across sectors in Ghana and beyond.",
        link: "/case-studies",
      },
      {
        heading: "Security journey",
        description: "A practical path to strengthen your security posture.",
        link: "/security-journey",
      },
      {
        heading: "Help center",
        description: "Answers to common questions about onboarding and support.",
        link: "/help-center",
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
    description: "See our work, learn about our team, and contact us directly.",
    items: [
      {
        heading: "About",
        description: "Our mission, team, and operating principles.",
        link: "/about",
      },
      {
        heading: "Portfolio",
        description: "Delivery examples across sectors and product types.",
        link: "/portfolio",
      },
      {
        heading: "Contact",
        description: "Talk to our team about your project or requirements.",
        link: "/contact",
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
