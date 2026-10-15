"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Engineering",
  heroPrefix: "",
  heroHighlight: "Software development",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Custom software for Accra and Ghana operations — staff logins, workflows, finance reconciliation, and MoMo-aware integrations. Packages from GHS 14,500 at 47 Nii Kwashiefio Avenue.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/software-development-in-accra",
  hireGeoLabel: "Software development in Accra →",
  heroImage: serviceImages.webDevelopment,
  pills: ["Custom tools", "Internal platforms", "Integrations"],
  focusEyebrow: "What we build",
  focusTitle: "Software that matches how Ghana teams work",
  focusSubtitle:
    "Not a generic SaaS template — scoped systems for your roles, branches, and payment rails.",
  focusAreas: [
    {
      title: "Internal tools and portals",
      description:
        "Staff dashboards, approvals, and document flows with clear roles and audit trails.",
    },
    {
      title: "Operations platforms",
      description:
        "Multi-branch inventory, bookings, and customer records that survive patchy connectivity.",
    },
    {
      title: "Payments and reconciliation",
      description:
        "Paystack and Mobile Money wired so finance can match orders to statements.",
    },
    {
      title: "API and system integrations",
      description:
        "Connect CRM, accounting, SMS, and legacy tools with retries and observability.",
    },
    {
      title: "Compliance-ready builds",
      description:
        "Ghana Data Protection options, access logs, and security review on Enterprise scopes.",
    },
    {
      title: "Handover and hosting",
      description:
        "Runbooks, SSL, and hosting plan included in the project plan — Accra support after launch.",
    },
  ],
  stackEyebrow: "Stack",
  stackTitle: "Technologies we ship with",
  stackSubtitle:
    "Type-safe web stacks with APIs your team can extend after handover.",
  stack: [
    { title: "Next.js & React", description: "Modern web UIs and admin surfaces." },
    { title: "TypeScript", description: "Shared contracts across UI and API." },
    { title: "Node.js", description: "APIs, workers, and integration glue." },
    { title: "PostgreSQL", description: "Relational data with audit-friendly schemas." },
    { title: "Paystack / MoMo", description: "Ghana payment rails with reconciliation hooks." },
    { title: "WHM / cPanel", description: "Hosting and SSL under one Accra support channel." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What ships with the build",
  deliverSubtitle:
    "Artifacts product, ops, and finance can run without guessing.",
  deliverables: [
    {
      title: "Written build plan",
      description: "Scoped discovery before engineering — milestones in Ghana cedis.",
    },
    {
      title: "Role-based access",
      description: "Staff permissions and audit trails matched to your org chart.",
    },
    {
      title: "Integration map",
      description: "Documented APIs and failure modes for the tools you already use.",
    },
    {
      title: "Test and staging",
      description: "Preview environments before production cutover.",
    },
    {
      title: "Security options",
      description: "Hardening and Data Protection review available on Enterprise.",
    },
    {
      title: "Handover pack",
      description: "Credentials, runbooks, and training for the people who operate it.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Representative engagements",
  outcomesSubtitle:
    "Illustrative results from Accra-built platforms — scope and baselines differ.",
  outcomes: [
    {
      title: "Legal matter workspace",
      client: "Fitch Attorneys",
      result: "Case-management efficiency up 180% with a unified client platform.",
    },
    {
      title: "Advisory client portal",
      client: "Fitch Advisory",
      result: "Client engagement up 250% after portal, documents, and booking.",
    },
    {
      title: "Mobile commerce ops",
      client: "ThinQ Shopping",
      result: "Mobile conversions up 165% with Paystack and MoMo checkout.",
    },
  ],
  ctaTitle: "Need custom software, not another brochure site?",
  ctaDescription:
    "Tell us the workflows, roles, and systems you already use — we will map a fixed-price plan from GHS 14,500.",
  pricing: servicePricingHints.softwareDevelopment,
};

export default function SoftwareDevelopmentPage() {
  return <ServicePremiumPage content={content} />;
}
