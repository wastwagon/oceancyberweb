import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { InteractiveIntakeWizard } from "@/components/intake/InteractiveIntakeWizard";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Interactive intake and booking",
    description:
      "Tell us what you need, your budget, and your timeline, then request a discovery call or quote in one guided flow.",
  },
  "/get-started",
);

export default function GetStartedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted pt-28 md:pt-32">
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-8 md:pb-10">
          <p className="sa-eyebrow mb-3 text-center block">Self-serve</p>
          <h1 className="sa-title mt-3 text-center md:text-4xl">
            Start your project in one guided flow
          </h1>
          <p className="sa-subtitle mx-auto mt-4 text-center">
            Share your goals, scope, budget range, and timeline, then choose your preferred next step. We use this to
            respond faster with the right proposal.
          </p>
        </div>
      </section>
      <section className="sa-section relative z-10">
        <div className="sa-container max-w-3xl">
          <div className="sa-card mb-6 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="inline-flex items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-primary">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                  New service
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Convert your existing website into a mobile app.
                </p>
              </div>
              <Link
                href="/services/website-to-mobile-app"
                className="sa-btn-primary py-2 px-3 min-h-[40px] text-sm"
              >
                Request conversion quote
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <InteractiveIntakeWizard />
        </div>
      </section>
    </main>
  );
}
