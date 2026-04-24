"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";

const content: ServicePageContent = {
  heroEyebrow: "Commerce",
  heroPrefix: "",
  heroHighlight: "E-commerce",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Stores that convert: catalog modeling, checkout trust, payments, and operations tooling sized from launch to scale.",
  heroCtaLabel: "Launch your store",
  heroCtaHref: "/contact",
  pills: ["Checkout", "Payments", "Operations"],
  focusEyebrow: "Capabilities",
  focusTitle: "Commerce that holds up on launch day and year two",
  focusSubtitle:
    "We connect storefront experience with inventory, finance, and fulfillment reality.",
  focusAreas: [
    {
      title: "Storefront experience",
      description:
        "Merchandising, search, and PDP storytelling tuned to mobile-first buyers.",
    },
    {
      title: "Checkout and payments",
      description:
        "Fraud signals, retries, tax, and localization handled without brittle hacks.",
    },
    {
      title: "Catalog and PIM alignment",
      description:
        "Variants, bundles, and content workflows that stay accurate as SKUs grow.",
    },
    {
      title: "Subscriptions and loyalty",
      description:
        "Plans, proration, and retention hooks where your unit economics need them.",
    },
    {
      title: "B2B and wholesale flows",
      description:
        "Approvals, net terms, and account hierarchies without sacrificing self-serve speed.",
    },
    {
      title: "Analytics and experimentation",
      description:
        "Funnels, cohort views, and test infrastructure that marketing can actually use.",
    },
  ],
  stackEyebrow: "Platforms",
  stackTitle: "Tools we implement and extend",
  stackSubtitle:
    "Shopify, WooCommerce, or custom, chosen for total cost of ownership, not trends.",
  stack: [
    { title: "Shopify", description: "Hydrogen, custom themes, and app discipline." },
    { title: "WooCommerce", description: "WordPress stacks with performance guardrails." },
    { title: "Custom commerce", description: "When off-the-shelf limits your model." },
    { title: "Payment gateways", description: "PSPs, wallets, and reconciliation patterns." },
    { title: "Inventory and OMS", description: "Stock truth across channels and warehouses." },
    { title: "Analytics", description: "Attribution, margin, and cohort views operators need." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What operators receive",
  deliverSubtitle:
    "Launch-ready configuration plus the documentation teams rely on when traffic spikes.",
  deliverables: [
    {
      title: "Secure payments posture",
      description: "PCI-aware flows, webhook reliability, and dispute-ready logging.",
    },
    {
      title: "Inventory accuracy",
      description: "Alerts, buffers, and reconciliation to prevent oversell moments.",
    },
    {
      title: "Customer analytics layer",
      description: "Events, dashboards, and exports aligned to merchandising decisions.",
    },
    {
      title: "Mobile-optimized buying",
      description: "Touch targets, speed, and payment UX tuned for small screens.",
    },
    {
      title: "SEO-ready catalog",
      description: "Clean URLs, structured data, and crawl budget friendly templates.",
    },
    {
      title: "Scalable architecture",
      description: "Queues, caching, and rate limits sized to campaign traffic.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Representative engagements",
  outcomesSubtitle:
    "Illustrative results: category, traffic, and ops maturity vary widely.",
  outcomes: [
    {
      title: "Fashion direct-to-consumer",
      client: "Retail brand",
      result: "Faster mobile checkout and clearer PDP hierarchy for seasonal drops.",
    },
    {
      title: "B2B marketplace",
      client: "Wholesale supplier",
      result: "Order flows and approvals that reduced manual coordination overhead.",
    },
    {
      title: "Subscription commerce",
      client: "Subscription company",
      result: "Billing edge cases handled; retention reporting surfaced to growth teams.",
    },
  ],
  ctaTitle: "Ready to grow revenue online?",
  ctaDescription:
    "Share catalog complexity, markets, and stack preferences, and we will recommend a pragmatic path to launch.",
};

export default function EcommercePage() {
  return <ServicePremiumPage content={content} />;
}
