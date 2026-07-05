"use client";

import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { getGoogleReviewCta } from "@/lib/startup-agency/reviews";

export function SaGoogleReviewsBanner() {
  const { profileUrl, rating, reviewCount, businessName } = getGoogleReviewCta();
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="mx-auto mb-12 max-w-3xl rounded-3xl border border-sa-border bg-sa-surface/40 p-6 text-center md:p-8">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < fullStars || (i === fullStars && hasHalf)
                ? "fill-sa-primary text-sa-primary"
                : "fill-sa-muted/20 text-sa-muted/30"
            }`}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
        {rating.toFixed(1)}{" "}
        <span className="text-lg font-semibold text-sa-muted md:text-xl">on Google</span>
      </p>
      <p className="mt-2 text-sm text-sa-muted">
        {reviewCount} verified reviews · {businessName}
      </p>
      <Link
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-sa-primary/40 bg-sa-primary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:border-sa-primary hover:bg-sa-primary hover:text-black"
      >
        Read reviews on Google
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
