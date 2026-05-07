import type { Metadata } from "next";
import { ProjectCostWizard } from "@/components/project-calculator/ProjectCostWizard";
import { PrintEstimatorClass } from "@/components/project-calculator/PrintEstimatorClass";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Project cost calculator",
    description:
      "Estimate web and app work in Ghana cedis. Add optional extra work such as creating a Google Business Profile and download a proforma PDF.",
  },
  "/tools/project-cost",
);

export default function ProjectCostPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted pt-28 md:pt-32 print:bg-white print:text-black">
      <PrintEstimatorClass />
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-6 md:pb-8">
          <p className="sa-eyebrow mb-3 text-center block">Tools</p>
          <h1 className="sa-title mt-3 text-center md:text-4xl">
            Project cost calculator
          </h1>
          <p className="sa-subtitle mx-auto mt-4 text-center">
            We use clear hour estimates, then adjust for platform, design, and how urgent you need it. The total is
            a <span className="font-semibold text-white">rough guide, not a contract</span> (we show a band of
            about plus or minus 10% in cedis). You can download a proforma when you are ready to share the numbers.
          </p>
        </div>
      </section>

      <div className="sa-container relative z-10 max-w-3xl py-8 md:py-10">
        <ProjectCostWizard />
      </div>
    </div>
  );
}
