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
  "fitch-advisory": {
    challenge:
      "A dated web presence failed to convey trust and made client onboarding cumbersome.",
    solution:
      "A refined brand experience with secure portal access and consultation scheduling.",
    impact:
      "Client engagement rose while document sharing and booking became self-serve.",
  },
  "fitch-attorneys": {
    challenge:
      "Case workflows relied on manual communication and fragmented tools.",
    solution:
      "A unified legal platform with case management and a client communication hub.",
    impact:
      "Case handling efficiency improved with clearer client visibility.",
  },
  "creative-hub-template": {
    challenge:
      "The agency needed a flagship UI showcase that demonstrates premium product design craft.",
    solution:
      "A creative hub dashboard with glassmorphism, motion, and analytics patterns.",
    impact:
      "Became the reference for design-led proposals and elevated perceived delivery quality.",
  },
  "juelle-hair": {
    challenge:
      "Manual order handling and limited digital visibility slowed growth.",
    solution:
      "A full e-commerce rollout with integrated inventory and payment tooling.",
    impact:
      "Operations were streamlined and online sales expanded across markets.",
  },
  "tour-world-tourism": {
    challenge:
      "Booking relied on phone calls and spreadsheets, limiting scale during peak seasons.",
    solution:
      "A real-time reservation platform with payments and operator dashboards.",
    impact:
      "Booking conversions increased while errors and manual follow-up dropped sharply.",
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
