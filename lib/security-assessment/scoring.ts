import {
  MATURITY_TIERS,
  MAX_ASSESSMENT_SCORE,
  SECURITY_DOMAINS,
  type MaturityTier,
} from "./config";

export type AnswerMap = Record<string, number>;

export type DomainScore = {
  domainId: string;
  title: string;
  earned: number;
  max: number;
  percent: number;
};

export type AssessmentResult = {
  earned: number;
  max: number;
  percent: number;
  tier: MaturityTier;
  domainScores: DomainScore[];
};

export function computeAssessmentResult(answers: AnswerMap): AssessmentResult {
  const domainScores: DomainScore[] = SECURITY_DOMAINS.map((domain) => {
    const earned = domain.questions.reduce(
      (sum, q) => sum + Math.min(q.maxScore, Math.max(0, answers[q.id] ?? 0)),
      0,
    );
    const max = domain.questions.reduce((sum, q) => sum + q.maxScore, 0);
    return {
      domainId: domain.id,
      title: domain.title,
      earned,
      max,
      percent: max > 0 ? Math.round((earned / max) * 100) : 0,
    };
  });

  const earned = domainScores.reduce((sum, d) => sum + d.earned, 0);
  const max = MAX_ASSESSMENT_SCORE;
  const percent = max > 0 ? Math.round((earned / max) * 100) : 0;

  const tier =
    [...MATURITY_TIERS].reverse().find((t) => percent >= t.minPercent) ??
    MATURITY_TIERS[0];

  return { earned, max, percent, tier, domainScores };
}
