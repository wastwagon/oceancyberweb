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
    title: "Pricing — Web & Mobile App Development in Ghana",
    description:
      "Transparent GHS starting tiers for web, mobile app, and cybersecurity projects in Ghana. Compare Startup, Professional, and Enterprise packages with full feature breakdowns.",
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
          <h1 className="sa-title-lg mt-4">Web & mobile app packages for Ghana teams</h1>
          <p className="sa-subtitle mx-auto">
            Starting tiers in Ghana cedis (GHS). Every engagement is scoped in discovery, then
            delivered on fixed-price milestones. Use our calculator for a tailored estimate, or
            compare packages below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools/project-cost" className="sa-btn-primary min-h-[44px] px-6 text-xs">
              Open project calculator
            </Link>
            <Link href="/contact" className="sa-btn-outline min-h-[44px] px-6 text-xs">
              Request a formal quote
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
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sa-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-sa-bg">
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
                <p className="mt-2 text-xs uppercase tracking-wider text-sa-muted">
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
                  href="/contact"
                  className={`mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full px-6 font-heading text-sm font-semibold uppercase tracking-[0.14em] transition duration-300 ${
                    plan.featured
                      ? "bg-sa-primary text-black hover:bg-sa-primary/90"
                      : "border border-sa-border text-white hover:border-sa-primary hover:text-sa-primary"
                  }`}
                >
                  Start {plan.name.toLowerCase()} project
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
              All prices are indicative starting points in Ghana cedis. Discovery, technical
              complexity, compliance requirements, and timeline urgency affect the final statement
              of work. We align with local payment rails (Paystack, MoMo) and publish ranges
              transparently so Accra and regional teams can budget with confidence.
            </p>
            <Link href="/tools/project-cost" className="sa-btn-outline mt-6 inline-flex min-h-[44px]">
              Estimate your project in GHS
            </Link>
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
