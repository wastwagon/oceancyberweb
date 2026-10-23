/** Marketing CTA labels and paths — shared by Next.js and Nest defaults. */

export const SITE_CTA = {
  getStarted: { href: "/get-started", label: "Get started" },
  talkToTeam: { href: "/contact", label: "Talk to our team" },
  selectedWork: { href: "/#projects", label: "See selected work" },
  fullPortfolio: { href: "/portfolio", label: "Full portfolio" },
  conceptWork: { href: "/portfolio?tab=creative", label: "Concept work" },
  comparePackages: { href: "/pricing", label: "Compare packages" },
  ourStory: { href: "/about", label: "Our story" },
  howWeWork: { href: "/how-we-work", label: "How we work" },
  estimateInCedis: { href: "/tools/project-cost", label: "Estimate in cedis" },
} as const;

export const serviceHeroCta = SITE_CTA.getStarted;

/** Build `/get-started` with optional `plan` and `topic` query params. */
export function getStartedHref(params?: { plan?: string; topic?: string }): string {
  if (!params?.plan && !params?.topic) {
    return SITE_CTA.getStarted.href;
  }
  const q = new URLSearchParams();
  if (params.plan) q.set("plan", params.plan);
  if (params.topic) q.set("topic", params.topic);
  return `${SITE_CTA.getStarted.href}?${q.toString()}`;
}
