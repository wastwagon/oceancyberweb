"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { pricingPlans } from "@/lib/startup-agency/pricing";

export function SaPricingSection() {
  return (
    <section
      id="pricing"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <SaReveal className="mb-16">
          <SaSectionHeader
            eyebrow="Investment"
            title="Transparent pricing"
            subtitle="Indicative starting tiers in Ghana cedis. Fixed-price milestones after discovery — use the calculator or compare full packages on our pricing page."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools/project-cost" className="sa-btn-outline">
              Open project calculator
            </Link>
            <Link href="/pricing" className="sa-btn-outline">
              Compare all plans
            </Link>
          </div>
        </SaReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <SaReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-sa-primary/5 md:p-8 ${
                  plan.featured
                    ? "border-sa-primary bg-sa-surface/80"
                    : "border-sa-border bg-sa-surface/30 backdrop-blur-sm"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-sa-primary/20 blur-[60px]" />
                )}

                {plan.featured ? (
                  <div className="mb-3 inline-flex rounded-full bg-sa-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-black md:absolute md:right-8 md:top-8 md:mb-0">
                    Popular
                  </div>
                ) : null}

                <div className="mb-6 md:mb-8">
                  <h3 className="font-heading text-2xl font-bold text-white transition-colors duration-300 group-hover:text-sa-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted">{plan.desc}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-sa-muted">
                    From
                  </span>
                  <span className="font-heading text-4xl font-black tracking-tighter text-white">
                    GHS {plan.priceGhs.toLocaleString("en-GH")}
                  </span>
                </div>

                <ul className="flex-1 space-y-4 border-t border-sa-border pt-8">
                  {plan.homepageFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-sa-muted">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/pricing#${plan.id}`}
                  className={`mt-10 sa-btn-${plan.featured ? "primary" : "outline"} group w-full`}
                >
                  View full details
                  <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
