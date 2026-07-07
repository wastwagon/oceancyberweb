import "server-only";

import { unstable_cache } from "next/cache";
import type { Project } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import type { PortfolioDetailsV1 } from "@/lib/types/portfolio-details-v1";
import { enrichPortfolioEntry, sortPortfolioForDisplay } from "@/lib/portfolio/portfolio-source";
import { fallbackPortfolioCaseStudies } from "./projects";

export type { PortfolioDetailsV1 } from "@/lib/types/portfolio-details-v1";

function mapPrismaProjectToCaseStudy(row: Project): PortfolioCaseStudy | null {
  const d = row.details;
  if (d && typeof d === "object" && "v" in d && (d as { v?: number }).v === 1) {
    const v1 = d as PortfolioDetailsV1;
    return {
      title: row.title,
      slug: row.slug,
      category: row.category,
      description: row.description,
      tech: [...row.techStack],
      image: v1.image || row.imageUrl || "/images/oceancyber-logo.webp",
      gradient: v1.gradient,
      year: v1.year,
      client: v1.client,
      rating: v1.rating,
      metrics: v1.metrics,
      services: v1.services,
      testimonial: v1.testimonial,
      results: v1.results,
      liveUrl: row.liveUrl ?? undefined,
      projectType: v1.projectType,
      portfolioSource: v1.portfolioSource,
      designArtifacts: v1.designArtifacts,
    };
  }
  if (!row.imageUrl) {
    return null;
  }
  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    description: row.description,
    tech: [...row.techStack],
    image: row.imageUrl,
    gradient: "from-ocean-500 to-cyan-500",
    year: "",
    client: row.title,
    rating: 5,
    liveUrl: row.liveUrl ?? undefined,
  };
}

function logPortfolioLoaderError(context: string, error: unknown) {
  // Keep production/build logs clean when fallback content is expected.
  if (process.env.NODE_ENV === "production") return;
  console.error(context, error);
}

export const getPortfolioCaseStudies = unstable_cache(
  async (): Promise<PortfolioCaseStudy[]> => {
    try {
      const rows = await prisma.project.findMany({
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
      });
      if (rows.length === 0) {
        return sortPortfolioForDisplay(
          fallbackPortfolioCaseStudies.map(enrichPortfolioEntry),
        );
      }
      const mapped = rows
        .map((r) => mapPrismaProjectToCaseStudy(r))
        .filter((x): x is PortfolioCaseStudy => x != null)
        .map(enrichPortfolioEntry);
      if (mapped.length > 0) {
        return sortPortfolioForDisplay(mapped);
      }
    } catch (e) {
      logPortfolioLoaderError("[getPortfolioCaseStudies]", e);
    }
    return sortPortfolioForDisplay(fallbackPortfolioCaseStudies.map(enrichPortfolioEntry));
  },
  ["site-portfolio-case-studies"],
  { revalidate: 300, tags: ["portfolio"] },
);

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.project.findMany({ select: { slug: true } });
    const slugs = new Set(rows.map((row) => row.slug));
    for (const project of fallbackPortfolioCaseStudies) {
      slugs.add(project.slug);
    }
    return [...slugs];
  } catch (e) {
    logPortfolioLoaderError("[getPortfolioSlugs]", e);
    return fallbackPortfolioCaseStudies.map((project) => project.slug);
  }
}

export async function getPortfolioCaseStudyBySlug(
  slug: string,
): Promise<PortfolioCaseStudy | null> {
  try {
    const row = await prisma.project.findUnique({ where: { slug } });
    if (row) {
      const m = mapPrismaProjectToCaseStudy(row);
      if (m) {
        return enrichPortfolioEntry(m);
      }
    }
  } catch (e) {
    logPortfolioLoaderError("[getPortfolioCaseStudyBySlug]", e);
  }
  const fallback = fallbackPortfolioCaseStudies.find((p) => p.slug === slug);
  return fallback ? enrichPortfolioEntry(fallback) : null;
}

export async function getRelatedPortfolioProjects(
  slug: string,
  category: string,
  limit = 3,
): Promise<PortfolioCaseStudy[]> {
  const all = await getPortfolioCaseStudies();
  return all.filter((p) => p.slug !== slug && p.category === category).slice(0, limit);
}
