import type { GooglePlaceStats } from "@/lib/google-places-stats";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { formatReviewsTrustLine } from "@/lib/trust/review-trust";

export function webDesignGhanaFaqs(stats: GooglePlaceStats) {
  const reviews = formatReviewsTrustLine(stats);
  return [
    {
      question: "What is the starting price for web design in Ghana?",
      answer:
        "Company website packages start at GHS 6,000 (Startup), GHS 14,500 (Professional), and GHS 30,000 (Enterprise). See our pricing page and the website cost in Ghana guide for what each includes.",
    },
    {
      question: "Do you serve all of Ghana?",
      answer:
        "Yes. We design and build from Accra for Kumasi, Tema, Takoradi, Cape Coast, Tamale, and remote teams. Screen-share discovery works when travel is not practical.",
    },
    {
      question: "Are you web designers or website developers?",
      answer:
        "Both — a web design company and website development team in one Accra office. We shape structure and visuals, then build the working site with speed and search setup.",
    },
    {
      question: "Best website design company in Ghana — why OceanCyber?",
      answer: `We publish GHS packages, live client sites, and ${reviews}. One team for design, development, MoMo or Paystack stores, and hosting when you need it.`,
    },
    {
      question: "Do you build online store websites in Ghana?",
      answer:
        "Yes — ecommerce and catalogue sites with Ghana checkout. Same Accra team that ships marketing sites; see our ecommerce service and ThinQ Shopping in the portfolio.",
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
        "Use Get started with your pages, budget, and timeline. We match you to a package and send a written quote before build work begins.",
    },
  ];
}

export function webDesignAccraFaqs(stats: GooglePlaceStats) {
  const reviews = formatReviewsTrustLine(stats);
  return [
    {
      question: "What is the starting price for web design in Accra?",
      answer:
        "Packages start at GHS 6,000 for a five-page company site. Professional and Enterprise add custom UI, payments, and larger scope — see our pricing page.",
    },
    {
      question: "Best web design company in Accra — why choose OceanCyber?",
      answer: `We are website designers and developers at ${googleBusinessProfile.address.street} with published GHS packages and live client sites. ${reviews}.`,
    },
    {
      question: "Website development companies in Accra — do you only design?",
      answer:
        "No — we design and build: company sites, online stores, and web apps with Paystack or MoMo when you need checkout.",
    },
    {
      question: "Where can we meet in Accra?",
      answer: `Our office is at ${googleBusinessProfile.address.street}. Call ${googleBusinessProfile.phoneDisplay} to book a visit. ${reviews}.`,
    },
  ];
}
