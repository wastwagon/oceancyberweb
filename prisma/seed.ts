import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { Prisma, PrismaClient } from "@prisma/client";
import { defaultNavigationConfig } from "../lib/navigation/menu";
import { seedPortfolioFromFallbacks } from "./seed-portfolio-fallbacks";

type TestimonialFallback = {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  initials?: string;
};

const prisma = new PrismaClient();

const navDefaults = {
  startupPrimaryNav: [
    { label: "Home", href: "/" },
    { label: "About", sectionId: "about" },
    { label: "Services", sectionId: "services" },
    { label: "Portfolio", sectionId: "projects" },
  ],
  startupPagesMenu: defaultNavigationConfig.startupPagesMenu,
  mainHeaderNav: defaultNavigationConfig.mainHeaderNav,
  mainHeaderDropdownContent: defaultNavigationConfig.mainHeaderDropdownContent,
};

async function loadTestimonialFallbacks(): Promise<TestimonialFallback[]> {
  try {
    const mod = await import("../lib/data/testimonials-fallback");
    return (mod.fallbackTestimonialCards as TestimonialFallback[]) ?? [];
  } catch {
    return [];
  }
}

async function upsertNavigationMenu(
  key: string,
  label: string,
  description: string | null,
): Promise<string> {
  const rows = await prisma.$queryRaw<Array<{ id: string }>>`
    INSERT INTO "NavigationMenu" ("id", "key", "label", "description", "isActive", "createdAt", "updatedAt")
    VALUES (${randomUUID()}, ${key}, ${label}, ${description}, true, NOW(), NOW())
    ON CONFLICT ("key")
    DO UPDATE SET
      "label" = EXCLUDED."label",
      "description" = EXCLUDED."description",
      "isActive" = true,
      "updatedAt" = NOW()
    RETURNING "id"
  `;
  return rows[0]!.id;
}

async function seedNavigationConfig() {
  const startupPrimaryId = await upsertNavigationMenu(
    "startup-primary",
    "Startup primary nav",
    "Anchor/header items for startup homepage.",
  );
  const startupPagesId = await upsertNavigationMenu(
    "startup-pages",
    "Startup pages menu",
    "Secondary page links for startup header.",
  );
  const mainHeaderId = await upsertNavigationMenu(
    "main-header",
    "Main site header",
    "Top-level main header items.",
  );

  const dropdownMenuIds: Record<string, string> = {};
  for (const key of Object.keys(navDefaults.mainHeaderDropdownContent)) {
    const panel = navDefaults.mainHeaderDropdownContent[key as keyof typeof navDefaults.mainHeaderDropdownContent];
    dropdownMenuIds[key] = await upsertNavigationMenu(
      `main-dropdown-${key}`,
      panel.title,
      panel.description,
    );
  }

  const allNavMenuIds = [
    startupPrimaryId,
    startupPagesId,
    mainHeaderId,
    ...Object.values(dropdownMenuIds),
  ];

  await prisma.$executeRaw`
    DELETE FROM "NavigationMenuItem"
    WHERE "menuId" IN (${Prisma.join(allNavMenuIds)})
  `;

  for (let i = 0; i < navDefaults.startupPrimaryNav.length; i++) {
    const item = navDefaults.startupPrimaryNav[i]!;
    const metadata =
      "sectionId" in item
        ? ({ sectionId: item.sectionId } as Prisma.InputJsonValue)
        : ({} as Prisma.InputJsonValue);
    await prisma.$executeRaw`
      INSERT INTO "NavigationMenuItem"
      ("id", "menuId", "sortOrder", "heading", "description", "href", "metadata", "isActive", "createdAt", "updatedAt")
      VALUES
      (
        ${randomUUID()},
        ${startupPrimaryId},
        ${i * 10},
        ${item.label},
        NULL,
        ${"href" in item ? item.href : "/"},
        ${metadata}::jsonb,
        true,
        NOW(),
        NOW()
      )
    `;
  }

  for (let i = 0; i < navDefaults.startupPagesMenu.length; i++) {
    const item = navDefaults.startupPagesMenu[i]!;
    await prisma.$executeRaw`
      INSERT INTO "NavigationMenuItem"
      ("id", "menuId", "sortOrder", "heading", "description", "href", "metadata", "isActive", "createdAt", "updatedAt")
      VALUES
      (
        ${randomUUID()},
        ${startupPagesId},
        ${i * 10},
        ${item.label},
        NULL,
        ${item.href},
        '{}'::jsonb,
        true,
        NOW(),
        NOW()
      )
    `;
  }

  for (let i = 0; i < navDefaults.mainHeaderNav.length; i++) {
    const item = navDefaults.mainHeaderNav[i]!;
    const metadata = {
      dropdownKey: item.dropdownKey ?? null,
      activeMatch: item.activeMatch ?? [],
    } as Prisma.InputJsonValue;
    await prisma.$executeRaw`
      INSERT INTO "NavigationMenuItem"
      ("id", "menuId", "sortOrder", "heading", "description", "href", "metadata", "isActive", "createdAt", "updatedAt")
      VALUES
      (
        ${randomUUID()},
        ${mainHeaderId},
        ${i * 10},
        ${item.label},
        NULL,
        ${item.href},
        ${metadata}::jsonb,
        true,
        NOW(),
        NOW()
      )
    `;
  }

  const dropdownEntries = Object.entries(navDefaults.mainHeaderDropdownContent);
  for (const [dropdownKey, dropdown] of dropdownEntries) {
    const menuId = dropdownMenuIds[dropdownKey]!;
    for (let i = 0; i < dropdown.items.length; i++) {
      const item = dropdown.items[i]!;
      await prisma.$executeRaw`
        INSERT INTO "NavigationMenuItem"
        ("id", "menuId", "sortOrder", "heading", "description", "href", "metadata", "isActive", "createdAt", "updatedAt")
        VALUES
        (
          ${randomUUID()},
          ${menuId},
          ${i * 10},
          ${item.heading},
          ${item.description ?? null},
          ${item.link},
          '{}'::jsonb,
          true,
          NOW(),
          NOW()
        )
      `;
    }
  }

  // eslint-disable-next-line no-console -- seed CLI
  console.log("Seeded navigation config tables.");
}

/**
 * Sample dashboard users for sign-in (`/signin`). Uses the same bcrypt cost as `backend/src/auth/auth.service.ts`.
 * In production, set SEED_DEMO_PASSWORD and SEED_ADMIN_PASSWORD explicitly (never rely on defaults).
 */
async function seedSampleUsers() {
  const isProd = process.env.NODE_ENV === "production";
  const demoPassword =
    process.env.SEED_DEMO_PASSWORD?.trim() || (!isProd ? "OceanCyberDemo1!" : "");
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD?.trim() || (!isProd ? "OceanCyberAdmin1!" : "");

  if (!demoPassword || !adminPassword) {
    // eslint-disable-next-line no-console -- seed CLI
    console.log(
      "Skipping sample users: set SEED_DEMO_PASSWORD and SEED_ADMIN_PASSWORD (required in production).",
    );
    return;
  }

  const demoHash = await bcrypt.hash(demoPassword, 12);
  const adminHash = await bcrypt.hash(adminPassword, 12);

  const demoEmail = (process.env.SEED_DEMO_EMAIL || "sample.user@oceancyber.local").toLowerCase();
  const adminEmail = (process.env.SEED_ADMIN_EMAIL || "sample.admin@oceancyber.local").toLowerCase();
  const testAdminEmail = "admin@oceancyber.net";
  const testUserEmail = "user@oceancyber.net";
  const testPass = "OceanCyber123!";
  const testHash = await bcrypt.hash(testPass, 12);

  await prisma.user.upsert({
    where: { email: demoEmail },
    create: {
      email: demoEmail,
      passwordHash: demoHash,
      fullName: "Sample customer",
      role: "user",
    },
    update: {
      passwordHash: demoHash,
      fullName: "Sample customer",
      role: "user",
    },
  });

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      fullName: "Sample admin",
      role: "admin",
    },
    update: {
      passwordHash: adminHash,
      fullName: "Sample admin",
      role: "admin",
    },
  });

  // New Testing Accounts
  await prisma.user.upsert({
    where: { email: testAdminEmail },
    create: {
      email: testAdminEmail,
      passwordHash: testHash,
      fullName: "Test Administrator",
      role: "admin",
    },
    update: { passwordHash: testHash },
  });

  await prisma.user.upsert({
    where: { email: testUserEmail },
    create: {
      email: testUserEmail,
      passwordHash: testHash,
      fullName: "Test Client",
      role: "user",
    },
    update: { passwordHash: testHash },
  });

  // eslint-disable-next-line no-console -- seed CLI
  console.log(`Sample users upserted: ${demoEmail}, ${testUserEmail} (user), ${adminEmail}, ${testAdminEmail} (admin). Password for new: ${testPass}`);
  if (isProd) {
    // eslint-disable-next-line no-console -- seed CLI
    console.log("Production: rotate these passwords after first login if you keep sample accounts.");
  }
}

async function main() {
  await seedSampleUsers();
  await seedNavigationConfig();
  const portfolioCount = await seedPortfolioFromFallbacks(prisma);
  // eslint-disable-next-line no-console -- seed CLI
  console.log(`Seeded ${portfolioCount} Project rows.`);

  const fallbackTestimonialCards = await loadTestimonialFallbacks();
  for (let i = 0; i < fallbackTestimonialCards.length; i++) {
    const t = fallbackTestimonialCards[i]!;
    await prisma.testimonial.upsert({
      where: { id: t.id },
      create: {
        id: t.id,
        name: t.name,
        company: t.company,
        role: t.role,
        content: t.content,
        rating: t.rating,
        featured: true,
        initials: t.initials,
        sortOrder: i * 10,
      },
      update: {
        name: t.name,
        company: t.company,
        role: t.role,
        content: t.content,
        rating: t.rating,
        featured: true,
        initials: t.initials,
        sortOrder: i * 10,
      },
    });
  }
  // eslint-disable-next-line no-console -- seed CLI
  console.log(`Seeded ${fallbackTestimonialCards.length} Testimonial rows.`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console -- seed CLI
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
