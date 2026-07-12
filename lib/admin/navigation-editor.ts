import { defaultNavigationConfig } from "@/lib/navigation/menu";

export type AdminNavItem = {
  id?: string;
  sortOrder: number;
  heading: string;
  description: string | null;
  href: string;
  metadata: unknown;
  metadataInput: string;
  isActive: boolean;
};

export type AdminNavMenu = {
  key: string;
  label: string;
  description: string | null;
  isActive: boolean;
  items: AdminNavItem[];
};

export function createEmptyNavItem(sortOrder = 0): AdminNavItem {
  return {
    sortOrder,
    heading: "",
    description: null,
    href: "",
    metadata: {},
    metadataInput: "{}",
    isActive: true,
  };
}

export function createEmptyNavMenu(): AdminNavMenu {
  return {
    key: "",
    label: "",
    description: null,
    isActive: true,
    items: [createEmptyNavItem(0)],
  };
}

export function buildMenuPreset(kind: string): AdminNavMenu {
  if (kind === "startup-primary") {
    return {
      key: "startup-primary",
      label: "Startup primary",
      description: "Primary in-page startup navigation",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/", metadataInput: "{}" },
        { ...createEmptyNavItem(10), heading: "About", href: "#about", metadataInput: '{"sectionId":"about"}' },
        {
          ...createEmptyNavItem(20),
          heading: "Services",
          href: "#services",
          metadataInput: '{"sectionId":"services"}',
        },
        {
          ...createEmptyNavItem(30),
          heading: "Portfolio",
          href: "#projects",
          metadataInput: '{"sectionId":"projects"}',
        },
      ],
    };
  }
  if (kind === "startup-pages") {
    return {
      key: "startup-pages",
      label: "Startup pages",
      description: "Pages dropdown for startup navbar",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/" },
        { ...createEmptyNavItem(10), heading: "About", href: "/about" },
        { ...createEmptyNavItem(20), heading: "Team", href: "/team" },
        { ...createEmptyNavItem(30), heading: "Pricing", href: "/pricing" },
        { ...createEmptyNavItem(40), heading: "Portfolio", href: "/portfolio" },
      ],
    };
  }
  if (kind === "main-header") {
    return {
      key: "main-header",
      label: "Main header",
      description: "Primary global header links",
      isActive: true,
      items: [
        { ...createEmptyNavItem(0), heading: "Home", href: "/", metadataInput: "{}" },
        {
          ...createEmptyNavItem(10),
          heading: "Services",
          href: "/services",
          metadataInput:
            '{"dropdownKey":"services","activeMatch":["/services","/pricing","/how-we-work","/design-process"]}',
        },
        {
          ...createEmptyNavItem(15),
          heading: "Products",
          href: "/products",
          metadataInput: '{"dropdownKey":"products","activeMatch":["/products"]}',
        },
        {
          ...createEmptyNavItem(20),
          heading: "Industries",
          href: "/industries",
          metadataInput: '{"dropdownKey":"industries"}',
        },
        {
          ...createEmptyNavItem(30),
          heading: "Resources",
          href: "/insights",
          metadataInput:
            '{"dropdownKey":"resources","activeMatch":["/insights","/portfolio","/how-we-work","/design-process","/security-journey","/tools/security-assessment"]}',
        },
        {
          ...createEmptyNavItem(40),
          heading: "Support",
          href: "/help-center",
          metadataInput:
            '{"dropdownKey":"support","activeMatch":["/help-center","/contact","/reviews","/tools/project-cost","/tools/proposal","/domains","/hosting","/get-started","/pricing"]}',
        },
        {
          ...createEmptyNavItem(50),
          heading: "Company",
          href: "/about",
          metadataInput:
            '{"dropdownKey":"company","activeMatch":["/about","/team","/portfolio","/pricing","/reviews"]}',
        },
      ],
    };
  }
  if (kind.startsWith("main-dropdown-")) {
    const suffix = kind.replace("main-dropdown-", "");
    const shared = {
      key: kind,
      label: suffix.charAt(0).toUpperCase() + suffix.slice(1),
      description: `${suffix} mega-menu content`,
      isActive: true,
    };
    if (suffix === "industries") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Financial Services",
            href: "/industries/financial-services",
            description: "Secure banking solutions and fintech innovations.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Healthcare",
            href: "/industries/healthcare",
            description: "HIPAA-compliant healthcare technology solutions.",
          },
        ],
      };
    }
    if (suffix === "infrastructure") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Domains & SSL",
            href: "/domains",
            description: "Search domain availability and add SSL with secure checkout.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Hosting",
            href: "/hosting",
            description: "Launch cPanel and WHM hosting plans with local support.",
          },
        ],
      };
    }
    if (suffix === "resources") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Insights",
            href: "/insights",
            description: "Strategy notes, platform updates, and practical guides.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Case studies",
            href: "/portfolio",
            description: "Delivery outcomes across sectors in Ghana and beyond.",
          },
        ],
      };
    }
    if (suffix === "support") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "Google Reviews",
            href: "/reviews",
            description: "Verified client ratings and recent feedback from Google.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Help Center",
            href: "/help-center",
            description: "Answers to common questions about onboarding and delivery.",
          },
          {
            ...createEmptyNavItem(20),
            heading: "Contact",
            href: "/contact",
            description: "Talk to our team about your project or requirements.",
          },
        ],
      };
    }
    if (suffix === "company") {
      return {
        ...shared,
        items: [
          {
            ...createEmptyNavItem(0),
            heading: "About",
            href: "/about",
            description: "Our mission, team, and operating principles.",
          },
          {
            ...createEmptyNavItem(10),
            heading: "Team",
            href: "/team",
            description: "Meet the people behind design, engineering, and delivery.",
          },
          {
            ...createEmptyNavItem(20),
            heading: "Portfolio",
            href: "/portfolio",
            description: "Delivery examples across sectors and product types.",
          },
          {
            ...createEmptyNavItem(30),
            heading: "Pricing",
            href: "/pricing",
            description: "Transparent tiers and indicative investment ranges in GHS.",
          },
        ],
      };
    }
    return {
      ...shared,
      items: [
        { ...createEmptyNavItem(0), heading: "Item one", href: "/", description: "Menu description" },
        { ...createEmptyNavItem(10), heading: "Item two", href: "/", description: "Menu description" },
      ],
    };
  }
  return createEmptyNavMenu();
}

export function buildDefaultNavigationMenus(): AdminNavMenu[] {
  const startupPrimary: AdminNavMenu = {
    key: "startup-primary",
    label: "Startup primary",
    description: "Primary in-page startup navigation",
    isActive: true,
    items: defaultNavigationConfig.startupPrimaryNav.map((item, index) => {
      const anyItem = item as any;
      const metadata =
        anyItem.sectionId ? { sectionId: anyItem.sectionId } : {};
      return {
        ...createEmptyNavItem(index * 10),
        heading: item.label,
        href: anyItem.href || `#${anyItem.sectionId}`,
        metadata,
        metadataInput: JSON.stringify(metadata, null, 2),
      };
    }),
  };

  const startupPages: AdminNavMenu = {
    key: "startup-pages",
    label: "Startup pages",
    description: "Pages dropdown for startup navbar",
    isActive: true,
    items: defaultNavigationConfig.startupPagesMenu.map((item, index) => ({
      ...createEmptyNavItem(index * 10),
      heading: item.label,
      href: item.href,
    })),
  };

  const mainHeader: AdminNavMenu = {
    key: "main-header",
    label: "Main header",
    description: "Primary global header links",
    isActive: true,
    items: defaultNavigationConfig.mainHeaderNav.map((item, index) => {
      const metadata: Record<string, unknown> = {};
      if (item.dropdownKey) metadata.dropdownKey = item.dropdownKey;
      if (item.activeMatch?.length) metadata.activeMatch = item.activeMatch;
      return {
        ...createEmptyNavItem(index * 10),
        heading: item.label,
        href: item.href,
        metadata,
        metadataInput: JSON.stringify(metadata, null, 2),
      };
    }),
  };

  const dropdownMenus: AdminNavMenu[] = Object.entries(defaultNavigationConfig.mainHeaderDropdownContent).map(
    ([key, dropdown]) => ({
      key: `main-dropdown-${key}`,
      label: dropdown.title,
      description: dropdown.description,
      isActive: true,
      items: dropdown.items.map((item, index) => ({
        ...createEmptyNavItem(index * 10),
        heading: item.heading,
        description: item.description,
        href: item.link,
      })),
    }),
  );

  return [startupPrimary, startupPages, mainHeader, ...dropdownMenus];
}
