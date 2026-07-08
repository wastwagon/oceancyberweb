"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";
import { LeadMagnetGate } from "@/components/marketing/LeadMagnetGate";
import {
  IndustryFeaturedProof,
  type IndustryProofItem,
} from "@/components/industries/IndustryFeaturedProof";

const content: IndustryPageContent = {
  heroEyebrow: "Financial services",
  heroPrefix: "Financial ",
  heroHighlight: "services",
  heroSuffix: "",
  heroDescription:
    "Banking-grade platforms, payments, and risk tooling, designed for Ghana's regulatory reality and customer expectations.",
  pills: ["Secure & compliant", "Fintech innovation", "Digital banking"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "What we build with banks & fintechs",
  solutionsSubtitle:
    "From channels to core integrations: performance, auditability, and fraud resistance by default.",
  services: [
    {
      title: "Digital banking platforms",
      description:
        "Modern online banking with resilient UX and hardened authentication flows.",
    },
    {
      title: "Payment gateway integration",
      description:
        "Routing, reconciliation, and observability across PSPs and ledgers.",
    },
    {
      title: "Fraud detection systems",
      description:
        "Rules + ML signals with explainable alerts for operations teams.",
    },
    {
      title: "Compliance solutions",
      description:
        "Reporting automation, evidence trails, and policy-driven workflows.",
    },
    {
      title: "Mobile banking apps",
      description:
        "Native-quality experiences with secure device binding patterns.",
    },
    {
      title: "Risk management systems",
      description:
        "Limits, scoring, and dashboards for credit and operational risk.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Technologies & patterns",
  capabilitiesSubtitle:
    "How we connect legacy cores to modern channels without compromising safety.",
  technologies: [
    { title: "Blockchain", description: "Where immutability fits the use case" },
    { title: "AI / ML", description: "Fraud analytics and anomaly detection" },
    { title: "API integration", description: "Stable contracts between systems" },
    { title: "Cloud security", description: "Zero-trust patterns and hardening" },
    { title: "Biometric authentication", description: "Device and identity signals" },
    { title: "Real-time analytics", description: "Operational and executive views" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle:
    "Directional results: your risk profile and stack will differ.",
  caseStudies: [
    {
      title: "Mobile banking transformation",
      client: "Regional bank",
      result: "Increased digital transactions materially post-launch.",
    },
    {
      title: "Fraud prevention system",
      client: "Payment processor",
      result: "Reduced fraudulent transactions through layered controls.",
    },
    {
      title: "Compliance automation",
      client: "Financial institution",
      result: "Cut manual reporting time with auditable pipelines.",
    },
  ],
  ctaTitle: "Modernize financial experiences?",
  ctaDescription:
    "Share your channels, partners, and compliance scope, and we'll map delivery phases and security gates.",
};

const financeProof: IndustryProofItem[] = [
  {
    slug: "thinq-shopping",
    title: "ThinQ Shopping",
    metric: "165%",
    metricLabel: "Mobile conversions",
    summary: "MoMo-ready e-commerce and services app — payment rails built for Ghana buyers.",
  },
  {
    slug: "egp-ghana",
    title: "EGP Ghana",
    metric: "200%",
    metricLabel: "Online transactions",
    summary: "Financial platform modernisation with stronger authentication and monitoring.",
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      <IndustryPremiumPage content={content} />
      <IndustryFeaturedProof
        title="Fintech & commerce platforms we have shipped"
        subtitle="Live deployments with payment integration and measurable growth."
        items={financeProof}
      />
      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg">
        <div className="sa-container max-w-4xl">
          <LeadMagnetGate page="industries/financial-services" />
        </div>
      </section>
    </>
  );
}
