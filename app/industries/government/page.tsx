"use client";

import { IndustryPremiumPage } from "@/components/industries/IndustryPremiumPage";
import {
  IndustryFeaturedProof,
  type IndustryProofItem,
} from "@/components/industries/IndustryFeaturedProof";
import { LeadMagnetGate } from "@/components/marketing/LeadMagnetGate";
import { governmentIndustryContent } from "@/lib/data/industry-pages";

const governmentProof: IndustryProofItem[] = [
  {
    slug: "africa-governance-centre",
    title: "Africa Governance Centre",
    metric: "220%",
    metricLabel: "Programme visibility",
    summary:
      "Governance platform for research, events, and partner engagement — a clear public site international partners can trust.",
  },
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "250%",
    metricLabel: "Client engagement",
    summary:
      "Advisory portal patterns that also fit policy and institutional public-facing sites.",
  },
];

export default function GovernmentIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={governmentIndustryContent} />
      <IndustryFeaturedProof
        title="Governance and public-sector delivery"
        subtitle="Institutional work with clear structure, audit trails, and Accra engineering support."
        items={governmentProof}
      />
      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg">
        <div className="sa-container max-w-4xl">
          <LeadMagnetGate
            magnetId="compliance_checklist"
            page="industries/government"
            description="Data inventory, access control, vendor oversight, and breach playbooks for public agencies and citizen-facing services."
          />
        </div>
      </section>
    </>
  );
}
