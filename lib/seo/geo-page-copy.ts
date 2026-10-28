import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { formatReviewsTrustLine } from "@/lib/trust/review-trust";
type GeoCity = "accra" | "ghana";

type GeoFaqTopic = {
  label: string;
  priceBandNote?: string;
};

export function buildGeoIntro(
  city: GeoCity,
  focus: string,
  priceLabel: string,
  stats: GooglePlaceStats,
): string {
  const reviews = formatReviewsTrustLine(stats);
  const office =
    city === "accra"
      ? `Office at ${googleBusinessProfile.address.street}, Accra.`
      : "Accra office, nationwide delivery.";
  return `${focus} Packages from ${priceLabel}. ${office} ${reviews}.`;
}

export function buildGeoFaqs(
  topic: GeoFaqTopic,
  city: GeoCity,
  priceLabel: string,
  focus: string,
  stats: GooglePlaceStats,
): Array<{ question: string; answer: string }> {
  const reviews = formatReviewsTrustLine(stats);
  const priceAnswer =
    topic.priceBandNote ??
    (city === "accra"
      ? `Packages start from ${priceLabel}. Scope is confirmed in discovery with fixed-price milestones in Ghana cedis.`
      : `The same GHS packages as Accra — from ${priceLabel}. Domain, hosting, and care are separate lines.`);

  if (city === "accra") {
    return [
      {
        question: `What is the starting price for ${topic.label} in Accra?`,
        answer: priceAnswer,
      },
      {
        question: "Can we visit the Accra office before we sign?",
        answer: `Yes. Meet at ${googleBusinessProfile.address.street}, Accra, or start on WhatsApp at ${googleBusinessProfile.phoneDisplay}. Most Accra clients meet once before kickoff.`,
      },
      {
        question: `What does OceanCyber deliver for ${topic.label} projects?`,
        answer: `${focus} ${reviews}. See the capability page and portfolio for examples.`,
      },
      {
        question: "Do you only work with Greater Accra businesses?",
        answer:
          "No. Accra is our only office, but we deliver nationwide. See our best web design company in Ghana page if your team is outside Greater Accra.",
      },
    ];
  }

  return [
    {
      question: `What is the starting price for ${topic.label} in Ghana?`,
      answer: priceAnswer,
    },
    {
      question: "Can a team outside Accra work with OceanCyber?",
      answer: `Yes. Discovery can be remote or at ${googleBusinessProfile.address.street}, Accra. Delivery and support use the same Accra engineering channel.`,
    },
    {
      question: `What does OceanCyber deliver for ${topic.label} projects?`,
      answer: `${focus} ${reviews}.`,
    },
    {
      question: "Where is the office?",
      answer: `Our only office is at ${googleBusinessProfile.address.street}, Accra, Ghana. Call ${googleBusinessProfile.phoneDisplay}.`,
    },
  ];
}
