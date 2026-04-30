import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { pricingPlans } from "@/lib/startup-agency/content";

export function SaPricingSection() {
  return (
    <section
      id="pricing"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-12 text-center">
          <span className="sa-eyebrow">Pricing</span>
          <h2 className="sa-title mt-3 md:text-4xl">Starting points</h2>
          <p className="sa-subtitle mx-auto">
            Indicative tiers in GHS (base currency). Final quotes follow discovery. Use the project
            calculator below and optional currency converter for planning views.
          </p>
          <Link
            href="/tools/project-cost"
            className="mt-5 inline-flex items-center gap-1 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sa-primary underline-offset-4 hover:underline"
          >
            Open project calculator (GHS)
          </Link>
        </SaReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <SaReveal key={plan.name} delay={i * 0.06}>
              <div
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
                <h3 className="font-heading text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-sa-muted">{plan.desc}</p>
                <p className="mt-6 font-heading text-2xl font-bold text-sa-primary">{plan.price}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-sa-border pt-6 text-sm text-sa-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-sa-primary">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border px-6 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:border-sa-primary hover:text-sa-primary"
                >
                  Let&apos;s talk
                </Link>
              </div>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
