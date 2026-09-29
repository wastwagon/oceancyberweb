import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { withCanonical } from "@/lib/seo/canonical";
import { PricingComparisonTable } from "@/components/startup-agency/PricingComparisonTable";
import { PricingPageJsonLd } from "@/components/seo/PricingPageJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";
import { formatPlanPrice, pricingAddOns, pricingFaqItems, pricingPlans } from "@/lib/startup-agency/pricing";

export const metadata: Metadata = withCanonical(
  {
    title: "Web and mobile pricing in Ghana",
    description:
      "Starting prices in Ghana cedis for web, mobile, and cybersecurity work. Compare Startup, Professional, and Enterprise, then get a formal quote.",
    keywords: [
      "web development pricing Ghana",
      "mobile app development cost Accra",
      "software development packages Ghana",
      "GHS web design pricing",
      "OceanCyber pricing",
    ],
  },
  "/pricing",
);

export default function PricingPage() {
  return (
    <main className="sa-shell min-h-screen bg-black text-white">
      <PricingPageJsonLd />

      <section className="sa-page-intro border-b border-sa-border pb-12">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow">Pricing</p>
          <h1 className="sa-title-lg mt-4">Web and mobile packages for teams in Ghana</h1>
          <p className="sa-subtitle mx-auto">
            Starting prices are in Ghana cedis. We confirm scope in discovery, then deliver on fixed-price milestones.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link href="/tools/project-cost" className="sa-btn-outline w-full sm:w-auto">
              Estimate in cedis
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                id={plan.id}
                className={`relative flex h-full scroll-mt-32 flex-col rounded-2xl border p-7 md:p-8 ${
                  plan.featured
                    ? "border-sa-primary bg-sa-surface shadow-xl shadow-sa-primary/10"
                    : "sa-card"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sa-primary px-3 py-1 text-sm font-semibold text-sa-bg">
                    Most popular
                  </span>
                ) : null}
                <h2 className="font-heading text-xl font-bold leading-tight text-white">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm text-sa-muted">{plan.desc}</p>
                <p className="mt-1 text-xs text-sa-muted/80">{plan.idealFor}</p>
                <p className="mt-6 font-heading text-3xl font-bold text-sa-primary">
                  {formatPlanPrice(plan.priceGhs)}
                </p>
                <p className="mt-2 text-sm text-sa-muted">
                  Typical delivery: {plan.timeline}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-sa-border pt-6 text-sm text-sa-muted">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-started"
                  className={`mt-8 w-full ${plan.featured ? "sa-btn-primary" : "sa-btn-outline"}`}
                >
                  Choose {plan.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container max-w-6xl">
          <div className="mb-10 text-center">
            <p className="sa-eyebrow">Compare</p>
            <h2 className="sa-title mt-4">Feature comparison</h2>
            <p className="sa-subtitle mx-auto">
              Side-by-side view of what each tier includes. Mobile apps, extra integrations, and
              retainers can be added to any package.
            </p>
          </div>
          <PricingComparisonTable />
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-4xl">
          <div className="mb-10 text-center">
            <p className="sa-eyebrow">Add-ons</p>
            <h2 className="sa-title mt-4">Extend any package</h2>
            <p className="sa-subtitle mx-auto">
              Common additions quoted during scoping. Final amounts depend on complexity and
              integrations.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pricingAddOns.map((addon) => (
              <div key={addon.name} className="sa-card p-6">
                <h3 className="font-heading text-base font-bold text-white">{addon.name}</h3>
                <p className="mt-3 font-heading text-xl font-bold text-sa-primary">
                  From GHS {addon.priceGhs.toLocaleString("en-GH")}
                  {addon.name.includes("retainer") ? "/mo" : ""}
                </p>
                <p className="mt-2 text-sm text-sa-muted">{addon.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-sa-border bg-sa-surface/40 p-6 text-center text-sm text-sa-muted md:p-8">
            <p>
              Prices are starting points in Ghana cedis. Discovery, complexity, compliance, and
              timeline change the final statement of work. We accept Paystack and Mobile Money, and
              we publish ranges so teams can budget with confidence.
            </p>
            <Link href="/tools/project-cost" className="sa-btn-outline mt-6 inline-flex min-h-[44px]">
              Estimate your project in GHS
            </Link>
            <p className="mt-4">
              <Link href="/guides/website-cost-in-ghana" className="font-semibold text-sa-primary hover:underline">
                How website pricing works in Ghana
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sa-section border-t border-sa-border">
        <FaqPageJsonLd items={pricingFaqItems} />
        <div className="sa-container">
          <div className="mb-10 text-center">
            <p className="sa-eyebrow">FAQ</p>
            <h2 className="sa-title mt-4">Pricing questions</h2>
            <p className="sa-subtitle mx-auto">
              How our Ghana cedis tiers work, what is included, and how to get a formal quote.
            </p>
          </div>
          <StartupAgencyFaq items={pricingFaqItems} />
        </div>
      </section>
    </main>
  );
}
