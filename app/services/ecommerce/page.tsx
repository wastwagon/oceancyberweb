"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Commerce",
  heroPrefix: "",
  heroHighlight: "E-commerce",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Online stores for Accra retailers and Ghana-wide sellers — catalog, checkout, Paystack and Mobile Money, from GHS 6,000.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/ecommerce-development-in-accra",
  hireGeoLabel: "Ecommerce in Accra →",
  heroImage: serviceImages.ecommerce,
  pills: ["Paystack", "Mobile Money", "Catalog"],
  focusEyebrow: "What we build",
  focusTitle: "Shops that take money without drama",
  focusSubtitle:
    "Storefront, payments, and the day-to-day ops your staff run after launch.",
  focusAreas: [
    {
      title: "Storefront and product pages",
      description:
        "Clear photos, prices in GHS, and mobile layouts shoppers can finish on a phone.",
    },
    {
      title: "Checkout with MoMo and cards",
      description:
        "Paystack and Mobile Money with honest error messages when a payment fails.",
    },
    {
      title: "Orders and inventory",
      description:
        "Stock and order views your team can use without calling a developer every morning.",
    },
    {
      title: "Delivery and pickup",
      description:
        "Greater Accra delivery notes, pickup locations, and customer SMS or email updates.",
    },
  ],
  stackEyebrow: "Tools we use",
  stackTitle: "Platforms that match how you sell",
  stackSubtitle:
    "Custom, Shopify, or WooCommerce — chosen for your catalog size and ops.",
  stack: [
    { title: "Custom storefronts", description: "When you need full control and Accra hosting." },
    { title: "Shopify / Woo", description: "When speed-to-launch beats bespoke everything." },
    { title: "Paystack", description: "Cards and MoMo in Ghana cedis." },
    { title: "Catalog tools", description: "Variants, stock, and pricing your team can edit." },
    { title: "Analytics", description: "What sells, where shoppers drop off." },
    { title: "Hosting & SSL", description: "Keep the store online and trusted." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you leave with",
  deliverSubtitle: "A live store plus the training to run it.",
  deliverables: [
    {
      title: "Live checkout",
      description: "Tested Paystack / MoMo flows before you announce launch.",
    },
    {
      title: "Admin training",
      description: "How to add products, fulfil orders, and refund.",
    },
    {
      title: "SEO basics",
      description: "Product titles and structure that can rank in Ghana search.",
    },
    {
      title: "Support window",
      description: "Post-launch help while your first orders settle in.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Commerce in Accra context",
  outcomesSubtitle: "Illustrative — every catalog and ops model differs.",
  outcomes: [
    {
      title: "ThinQ Shopping",
      client: "Retail",
      result: "Catalog and checkout shaped for Ghana buyers.",
    },
    {
      title: "Launch campaigns",
      client: "SME retailers",
      result: "MoMo-ready stores without waiting on foreign gateways.",
    },
    {
      title: "Ops calm-down",
      client: "Growing shops",
      result: "Fewer WhatsApp-only orders and clearer stock truth.",
    },
  ],
  ctaTitle: "Ready to sell online?",
  ctaDescription:
    "Share what you sell, how you deliver, and your budget — we will recommend Startup or Professional with a clear milestone plan.",
  pricing: servicePricingHints.ecommerce,
};

export default function EcommercePage() {
  return <ServicePremiumPage content={content} />;
}
