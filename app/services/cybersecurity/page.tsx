"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { servicePricingHints } from "@/lib/startup-agency/pricing";

const content: ServicePageContent = {
  heroEyebrow: "Security",
  heroPrefix: "",
  heroHighlight: "Cybersecurity",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Security assessments and hardening for Ghana sites and apps — from GHS 4,500 — by the same Accra team that builds and hosts.",
  heroCtaLabel: "Get started",
  heroCtaHref: "/get-started",
  hireGeoHref: "/services/cybersecurity-in-accra",
  hireGeoLabel: "Cybersecurity in Accra →",
  heroImage: serviceImages.cyberSecurity,
  pills: ["Assessments", "Hardening", "Monitoring"],
  focusEyebrow: "What we cover",
  focusTitle: "Practical controls, not checkbox theatre",
  focusSubtitle:
    "Find weak spots, fix what matters first, and leave your team with a clear action list.",
  focusAreas: [
    {
      title: "Security assessments",
      description:
        "Review of sites, apps, and hosting for common Ghana SME risks — misconfig, weak auth, exposed admin.",
    },
    {
      title: "Hardening",
      description:
        "TLS, headers, backups, access control, and patch habits that stick after we leave.",
    },
    {
      title: "Identity and access",
      description:
        "MFA, least privilege, and fewer shared passwords floating in WhatsApp groups.",
    },
    {
      title: "Incident readiness",
      description:
        "Who to call, what to preserve, and how to restore when something goes wrong.",
    },
  ],
  stackEyebrow: "How we work",
  stackTitle: "Evidence you can act on",
  stackSubtitle:
    "Reports directors and engineers can both read — with priority and effort tagged.",
  stack: [
    { title: "Baseline reviews", description: "From GHS 4,500 for a focused pass." },
    { title: "Web app checks", description: "Auth, input handling, and session hygiene." },
    { title: "Hosting hardening", description: "cPanel, DNS, SSL, and backup routines." },
    { title: "Logging basics", description: "Enough signal to spot odd access patterns." },
    { title: "Staff guidance", description: "Short briefings for non-technical owners." },
    { title: "Follow-up fixes", description: "We can implement remediations, not only list them." },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you leave with",
  deliverSubtitle: "A ranked fix list and optional build work to close gaps.",
  deliverables: [
    {
      title: "Findings report",
      description: "Risks ranked by impact and effort — plain English summary included.",
    },
    {
      title: "Remediation plan",
      description: "What to fix this week vs next quarter.",
    },
    {
      title: "Config checklist",
      description: "Hosting and app settings to keep locked after changes.",
    },
    {
      title: "Optional fix sprint",
      description: "Same Accra engineers can implement the priority items.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Security that protects revenue",
  outcomesSubtitle: "Illustrative — every estate starts in a different place.",
  outcomes: [
    {
      title: "Pre-launch hardening",
      client: "New product sites",
      result: "Fewer surprises when traffic and payments go live.",
    },
    {
      title: "SME cleanup",
      client: "Growing Accra firms",
      result: "Shared passwords retired; backups actually restore.",
    },
    {
      title: "Ongoing reviews",
      client: "Regulated teams",
      result: "Evidence packs leadership can show partners.",
    },
  ],
  ctaTitle: "Want a security review?",
  ctaDescription:
    "Share your site or app URL and what worries you most — we will propose a baseline review or a deeper engagement.",
  pricing: servicePricingHints.cybersecurity,
};

export default function CybersecurityPage() {
  return <ServicePremiumPage content={content} />;
}
