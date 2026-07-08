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
      "Fitch Advisory serves governments, corporates, and investors — but an outdated site undermined institutional credibility. Client onboarding relied on email chains, manual document exchange, and ad-hoc scheduling that slowed high-value consultations.",
    solution:
      "We rebuilt the advisory platform with a refined brand system, secure client portal, structured service and insights pages, and integrated consultation scheduling. Security and performance were treated as product requirements from day one — not post-launch patches.",
    impact:
      "Client engagement increased 250%. Document sharing and consultation booking became self-serve, reducing admin overhead while presenting a brand experience aligned with the firm's advisory mandate.",
  },
  "fitch-attorneys": {
    challenge:
      "A full-service corporate law firm was managing cases across email threads, spreadsheets, and disconnected tools. Clients lacked visibility into matter progress, and internal teams spent hours on status updates instead of billable work.",
    solution:
      "We delivered a unified legal platform: public-facing practice and sector pages, a client communication hub, and case workflow tooling designed for how Ghanaian firms actually operate — with security, access control, and Cloudflare protection built in.",
    impact:
      "Case management efficiency improved 180%. Clients gained clearer matter visibility while the firm reduced manual follow-up and consolidated communication on one trusted platform.",
  },
  "africa-governance-centre": {
    challenge:
      "Programmes, research, and continental events lived across fragmented channels. International partners and policy stakeholders had no single credible destination to discover work, register for events, or engage with governance programmes.",
    solution:
      "We architected a continental governance platform with structured programme content, event workflows, performance-optimised delivery, and a brand experience that reflects the centre's mandate to partners across Africa and beyond.",
    impact:
      "Programme visibility increased 220%. Stakeholder engagement consolidated on one platform — faster event promotion, clearer research discovery, and a digital presence worthy of international governance work.",
  },
  "thinq-shopping": {
    challenge:
      "ThinQ needed a mobile-first retail and services experience that could handle Ghana's payment reality: MoMo-first buyers, intermittent connectivity, and operational teams drowning in manual order follow-up during peak periods.",
    solution:
      "We built an e-commerce and services app with product discovery, Paystack and MoMo-ready checkout, idempotent payment callbacks, and merchant tooling for order management — designed for conversion on mobile, not desktop afterthoughts.",
    impact:
      "Mobile conversions increased 165%. Checkout friction dropped, manual order handling reduced, and the merchant team gained operational confidence as transaction volume grew.",
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
