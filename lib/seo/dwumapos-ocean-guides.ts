import type { IntentPage } from "@/lib/seo/intent-pages";
import {
  DWUMAPOS_AI_URL,
  DWUMAPOS_PRICING_URL,
  DWUMAPOS_RELATIONSHIP_LINE,
  DWUMAPOS_SIGNUP_URL,
  DWUMAPOS_SITE_URL,
  OCEANCYBER_CUSTOM_SITE_PITCH,
} from "@/lib/marketing/company-identity";

const canonicalShop = DWUMAPOS_SITE_URL;
const canonicalRestaurant = `${DWUMAPOS_SITE_URL}/solutions/restaurant-pos-ghana`;
const canonicalPharmacy = `${DWUMAPOS_SITE_URL}/solutions/pharmacy-pos-ghana`;

/** Short summaries on OceanCyber — canonical URLs point to DwumaPOS. */
export const dwumaPosOceanGuideSlugs = [
  "dwumapos-for-ghana-shops",
  "dwumapos-restaurant-pos-ghana",
  "dwumapos-pharmacy-pos-ghana",
] as const;

export const dwumaPosOceanIntentGuides: readonly IntentPage[] = [
  {
    kind: "guide",
    slug: "dwumapos-for-ghana-shops",
    title: "DwumaPOS for Ghana shops",
    metaTitle: "DwumaPOS for Ghana shops — summary | OceanCyber",
    description:
      "OceanCyber’s flagship POS for Ghana shops: one stock list for in your shop, online shop, and delivery. Plans from GHS 149/month with a 30-day trial.",
    openGraphLocale: "en_GH",
    dateModified: "2026-11-01",
    canonicalExternal: canonicalShop,
    eyebrow: "Flagship product",
    image: "/images/articles/dwumapos-shop-ghana.png",
    imageAlt: "POS and phone in a Ghana shop",
    intro:
      "DwumaPOS is POS software made by OceanCyber for Ghana shops that sell from live stock — not brochure-only websites. When WhatsApp and the POS disagree on stock, you oversell. DwumaPOS keeps the same products in your shop and on your online shop.",
    introParagraphs: [
      `${DWUMAPOS_RELATIONSHIP_LINE} ${OCEANCYBER_CUSTOM_SITE_PITCH}`,
      `Starter is GHS 149/month (1 branch, 3 staff logins). Business is GHS 249/month (up to 3 branches, 10 logins). Scale is GHS 399/month (up to 10 branches, 25 logins). Every plan includes a 30-day free trial and an online shop. Connect your own Paystack or Hubtel account — customer MoMo and card payments go to you; DwumaPOS never holds buyer money.`,
    ],
    sections: [
      {
        heading: "Read the full guide on DwumaPOS",
        paragraphs: [
          "This page is a short summary. Pricing tables, payments, delivery, POS Desktop offline windows, and shop-type setups are maintained on dwumapos.com.",
        ],
        links: [
          { href: `${DWUMAPOS_SITE_URL}/platform`, label: "What DwumaPOS includes" },
          { href: DWUMAPOS_PRICING_URL, label: "Pricing in GHS" },
          { href: DWUMAPOS_AI_URL, label: "Product facts for buyers and agents" },
          { href: `${DWUMAPOS_SITE_URL}/payments`, label: "Payments and direct bank integration" },
          { href: `${DWUMAPOS_SITE_URL}/compare/best-pos-software-ghana`, label: "Compare POS options in Ghana" },
        ],
        linksInline: true,
      },
    ],
    faqs: [
      {
        question: "Is DwumaPOS the same as a custom website from OceanCyber?",
        answer:
          "No. DwumaPOS is subscription POS software with an online shop on one stock list. OceanCyber builds custom portfolios, corporate sites, and apps as separate projects.",
      },
      {
        question: "How much does DwumaPOS cost?",
        answer:
          "After a 30-day free trial, Starter is GHS 149/month, Business GHS 249/month, and Scale GHS 399/month. See the live grid at dwumapos.com/pricing.",
      },
      {
        question: "Where do customer MoMo payments go?",
        answer:
          "To the Paystack or Hubtel account you connect. DwumaPOS bills the software plan only. Paystack and Hubtel charge their own transaction fees.",
      },
      {
        question: "What if I need more than 10 branches?",
        answer:
          "Scale covers up to 10 branches. For more, request an Enterprise quote at dwumapos.com/contact?intent=enterprise.",
      },
    ],
    related: [
      { href: "/services/ecommerce", label: "Custom ecommerce builds (OceanCyber)" },
      { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant summary" },
      { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy summary" },
    ],
    cta: {
      title: "Start free on DwumaPOS",
      body: "30-day trial on Starter, Business, or Scale — subscribe in Billing before it ends.",
      href: DWUMAPOS_SIGNUP_URL,
      label: "Start free trial",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-restaurant-pos-ghana",
    title: "Restaurant POS on DwumaPOS",
    metaTitle: "Restaurant POS on DwumaPOS — summary | OceanCyber",
    description:
      "DwumaPOS for chop bars, cafés, and takeaway in Ghana: kitchen orders, one stock list, online pickup and delivery. Summary with link to dwumapos.com.",
    openGraphLocale: "en_GH",
    dateModified: "2026-11-01",
    canonicalExternal: canonicalRestaurant,
    eyebrow: "Flagship product",
    image: "/images/articles/dwumapos-restaurant-ghana.png",
    imageAlt: "Restaurant POS and kitchen service in Ghana",
    intro:
      "Restaurants on DwumaPOS run floor service, kitchen order slips, and takeaway from one product list — the same dishes on the POS and the online shop, so a sold-out item does not stay for sale on WhatsApp.",
    introParagraphs: [
      DWUMAPOS_RELATIONSHIP_LINE,
      OCEANCYBER_CUSTOM_SITE_PITCH,
    ],
    sections: [
      {
        heading: "Full restaurant setup on DwumaPOS",
        paragraphs: [
          "Table naming, kitchen tickets, split bills, and rider delivery are documented on the DwumaPOS restaurant solution page — not duplicated here.",
        ],
        links: [
          { href: canonicalRestaurant, label: "Restaurant POS Ghana" },
          { href: DWUMAPOS_PRICING_URL, label: "Plans and trial" },
          { href: DWUMAPOS_SIGNUP_URL, label: "Start free" },
        ],
        linksInline: true,
      },
    ],
    faqs: [
      {
        question: "Are restaurant plans different from retail?",
        answer:
          "Pricing is the same Starter, Business, and Scale grid. The shop type changes tools on the POS and the online shop theme.",
      },
      {
        question: "Can customers order pickup or delivery?",
        answer:
          "Yes. Pickup and delivery tools are on every plan. Delivery fees follow your rules and are paid with the order.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-for-ghana-shops", label: "Shop POS summary" },
      { href: "/services/web-development", label: "Custom restaurant websites" },
    ],
    cta: {
      title: "Try DwumaPOS for your kitchen",
      body: "Same 30-day trial and GHS plans as other shop types.",
      href: DWUMAPOS_SIGNUP_URL,
      label: "Start free trial",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-pharmacy-pos-ghana",
    title: "Pharmacy POS on DwumaPOS",
    metaTitle: "Pharmacy POS on DwumaPOS — summary | OceanCyber",
    description:
      "DwumaPOS for pharmacies and chemical shops in Ghana: batch and expiry on one stock list. Summary with link to dwumapos.com and online medicine compliance note.",
    openGraphLocale: "en_GH",
    dateModified: "2026-11-01",
    canonicalExternal: canonicalPharmacy,
    eyebrow: "Flagship product",
    image: "/images/articles/dwumapos-pharmacy-pos-ghana.png",
    imageAlt: "Pharmacy POS in Ghana",
    intro:
      "Pharmacies use DwumaPOS for batch and expiry tracking on the same stock list as the online shop. Prescription and OTC rules stay on the DwumaPOS pharmacy solution page.",
    introParagraphs: [
      DWUMAPOS_RELATIONSHIP_LINE,
      "Selling medicines online in Ghana may require Pharmacy Council approval under ePharmacy — see https://www.pharmacycouncilgh.org/ before you list medicines on an online shop.",
    ],
    sections: [
      {
        heading: "Full pharmacy guide on DwumaPOS",
        paragraphs: [
          "Batch lists, GRA e-VAT context, and pharmacy workflows are maintained on dwumapos.com. OceanCyber builds separate healthcare software on request.",
        ],
        links: [
          { href: canonicalPharmacy, label: "Pharmacy POS Ghana" },
          { href: DWUMAPOS_PRICING_URL, label: "Pricing" },
          { href: `${DWUMAPOS_SITE_URL}/resources/pharmacy-batch-expiry-basics`, label: "Batch and expiry basics" },
        ],
        linksInline: true,
      },
    ],
    faqs: [
      {
        question: "Does DwumaPOS register my pharmacy with regulators?",
        answer:
          "No. Confirm ePharmacy and other rules with the Pharmacy Council and your pharmacist before selling online.",
      },
      {
        question: "Where is the full compliance wording?",
        answer:
          "On dwumapos.com pharmacy pages and marketplace policies — not on this summary.",
      },
    ],
    related: [
      { href: "/industries/healthcare", label: "Custom healthcare software" },
      { href: "/guides/dwumapos-for-ghana-shops", label: "Shop POS summary" },
    ],
    cta: {
      title: "Start on DwumaPOS",
      body: "30-day trial; same GHS plans as other shop types.",
      href: DWUMAPOS_SIGNUP_URL,
      label: "Start free trial",
    },
  },
];

export function replaceDwumaPosOceanGuides(pages: readonly IntentPage[]): IntentPage[] {
  const shortBySlug = new Map(dwumaPosOceanIntentGuides.map((p) => [p.slug, p]));
  return pages.map((page) => {
    if (page.kind !== "guide") return page;
    const replacement = shortBySlug.get(page.slug);
    return replacement ?? page;
  });
}
