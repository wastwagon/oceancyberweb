"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { getReviewBadges } from "@/lib/startup-agency/reviews";

export function SaReviewBadges() {
  const badges = getReviewBadges();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {badges.map((badge) => (
        <Link
          key={badge.id}
          href={badge.href}
          target={badge.external ? "_blank" : undefined}
          rel={badge.external ? "noopener noreferrer" : undefined}
          className="group flex min-w-[200px] items-center gap-4 rounded-2xl border border-sa-border bg-sa-surface/40 px-5 py-4 transition duration-300 hover:border-sa-primary/50 hover:bg-sa-surface/70"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sa-border bg-black/40 font-heading text-[10px] font-bold uppercase tracking-wider text-white">
            {badge.provider.slice(0, 2)}
          </div>
            <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold text-white">{badge.rating}</span>
              {badge.id === "google" ? (
                <>
                  <Star className="h-4 w-4 fill-sa-primary text-sa-primary" aria-hidden />
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-sa-muted">
                    {badge.provider}
                  </span>
                </>
              ) : (
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-sa-muted">
                  {badge.provider}
                </span>
              )}
              {badge.external ? (
                <ExternalLink className="ml-1 h-3 w-3 text-sa-muted opacity-0 transition group-hover:opacity-100" aria-hidden />
              ) : null}
            </div>
            <p className="mt-0.5 text-xs text-sa-muted/80">{badge.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
