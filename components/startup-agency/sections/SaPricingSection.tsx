"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { pricingPlans } from "@/lib/startup-agency/content";

export function SaPricingSection() {
  return (
    <section
      id="pricing"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <SaReveal className="mb-16 text-center">
          <span className="sa-eyebrow">Investment</span>
          <h2 className="sa-title mt-3 md:text-5xl">Transparent pricing</h2>
          <p className="sa-subtitle mx-auto">
            Indicative tiers in GHS. We ship with clear milestones and fixed-price contracts. 
            Final quotes follow discovery and technical scoping.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/tools/project-cost"
              className="sa-button-outline"
            >
              Open project calculator
            </Link>
          </div>
        </SaReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <SaReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-sa-primary/5 ${
                  plan.featured
                    ? "border-sa-primary bg-sa-surface/80"
                    : "border-sa-border bg-sa-surface/30 backdrop-blur-sm"
                }`}
              >
                {/* Featured Glow Effect */}
                {plan.featured && (
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-sa-primary/20 blur-[60px]" />
                )}

                {plan.featured ? (
                  <div className="absolute right-8 top-8 rounded-full bg-sa-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-black">
                    Popular
                  </div>
                ) : null}

                <div className="mb-8">
                  <h3 className="font-heading text-2xl font-bold text-white transition-colors duration-300 group-hover:text-sa-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted">{plan.desc}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-black tracking-tighter text-white">
                    {plan.price.split(' ')[1] || plan.price}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-sa-muted">
                    {plan.price.split(' ')[0]}
                  </span>
                </div>

                <ul className="flex-1 space-y-4 border-t border-sa-border pt-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-sa-muted">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sa-primary/10 text-sa-primary">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-10 sa-btn-${plan.featured ? 'primary' : 'outline'} w-full`}
                >
                  Start project
                </Link>
              </div>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
