import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { InteractiveIntakeWizard } from "@/components/intake/InteractiveIntakeWizard";

export const metadata: Metadata = {
  title: "Interactive intake and booking",
  description:
    "Tell us what you need, your budget, and your timeline, then request a discovery call or quote in one guided flow.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 md:pt-32">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/80 to-slate-50">
        <div className="container mx-auto max-w-3xl px-4 pb-8 md:px-6 md:pb-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Self-serve</p>
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Start your project in one guided flow
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
            Share your goals, scope, budget range, and timeline, then choose your preferred next step. We use this to
            respond faster with the right proposal.
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-6 rounded-2xl border border-ocean-200/80 bg-gradient-to-br from-ocean-50 via-white to-cyan-50/70 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ocean-700">
                <Smartphone className="h-3.5 w-3.5" aria-hidden />
                New service
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Convert your existing website into a mobile app.
              </p>
            </div>
            <Link
              href="/services/website-to-mobile-app"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Request conversion quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
        <InteractiveIntakeWizard />
      </section>
    </main>
  );
}
