/** `Project.details` JSON in PostgreSQL, version 1. */
export type PortfolioDetailsV1 = {
  v: 1;
  gradient: string;
  year: string;
  client: string;
  rating: number;
  /** Cover image path (public path, e.g. `/images/...`). */
  image: string;
  metrics?: { increase: string; metric: string };
  services?: string[];
  testimonial?: string;
  results?: string;
};
