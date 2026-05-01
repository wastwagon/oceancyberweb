import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

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
  ],
  mainHeaderNav: [
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
  ],
  mainHeaderDropdownContent: {
    services: {
      title: "Our services",
      description: "Build, secure, and scale digital products with one delivery partner.",
      items: [
        { heading: "Web Development", description: "Modern, high-performance websites built with proven technologies.", link: "/services/web-development" },
        { heading: "Mobile apps", description: "Native and cross-platform applications designed for reliable user experiences.", link: "/services/mobile-apps" },
        { heading: "Website to App Conversion", description: "Convert your existing website into a scoped mobile app build.", link: "/services/website-to-mobile-app" },
        { heading: "E-commerce", description: "Scalable online stores with dependable checkout and payment flows.", link: "/services/ecommerce" },
        { heading: "Cybersecurity", description: "Comprehensive security solutions to protect your business.", link: "/services/cybersecurity" },
      ],
    },
    industries: {
      title: "Industries we serve",
      description: "Proven delivery patterns for regulated and growth-focused sectors.",
      items: [
        { heading: "Financial Services", description: "Secure banking solutions and fintech innovations.", link: "/industries/financial-services" },
        { heading: "Healthcare", description: "HIPAA-compliant healthcare technology solutions.", link: "/industries/healthcare" },
        { heading: "Education", description: "Practical e-learning platforms that improve delivery and outcomes.", link: "/industries/education" },
        { heading: "Retail & E-commerce", description: "Retail technology to boost online sales and engagement.", link: "/industries/retail" },
      ],
    },
    resources: {
      title: "Insights and guidance",
      description: "Planning playbooks, delivery stories, and practical security guidance.",
      items: [
        { heading: "Insights", description: "Strategy notes, platform updates, and practical guides.", link: "/insights" },
        { heading: "Case studies", description: "Delivery outcomes across sectors in Ghana and beyond.", link: "/case-studies" },
        { heading: "Security journey", description: "A practical path to strengthen your security posture.", link: "/security-journey" },
        { heading: "Help center", description: "Answers to common questions about onboarding and support.", link: "/help-center" },
      ],
    },
    infrastructure: {
      title: "Infrastructure",
      description: "Domains, SSL, and hosting foundations for reliable digital operations.",
      items: [
        { heading: "Domains & SSL", description: "Search domain availability and add SSL with secure checkout.", link: "/domains" },
        { heading: "Hosting", description: "Launch cPanel and WHM hosting plans with local support.", link: "/hosting" },
      ],
    },
    company: {
      title: "Company",
      description: "See our work, learn about our team, and contact us directly.",
      items: [
        { heading: "About", description: "Our mission, team, and operating principles.", link: "/about" },
        { heading: "Portfolio", description: "Delivery examples across sectors and product types.", link: "/portfolio" },
        { heading: "Contact", description: "Talk to our team about your project or requirements.", link: "/contact" },
      ],
    },
  },
};

@Injectable()
export class NavigationService {
  private readonly logger = new Logger(NavigationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getConfig() {
    const dbConfig = await this.loadFromDatabase();
    if (dbConfig) {
      return {
        startupPrimaryNav: dbConfig.startupPrimaryNav ?? DEFAULT_CONFIG.startupPrimaryNav,
        startupPagesMenu: dbConfig.startupPagesMenu ?? DEFAULT_CONFIG.startupPagesMenu,
        mainHeaderNav: dbConfig.mainHeaderNav ?? DEFAULT_CONFIG.mainHeaderNav,
        mainHeaderDropdownContent:
          dbConfig.mainHeaderDropdownContent ?? DEFAULT_CONFIG.mainHeaderDropdownContent,
      };
    }
    return DEFAULT_CONFIG;
  }

  async getAdminConfig() {
    const rows = await this.prisma.$queryRaw<any[]>`
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

    const menus = new Map<string, any>();
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

  async updateAdminConfig(body: any) {
    const { menus } = body;
    if (!menus || !Array.isArray(menus)) return { ok: false };

    await this.prisma.$transaction(async (tx) => {
      for (const menu of menus) {
        if (!menu.key || !menu.label) continue;

        // Upsert Menu
        const existingMenu = await tx.navigationMenu.findUnique({ where: { key: menu.key } });
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
        await tx.navigationMenuItem.deleteMany({ where: { menuId: menuId as string } });
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
              metadata: (item.metadata ?? {}) as any,
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
      const rows = await this.prisma.$queryRaw<any[]>`
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

      const byKey = new Map<string, any[]>();
      for (const row of rows) {
        const existing = byKey.get(row.menuKey) ?? [];
        existing.push(row);
        byKey.set(row.menuKey, existing);
      }

      const startupPrimary = (byKey.get("startup-primary") ?? []).map(r => ({
        label: r.heading,
        href: r.metadata?.sectionId ? `#${r.metadata.sectionId}` : r.href
      }));
      
      const startupPages = (byKey.get("startup-pages") ?? []).map(r => ({
        label: r.heading,
        href: r.href
      }));

      const mainHeader = (byKey.get("main-header") ?? []).map(r => ({
        href: r.href,
        label: r.heading,
        dropdownKey: r.metadata?.dropdownKey,
        activeMatch: r.metadata?.activeMatch
      }));

      const dropdowns = JSON.parse(JSON.stringify(DEFAULT_CONFIG.mainHeaderDropdownContent));
      Object.keys(dropdowns).forEach((key) => {
        const dbItems = byKey.get(`main-dropdown-${key}`);
        if (dbItems && dbItems.length > 0) {
          const first = dbItems[0];
          dropdowns[key] = {
            title: first.menuLabel,
            description: first.menuDescription ?? "",
            items: dbItems.map(item => ({
              heading: item.heading,
              description: item.description ?? "",
              link: item.href
            }))
          };
        }
      });

      return {
        startupPrimaryNav: startupPrimary.length > 0 ? startupPrimary : undefined,
        startupPagesMenu: startupPages.length > 0 ? startupPages : undefined,
        mainHeaderNav: mainHeader.length > 0 ? mainHeader : undefined,
        mainHeaderDropdownContent: dropdowns,
      };
    } catch (e) {
      this.logger.error("Failed to load navigation from DB", e);
      return null;
    }
  }
}
