"use client";

import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { processSteps } from "@/lib/startup-agency/content";

export function SaProcessSection() {
  return (
    <section
      id="process"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SaSectionHeader
              align="left"
              title="From brief to launch"
              className="max-w-2xl"
            />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-white uppercase text-sm tracking-widest">Steps</span>
              <span className="text-sa-primary font-bold text-lg">1 2 3 4</span>
              <span className="text-sa-muted font-bold text-lg">/ 4</span>
            </div>
          </div>
        </SaReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-12">
          {processSteps.map((p, i) => (
            <SaReveal key={p.step} delay={i * 0.1} className="flex flex-col">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sa-border text-2xl font-bold text-sa-primary font-heading transition-colors duration-300 hover:border-sa-primary hover:bg-sa-primary/10">
                0{p.step}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4 uppercase">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-sa-muted mb-6">
                {p.body}
              </p>
              <ul className="space-y-3 mt-auto border-t border-sa-border/50 pt-6">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-sa-muted">
                    <span className="mt-1 text-sa-primary">-</span>
                    {b}
                  </li>
                ))}
              </ul>
              {p.step === 2 ? (
                <Link
                  href="/services/ui-ux-design"
                  className="mt-6 inline-flex text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:text-white"
                >
                  UI/UX services →
                </Link>
              ) : null}
              {p.step === 1 ? (
                <Link
                  href="/how-we-work"
                  className="mt-6 inline-flex text-xs font-bold uppercase tracking-widest text-sa-muted transition hover:text-sa-primary"
                >
                  How we work →
                </Link>
              ) : null}
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
