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
      activeMatch: ["/about", "/team", "/pricing", "/reviews", "/get-started"],
    },
  ],
  mainHeaderDropdownContent: {
    services: {
      title: "Our Services",
      description:
        "Web design, development, apps, and security for businesses across Ghana—from Accra nationwide.",
      items: [
        {
          heading: "All services",
          description:
            "Web design, development, mobile apps, commerce, and cybersecurity.",
          link: "/services",
        },
        {
          heading: "Web design in Ghana",
          description:
            "Web designers and website developers for businesses nationwide.",
          link: "/services/web-design-in-ghana",
        },
        {
          heading: "Web design in Accra",
          description:
            "Accra studio on Nii Kwashiefio Avenue—local meetings, same delivery team.",
          link: "/services/web-design-in-accra",
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
          heading: "UI/UX & brand design",
          description:
            "Research, Figma prototypes, and design systems ready for engineering.",
          link: "/services/ui-ux-design",
        },
        {
          heading: "Web development",
          description:
            "Marketing sites and web apps built for speed, search, and maintenance.",
          link: "/services/web-development",
        },
        {
          heading: "Mobile apps",
          description:
            "iOS and Android apps, including converting an existing website.",
          link: "/services/mobile-apps",
        },
        {
          heading: "Website to app",
          description:
            "Scoped quotes to turn your current website into a mobile app.",
          link: "/services/website-to-mobile-app",
        },
        {
          heading: "E-commerce",
          description:
            "Online stores with catalog, checkout, and local payment flows.",
          link: "/services/ecommerce",
        },
        {
          heading: "Cybersecurity",
          description:
            "Hardening and reviews for the sites and apps we ship.",
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
          description:
            "Explore OceanCyber subscription products for African operators.",
          link: "/products",
        },
        {
          heading: "OceanCyber POS",
          description:
            "Ghana-ready point of sale — MoMo, offline mode, and multi-branch.",
          link: "/products/pos",
        },
      ],
    },
    industries: {
      title: "Industries we serve",
      description:
        "Proven delivery patterns for regulated and growth-focused sectors.",
      items: [
        {
          heading: "Financial Services",
          description: "Secure banking solutions and fintech innovations.",
          link: "/industries/financial-services",
        },
        {
          heading: "Healthcare",
          description: "Compliant healthcare technology solutions.",
          link: "/industries/healthcare",
        },
        {
          heading: "Education",
          description:
            "Practical e-learning platforms that improve delivery and outcomes.",
          link: "/industries/education",
        },
        {
          heading: "Retail & E-commerce",
          description:
            "Retail technology to boost online sales and engagement.",
          link: "/industries/retail",
        },
        {
          heading: "Tourism & Hospitality",
          description:
            "Booking and guest experience platforms for travel brands.",
          link: "/industries/tourism",
        },
        {
          heading: "Legal Services",
          description:
            "Case management and secure client portals for law firms.",
          link: "/industries/legal",
        },
        {
          heading: "Logistics & Supply Chain",
          description:
            "Tracking, dispatch, and fulfillment software for movers of goods.",
          link: "/industries/logistics",
        },
        {
          heading: "Real Estate & Property",
          description:
            "Property listings, CRM, and tenant management platforms.",
          link: "/industries/real-estate",
        },
        {
          heading: "Agriculture & AgriTech",
          description:
            "Agri marketplaces, cooperatives, and field data platforms.",
          link: "/industries/agriculture",
        },
        {
          heading: "Media & Entertainment",
          description: "Content platforms, streaming, and digital publishing.",
          link: "/industries/media-entertainment",
        },
        {
          heading: "Government & Public Sector",
          description:
            "Citizen portals, e-services, and secure public platforms.",
          link: "/industries/government",
        },
        {
          heading: "Energy & Utilities",
          description:
            "Utility billing, smart metering, and operations software.",
          link: "/industries/energy",
        },
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
          heading: "Portfolio",
          description:
            "Selected websites and platforms for clients across Ghana.",
          link: "/portfolio",
        },
        {
          heading: "How we work",
          description:
            "Discovery, design, phased delivery, and security-aware launch — our full model.",
          link: "/how-we-work",
        },
        {
          heading: "Design process",
          description:
            "Research, Figma prototypes, design systems, and engineering handoff.",
          link: "/how-we-work#design",
        },
        {
          heading: "Security journey",
          description: "A practical path to strengthen your security posture.",
          link: "/security-journey",
        },
        {
          heading: "Security self-assessment",
          description:
            "Score your maturity in minutes and download a PDF report.",
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
          description:
            "Compare packages and indicative investment ranges in GHS.",
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
          description:
            "Answers to common questions about onboarding and delivery.",
          link: "/help-center",
        },
        {
          heading: "Google reviews",
          description:
            "Verified client ratings and recent feedback from Google.",
          link: "/reviews",
        },
        {
          heading: "Domains & SSL",
          description:
            "Search domain availability and add SSL with secure checkout.",
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
      description:
        "Domains, SSL, and hosting for reliable digital operations.",
      items: [
        {
          heading: "Domains & SSL",
          description:
            "Search domain availability and add SSL with secure checkout.",
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
          description:
            "Meet the people behind design, engineering, and delivery.",
          link: "/team",
        },
        {
          heading: "Pricing",
          description:
            "Transparent tiers and indicative investment ranges in GHS.",
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
  },
};

function mergeMainHeaderNav<
  T extends {
    href: string;
    label: string;
    dropdownKey?: string;
    activeMatch?: string[];
  },
>(dbNav: T[], defaultNav: T[]): T[] {
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
            activeMatch: item.activeMatch?.length
              ? item.activeMatch
              : dbItem.activeMatch,
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
          const defaultItems =
            DEFAULT_CONFIG.mainHeaderDropdownContent[
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
