import Link from "next/link";
import type { GooglePlaceStats } from "@/lib/google-places-stats";
import {
  companyAtAGlanceFacts,
  siteFactsUpdated,
  type SiteFactRow,
} from "@/lib/site-facts";
import { formatReviewsTrustLine } from "@/lib/trust/review-trust";
import { reviewStatsSourceNote } from "@/lib/trust/review-source-label";

type Props = {
  title?: string;
  subtitle?: string;
  /** Show link to full /facts page */
  showFactsLink?: boolean;
  /** Limit rows for compact service hubs */
  maxRows?: number;
  /** When set, Google reviews row uses live/env stats instead of static copy. */
  liveReviewStats?: GooglePlaceStats;
};

export function CompanyFactsBox({
  title = "OceanCyber at a glance",
  subtitle = `Updated ${siteFactsUpdated}. Prices in Ghana cedis unless noted.`,
  showFactsLink = true,
  maxRows,
  liveReviewStats,
}: Props) {
  const baseRows = maxRows
    ? companyAtAGlanceFacts.slice(0, maxRows)
    : [...companyAtAGlanceFacts];
  const rows: SiteFactRow[] = baseRows.map((row) => {
    if (row.label === "Google reviews" && liveReviewStats) {
      return {
        ...row,
        value: formatReviewsTrustLine(liveReviewStats),
        note: reviewStatsSourceNote(liveReviewStats) ?? row.note,
      };
    }
    return row;
  });

  return (
    <aside
      className="sa-card border-sa-primary/20 p-6 md:p-8"
      aria-label="Company facts"
    >
      <p className="sa-eyebrow">{title}</p>
      <p className="mt-2 text-sm text-sa-muted">{subtitle}</p>
      <dl className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-sa-muted/70">
              {row.label}
            </dt>
            <dd className="text-sm text-white">
              {row.href ? (
                <Link href={row.href} className="sa-text-link font-medium">
                  {row.value}
                </Link>
              ) : (
                row.value
              )}
              {row.note ? (
                <p className="mt-1 text-xs text-sa-muted/80">{row.note}</p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      {showFactsLink ? (
        <p className="mt-6 text-sm">
          <Link href="/facts" className="sa-text-link font-medium">
            Full company facts →
          </Link>
        </p>
      ) : null}
    </aside>
  );
}
