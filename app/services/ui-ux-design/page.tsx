"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Design",
  heroPrefix: "",
  heroHighlight: "UI/UX & brand",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Interfaces and brand systems for Ghana teams — researched with real users, prototyped in Figma, and handed to engineering without guesswork. From GHS 3,500.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/ui-ux-design-in-accra",
  hireGeoLabel: "UI/UX design in Accra →",
  heroImage: serviceImages.uiUxBrand,
  pills: ["Figma", "Brand", "Prototypes"],
  focusEyebrow: "What we design",
  focusTitle: "Screens your customers can finish on a phone",
  focusSubtitle:
    "Clear hierarchy, readable type, and flows that match how Accra and Ghana users actually behave.",
  focusAreas: [
    {
      title: "Brand and visual language",
      description:
        "Logo, colour, and type that look professional next to peers in your industry.",
    },
    {
      title: "UX research and flows",
      description:
        "Short interviews and task tests so we fix confusion before build spend.",
    },
    {
      title: "Figma prototypes",
      description:
        "Clickable journeys your team can review on a phone before coding starts.",
    },
    {
      title: "Design systems",
      description:
        "Components and spacing rules so the tenth page matches the first.",
    },
  ],
  stackEyebrow: "Tools we use",
  stackTitle: "Handoff engineers can ship from",
  stackSubtitle:
    "Figma files with specs — not mood boards that die in a PDF.",
  stack: [
    { title: "Figma", description: "Source of truth for screens and components." },
    { title: "Prototypes", description: "Click-through flows for review meetings." },
    { title: "Design tokens", description: "Colour, type, and spacing that map to code." },
    { title: "Content notes", description: "Real Ghana English microcopy, not lorem." },
    { title: "Accessibility checks", description: "Contrast and focus paths before handoff." },
    { title: "Dev walkthrough", description: "We sit with engineers on the first build." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you leave with",
  deliverSubtitle: "Assets marketing and engineering can both own.",
  deliverables: [
    {
      title: "Figma source",
      description: "Organised pages, components, and prototype links.",
    },
    {
      title: "Brand basics",
      description: "Logo usage, colour, and type when brand is in scope.",
    },
    {
      title: "Handoff notes",
      description: "Spacing, states, and edge cases called out for build.",
    },
    {
      title: "Optional build bundle",
      description: "Same Accra team can implement the designs in Next.js.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Design that ships",
  outcomesSubtitle: "Illustrative — every product starts with different constraints.",
  outcomes: [
    {
      title: "Product UI systems",
      client: "SaaS and portals",
      result: "Consistent screens before engineering scales the backlog.",
    },
    {
      title: "Brand refresh",
      client: "Professional firms",
      result: "Clearer trust signals for Accra clients.",
    },
    {
      title: "Store UX",
      client: "Retailers",
      result: "Fewer abandoned carts from confusing mobile checkout.",
    },
  ],
  ctaTitle: "Need design before you build?",
  ctaDescription:
    "Tell us whether you need brand, product UI, or both — we will recommend a package from GHS 3,500.",
  pricing: servicePricingHints.uiUx,
};

export default function UiUxDesignPage() {
  return <ServicePremiumPage content={content} />;
}
