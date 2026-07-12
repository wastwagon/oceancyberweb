"use client";

import { Award, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaReviewBadges } from "@/components/startup-agency/sections/SaReviewBadges";
import { featuredCaseStudies, trustSignals } from "@/lib/startup-agency/content";

const iconMap = {
  award: Award,
  star: Star,
  shield: ShieldCheck,
} as const;

export function SaTrustSection() {
  return (
    <section className="border-b border-sa-border bg-sa-surface/20 py-12 md:py-16">
      <div className="sa-container">
        <div className="grid gap-6 md:grid-cols-3">
          {trustSignals.map((signal, i) => {
            const Icon = iconMap[signal.icon];
            return (
              <SaReveal key={signal.title} delay={i * 0.08}>
                <div className="sa-card flex h-full flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 text-sa-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="font-heading text-3xl font-bold text-white">{signal.stat}</p>
                  <h3 className="mt-2 font-heading text-sm font-bold uppercase tracking-widest text-white">
                    {signal.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted">{signal.body}</p>
                </div>
              </SaReveal>
            );
          })}
        </div>

        <SaReveal delay={0.12} className="mt-10">
          <p className="text-center font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">
            Flagship outcomes
          </p>
          <p className="mt-2 text-center text-xs text-sa-muted/60">
            Client-reported improvements; methodology varies by engagement — see each portfolio case for context.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCaseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/portfolio/${study.slug}`}
                className="sa-card sa-pressable group flex flex-col p-5 transition hover:border-sa-primary/40"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                  {study.sector}
                </span>
                <span className="mt-2 font-heading text-sm font-bold text-white group-hover:text-sa-primary">
                  {study.title}
                </span>
                <span className="mt-3 font-heading text-2xl font-bold text-white">
                  {study.metric}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-sa-muted/70">
                  {study.metricLabel}
                </span>
              </Link>
            ))}
          </div>
        </SaReveal>

        <SaReveal delay={0.15} className="mt-10">
          <SaReviewBadges />
        </SaReveal>
        <SaReveal delay={0.2} className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-sa-primary underline-offset-4 transition hover:text-white hover:underline"
          >
            See all case studies and live client work →
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
