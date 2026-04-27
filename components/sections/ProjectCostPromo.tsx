import Link from "next/link";
import { ArrowRight, Calculator, FileText } from "lucide-react";

/**
 * Homepage band driving traffic to the interactive GHS project cost tool.
 */
export function ProjectCostPromo() {
  return (
    <section
      className="relative border-y border-slate-200/80 bg-gradient-to-r from-ocean-50/95 via-white to-cyan-50/60"
      aria-labelledby="project-cost-promo-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col gap-8 rounded-3xl border border-ocean-200/50 bg-white/90 p-6 shadow-sm shadow-slate-200/40 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-700 text-white shadow-md shadow-ocean-600/20">
              <Calculator className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
                Plan your budget
              </p>
              <h2
                id="project-cost-promo-heading"
                className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
              >
                Get a GHS project estimate in minutes
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 md:text-base">
                Pick your platform, design level, and the features you want—including optional work such as creating
                a Google Business Profile. You will see a range in cedis, then you can download a proforma to keep or
                share.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" aria-hidden />
                  Rough range (not a final quote; about ±10%)
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-ocean-600" aria-hidden />
                  Proforma PDF you can download
                </li>
              </ul>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center md:flex-col md:items-end lg:flex-row">
            <Link
              href="/tools/project-cost"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-ocean-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-ocean-700"
            >
              Open project calculator
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/get-started"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-ocean-300 hover:bg-white"
            >
              Start guided intake
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
