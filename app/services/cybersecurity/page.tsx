"use client";

import {
  ServicePremiumPage,
  type ServicePageContent,
} from "@/components/services/ServicePremiumPage";

const content: ServicePageContent = {
  heroEyebrow: "Security practice",
  heroPrefix: "",
  heroHighlight: "Cybersecurity",
  heroSuffix: "",
  heroHighlightTone: "white",
  heroDescription:
    "Protect digital assets with assessments, hardening, monitoring alignment, and response readiness: practical controls, not checkbox theater.",
  heroCtaLabel: "Secure your business",
  heroCtaHref: "/contact",
  pills: ["Threat detection", "Data protection", "Compliance"],
  focusEyebrow: "Coverage",
  focusTitle: "Defense across people, process, and systems",
  focusSubtitle:
    "Prioritized risk reduction with clear owners, timelines, and evidence you can hand to auditors or boards.",
  focusAreas: [
    {
      title: "Continuous threat monitoring",
      description:
        "Detection use-cases, log discipline, and escalation paths tuned to your environment.",
    },
    {
      title: "Identity and access hardening",
      description:
        "Least privilege, MFA rollout, and privileged access patterns that survive real usage.",
    },
    {
      title: "Data protection and privacy",
      description:
        "Encryption, key handling, retention, and access patterns aligned to sensitivity classes.",
    },
    {
      title: "Cloud and network security",
      description:
        "Segmentation, posture management, and secure defaults for hybrid footprints.",
    },
    {
      title: "Compliance and audit readiness",
      description:
        "Control mapping, evidence collection, and gap plans for common frameworks.",
    },
    {
      title: "Incident readiness and recovery",
      description:
        "Playbooks, tabletop exercises, and communications templates before pressure hits.",
    },
  ],
  stackEyebrow: "Disciplines",
  stackTitle: "Tools and domains we work in",
  stackSubtitle:
    "We meet you where you are, whether brownfield, regulated, or cloud-native, and sequence work by impact.",
  stack: [
    {
      title: "Security audits",
      description: "Architecture and configuration reviews with actionable findings.",
    },
    {
      title: "Firewall and segmentation",
      description: "North-south and east-west controls that match real traffic.",
    },
    {
      title: "Encryption",
      description: "Protect data at rest, in transit, and across integrations.",
    },
    {
      title: "Monitoring",
      description: "Signal quality, retention, and on-call alignment for SOC workflows.",
    },
    {
      title: "Incident response",
      description: "Containment, eradication, and recovery with clear decision rights.",
    },
    {
      title: "Compliance programs",
      description: "Operational controls, not binders, mapped to obligations you face.",
    },
  ],
  deliverEyebrow: "Deliverables",
  deliverTitle: "What you walk away with",
  deliverSubtitle:
    "Tangible artifacts your teams can run: documentation, roadmaps, and runbooks that age well.",
  deliverables: [
    {
      title: "Threat detection coverage",
      description: "Prioritized detections, data sources, and tuning notes for your stack.",
    },
    {
      title: "Data protection blueprint",
      description: "Classification, handling rules, and technical controls tied to risk.",
    },
    {
      title: "Compliance evidence pack",
      description: "Traceability from control intent to implementation and testing.",
    },
    {
      title: "Incident response runbooks",
      description: "Roles, comms templates, and technical steps for likely scenarios.",
    },
    {
      title: "Security training kits",
      description: "Role-based modules and phishing simulations sized to your culture.",
    },
    {
      title: "Risk assessment summary",
      description: "Executive narrative plus engineering backlog ordered by blast radius.",
    },
  ],
  outcomesEyebrow: "Outcomes",
  outcomesTitle: "Representative engagements",
  outcomesSubtitle:
    "Illustrative results: scope, maturity, and threat landscape vary by client.",
  outcomes: [
    {
      title: "Financial institution hardening",
      client: "Banking client",
      result: "Material reduction in exploitable misconfigurations post-assessment.",
    },
    {
      title: "Healthcare data protection",
      client: "Medical provider",
      result: "HIPAA-aligned controls with clearer ownership and audit trails.",
    },
    {
      title: "E-commerce security review",
      client: "Online retailer",
      result: "Checkout and admin paths reviewed; critical issues remediated first.",
    },
  ],
  ctaTitle: "Ready to tighten your security posture?",
  ctaDescription:
    "Share your stack, obligations, and pain points, and we will propose a sequenced plan with honest tradeoffs.",
};

export default function CybersecurityPage() {
  return <ServicePremiumPage content={content} />;
}
