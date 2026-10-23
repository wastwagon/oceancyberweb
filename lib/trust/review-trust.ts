import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { readEnvGbpOverride, staticGbpFallback } from "@/lib/trust/gbp-fallback";

export function fallbackPlaceStats(): GooglePlaceStats {
  const env = readEnvGbpOverride();
  const { rating, reviewCount } = staticGbpFallback();
  return {
    rating,
    reviewCount,
    source: env ? "env-config" : "fallback",
  };
}

export function formatReviewsTrustLine(stats: GooglePlaceStats): string {
  return `Rated ${stats.rating.toFixed(1)} from ${stats.reviewCount} Google review${stats.reviewCount === 1 ? "" : "s"}`;
}

export function formatCompanyPresenceLine(stats: GooglePlaceStats): string {
  return `OceanCyber is at ${googleBusinessProfile.address.street} in Accra, founded in ${googleBusinessProfile.foundedYear}, with ${googleBusinessProfile.teamSize} people and a ${stats.rating.toFixed(1)} rating from ${stats.reviewCount} Google reviews.`;
}

export function buildTrustBlurb(stats: GooglePlaceStats) {
  const reviews = formatReviewsTrustLine(stats);
  return {
    short: `Websites, mobile apps, and cybersecurity from one Accra team. ${googleBusinessProfile.teamSize} people, founded in ${googleBusinessProfile.foundedYear}, ${reviews.toLowerCase()}.`,
    office: `One office at ${googleBusinessProfile.address.street}, Accra.`,
    seo: `OceanCyber is a web design and development company in Accra and Ghana for websites, mobile apps, and cybersecurity. ${googleBusinessProfile.teamSize} people, founded in ${googleBusinessProfile.foundedYear}, ${reviews.toLowerCase()}. One office at ${googleBusinessProfile.address.street}, Accra.`,
    reviewsOnly: reviews,
  };
}

export type TrustSignalIcon = "award" | "star" | "shield";

export type TrustSignal = {
  icon: TrustSignalIcon;
  stat: string;
  title: string;
  body: string;
};

export function buildTrustSignals(stats: GooglePlaceStats): TrustSignal[] {
  return [
    {
      icon: "award",
      stat: "18+",
      title: "Years delivering",
      body: `Accra-based since ${googleBusinessProfile.foundedYear}, with ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}.`,
    },
    {
      icon: "star",
      stat: `${stats.rating.toFixed(1)}★`,
      title: "Google rating",
      body: `${stats.reviewCount} verified Google reviews from web, mobile, and security work — see /reviews.`,
    },
    {
      icon: "shield",
      stat: "GHS",
      title: "Fixed packages",
      body: "Published Startup, Professional, and Enterprise tiers in cedis — scope confirmed before build.",
    },
  ];
}

export type HomeFaqItem = { q: string; a: string };

export function buildHomeFaqItems(stats: GooglePlaceStats): HomeFaqItem[] {
  const { reviewsOnly } = buildTrustBlurb(stats);
  return [
    {
      q: "Where is OceanCyber based?",
      a: `Accra — ${googleBusinessProfile.address.street}. A team of ${googleBusinessProfile.teamSize}, founded in ${googleBusinessProfile.foundedYear}. ${reviewsOnly} See web design in Accra and web design in Ghana for hire pages.`,
    },
    {
      q: "How do we start a project?",
      a: "Share goals, budget range, and timeline on Get started or Contact. We reply with the right package or a scoped next step — the project calculator helps with a rough cedis range.",
    },
    {
      q: "What services do you offer?",
      a: "UI/UX, websites, mobile apps, e-commerce, cybersecurity, and hosting — all from the Accra office. See Services for detail.",
    },
    {
      q: "Do you offer maintenance?",
      a: "Yes — retainers and milestone support after launch, sized to your site or app.",
    },
    {
      q: "How long does a typical build take?",
      a: "Depends on scope. Small marketing sites move faster; product work ships in milestones with regular demos.",
    },
    {
      q: "Do you require a deposit?",
      a: "Most work uses phased billing tied to milestones — spelled out in the proposal before we start.",
    },
    {
      q: "Can we customise a package?",
      a: "Yes. Startup, Professional, and Enterprise are starting points — we scope to your constraints. Compare inclusions on the pricing page.",
    },
    {
      q: "What is included in each pricing package?",
      a: "Startup from GHS 6,000 (up to 5 pages). Professional from GHS 14,500 adds custom UI/UX and analytics. Enterprise from GHS 30,000 covers complex platforms with a dedicated delivery lead.",
    },
    {
      q: "How do you measure success?",
      a: "We agree goals up front — traffic, sales, staff time saved, or security fixes — and review them after launch.",
    },
  ];
}
