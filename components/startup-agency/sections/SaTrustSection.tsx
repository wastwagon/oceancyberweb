"use client";

import { Award, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { proofOutcomes, trustSignals } from "@/lib/startup-agency/content";

const iconMap = {
  award: Award,
  star: Star,
  shield: ShieldCheck,
} as const;

/** Compact trust stats — reviews live in testimonials; portfolio metrics live in portfolio. */
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
                  <h3 className="mt-2 font-heading text-base font-semibold text-white">
                    {signal.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted">{signal.body}</p>
                </div>
              </SaReveal>
            );
          })}
        </div>

        <SaReveal delay={0.12} className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-center font-heading text-xl font-semibold text-white">
            Results clients can open
          </h2>
          <ul className="mt-6 space-y-4">
            {proofOutcomes.map((item) => (
              <li key={item.client} className="text-sm leading-relaxed text-sa-muted">
                <Link href={item.path} className="font-semibold text-white hover:text-sa-primary">
                  {item.client}
                </Link>
                {" — "}
                {item.result}{" "}
                <a href={item.href} className="text-sa-primary hover:underline">
                  Live site
                </a>
              </li>
            ))}
          </ul>
        </SaReveal>

        <SaReveal delay={0.15} className="mt-8 text-center">
          <Link
            href="/reviews"
            className="text-sm font-medium text-sa-primary underline-offset-4 transition hover:text-white hover:underline"
          >
            Read Google reviews →
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
