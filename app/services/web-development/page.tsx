"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";

const content: ServicePageContent = {
  heroEyebrow: "Engineering",
  heroPrefix: "",
  heroHighlight: "Web development",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Fast, accessible marketing sites and serious product web: performance budgets, SEO foundations, and maintainable systems your team can extend.",
  heroCtaLabel: "Start a project",
  heroCtaHref: "/contact",
  pills: ["Next.js", "Performance", "Design systems"],
  focusEyebrow: "Product surfaces",
  focusTitle: "Sites and apps that feel as good as they measure",
  focusSubtitle:
    "From first paint to long-term velocity, we pair UX craft with engineering discipline.",
  focusAreas: [
    {
      title: "Marketing and brand sites",
      description:
        "Narrative-led pages with motion, typography, and content modeling that scales.",
    },
    {
      title: "Product web applications",
      description:
        "Dashboards, workflows, and multi-role experiences with clear state and permissions.",
    },
    {
      title: "Headless and composable stacks",
      description:
        "CMS, commerce, and service boundaries chosen for your editorial and ops reality.",
    },
    {
      title: "Search and discovery",
      description:
        "Structured data, faceted experiences, and performance-aware indexing patterns.",
    },
    {
      title: "Integrations",
      description:
        "Payments, CRM, analytics, and identity, wired with retries, observability, and fallbacks.",
    },
    {
      title: "Platform hardening",
      description:
        "Caching, edge configuration, and release safety nets for predictable launches.",
    },
  ],
  stackEyebrow: "Stack",
  stackTitle: "Technologies we ship with",
  stackSubtitle:
    "Modern defaults: type safety, component systems, and deployment pipelines you can trust.",
  stack: [
    { title: "Next.js", description: "App Router, streaming, and edge-ready patterns." },
    { title: "TypeScript", description: "Shared contracts across UI, API, and workers." },
    { title: "React", description: "Composable interfaces with disciplined state boundaries." },
    { title: "Tailwind CSS", description: "Tokenized styling that stays consistent at scale." },
    { title: "Node.js", description: "API routes, workers, and glue that match your topology." },
    { title: "Vercel and CI", description: "Preview environments, checks, and measured rollouts." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What ships with the build",
  deliverSubtitle:
    "Artifacts that help marketing, product, and engineering stay aligned after handoff.",
  deliverables: [
    {
      title: "SEO and performance baseline",
      description: "Core vitals targets, metadata, and structured data where it matters.",
    },
    {
      title: "Design system kit",
      description: "Components, tokens, and usage notes for consistent iteration.",
    },
    {
      title: "Analytics instrumentation",
      description: "Event taxonomy and privacy-aware collection aligned to decisions you need.",
    },
    {
      title: "Accessibility pass",
      description: "Keyboard flows, contrast, and semantics checked against WCAG intent.",
    },
    {
      title: "Content authoring workflow",
      description: "Preview, approvals, and safe publishing paths for non-engineers.",
    },
    {
      title: "Runbooks and handover",
      description: "Deploy steps, rollback, and on-call notes your team can operate.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Representative engagements",
  outcomesSubtitle:
    "Illustrative results: baselines, traffic, and goals differ by engagement.",
  outcomes: [
    {
      title: "E-commerce platform uplift",
      client: "Retail client",
      result: "Conversion-focused rebuild with faster checkout and clearer merchandising.",
    },
    {
      title: "Corporate web refresh",
      client: "Financial services",
      result: "Information architecture and performance tuned for trust and clarity.",
    },
    {
      title: "Creative portfolio system",
      client: "Agency",
      result: "Case study templates and motion that scale across dozens of launches.",
    },
  ],
  ctaTitle: "Ready to build your next web experience?",
  ctaDescription:
    "Tell us about audiences, constraints, and success metrics, and we will shape a roadmap and team rhythm that fits.",
};

export default function WebDevelopmentPage() {
  return <ServicePremiumPage content={content} />;
}
