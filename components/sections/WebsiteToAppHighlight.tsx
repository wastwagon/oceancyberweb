import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

export function WebsiteToAppHighlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200/60 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800">
                <Smartphone className="h-3.5 w-3.5 text-ocean-600" aria-hidden />
                New conversion service
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Already have a website? Turn it into a mobile app.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                Share your current website details and we will reply with a scoped mobile conversion quote,
                recommended architecture, and phased 30/30/40 delivery plan.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/services/website-to-mobile-app"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110"
              >
                Request conversion quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
