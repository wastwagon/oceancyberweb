"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";

const content: ServicePageContent = {
  heroEyebrow: "Design",
  heroPrefix: "",
  heroHighlight: "UI/UX & brand",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Interfaces and brand systems that convert — researched with real users, prototyped in Figma, and handed off ready for engineering.",
  heroCtaLabel: "Book a design discovery call",
  heroCtaHref: "/contact?topic=UI%2FUX%20design",
  heroImage: serviceImages.uiUxBrand,
  pills: ["Figma", "Design systems", "User research"],
  focusEyebrow: "Experience design",
  focusTitle: "Design that earns trust before the first click",
  focusSubtitle:
    "We pair visual craft with product thinking so every screen supports a business outcome.",
  focusAreas: [
    {
      title: "Brand identity & visual language",
      description:
        "Logo systems, typography, color, and voice that feel unmistakably yours across web and product.",
    },
    {
      title: "UX research & journey mapping",
      description:
        "Interviews, flows, and wireframes that validate assumptions before expensive build cycles.",
    },
    {
      title: "UI design & design systems",
      description:
        "Component libraries, tokens, and patterns your team can extend without visual drift.",
    },
    {
      title: "Interactive prototypes",
      description:
        "Clickable Figma prototypes for stakeholder buy-in, usability tests, and dev handoff.",
    },
    {
      title: "Marketing & product surfaces",
      description:
        "Landing pages, dashboards, and mobile flows designed for clarity, accessibility, and conversion.",
    },
    {
      title: "Design-to-dev collaboration",
      description:
        "Specs, redlines, and review rituals so engineering ships what design intended.",
    },
  ],
  stackEyebrow: "Toolkit",
  stackTitle: "How we design",
  stackSubtitle:
    "Modern workflows that keep stakeholders aligned from discovery through launch.",
  stack: [
    { title: "Figma", description: "Shared libraries, variants, and dev-ready exports." },
    { title: "User research", description: "Lightweight interviews and task-based usability checks." },
    { title: "Wireframing", description: "Low-fidelity flows to agree structure before polish." },
    { title: "Prototyping", description: "Interactive demos for mobile and web experiences." },
    { title: "Accessibility", description: "Contrast, focus order, and WCAG-minded patterns." },
    { title: "Design QA", description: "Pre-launch reviews against approved specs." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you receive",
  deliverSubtitle:
    "Artifacts marketing, product, and engineering can all work from after handoff.",
  deliverables: [
    {
      title: "Brand guidelines",
      description: "Logo usage, typography, color, and tone for consistent rollout.",
    },
    {
      title: "UX flows & wireframes",
      description: "Mapped journeys with annotated decisions and edge cases.",
    },
    {
      title: "High-fidelity UI screens",
      description: "Responsive layouts for key breakpoints and states.",
    },
    {
      title: "Figma component library",
      description: "Reusable components with tokens for scale.",
    },
    {
      title: "Clickable prototype",
      description: "Shareable demo for investors, users, or internal review.",
    },
    {
      title: "Engineering handoff pack",
      description: "Specs, assets, and review support through build.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Design-led launches",
  outcomesSubtitle:
    "Representative engagements where design drove measurable business impact.",
  outcomes: [
    {
      title: "Creative hub dashboard",
      client: "OceanCyber",
      result: "Premium UI system with glassmorphism and analytics — showcase of our craft.",
    },
    {
      title: "E-commerce refresh",
      client: "Juelle Hair",
      result: "Conversion-focused storefront UX with clearer merchandising and checkout.",
    },
    {
      title: "Professional services portal",
      client: "Fitch Advisory",
      result: "Trust-led information architecture and client portal experience.",
    },
  ],
  ctaTitle: "Ready to shape your product experience?",
  ctaDescription:
    "Share your audience, goals, and timeline — we'll propose a discovery sprint and design roadmap.",
};

export default function UiUxDesignPage() {
  return <ServicePremiumPage content={content} />;
}
