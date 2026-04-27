import * as bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { fallbackTestimonialCards } from "../lib/data/testimonials-fallback";
import { fallbackPortfolioCaseStudies } from "../lib/data/projects";
import type { PortfolioDetailsV1 } from "../lib/types/portfolio-details-v1";

const prisma = new PrismaClient();

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
