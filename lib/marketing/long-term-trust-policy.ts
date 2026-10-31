/**
 * Long-term marketing trust — no shortcut claims on public surfaces.
 *
 * Prefer over time:
 * - Live client URLs and named work (see /facts, /portfolio, Google reviews)
 * - Fixed GHS packages and office facts
 * - Labelled in-house concept work (never as clients)
 *
 * Maps / peer search phrases ("best web design company…") stay on owner geo pages,
 * meta, JSON-LD, and GBP kit — not homepage H1 or trust strips.
 */

/** Portfolio metric chip when we show outcomes without unverifiable % lifts. */
export function liveDeliveryMetric(feature: string): { increase: string; metric: string } {
  return { increase: "Live", metric: feature };
}

/** Marketing % lifts — not CSS/Tailwind sizes (e.g. w-[100%]). Used by verify-local-seo. */
export const UNVERIFIABLE_PERCENT_PATTERN =
  /(?:increased|decreased|reduced|rose|grew|by|metric:\s*["'])\s*\d{1,3}%|["']\d{2,3}%["']/;
