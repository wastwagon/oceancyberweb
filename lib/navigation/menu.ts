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
  { label: "Best web design company in Ghana", href: "/services/web-design-in-ghana" },
  { label: "Best web design company in Accra", href: "/services/web-design-in-accra" },
  { label: "Best web development company in Accra", href: "/services/web-development-in-accra" },
  { label: "Best software development company in Accra", href: "/services/software-development-in-accra" },
  { label: "Best mobile app development company in Accra", href: "/services/mobile-app-development-in-accra" },
  { label: "Best ecommerce development company in Accra", href: "/services/ecommerce-development-in-accra" },
  { label: "Best cybersecurity company in Accra", href: "/services/cybersecurity-in-accra" },
  { label: "Best UI UX design company in Accra", href: "/services/ui-ux-design-in-accra" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Reviews", href: "/reviews" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Domains", href: "/domains" },
  { label: "SSL certificates", href: "/ssl" },
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
    activeMatch: ["/products", "/domains", "/hosting", "/ssl"],
  },
  {
    href: "/domains",
    label: "Infrastructure",
    dropdownKey: "infrastructure",
    activeMatch: [
      "/domains",
      "/hosting",
      "/ssl",
      "/guides/domain-prices-in-ghana",
      "/guides/web-hosting-cost-in-ghana",
    ],
  },
  { href: "/industries", label: "Industries", dropdownKey: "industries" },
  {
    href: "/insights",
    label: "Resources",
    dropdownKey: "resources",
    activeMatch: [
      "/insights",
      "/guides",
      "/compare",
      "/alternatives",
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
        heading: "Web design in Accra",
        description: "Meet the team at 47 Nii Kwashiefio Avenue. Hire page for Accra web design.",
        link: "/services/web-design-in-accra",
      },
      {
        heading: "Web design in Ghana",
        description: "Nationwide website design and development from the Accra office.",
        link: "/services/web-design-in-ghana",
      },
      {
        heading: "Web development in Accra",
        description: "Web and website development from GHS 6,000. Paystack and MoMo ready.",
        link: "/services/web-development-in-accra",
      },
      {
        heading: "Web development in Ghana",
        description: "Company sites and web apps for teams across Ghana, from GHS 6,000.",
        link: "/services/web-development-in-ghana",
      },
      {
        heading: "Software development in Accra",
        description: "Custom software and tools from GHS 14,500 for Accra teams.",
        link: "/services/software-development-in-accra",
      },
      {
        heading: "Mobile app development in Accra",
        description: "iOS and Android from GHS 12,000 per platform for Ghana phones.",
        link: "/services/mobile-app-development-in-accra",
      },
      {
        heading: "UI/UX design in Accra",
        description: "Product and brand design hire page from GHS 3,500.",
        link: "/services/ui-ux-design-in-accra",
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
        heading: "Software development",
        description: "Custom tools and platforms from GHS 14,500 for Ghana operations.",
        link: "/services/software-development",
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
    description: "Domains, SSL, and hosting priced in Ghana cedis.",
    items: [
      {
        heading: "Buy a domain",
        description: "Search availability and register in GHS with Paystack.",
        link: "/domains",
      },
      {
        heading: "SSL certificates",
        description: "PositiveSSL from GHS 45/yr — renews at the same list price.",
        link: "/ssl",
      },
      {
        heading: "Web hosting",
        description: "cPanel hosting from GHS 69/mo with Accra support.",
        link: "/hosting",
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
        heading: "Buyer guides",
        description: "Website cost, domain prices, hosting cost, and MoMo checkout.",
        link: "/guides",
      },
      {
        heading: "Comparisons",
        description: "Agency vs freelancer, Shopify vs custom, Wix vs custom.",
        link: "/compare",
      },
      {
        heading: "Alternatives",
        description: "When Wix, Squarespace, or Shopify is enough — and when to move.",
        link: "/alternatives",
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
    ],
  },
  infrastructure: {
    title: "Infrastructure",
    description: "Domains, SSL, and hosting for reliable digital operations.",
    items: [
      {
        heading: "Buy a domain",
        description: "Search availability and register in GHS with Paystack.",
        link: "/domains",
      },
      {
        heading: "SSL certificates",
        description: "PositiveSSL from GHS 45/yr — renews at the same list price.",
        link: "/ssl",
      },
      {
        heading: "Web hosting",
        description: "cPanel hosting from GHS 69/mo with Accra support.",
        link: "/hosting",
      },
      {
        heading: "Domain prices in Ghana",
        description: ".com from GHS 120/yr and other TLD list prices in cedis.",
        link: "/guides/domain-prices-in-ghana",
      },
      {
        heading: "Hosting cost in Ghana",
        description: "What Launch, Grow, and Scale cost in the first year.",
        link: "/guides/web-hosting-cost-in-ghana",
      },
    ],
  },
  company: {
    title: "Company",
    description: "Who we are and how we partner with clients.",
    items: [
      {
        heading: "About",
        description: "Accra company delivering websites and apps across Ghana.",
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
  { label: "Guides", href: "/guides" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer services column — mirrors primary services mega-menu destinations. */
export const footerServiceLinks = [
  { label: "Best web design company in Ghana", href: "/services/web-design-in-ghana" },
  { label: "Best web design company in Accra", href: "/services/web-design-in-accra" },
  { label: "Best web development company in Accra", href: "/services/web-development-in-accra" },
  { label: "Best software development company in Accra", href: "/services/software-development-in-accra" },
  { label: "Best mobile app development company in Accra", href: "/services/mobile-app-development-in-accra" },
  { label: "Best ecommerce development company in Accra", href: "/services/ecommerce-development-in-accra" },
  { label: "Best cybersecurity company in Accra", href: "/services/cybersecurity-in-accra" },
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
