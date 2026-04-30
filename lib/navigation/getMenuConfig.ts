import "server-only";

import {
  defaultNavigationConfig,
  type HeaderDropdownKey,
  type HeaderNavItem,
  type NavigationConfig,
  type StartupNavLink,
} from "@/lib/navigation/menu";
import { prisma } from "@/lib/db";

type DbMenuItem = {
  menuKey: string;
  menuLabel: string;
  menuDescription: string | null;
  heading: string;
  description: string | null;
  href: string;
  metadata: unknown;
};

function asObject(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function parseStartupPrimary(items: DbMenuItem[]): StartupNavLink[] {
  const parsed: StartupNavLink[] = [];
  for (const item of items) {
    const meta = asObject(item.metadata);
    const sectionId = typeof meta?.sectionId === "string" ? meta.sectionId : undefined;
    if (sectionId) {
      parsed.push({ label: item.heading, href: `#${sectionId}` });
      continue;
    }
    parsed.push({ label: item.heading, href: item.href });
  }
  return parsed;
}

function parseMainHeader(items: DbMenuItem[]): HeaderNavItem[] {
  return items.map((item) => {
    const meta = asObject(item.metadata);
    const dropdownKey =
      typeof meta?.dropdownKey === "string" ? (meta.dropdownKey as HeaderDropdownKey) : undefined;
    const activeMatch = Array.isArray(meta?.activeMatch)
      ? (meta?.activeMatch as unknown[]).filter((x): x is string => typeof x === "string")
      : undefined;
    return {
      href: item.href,
      label: item.heading,
      dropdownKey,
      activeMatch: activeMatch && activeMatch.length > 0 ? activeMatch : undefined,
    };
  });
}

function parseDropdown(
  menuLabel: string,
  menuDescription: string | null,
  items: DbMenuItem[],
): {
  title: string;
  description: string;
  items: Array<{ heading: string; description: string; link: string }>;
} {
  return {
    title: menuLabel,
    description: menuDescription ?? "",
    items: items.map((item) => ({
      heading: item.heading,
      description: item.description ?? "",
      link: item.href,
    })),
  };
}

async function loadFromDatabase(): Promise<Partial<NavigationConfig> | null> {
  try {
    const rows = await prisma.$queryRaw<
      Array<{
        menuKey: string;
        menuLabel: string;
        menuDescription: string | null;
        heading: string;
        description: string | null;
        href: string;
        metadata: unknown;
      }>
    >`
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

    if (rows.length === 0) {
      return null;
    }

    const byKey = new Map<string, DbMenuItem[]>();
    for (const row of rows) {
      const existing = byKey.get(row.menuKey) ?? [];
      existing.push({
        menuKey: row.menuKey,
        menuLabel: row.menuLabel,
        menuDescription: row.menuDescription,
        heading: row.heading,
        description: row.description,
        href: row.href,
        metadata: row.metadata,
      });
      byKey.set(row.menuKey, existing);
    }

    const startupPrimary = parseStartupPrimary(byKey.get("startup-primary") ?? []);
    const startupPages = (byKey.get("startup-pages") ?? []).map((item) => ({
      label: item.heading,
      href: item.href,
    }));
    const mainHeader = parseMainHeader(byKey.get("main-header") ?? []);

    const dropdowns = structuredClone(defaultNavigationConfig.mainHeaderDropdownContent);
    (Object.keys(dropdowns) as HeaderDropdownKey[]).forEach((key) => {
      const dbItems = byKey.get(`main-dropdown-${key}`);
      if (dbItems && dbItems.length > 0) {
        const [first] = dbItems;
        dropdowns[key] = parseDropdown(first!.menuLabel, first!.menuDescription, dbItems);
      }
    });

    return {
      startupPrimaryNav: startupPrimary.length > 0 ? startupPrimary : undefined,
      startupPagesMenu: startupPages.length > 0 ? startupPages : undefined,
      mainHeaderNav: mainHeader.length > 0 ? mainHeader : undefined,
      mainHeaderDropdownContent: dropdowns,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[getMenuConfig] DB navigation lookup failed; using defaults.", error);
    }
    return null;
  }
}

/**
 * DB/CMS-ready menu adapter.
 * Today it uses a safe fallback-first strategy and supports env override JSON.
 * When a dedicated navigation table/CMS model is added, map it here.
 */
export async function getMenuConfig(): Promise<NavigationConfig> {
  const dbConfig = await loadFromDatabase();
  if (dbConfig) {
    return {
      startupPrimaryNav: dbConfig.startupPrimaryNav ?? defaultNavigationConfig.startupPrimaryNav,
      startupPagesMenu: dbConfig.startupPagesMenu ?? defaultNavigationConfig.startupPagesMenu,
      mainHeaderNav: dbConfig.mainHeaderNav ?? defaultNavigationConfig.mainHeaderNav,
      mainHeaderDropdownContent:
        dbConfig.mainHeaderDropdownContent ?? defaultNavigationConfig.mainHeaderDropdownContent,
    };
  }

  const raw = process.env.NAVIGATION_CONFIG_JSON;
  if (!raw) {
    return defaultNavigationConfig;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<NavigationConfig>;
    return {
      startupPrimaryNav: parsed.startupPrimaryNav ?? defaultNavigationConfig.startupPrimaryNav,
      startupPagesMenu: parsed.startupPagesMenu ?? defaultNavigationConfig.startupPagesMenu,
      mainHeaderNav: parsed.mainHeaderNav ?? defaultNavigationConfig.mainHeaderNav,
      mainHeaderDropdownContent:
        parsed.mainHeaderDropdownContent ?? defaultNavigationConfig.mainHeaderDropdownContent,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[getMenuConfig] Invalid NAVIGATION_CONFIG_JSON, using defaults.", error);
    }
    return defaultNavigationConfig;
  }
}
