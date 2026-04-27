import { fallbackPortfolioCaseStudies } from "./projects";

function categoriesFromList(list: { category: string }[]): string[] {
  return Array.from(new Set(list.map((p) => p.category))).sort((a, b) => a.localeCompare(b));
}

/** @deprecated pass `getPortfolioCaseStudies()` result into `getProjectCategories` or use list-based helpers */
export const PROJECT_CATEGORIES: readonly string[] = categoriesFromList(
  fallbackPortfolioCaseStudies,
);

export function getProjectCategories(
  list: { category: string }[] | readonly { category: string }[],
): string[] {
  return categoriesFromList([...list]);
}

export function getPortfolioStats(list: { category: string }[]) {
  return {
    projectCount: list.length,
    categoryCount: new Set(list.map((p) => p.category)).size,
  };
}
