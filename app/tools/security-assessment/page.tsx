import type { Metadata } from "next";
import Link from "next/link";
import { SecurityAssessmentWizard } from "@/components/tools/SecurityAssessmentWizard";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Security maturity self-assessment",
    description:
      "Score your organisation's security posture in minutes. Built for Ghanaian SMEs, fintech, and regulated teams — with a downloadable report and optional review call.",
  },
  "/tools/security-assessment",
);

export default function SecurityAssessmentPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted sa-page-top md:pt-32">
      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-6 md:pb-8">
          <p className="sa-eyebrow mb-3 text-center">Tools</p>
          <h1 className="sa-title mt-3 text-center md:text-4xl">
            Security maturity self-assessment
          </h1>
          <p className="sa-lead mx-auto mt-3 text-center">
            Fifteen controls across identity, data, monitoring, incident readiness, and vendors. Takes about 8
            minutes. Results are indicative — not a certification — but they help prioritise your next 90 days.
          </p>
        </div>
      </section>

      <div className="sa-container relative z-10 max-w-3xl py-8 md:py-10">
        <SecurityAssessmentWizard />
        <p className="mt-8 text-center text-sm text-sa-muted/70">
          Need a full audit?{" "}
          <Link href="/services/cybersecurity" className="text-sa-primary hover:underline">
            Cybersecurity services
          </Link>{" "}
          ·{" "}
          <Link href="/security-journey" className="text-sa-primary hover:underline">
            Security journey
          </Link>
        </p>
      </div>
    </div>
  );
}
