"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";

const content: ServicePageContent = {
  heroEyebrow: "Mobile",
  heroPrefix: "",
  heroHighlight: "Mobile apps",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Native-quality experiences on iOS and Android: offline-aware flows, push engagement, and release discipline your users feel.",
  heroCtaLabel: "Build your app",
  heroCtaHref: "/contact",
  pills: ["iOS", "Android", "Cross-platform"],
  focusEyebrow: "Experiences",
  focusTitle: "Apps people keep installed",
  focusSubtitle:
    "Performance, permissions, and polish, balanced with shipping cadence and store compliance.",
  focusAreas: [
    {
      title: "Consumer-grade UX",
      description:
        "Motion, haptics, and microcopy tuned for attention spans and one-handed use.",
    },
    {
      title: "Cross-platform delivery",
      description:
        "Shared business logic with platform-native shells where differentiation matters.",
    },
    {
      title: "Offline and flaky networks",
      description:
        "Queues, conflict resolution, and honest sync states users can trust.",
    },
    {
      title: "Push and lifecycle messaging",
      description:
        "Deep links, preferences, and frequency caps that respect trust.",
    },
    {
      title: "Payments and identity",
      description:
        "Biometrics, secure storage, and session handling aligned to risk profiles.",
    },
    {
      title: "Observability and releases",
      description:
        "Crash analytics, staged rollouts, and feature flags for confident iteration.",
    },
  ],
  stackEyebrow: "Stack",
  stackTitle: "Technologies we build with",
  stackSubtitle:
    "We pick stacks for maintainability and team skills, not novelty for decks.",
  stack: [
    { title: "React Native", description: "Shared UI with native modules where needed." },
    { title: "Flutter", description: "Consistent rendering when pixel parity matters." },
    { title: "Swift and Kotlin", description: "Native modules and fully native paths." },
    { title: "Firebase", description: "Auth, messaging, and remote config with sane limits." },
    { title: "Push notifications", description: "FCM and APNs with segmentation and testing." },
    { title: "CI for mobile", description: "Signing, builds, and store submission automation." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you ship with",
  deliverSubtitle:
    "Store-ready binaries plus the operational glue product and support teams need.",
  deliverables: [
    {
      title: "Cross-platform parity plan",
      description: "Where code is shared vs forked, documented for future contributors.",
    },
    {
      title: "Native performance profile",
      description: "Startup, memory, and scroll benchmarks with budgets and fixes.",
    },
    {
      title: "Push notification strategy",
      description: "Segments, quiet hours, and deep link maps tied to product goals.",
    },
    {
      title: "Offline support patterns",
      description: "Caching, retries, and user-visible sync for critical journeys.",
    },
    {
      title: "App Store readiness",
      description: "Guideline checks, screenshots, and review notes prepared early.",
    },
    {
      title: "Analytics integration",
      description: "Event schema, privacy posture, and funnels product can trust.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Representative engagements",
  outcomesSubtitle:
    "Illustrative results: categories, acquisition, and product maturity differ.",
  outcomes: [
    {
      title: "Retail mobile commerce",
      client: "Retail client",
      result: "Checkout refinements and performance work that improved mobile conversion.",
    },
    {
      title: "Healthcare patient app",
      client: "Medical provider",
      result: "Secure messaging and scheduling with clearer consent and access paths.",
    },
    {
      title: "Fitness companion",
      client: "Wellness company",
      result: "Sensor integrations and habit loops tuned for daily retention.",
    },
  ],
  ctaTitle: "Ready to ship a mobile product?",
  ctaDescription:
    "Bring your personas, platforms, and timeline, and we will propose a build plan with realistic milestones.",
};

export default function MobileAppsPage() {
  return <ServicePremiumPage content={content} />;
}
