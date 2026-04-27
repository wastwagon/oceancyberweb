import "server-only";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { TestimonialCard } from "@/lib/types/testimonial-card";
import { fallbackTestimonialCards } from "./testimonials-fallback";

function initialsFromName(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) {
    return "?";
  }
  if (p.length === 1) {
    return p[0]!.slice(0, 2).toUpperCase();
  }
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase();
}

function mapRow(r: {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  initials: string | null;
}): TestimonialCard {
  return {
    id: r.id,
    name: r.name,
    company: r.company,
    role: r.role,
    content: r.content,
    rating: r.rating,
    initials: (r.initials && r.initials.length > 0 ? r.initials : initialsFromName(r.name)).slice(0, 3),
  };
}

export const getTestimonialCards = unstable_cache(
  async (): Promise<TestimonialCard[]> => {
    try {
      const rows = await prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });
      if (rows.length === 0) {
        return fallbackTestimonialCards;
      }
      return rows.map(mapRow);
    } catch (e) {
      console.error("[getTestimonialCards]", e);
      return fallbackTestimonialCards;
    }
  },
  ["site-testimonial-cards"],
  { revalidate: 300, tags: ["testimonials"] },
);
