import { AGENCY_IDENTITY_GHANA } from "@/lib/marketing/agency-positioning";
import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { formatReviewsTrustLine } from "@/lib/trust/review-trust";
import type { GeoCity } from "@/lib/seo/geo-service-pages";

/**
 * Accra/Ghana Maps peers (Oct 2026) — what they optimise for, not who to copy blindly.
 * Use to align site + GBP wording with real search language in Ghana.
 */
export const accraWebMarketPeers = [
  {
    name: "Doctor Barns Tech",
    mapsAngle: "Best Web · Web Design Company · web & software development reviews",
    take: "“Best” + company category + review snippets naming development",
  },
  {
    name: "BuiltFound SEO Website Developers",
    mapsAngle: "SEO + website developers + online store designs Ghana",
    take: "Developer + SEO + ecommerce language in name and reviews",
  },
  {
    name: "PhillTech Creationz",
    mapsAngle: "Best Web · 15+ years · Web Design Company",
    take: "Longevity + Best + design company label",
  },
  {
    name: "Diago Gfx",
    mapsAngle: "website designs · Design Website Development",
    take: "Design-first wording; strong “website designs” reviews",
  },
  {
    name: "KayTech Africa",
    mapsAngle: "Best Web Designer",
    take: "Designer title for design-intent queries",
  },
  {
    name: "ACTIVE DIGITAL BRAND",
    mapsAngle: "Web design · Lapaz · 15+ years",
    take: "Neighbourhood + longevity trust",
  },
] as const;

/** Phrases Ghanaians search — merged from peers + OceanCyber owner map (no “hire”). */
export const ghanaLocalSearchPhrases = [
  "best web design company in Ghana",
  "best web design company in Accra",
  "best website developers in Ghana",
  "best web developers in Ghana",
  "website development company in Ghana",
  "website development companies in Accra",
  "web development company in Ghana",
  "website design company in Ghana",
  "web design company in Ghana",
  "SEO website development Ghana",
  "online store website Ghana",
] as const;

/** Paste into Google Business Profile → Services (keep names accurate). */
export const gbpSuggestedServiceNames = [
  "Web design company",
  "Web development company",
  "Website development",
  "Website developers",
  "Website designer",
  "Mobile app development",
  "E-commerce website development",
  "Online store design",
  "SEO and website optimisation",
] as const;

/** Visible homepage H1 — matches title/Maps intent without renaming the legal business. */
export const homeHeroH1 =
  "Best web design & website development company in Accra, Ghana";

export const homeHeroSupportLine =
  "Professional website developers, online stores, and mobile apps — packages from GHS 6,000.";

/** One description for JSON-LD, GBP alignment, and facts — peers use this density. */
export function buildMapsAlignedBusinessDescription(stats: GooglePlaceStats): string {
  const reviews = formatReviewsTrustLine(stats);
  return (
    `${AGENCY_IDENTITY_GHANA} — also listed for local search as a web design company. ` +
    `Company sites, online stores, and mobile apps from ${googleBusinessProfile.address.street}. ` +
    `Team of ${googleBusinessProfile.teamSize}, since ${googleBusinessProfile.foundedYear}. ${reviews}.`
  );
}

type Faq = { question: string; answer: string };

/** Extra FAQs per geo topic — answers peer queries on the correct owner URL only. */
export function geoMarketFaqs(
  topicKey: string,
  city: GeoCity,
  stats: GooglePlaceStats,
): Faq[] {
  const reviews = formatReviewsTrustLine(stats);
  const place = city === "accra" ? "Accra" : "Ghana";

  if (topicKey === "web-development") {
    if (city === "ghana") {
      return [
        {
          question: "Who are the best website developers in Ghana?",
          answer: `OceanCyber is a website development company in Accra serving all of Ghana — company sites, portals, and online stores from GHS 6,000. ${reviews}. See live work on our portfolio.`,
        },
        {
          question: "Best web developers in Ghana — agency or freelancer?",
          answer:
            "For a full company website or store with MoMo or Paystack, a fixed-price Accra team usually beats a lone freelancer on timeline and launch support. We publish cedis packages before build starts.",
        },
        {
          question: "Do you build SEO-friendly websites like Accra SEO agencies?",
          answer:
            "Yes. Speed, mobile layout, and on-page search setup are included in web packages — the same outcomes clients mention when they search for SEO website developers in Ghana.",
        },
      ];
    }
    return [
      {
        question: "Best website developers in Accra?",
        answer: `We are a web development company at ${googleBusinessProfile.address.street} — website developers for Accra businesses from GHS 6,000. ${reviews}.`,
      },
      {
        question: "Website development companies in Accra — what do you deliver?",
        answer:
          "Marketing sites, company portals, and ecommerce with Paystack or Mobile Money when needed — design and build from one Accra office.",
      },
    ];
  }

  if (topicKey === "ecommerce-development") {
    return [
      {
        question: `Best online store website developers in ${place}?`,
        answer:
          "Ecommerce builds with catalogue, checkout, and Ghana payments — scoped from discovery with GHS milestones. ThinQ Shopping is a published reference.",
      },
    ];
  }

  if (topicKey === "ui-ux-design") {
    return [
      {
        question: `Best web designers in ${place}?`,
        answer: `UI/UX and web design for Ghana brands — wireframes, visual design, and handoff to our developers. ${reviews}.`,
      },
    ];
  }

  return [];
}

/** Google Business Profile “Business description” (keep under ~750 characters). */
export function buildGbpProfileDescription(stats: GooglePlaceStats): string {
  const text = buildMapsAlignedBusinessDescription(stats);
  return text.length <= 750 ? text : `${text.slice(0, 747)}…`;
}

/** Suggested GBP Q&A — paste into Google Business Profile. */
export const gbpSuggestedQna = [
  {
    question: "Are you the best web design company in Accra?",
    answer:
      "OceanCyber is a web design and website development company at 47 Nii Kwashiefio Avenue, Accra. We publish GHS packages from GHS 6,000 and live client sites on our portfolio.",
  },
  {
    question: "Do you build websites for businesses across Ghana?",
    answer:
      "Yes. Our Accra office designs and builds for teams in Kumasi, Tema, Takoradi, and nationwide — same cedis packages with remote discovery when you cannot visit.",
  },
  {
    question: "Are you website developers or designers only?",
    answer:
      "Both. One team handles UI/UX, development, Paystack or Mobile Money checkout, hosting, and launch support.",
  },
  {
    question: "How much does a website cost in Ghana?",
    answer:
      "Company website packages start at GHS 6,000. See oceancyber.net/pricing and the website cost in Ghana guide for tiers.",
  },
] as const;

/** After project delivery — ask clients to mention deliverables (Maps snippet language). */
export const gbpReviewPromptIdeas = [
  "Mention what we built (company website, online store, mobile app).",
  "Name Ghana payments if we set up Paystack or Mobile Money.",
  "Say whether we helped with design, development, or both.",
  "Do not copy the same sentence as other reviews — use your own words.",
] as const;
