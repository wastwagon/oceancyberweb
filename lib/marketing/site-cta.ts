/** Re-export shared marketing CTAs for the Next.js app. */
export { SITE_CTA, serviceHeroCta } from "@oceancyber/shared";
import { SITE_CTA } from "@oceancyber/shared";

/**
 * Build `/get-started` with optional query params.
 * Defined here (not only re-exported from shared) so Next client bundles always resolve it
 * even when the workspace `@oceancyber/shared` dist is stale in dev.
 */
export function getStartedHref(params?: { plan?: string; topic?: string }): string {
  if (!params?.plan && !params?.topic) {
    return SITE_CTA.getStarted.href;
  }
  const q = new URLSearchParams();
  if (params.plan) q.set("plan", params.plan);
  if (params.topic) q.set("topic", params.topic);
  return `${SITE_CTA.getStarted.href}?${q.toString()}`;
}
