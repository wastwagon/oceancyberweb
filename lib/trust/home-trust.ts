import { getGooglePlaceStats } from "@/lib/google-places-stats";
import type { GooglePlaceStats } from "@/lib/google-places-stats";
import {
  buildHomeFaqItems,
  buildTrustBlurb,
  buildTrustSignals,
  formatCompanyPresenceLine,
  formatReviewsTrustLine,
  type HomeFaqItem,
  type TrustSignal,
} from "@/lib/trust/review-trust";

export type HomeTrustContent = {
  tagline: string;
  companyPresence: string;
  trustSignals: TrustSignal[];
  faqItems: HomeFaqItem[];
  reviewStats: GooglePlaceStats;
  heroReviewsLine: string;
};

export async function getHomeTrustContent(): Promise<HomeTrustContent> {
  const stats = await getGooglePlaceStats();
  const blurb = buildTrustBlurb(stats);
  return {
    tagline: blurb.short,
    companyPresence: formatCompanyPresenceLine(stats),
    trustSignals: buildTrustSignals(stats),
    faqItems: buildHomeFaqItems(stats),
    reviewStats: stats,
    heroReviewsLine: formatReviewsTrustLine(stats),
  };
}
