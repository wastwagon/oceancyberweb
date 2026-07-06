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
  { href: "/services", label: "Services", dropdownKey: "services" },
  { href: "/industries", label: "Industries", dropdownKey: "industries" },
  {
    href: "/insights",
    label: "Resources",
    dropdownKey: "resources",
    activeMatch: ["/insights", "/portfolio", "/design-process", "/security-journey"],
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
      "/domains",
      "/hosting",
      "/get-started",
    ],
  },
  {
    href: "/about",
    label: "Company",
    dropdownKey: "company",
    activeMatch: ["/about", "/team", "/portfolio", "/pricing"],
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
    title: "Our Services",
    description: "Build, secure, and scale digital products with one delivery partner.",
    items: [
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
  industries: {
    title: "Industries We Serve",
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
      {
        heading: "Tourism & Hospitality",
        description: "Booking and guest experience platforms for travel brands.",
        link: "/industries/tourism",
      },
      {
        heading: "Legal Services",
        description: "Case management and secure client portals for law firms.",
        link: "/industries/legal",
      },
    ],
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
        heading: "Design Process",
        description: "How we research, prototype in Figma, and hand off to engineering.",
        link: "/design-process",
      },
      {
        heading: "Security Journey",
        description: "A practical path to strengthen your security posture.",
        link: "/security-journey",
      },
    ],
  },
  support: {
    title: "Support",
    description: "Get help, read reviews, estimate projects, and launch with confidence.",
    items: [
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
        heading: "Project Calculator",
        description: "Estimate scope and investment for your next build.",
        link: "/tools/project-cost",
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
        heading: "Get Started",
        description: "Begin your project intake and next steps with our team.",
        link: "/get-started",
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
