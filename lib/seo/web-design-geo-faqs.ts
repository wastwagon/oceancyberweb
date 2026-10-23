import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { formatReviewsTrustLine } from "@/lib/trust/review-trust";

export function webDesignGhanaFaqs(stats: GooglePlaceStats) {
  const reviews = formatReviewsTrustLine(stats);
  return [
    {
      question: "What is the starting price for web design in Ghana?",
      answer:
        "Company website packages start at GHS 6,000 (Startup), GHS 14,500 (Professional), and GHS 30,000 (Enterprise). See /pricing and /guides/website-cost-in-ghana for what each includes.",
    },
    {
      question: "Do you serve all of Ghana?",
      answer:
        "Yes. We design and build from Accra for Kumasi, Tema, Takoradi, Cape Coast, Tamale, and remote teams. Screen-share discovery works when travel is not practical.",
    },
    {
      question: "Are you web designers or web developers?",
      answer:
        "Both. We shape structure and visuals, then build the working site — pages, forms, speed, and search setup. Most Ghana businesses hire one team for both.",
    },
    {
      question: "Where is your office?",
      answer: `Our only office is at ${googleBusinessProfile.address.street}, Accra. ${reviews}.`,
    },
    {
      question: "What kinds of websites do you design and build?",
      answer:
        "Company and marketing sites, online stores, and web applications. Mobile apps, hosting, and domains are available when the project needs them.",
    },
    {
      question: "How do we start?",
      answer:
        "Use /get-started with your pages, budget, and timeline. We match you to a package and send a written quote before build work begins.",
    },
  ];
}

export function webDesignAccraFaqs(stats: GooglePlaceStats) {
  const reviews = formatReviewsTrustLine(stats);
  return [
    {
      question: "What is the starting price for web design in Accra?",
      answer:
        "Packages start at GHS 6,000 for a five-page company site. Professional and Enterprise add custom UI, payments, and larger scope — see /pricing.",
    },
    {
      question: "Where can we meet in Accra?",
      answer: `Our office is at ${googleBusinessProfile.address.street}. Call ${googleBusinessProfile.phoneDisplay} to book a visit. ${reviews}.`,
    },
  ];
}
