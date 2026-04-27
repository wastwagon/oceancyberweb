import type { Metadata } from "next";
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
        <InteractiveIntakeWizard />
      </section>
    </main>
  );
}
