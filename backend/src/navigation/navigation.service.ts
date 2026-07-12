import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";
import { UpdateNavigationDto } from "./dto/update-navigation.dto";

interface AdminConfigRow {
  menuId: string;
  menuKey: string;
  menuLabel: string;
  menuDescription: string | null;
  menuIsActive: boolean;
  itemId: string | null;
  itemSortOrder: number | null;
  itemHeading: string | null;
  itemDescription: string | null;
  itemHref: string | null;
  itemMetadata: import("@prisma/client").Prisma.JsonValue;
  itemIsActive: boolean | null;
}

interface NavDbRow {
  menuKey: string;
  menuLabel: string;
  menuDescription: string | null;
  heading: string;
  description: string | null;
  href: string;
  metadata: Record<string, unknown> | null;
}

// Default config replicated from frontend lib (future: move to @oceancyber/shared)
const DEFAULT_CONFIG = {
  startupPrimaryNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  startupPagesMenu: [
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
  ],
  mainHeaderNav: [
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
  ],
  mainHeaderDropdownContent: {
    services: {
      title: "Our Services",
      description:
        "Build, secure, and scale digital products with one delivery partner.",
      items: [
        {
          heading: "All services",
          description:
            "Overview of web, mobile, commerce, design, and security delivery.",
          link: "/services",
        },
        {
          heading: "Pricing & packages",
          description:
            "Transparent GHS tiers for Startup, Professional, and Enterprise.",
          link: "/pricing",
        },
        {
          heading: "How we work",
          description:
            "Discovery, design, phased delivery, and security-aware launch.",
          link: "/how-we-work",
        },
        {
          heading: "UI/UX & Brand Design",
          description:
            "Research, Figma prototypes, and design systems ready for engineering.",
          link: "/services/ui-ux-design",
        },
        {
          heading: "Web Development",
          description:
            "Modern, high-performance websites built with proven technologies.",
          link: "/services/web-development",
        },
        {
          heading: "Mobile Apps",
          description:
            "Native and cross-platform applications designed for reliable user experiences.",
          link: "/services/mobile-apps",
        },
        {
          heading: "Website to App Conversion",
          description:
            "Convert your existing website into a scoped mobile app build.",
          link: "/services/website-to-mobile-app",
        },
        {
          heading: "E-commerce",
          description:
            "Scalable online stores with dependable checkout and payment flows.",
          link: "/services/ecommerce",
        },
        {
          heading: "Cybersecurity",
          description:
            "Comprehensive security solutions to protect your business.",
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
      title: "Industries we serve",
      description:
        "Proven delivery patterns for regulated and growth-focused sectors.",
      items: [
        { heading: "Financial Services", description: "Secure banking solutions and fintech innovations.", link: "/industries/financial-services" },
        { heading: "Healthcare", description: "Compliant healthcare technology solutions.", link: "/industries/healthcare" },
        { heading: "Education", description: "Practical e-learning platforms that improve delivery and outcomes.", link: "/industries/education" },
        { heading: "Retail & E-commerce", description: "Retail technology to boost online sales and engagement.", link: "/industries/retail" },
        { heading: "Tourism & Hospitality", description: "Booking and guest experience platforms for travel brands.", link: "/industries/tourism" },
        { heading: "Legal Services", description: "Case management and secure client portals for law firms.", link: "/industries/legal" },
        { heading: "Logistics & Supply Chain", description: "Tracking, dispatch, and fulfillment software for movers of goods.", link: "/industries/logistics" },
        { heading: "Real Estate & Property", description: "Property listings, CRM, and tenant management platforms.", link: "/industries/real-estate" },
        { heading: "Agriculture & AgriTech", description: "Agri marketplaces, cooperatives, and field data platforms.", link: "/industries/agriculture" },
        { heading: "Media & Entertainment", description: "Content platforms, streaming, and digital publishing.", link: "/industries/media-entertainment" },
        { heading: "Government & Public Sector", description: "Citizen portals, e-services, and secure public platforms.", link: "/industries/government" },
        { heading: "Energy & Utilities", description: "Utility billing, smart metering, and operations software.", link: "/industries/energy" },
      ],
    },
    resources: {
      title: "Resources",
      description:
        "Guides, delivery stories, and practical playbooks for your team.",
      items: [
        {
          heading: "Insights",
          description:
            "Strategy notes, platform updates, and practical guides.",
          link: "/insights",
        },
        {
          heading: "Case Studies",
          description: "Delivery outcomes across sectors in Ghana and beyond.",
          link: "/portfolio",
        },
        {
          heading: "How we work",
          description:
            "Discovery, design, phased delivery, and security-aware launch — our full model.",
          link: "/how-we-work",
        },
        {
          heading: "Design Process",
          description:
            "Research, Figma prototypes, design systems, and engineering handoff.",
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
      description:
        "Get help, read reviews, estimate projects, and launch with confidence.",
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
          description:
            "Answers to common questions about onboarding and delivery.",
          link: "/help-center",
        },
        {
          heading: "Contact",
          description: "Talk to our team about your project or requirements.",
          link: "/contact",
        },
        {
          heading: "Domains & SSL",
          description:
            "Search domain availability and add SSL with secure checkout.",
          link: "/domains",
        },
        {
          heading: "Hosting",
          description:
            "Launch cPanel and WHM hosting plans with local support.",
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
      description:
        "Domains, SSL, and hosting foundations for reliable digital operations.",
      items: [
        {
          heading: "Domains & SSL",
          description:
            "Search domain availability and add SSL with secure checkout.",
          link: "/domains",
        },
        {
          heading: "Hosting",
          description:
            "Launch cPanel and WHM hosting plans with local support.",
          link: "/hosting",
        },
      ],
    },
    company: {
      title: "Company",
      description:
        "Who we are, the work we ship, and how we partner with clients.",
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
  },
};

function mergeMainHeaderNav<T extends { href: string; label: string; dropdownKey?: string; activeMatch?: string[] }>(
  dbNav: T[],
  defaultNav: T[],
): T[] {
  const dbByHref = new Map(dbNav.map((item) => [item.href, item]));
  const order = new Map(defaultNav.map((item, index) => [item.href, index]));
  const merged: T[] = [];

  for (const item of defaultNav) {
    const dbItem = dbByHref.get(item.href);
    merged.push(
      dbItem
        ? {
            ...dbItem,
            dropdownKey: item.dropdownKey ?? dbItem.dropdownKey,
            activeMatch: item.activeMatch?.length ? item.activeMatch : dbItem.activeMatch,
          }
        : item,
    );
  }

  for (const item of dbNav) {
    if (!order.has(item.href)) merged.push(item);
  }

  return merged;
}

@Injectable()
export class NavigationService {
  private readonly logger = new Logger(NavigationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getConfig() {
    const dbConfig = await this.loadFromDatabase();
    if (dbConfig) {
      return {
        startupPrimaryNav:
          dbConfig.startupPrimaryNav ?? DEFAULT_CONFIG.startupPrimaryNav,
        startupPagesMenu:
          dbConfig.startupPagesMenu ?? DEFAULT_CONFIG.startupPagesMenu,
        mainHeaderNav: dbConfig.mainHeaderNav ?? DEFAULT_CONFIG.mainHeaderNav,
        mainHeaderDropdownContent:
          dbConfig.mainHeaderDropdownContent ??
          DEFAULT_CONFIG.mainHeaderDropdownContent,
      };
    }
    return DEFAULT_CONFIG;
  }

  async getAdminConfig() {
    const rows = await this.prisma.$queryRaw<AdminConfigRow[]>`
      SELECT
        m.id AS "menuId",
        m.key AS "menuKey",
        m.label AS "menuLabel",
        m.description AS "menuDescription",
        m."isActive" AS "menuIsActive",
        i.id AS "itemId",
        i."sortOrder" AS "itemSortOrder",
        i.heading AS "itemHeading",
        i.description AS "itemDescription",
        i.href AS "itemHref",
        i.metadata AS "itemMetadata",
        i."isActive" AS "itemIsActive"
      FROM "NavigationMenu" m
      LEFT JOIN "NavigationMenuItem" i ON i."menuId" = m.id
      ORDER BY m.key ASC, i."sortOrder" ASC, i."createdAt" ASC
    `;

    const menus = new Map<
      string,
      {
        key: string;
        label: string;
        description: string | null;
        isActive: boolean;
        items: unknown[];
      }
    >();
    for (const row of rows) {
      const existing = menus.get(row.menuKey) ?? {
        key: row.menuKey,
        label: row.menuLabel,
        description: row.menuDescription,
        isActive: row.menuIsActive,
        items: [],
      };
      if (row.itemId) {
        existing.items.push({
          id: row.itemId,
          sortOrder: row.itemSortOrder,
          heading: row.itemHeading,
          description: row.itemDescription,
          href: row.itemHref,
          metadata: row.itemMetadata ?? {},
          isActive: row.itemIsActive ?? true,
        });
      }
      menus.set(row.menuKey, existing);
    }
    return { menus: [...menus.values()] };
  }

  async updateAdminConfig(body: UpdateNavigationDto) {
    const { menus } = body;
    if (!menus || !Array.isArray(menus)) return { ok: false };

    await this.prisma.$transaction(async (tx) => {
      for (const menu of menus) {
        if (!menu.key || !menu.label) continue;

        // Upsert Menu
        const existingMenu = await tx.navigationMenu.findUnique({
          where: { key: menu.key },
        });
        let menuId = existingMenu?.id;

        if (existingMenu) {
          await tx.navigationMenu.update({
            where: { id: menuId },
            data: {
              label: menu.label,
              description: menu.description ?? null,
              isActive: menu.isActive ?? true,
              updatedAt: new Date(),
            },
          });
        } else {
          menuId = uuidv4();
          await tx.navigationMenu.create({
            data: {
              id: menuId,
              key: menu.key,
              label: menu.label,
              description: menu.description ?? null,
              isActive: menu.isActive ?? true,
            },
          });
        }

        // Refresh Items
        await tx.navigationMenuItem.deleteMany({
          where: { menuId: menuId as string },
        });
        const items = menu.items ?? [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          await tx.navigationMenuItem.create({
            data: {
              id: uuidv4(),
              menuId: menuId as string,
              sortOrder: item.sortOrder ?? i * 10,
              heading: item.heading,
              description: item.description ?? null,
              href: item.href,
              metadata: (item.metadata ??
                {}) as import("@prisma/client").Prisma.InputJsonValue,
              isActive: item.isActive ?? true,
            },
          });
        }
      }
    });

    return { ok: true };
  }

  private async loadFromDatabase() {
    try {
      const rows = await this.prisma.$queryRaw<NavDbRow[]>`
        SELECT
          m.key AS "menuKey",
          m.label AS "menuLabel",
          m.description AS "menuDescription",
          i.heading,
          i.description,
          i.href,
          i.metadata
        FROM "NavigationMenu" m
        JOIN "NavigationMenuItem" i ON i."menuId" = m.id
        WHERE m."isActive" = true
          AND i."isActive" = true
        ORDER BY m.key ASC, i."sortOrder" ASC, i."createdAt" ASC
      `;

      if (rows.length === 0) return null;

      const byKey = new Map<string, NavDbRow[]>();
      for (const row of rows) {
        const existing = byKey.get(row.menuKey) ?? [];
        existing.push(row);
        byKey.set(row.menuKey, existing);
      }

      const startupPrimary = (byKey.get("startup-primary") ?? []).map((r) => ({
        label: r.heading,
        href: r.metadata?.sectionId ? `#${r.metadata.sectionId}` : r.href,
      }));

      const startupPages = (byKey.get("startup-pages") ?? []).map((r) => ({
        label: r.heading,
        href: r.href,
      }));

      const mainHeader = (byKey.get("main-header") ?? []).map((r) => ({
        href: r.href,
        label: r.heading,
        dropdownKey:
          typeof r.metadata?.dropdownKey === "string"
            ? r.metadata.dropdownKey
            : undefined,
        activeMatch: Array.isArray(r.metadata?.activeMatch)
          ? (r.metadata.activeMatch as string[])
          : undefined,
      }));

      const dropdowns = JSON.parse(
        JSON.stringify(DEFAULT_CONFIG.mainHeaderDropdownContent),
      ) as typeof DEFAULT_CONFIG.mainHeaderDropdownContent;
      Object.keys(dropdowns).forEach((key) => {
        const dbItems = byKey.get(`main-dropdown-${key}`);
        if (dbItems && dbItems.length > 0) {
          const first = dbItems[0];
          const defaultItems = DEFAULT_CONFIG.mainHeaderDropdownContent[
            key as keyof typeof DEFAULT_CONFIG.mainHeaderDropdownContent
          ]?.items ?? [];
          const dbLinks = new Set(dbItems.map((item) => item.href));
          const mergedItems = [
            ...dbItems.map((item) => ({
              heading: item.heading,
              description: item.description ?? "",
              link: item.href,
            })),
            ...defaultItems.filter((item) => !dbLinks.has(item.link)),
          ];
          dropdowns[key as keyof typeof dropdowns] = {
            title: first.menuLabel,
            description: first.menuDescription ?? "",
            items: mergedItems,
          };
        }
      });

      const mergedMainHeader =
        mainHeader.length > 0
          ? mergeMainHeaderNav(
              mainHeader,
              DEFAULT_CONFIG.mainHeaderNav as Array<{
                href: string;
                label: string;
                dropdownKey?: string;
                activeMatch?: string[];
              }>,
            )
          : undefined;

      return {
        startupPrimaryNav:
          startupPrimary.length > 0 ? startupPrimary : undefined,
        startupPagesMenu: startupPages.length > 0 ? startupPages : undefined,
        mainHeaderNav: mergedMainHeader,
        mainHeaderDropdownContent: dropdowns,
      };
    } catch (e) {
      this.logger.error("Failed to load navigation from DB", e);
      return null;
    }
  }
}
