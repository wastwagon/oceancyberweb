import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";

/**
 * Homepage band driving traffic to the interactive GHS project cost tool.
 */
export function ProjectCostPromo() {
  return (
    <section
      className="sa-section relative border-y border-sa-border bg-sa-bg"
      aria-labelledby="project-cost-promo-heading"
    >
      <div className="sa-container">
        <div className="sa-card flex flex-col gap-8 p-6 md:flex-row md:items-center md:justify-between md:p-10 border-sa-border">
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sa-primary/20 text-sa-primary ring-1 ring-sa-primary/50">
              <Calculator className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                Plan your budget
              </p>
              <h2
                id="project-cost-promo-heading"
                className="mt-2 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl"
              >
                Get a GHS project estimate in minutes
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-sa-muted/80">
                Pick your platform, design level, and the features you want—including optional work such as creating
                a Google Business Profile. You will see a range in cedis, then you can download a proforma to keep or
                share.
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-xs text-sa-muted sm:flex-row sm:flex-wrap sm:gap-6">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" aria-hidden />
                  Rough range (not a final quote; about ±10%)
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-sa-primary" aria-hidden />
                  Proforma PDF you can download
                </li>
              </ul>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-end lg:flex-row">
            <Link
              href="/tools/project-cost"
              className="sa-btn-primary gap-2"
            >
              Open calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/get-started"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary hover:text-white"
            >
              Start intake
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
