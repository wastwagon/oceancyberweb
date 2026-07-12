"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type IndustryProofItem = {
  slug: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
};

type IndustryFeaturedProofProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  items: IndustryProofItem[];
};

export function IndustryFeaturedProof({
  eyebrow = "Live client work",
  title,
  subtitle,
  items,
}: IndustryFeaturedProofProps) {
  return (
    <section className="sa-section relative z-10 border-t border-sa-border bg-sa-surface/10">
      <div className="sa-container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="sa-eyebrow">{eyebrow}</p>
          <h2 className="sa-title mt-3">{title}</h2>
          <p className="sa-subtitle mx-auto mt-3">{subtitle}</p>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-sa-muted/60">
            Client-reported improvements; methodology varies by engagement.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="sa-card sa-pressable group flex flex-col p-6 transition hover:border-sa-primary/40"
            >
              <span className="font-heading text-3xl font-black text-white">{item.metric}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                {item.metricLabel}
              </span>
              <h3 className="mt-3 font-heading text-lg font-bold text-white group-hover:text-sa-primary">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sa-muted/80">{item.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary">
                Read case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
