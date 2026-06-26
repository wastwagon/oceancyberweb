import {
  caseStudyDesignBySlug,
  type DesignArtifact,
} from "@/lib/data/case-study-design";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";

export function getDesignArtifactsForProject(
  project: Pick<PortfolioCaseStudy, "slug" | "designArtifacts">,
): DesignArtifact[] {
  if (project.designArtifacts && project.designArtifacts.length > 0) {
    return project.designArtifacts;
  }
  return caseStudyDesignBySlug[project.slug] ?? [];
}
