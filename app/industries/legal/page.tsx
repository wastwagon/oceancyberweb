"use client";

import {
  IndustryPremiumPage,
  type IndustryPageContent,
} from "@/components/industries/IndustryPremiumPage";
import {
  IndustryFeaturedProof,
  type IndustryProofItem,
} from "@/components/industries/IndustryFeaturedProof";
import { LeadMagnetGate } from "@/components/marketing/LeadMagnetGate";

const content: IndustryPageContent = {
  heroEyebrow: "Legal services",
  heroPrefix: "Legal ",
  heroHighlight: "services",
  heroSuffix: "",
  heroDescription:
    "Secure case management, client portals, and document automation for law firms and in-house teams — built for confidentiality and audit trails.",
  pills: ["Case management", "Client portals", "Document automation"],
  solutionsEyebrow: "Solutions",
  solutionsTitle: "Legal practice technology",
  solutionsSubtitle:
    "Reduce manual work, strengthen client communication, and keep matter data under control.",
  services: [
    {
      title: "Case & matter management",
      description:
        "Matter timelines, tasks, and billing in one workspace with role-based access.",
    },
    {
      title: "Client portals",
      description:
        "Secure document exchange, status updates, and e-signatures without email chaos.",
    },
    {
      title: "Document automation",
      description:
        "Template-driven generation for contracts, letters, and court filings.",
    },
    {
      title: "Time tracking & billing",
      description:
        "Capture billable work and produce client-ready invoices and trust accounting hooks.",
    },
    {
      title: "Knowledge management",
      description:
        "Searchable precedents, clauses, and internal playbooks for faster drafting.",
    },
    {
      title: "Compliance & audit logs",
      description:
        "Access trails, retention policies, and export for regulatory review.",
    },
  ],
  capabilitiesEyebrow: "Stack",
  capabilitiesTitle: "Security & integration",
  capabilitiesSubtitle:
    "Encryption, least-privilege access, and integrations with email and storage providers.",
  technologies: [
    { title: "Role-based access", description: "Partner, associate, and client scopes" },
    { title: "Encrypted storage", description: "Sensitive matter files at rest and in transit" },
    { title: "E-signatures", description: "Workflows for retainer and closing documents" },
    { title: "Search & OCR", description: "Find clauses and entities across matter libraries" },
    { title: "API & exports", description: "Accounting and DMS integrations where required" },
    { title: "Audit trails", description: "Who viewed or changed what, and when" },
  ],
  storiesEyebrow: "Outcomes",
  storiesTitle: "Representative engagements",
  storiesSubtitle: "Directional outcomes — firm size and practice area affect scope.",
  caseStudies: [
    {
      title: "Mid-size firm matter workspace",
      client: "Commercial law practice",
      result: "Faster matter onboarding and clearer client communication.",
    },
    {
      title: "Client portal rollout",
      client: "Litigation boutique",
      result: "Reduced email volume and improved document turnaround.",
    },
    {
      title: "Template automation library",
      client: "Corporate advisory firm",
      result: "Shorter drafting cycles for standard agreements.",
    },
  ],
  ctaTitle: "Modernising legal operations?",
  ctaDescription:
    "Tell us about your practice areas, matter volume, and compliance needs — we'll map a phased delivery plan.",
};

const legalProof: IndustryProofItem[] = [
  {
    slug: "fitch-attorneys",
    title: "Fitch Attorneys",
    metric: "180%",
    metricLabel: "Case management efficiency",
    summary:
      "Unified legal platform with client communication hub — live corporate law firm deployment in Ghana.",
  },
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "250%",
    metricLabel: "Client engagement",
    summary:
      "Institutional advisory site with secure portal patterns applicable to professional services firms.",
  },
];

export default function LegalIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={content} />
      <IndustryFeaturedProof
        title="Legal platforms we have shipped"
        subtitle="On-site case studies with measurable outcomes — not generic templates."
        items={legalProof}
      />
      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg">
        <div className="sa-container max-w-4xl">
          <LeadMagnetGate
            magnetId="compliance_checklist"
            page="industries/legal"
            description="Eight controls for client data, matter files, access, vendors, and breach response — mapped to Ghana's Data Protection Act."
          />
        </div>
      </section>
    </>
  );
}
