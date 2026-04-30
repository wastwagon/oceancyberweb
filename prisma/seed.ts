import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { Prisma, PrismaClient } from "@prisma/client";

type PortfolioDetailsV1 = {
  v: 1;
  gradient?: string;
  year?: string;
  client?: string;
  rating?: number;
  image?: string;
  metrics?: unknown;
  services?: unknown;
  testimonial?: unknown;
  results?: unknown;
};

type PortfolioFallback = {
  title: string;
  slug: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  gradient?: string;
  year?: string;
  client?: string;
  rating?: number;
  metrics?: unknown;
  services?: unknown;
  testimonial?: unknown;
  results?: unknown;
};

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
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", dropdownKey: "services", activeMatch: [] },
    { label: "Industries", href: "/industries", dropdownKey: "industries", activeMatch: [] },
    {
      label: "Infrastructure",
      href: "/domains",
      dropdownKey: "infrastructure",
      activeMatch: ["/domains", "/hosting"],
    },
    {
      label: "Resources",
      href: "/insights",
      dropdownKey: "resources",
      activeMatch: ["/insights", "/case-studies", "/security-journey", "/help-center"],
    },
    {
      label: "Company",
      href: "/about",
      dropdownKey: "company",
      activeMatch: ["/about", "/portfolio", "/contact"],
    },
  ],
  mainHeaderDropdownContent: {
    services: {
      items: [
        { heading: "Web Development", link: "/services/web-development" },
        { heading: "Mobile apps", link: "/services/mobile-apps" },
        { heading: "Website to App Conversion", link: "/services/website-to-mobile-app" },
        { heading: "E-commerce", link: "/services/ecommerce" },
        { heading: "Cybersecurity", link: "/services/cybersecurity" },
      ],
    },
    industries: {
      items: [
        { heading: "Financial Services", link: "/industries/financial-services" },
        { heading: "Healthcare", link: "/industries/healthcare" },
        { heading: "Education", link: "/industries/education" },
        { heading: "Retail & E-commerce", link: "/industries/retail" },
      ],
    },
    infrastructure: {
      items: [
        { heading: "Domains & SSL", link: "/domains" },
        { heading: "Hosting", link: "/hosting" },
      ],
    },
    resources: {
      items: [
        { heading: "Insights", link: "/insights" },
        { heading: "Case studies", link: "/case-studies" },
        { heading: "Security journey", link: "/security-journey" },
        { heading: "Help center", link: "/help-center" },
      ],
    },
    company: {
      items: [
        { heading: "About", link: "/about" },
        { heading: "Portfolio", link: "/portfolio" },
        { heading: "Contact", link: "/contact" },
      ],
    },
  },
};

async function loadPortfolioFallbacks(): Promise<PortfolioFallback[]> {
  try {
    const mod = await import("../lib/data/projects");
    return (mod.fallbackPortfolioCaseStudies as PortfolioFallback[]) ?? [];
  } catch {
    return [];
  }
}

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
    dropdownMenuIds[key] = await upsertNavigationMenu(
      `main-dropdown-${key}`,
      `Main dropdown ${key}`,
      `Dropdown content for ${key}.`,
    );
  }

  await prisma.$executeRaw`
    DELETE FROM "NavigationMenuItem"
    WHERE "menuId" IN (
      ${startupPrimaryId},
      ${startupPagesId},
      ${mainHeaderId},
      ${dropdownMenuIds.services},
      ${dropdownMenuIds.industries},
      ${dropdownMenuIds.infrastructure},
      ${dropdownMenuIds.resources},
      ${dropdownMenuIds.company}
    )
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
          NULL,
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

  // eslint-disable-next-line no-console -- seed CLI
  console.log(`Sample users upserted: ${demoEmail} (user), ${adminEmail} (admin).`);
  if (isProd) {
    // eslint-disable-next-line no-console -- seed CLI
    console.log("Production: rotate these passwords after first login if you keep sample accounts.");
  }
}

async function main() {
  await seedSampleUsers();
  await seedNavigationConfig();
  const fallbackPortfolioCaseStudies = await loadPortfolioFallbacks();
  for (let i = 0; i < fallbackPortfolioCaseStudies.length; i++) {
    const p = fallbackPortfolioCaseStudies[i]!;
    const details: PortfolioDetailsV1 = {
      v: 1,
      gradient: p.gradient,
      year: p.year,
      client: p.client,
      rating: p.rating,
      image: p.image,
      metrics: p.metrics,
      services: p.services,
      testimonial: p.testimonial,
      results: p.results,
    };
    const json: Prisma.InputJsonValue = details as unknown as Prisma.InputJsonValue;
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        description: p.description,
        techStack: p.tech,
        imageUrl: p.image,
        liveUrl: null,
        featured: true,
        sortOrder: i * 10,
        details: json,
      },
      update: {
        title: p.title,
        category: p.category,
        description: p.description,
        techStack: p.tech,
        imageUrl: p.image,
        featured: true,
        sortOrder: i * 10,
        details: json,
      },
    });
  }
  // eslint-disable-next-line no-console -- seed CLI
  console.log(`Seeded ${fallbackPortfolioCaseStudies.length} Project rows.`);

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
