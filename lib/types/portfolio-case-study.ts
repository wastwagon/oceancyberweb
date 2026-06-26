/**
 * Public portfolio case study shape (list + detail + home). Used by static
 * `lib/data/projects` and by DB rows mapped in `lib/data/portfolio-loader`.
 */
import type { DesignArtifact } from "@/lib/data/case-study-design";
import type { PortfolioProjectType } from "@/lib/types/portfolio-project-type";

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
  projectType?: PortfolioProjectType;
  designArtifacts?: DesignArtifact[];
};
