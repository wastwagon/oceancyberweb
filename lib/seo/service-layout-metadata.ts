import type { Metadata } from "next";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { buildTrustBlurb } from "@/lib/trust/review-trust";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

/** Resolve service layout descriptions with live Google review lines where templated. */
export async function resolveServicePageDescription(path: string): Promise<string | undefined> {
  const entry = getServicePageSeo(path);
  if (!entry) return undefined;
  if (!entry.description.includes("{{REVIEWS")) {
    return entry.description;
  }
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return entry.description
    .replace(/\{\{REVIEWS_LOWER\}\}/g, reviewsOnly.toLowerCase())
    .replace(/\{\{REVIEWS\}\}/g, reviewsOnly);
}

export async function buildServiceLayoutMetadata(
  path: string,
  title: string,
  extra?: Pick<Metadata, "keywords" | "alternates">,
): Promise<Metadata> {
  const description = await resolveServicePageDescription(path);
  return {
    title,
    description,
    ...extra,
  };
}
