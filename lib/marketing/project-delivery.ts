/** Standard mobilisation deposit for custom web/app projects (OceanCyber proposals). */
export const STANDARD_PROJECT_DEPOSIT_PERCENT = 60;

export const OWNER_TODO_PERFORMANCE_CLAIMS =
  "TODO — owner: baselines for 250% / 180% / 165% claims before publishing";

export function projectDepositFaqAnswer(): string {
  return `Custom website and app projects typically invoice a ${STANDARD_PROJECT_DEPOSIT_PERCENT}% deposit before build work starts, with the balance on agreed milestones. Exact amounts are in your signed proposal in GHS — see /pricing for package totals.`;
}

export function projectMaintenanceFaqAnswer(): string {
  return "Every package includes a post-launch support window (30, 90, or 180 days depending on tier). Ongoing maintenance, content updates, or retainers are quoted separately based on project scope, stack, and how often you need engineering — ask on /contact for a GHS estimate.";
}

export function projectTimelineFaqAnswer(scope: string, weeks: string): string {
  return `${scope} typically runs ${weeks} once your content and approvals are ready. We publish indicative timelines on each service page and lock dates in your proposal.`;
}
