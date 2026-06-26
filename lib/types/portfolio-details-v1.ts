/** `Project.details` JSON in PostgreSQL, version 1. */
import type { DesignArtifact } from "@/lib/data/case-study-design";
import type { PortfolioProjectType } from "@/lib/types/portfolio-project-type";

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
  /** Primary delivery emphasis for portfolio filters. */
  projectType?: PortfolioProjectType;
  /** Design-process gallery (research → wireframes → UI). */
  designArtifacts?: DesignArtifact[];
};
