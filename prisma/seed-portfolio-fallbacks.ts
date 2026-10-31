/**
 * Upsert Project rows from lib/data/projects.ts — same shape as prisma/seed.ts portfolio loop.
 * Run after deploy when fallbacks change: npm run sync:portfolio
 */
import { Prisma, PrismaClient } from "@prisma/client";
import { caseStudyDesignBySlug } from "../lib/data/case-study-design";
import { PROJECT_TYPE_BY_SLUG } from "../lib/portfolio/project-type";
import { FEATURED_CLIENT_SLUGS, resolvePortfolioSource } from "../lib/portfolio/portfolio-source";
import type { PortfolioProjectType } from "../lib/types/portfolio-project-type";
import type { PortfolioSource } from "../lib/types/portfolio-source";

export type PortfolioDetailsV1 = {
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
  projectType?: PortfolioProjectType;
  portfolioSource?: PortfolioSource;
  designArtifacts?: (typeof caseStudyDesignBySlug)[string];
};

export type PortfolioFallback = {
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
  liveUrl?: string;
};

export async function loadPortfolioFallbacks(): Promise<PortfolioFallback[]> {
  const mod = await import("../lib/data/projects");
  return (mod.fallbackPortfolioCaseStudies as PortfolioFallback[]) ?? [];
}

export async function seedPortfolioFromFallbacks(
  prisma: PrismaClient,
): Promise<number> {
  const fallbackPortfolioCaseStudies = await loadPortfolioFallbacks();
  for (let i = 0; i < fallbackPortfolioCaseStudies.length; i++) {
    const p = fallbackPortfolioCaseStudies[i]!;
    const designArtifacts = caseStudyDesignBySlug[p.slug];
    const projectType = PROJECT_TYPE_BY_SLUG[p.slug];
    const portfolioSource = resolvePortfolioSource({
      title: p.title,
      slug: p.slug,
      category: p.category,
      description: p.description,
      tech: p.tech,
      gradient: p.gradient ?? "from-ocean-500 to-cyan-500",
      image: p.image ?? "",
      year: p.year ?? "",
      client: p.client ?? p.title,
      rating: p.rating ?? 5,
    });
    const featuredRank = FEATURED_CLIENT_SLUGS.indexOf(
      p.slug as (typeof FEATURED_CLIENT_SLUGS)[number],
    );
    const sortOrder =
      portfolioSource === "concept"
        ? 900 + i * 10
        : featuredRank === -1
          ? 400 + i * 10
          : featuredRank * 10;
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
      ...(projectType ? { projectType } : {}),
      portfolioSource,
      ...(designArtifacts?.length ? { designArtifacts } : {}),
    };
    const json: Prisma.InputJsonValue = details as unknown as Prisma.InputJsonValue;
    const liveUrl = p.liveUrl?.trim() || null;
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        description: p.description,
        techStack: p.tech,
        imageUrl: p.image,
        liveUrl,
        featured: portfolioSource === "client",
        sortOrder,
        details: json,
      },
      update: {
        title: p.title,
        category: p.category,
        description: p.description,
        techStack: p.tech,
        imageUrl: p.image,
        liveUrl,
        featured: portfolioSource === "client",
        sortOrder,
        details: json,
      },
    });
  }
  return fallbackPortfolioCaseStudies.length;
}
