import type { Metadata } from "next";
import Link from "next/link";
import { withCanonical } from "@/lib/seo/canonical";
import { pricingPlans } from "@/lib/startup-agency/content";

export const metadata: Metadata = withCanonical(
  {
    title: "Pricing",
    description:
      "Transparent starting tiers for web, app, and cybersecurity work, with Ghana-focused scoping options.",
  },
  "/pricing",
);

export default function PricingPage() {
  return (
    <main className="sa-shell min-h-screen bg-black pt-28 text-white md:pt-32">
      <section className="border-b border-sa-border pb-12">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow">Pricing</p>
          <h1 className="sa-title mt-4 md:text-5xl">Clear starting points for your next build</h1>
          <p className="sa-subtitle mx-auto">
            These tiers are starting anchors. Final pricing follows discovery, risk profile, and
            delivery timeline.
          </p>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-2xl border p-7 md:p-8 ${
                  plan.featured
                    ? "border-sa-primary bg-sa-surface shadow-xl shadow-sa-primary/10"
                    : "sa-card"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sa-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-sa-bg">
                    Featured
                  </span>
                ) : null}
                <h2 className="font-heading text-xl font-bold leading-tight text-white">{plan.name}</h2>
                <p className="mt-2 text-sm text-sa-muted">{plan.desc}</p>
                <p className="mt-6 font-heading text-2xl font-bold text-sa-primary">{plan.price}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-sa-border pt-6 text-sm text-sa-muted">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-sa-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-6 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:border-sa-primary hover:text-sa-primary"
                >
                  Talk to us
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tools/project-cost"
              className="sa-btn-primary min-h-[44px] px-6 text-xs"
            >
              Open project calculator (GHS)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
