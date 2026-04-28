import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { fallbackPortfolioCaseStudies } from "./projects";

type CaseStudyNarrative = {
  challenge: string;
  solution: string;
  impact: string;
};

type CaseStudy = PortfolioCaseStudy & CaseStudyNarrative;

const CASE_STUDY_NARRATIVES: Record<string, CaseStudyNarrative> = {
  "egp-ghana": {
    challenge:
      "Legacy banking systems with poor user experience and security vulnerabilities.",
    solution:
      "A modern web platform with stronger authentication and real-time monitoring.",
    impact:
      "Customer satisfaction increased while operations were simplified and safer.",
  },
  "juelle-hair": {
    challenge:
      "Manual order handling and limited digital visibility slowed growth.",
    solution:
      "A full e-commerce rollout with integrated inventory and payment tooling.",
    impact:
      "Operations were streamlined and online sales expanded across markets.",
  },
};

const DEFAULT_NARRATIVE: CaseStudyNarrative = {
  challenge:
    "The client needed a faster, more reliable digital experience with clear growth goals.",
  solution:
    "We delivered a focused platform upgrade with modern UX, stronger delivery workflows, and maintainable architecture.",
  impact:
    "The team gained better performance, higher confidence in delivery, and clearer business outcomes.",
};

function getNarrative(slug: string): CaseStudyNarrative {
  return CASE_STUDY_NARRATIVES[slug] ?? DEFAULT_NARRATIVE;
}

export const caseStudies: CaseStudy[] = fallbackPortfolioCaseStudies.map(
  (project) => ({
    ...project,
    ...getNarrative(project.slug),
  }),
);

export function getCaseStudyNarrativeBySlug(
  slug: string,
): CaseStudyNarrative | null {
  const found = caseStudies.find((study) => study.slug === slug);
  if (!found) {
    return null;
  }
  return {
    challenge: found.challenge,
    solution: found.solution,
    impact: found.impact,
  };
}
