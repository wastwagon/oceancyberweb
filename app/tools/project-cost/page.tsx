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
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white print:text-black">
      <PrintEstimatorClass />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/80 to-slate-50">
        <div className="container mx-auto max-w-3xl px-4 pb-6 pt-28 md:px-6 md:pb-8 md:pt-32">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Tools</p>
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Project cost calculator
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
            We use clear hour estimates, then adjust for platform, design, and how urgent you need it. The total is
            a <span className="font-semibold text-slate-800">rough guide, not a contract</span> (we show a band of
            about plus or minus 10% in cedis). You can download a proforma when you are ready to share the numbers.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <ProjectCostWizard />
      </div>
    </div>
  );
}
