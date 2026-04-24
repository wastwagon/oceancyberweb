"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";

const content: IndustryPageContent = {
  heroEyebrow: "Retail",
  heroPrefix: "",
  heroHighlight: "Retail",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Omnichannel commerce, POS, and analytics, unifying stores, warehouses, and digital channels for measurable growth.",
  pills: ["E-commerce", "Customer experience", "Retail innovation"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "Commerce & operations",
  solutionsSubtitle:
    "From storefront to fulfillment: performance, payments, and insight in one coherent stack.",
  services: [
    {
      title: "E-commerce solutions",
      description:
        "Catalog, checkout, and merchandising tuned for conversion and speed.",
    },
    {
      title: "Retail technology",
      description:
        "In-store systems that reduce friction for staff and shoppers.",
    },
    {
      title: "Customer engagement",
      description:
        "Loyalty, campaigns, and lifecycle messaging with clear attribution.",
    },
    {
      title: "Inventory management",
      description:
        "Real-time stock, transfers, and alerts across locations.",
    },
    {
      title: "Payment processing",
      description:
        "Secure, multi-rail checkout with reconciliation built in.",
    },
    {
      title: "Analytics & insights",
      description:
        "Retail KPIs your teams can act on weekly, not quarterly.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Capabilities we bring",
  capabilitiesSubtitle:
    "Patterns for peak traffic, fraud, and omnichannel returns.",
  technologies: [
    { title: "Omnichannel platforms", description: "Unified catalog and orders" },
    { title: "Mobile commerce", description: "Fast mobile paths to purchase" },
    { title: "AI recommendations", description: "Personalization with guardrails" },
    { title: "Inventory systems", description: "Accuracy across channels" },
    { title: "Customer analytics", description: "Segments and cohort behaviors" },
    { title: "Payment gateways", description: "Local and international methods" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle:
    "Directional results: category and footprint change the curve.",
  caseStudies: [
    {
      title: "E-commerce store launch",
      client: "Fashion retailer",
      result: "Strong online revenue lift within the first two quarters.",
    },
    {
      title: "Retail POS system",
      client: "Store chain",
      result: "Faster checkout and fewer reconciliation issues.",
    },
    {
      title: "Customer loyalty program",
      client: "Supermarket",
      result: "Higher repeat visits through targeted rewards.",
    },
  ],
  ctaTitle: "Grow retail revenue?",
  ctaDescription:
    "Share channels, catalog size, and peak traffic, and we'll align platform, payments, and analytics.",
};

export default function RetailPage() {
  return <IndustryPremiumPage content={content} />;
}
