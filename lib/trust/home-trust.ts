import { getGooglePlaceStats } from "@/lib/google-places-stats";
import {
  buildHomeFaqItems,
  buildTrustBlurb,
  buildTrustSignals,
  type HomeFaqItem,
  type TrustSignal,
} from "@/lib/trust/review-trust";

export type HomeTrustContent = {
  tagline: string;
  companyPresence: string;
  trustSignals: TrustSignal[];
  faqItems: HomeFaqItem[];
};

export async function getHomeTrustContent(): Promise<HomeTrustContent> {
  const stats = await getGooglePlaceStats();
  const blurb = buildTrustBlurb(stats);
  return {
    tagline: blurb.short,
    companyPresence: blurb.seo,
    trustSignals: buildTrustSignals(stats),
    faqItems: buildHomeFaqItems(stats),
  };
}
