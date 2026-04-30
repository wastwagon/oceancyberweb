"use client";

import { SaReveal } from "@/components/startup-agency/SaReveal";
import { processSteps } from "@/lib/startup-agency/content";

export function SaProcessSection() {
  return (
    <section
      id="process"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="sa-title uppercase font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-bold max-w-2xl">
              At the intersection of vision and execution, we bring creative ideas
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-white uppercase text-sm tracking-widest">Steps</span>
              <span className="text-sa-primary font-bold text-lg">1 2 3 4</span>
              <span className="text-sa-muted font-bold text-lg">/ 4</span>
            </div>
          </div>
        </SaReveal>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
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
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
