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
  heroHighlight: "Web development",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Company websites and web apps for Accra and Ghana teams — built for speed on mobile networks, SEO, and Paystack or MoMo when you need checkout. From our office at 47 Nii Kwashiefio Avenue.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/web-development-in-accra",
  hireGeoLabel: "Web development in Accra →",
  heroImage: serviceImages.webDevelopment,
  pills: ["Next.js", "Paystack / MoMo", "SEO"],
  focusEyebrow: "What we build",
  focusTitle: "Sites and apps that work on Ghana phones",
  focusSubtitle:
    "We care about speed on mobile data and clean code you can extend after launch.",
  focusAreas: [
    {
      title: "Company and marketing sites",
      description:
        "Clear pages for services, team, and contact — structured so Google can understand you and visitors can call or WhatsApp.",
    },
    {
      title: "Product web applications",
      description:
        "Dashboards, staff workflows, and client portals with roles your operations team can manage.",
    },
    {
      title: "CMS and content workflows",
      description:
        "Editors update pages without waiting on a developer for every headline change.",
    },
    {
      title: "Payments and integrations",
      description:
        "Paystack, Mobile Money, CRM, and analytics wired with sensible fallbacks when the network is slow.",
    },
  ],
  stackEyebrow: "Tools we use",
  stackTitle: "A stack your team can maintain",
  stackSubtitle:
    "Type-safe defaults and preview deploys — not a black-box theme you cannot change.",
  stack: [
    { title: "Next.js", description: "Modern React sites with fast page loads." },
    { title: "TypeScript", description: "Fewer runtime surprises across UI and API." },
    { title: "React", description: "Front ends structured so new features do not break old ones." },
    { title: "Tailwind CSS", description: "Consistent spacing and type without one-off CSS chaos." },
    { title: "Node.js", description: "APIs and background jobs that match how you operate." },
    { title: "CI and previews", description: "Staging links before go-live so your team can review." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you leave with",
  deliverSubtitle:
    "Handover your marketing and ops teams can actually use.",
  deliverables: [
    {
      title: "SEO and speed baseline",
      description: "Titles, metadata, and Core Web Vitals targets suited to Ghana mobile traffic.",
    },
    {
      title: "Component kit",
      description: "Reusable UI pieces and notes so the next feature looks like the last.",
    },
    {
      title: "Analytics setup",
      description: "Events that answer business questions — not vanity pageviews alone.",
    },
    {
      title: "Launch runbook",
      description: "Deploy steps, rollback, and who to call when something breaks.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Work you can open",
  outcomesSubtitle:
    "Live Accra clients — results vary by brief and starting point.",
  outcomes: [
    {
      title: "Client portal and booking",
      client: "Fitch Advisory",
      result: "Client engagement up after portal, document sharing, and booking.",
    },
    {
      title: "Law firm web presence",
      client: "Fitch Attorneys",
      result: "Clear service pages and contact paths for Accra clients.",
    },
    {
      title: "Commerce storefront",
      client: "ThinQ Shopping",
      result: "Catalog and checkout shaped for Ghana buyers.",
    },
  ],
  ctaTitle: "Ready to build your next website?",
  ctaDescription:
    "Share your goals, budget range, and timeline — we will reply with the right package or a scoped proposal.",
  pricing: servicePricingHints.webDevelopment,
};

export default function WebDevelopmentPage() {
  return <ServicePremiumPage content={content} />;
}
