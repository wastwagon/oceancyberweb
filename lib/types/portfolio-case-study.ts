/**
 * Public portfolio case study shape (list + detail + home). Used by static
 * `lib/data/projects` and by DB rows mapped in `lib/data/portfolio-loader`.
 */
import type { DesignArtifact } from "@/lib/data/case-study-design";
import type { PortfolioProjectType } from "@/lib/types/portfolio-project-type";
import type { PortfolioSource } from "@/lib/types/portfolio-source";

export type PortfolioCaseStudy = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  metrics?: {
    increase: string;
    metric: string;
  };
  year: string;
  client: string;
  rating: number;
  testimonial?: string;
  services?: string[];
  slug: string;
  results?: string;
  liveUrl?: string;
  projectType?: PortfolioProjectType;
  /** Client delivery vs in-house studio / concept work. */
  portfolioSource?: PortfolioSource;
  designArtifacts?: DesignArtifact[];
};
