import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveIntakeWizard } from "@/components/intake/InteractiveIntakeWizard";
import { PricingPathsLinks } from "@/components/startup-agency/PricingPathsLinks";
import { resolveIntakeInitialTopic } from "@/lib/marketing/intake-topic";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Start a website or app project in Ghana",
    description:
      "Tell our Accra web design and development team your goals, budget, and timeline. Packages from GHS 6,000 — we reply with the right package or next step.",
  },
  "/get-started",
);

type PageProps = {
  searchParams?: { topic?: string | string[]; plan?: string | string[] };
};

export default function GetStartedPage({ searchParams }: PageProps) {
  const initialTopic = resolveIntakeInitialTopic(searchParams);

  return (
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <section className="sa-page-intro overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-8 md:pb-10">
          <p className="sa-eyebrow mb-3 text-center block">Project brief</p>
          <h1 className="sa-title mt-3 text-center">
            Get started in one guided flow
          </h1>
          <p className="sa-lead mx-auto mt-3 text-center">
            Share your goals, scope, budget range, and timeline. Then choose your preferred next step — we use this to
            respond faster with the right proposal.
          </p>
          <div className="mt-6">
            <PricingPathsLinks variant="compact" />
          </div>
        </div>
      </section>
      <section className="sa-section relative z-10">
        <div className="sa-container max-w-3xl">
          <p className="mb-6 text-sm text-white/80">
            Already have a site?{" "}
            <Link
              href="/services/website-to-mobile-app"
              className="sa-text-link font-medium"
            >
              Turn it into a mobile app
            </Link>
            .
          </p>
          <InteractiveIntakeWizard initialTopic={initialTopic} />
        </div>
      </section>
    </main>
  );
}
