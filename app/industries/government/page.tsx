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
      "Continental governance platform for programmes, research, and events — credible digital presence for international stakeholders.",
  },
  {
    slug: "fitch-advisory",
    title: "Fitch Advisory",
    metric: "250%",
    metricLabel: "Stakeholder engagement",
    summary:
      "Advisory platform patterns applicable to policy, institutional, and public-facing programme sites.",
  },
];

export default function GovernmentIndustryPage() {
  return (
    <>
      <IndustryPremiumPage content={governmentIndustryContent} />
      <IndustryFeaturedProof
        title="Governance & public programme delivery"
        subtitle="Continental and institutional work with audit-friendly structure and international credibility."
        items={governmentProof}
      />
      <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg">
        <div className="sa-container max-w-4xl">
          <LeadMagnetGate
            magnetId="compliance_checklist"
            page="industries/government"
            description="Data inventory, access control, vendor oversight, and breach playbooks for public programmes and citizen-facing services."
          />
        </div>
      </section>
    </>
  );
}
