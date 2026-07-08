"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { FeaturedClientWork } from "@/lib/data/featured-client-work";

type ClientWorkGridProps = {
  items: FeaturedClientWork[];
  className?: string;
};

export function ClientWorkGrid({ items, className = "" }: ClientWorkGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8 ${className}`}
    >
      {items.map((item) => (
        <article
          key={item.slug}
          className="sa-card sa-pressable group flex h-full flex-col overflow-hidden text-left transition duration-300 hover:border-sa-primary/40 active:scale-[0.99]"
        >
          <Link href={`/portfolio/${item.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-sa-primary/40 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-sm">
                Case study
              </span>
              <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-medium text-white/70 backdrop-blur-sm">
                Live client
              </span>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-wide text-sa-primary">
              {item.category}
            </p>
            <Link href={`/portfolio/${item.slug}`}>
              <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-white transition-colors group-hover:text-sa-primary md:text-2xl">
                {item.title}
              </h3>
            </Link>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted/80">
              {item.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-sa-border pt-4">
              <Link
                href={`/portfolio/${item.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-sa-primary transition-colors hover:text-white"
              >
                Read case study
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-sa-muted/70 transition-colors hover:text-white"
              >
                Visit live site
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
