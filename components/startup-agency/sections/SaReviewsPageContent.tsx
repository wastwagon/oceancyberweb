import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import {
  getGoogleBusinessProfileUrl,
  getGoogleWriteReviewUrl,
  googleBusinessProfile,
} from "@/lib/startup-agency/google-business";
import { getReviewBadges } from "@/lib/startup-agency/reviews";
import { GoogleReviewsCarousel } from "@/components/startup-agency/sections/GoogleReviewsCarousel";
import type { GooglePlaceReview, GooglePlaceStats } from "@/lib/google-places-stats";

type Props = {
  stats: GooglePlaceStats;
  reviews: GooglePlaceReview[];
};

function StarRow({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-6 w-6 ${
            i < fullStars || (i === fullStars && hasHalf)
              ? "fill-sa-primary text-sa-primary"
              : "fill-sa-muted/20 text-sa-muted/30"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function SaReviewsPageContent({ stats, reviews }: Props) {
  const profileUrl = getGoogleBusinessProfileUrl();
  const writeReviewUrl = getGoogleWriteReviewUrl();
  const badges = getReviewBadges().map((badge) =>
    badge.id === "google"
      ? {
          ...badge,
          rating: stats.rating.toFixed(1),
          label: `${stats.reviewCount} Google review${stats.reviewCount === 1 ? "" : "s"}`,
        }
      : badge,
  );

  return (
    <main className="pt-24 md:pt-28">
      <section className="sa-container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-sa-primary">
            Verified feedback
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            What clients say on Google
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sa-muted">
            Real reviews from our Google Business Profile — synced automatically.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-[32px] border border-sa-border bg-sa-surface/50 p-8 text-center md:p-12">
          <StarRow rating={stats.rating} />
          <p className="mt-6 font-heading text-5xl font-bold text-white md:text-6xl">
            {stats.rating.toFixed(1)}
          </p>
          <p className="mt-3 text-sa-muted">
            {stats.reviewCount} verified Google reviews · {googleBusinessProfile.name}
          </p>
          {stats.source === "places-api" ? (
            <p className="mt-2 text-xs text-sa-muted/70">Synced from Google Business Profile</p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sa-primary/40 bg-sa-primary/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:border-sa-primary hover:bg-sa-primary hover:text-black"
            >
              Read on Google
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <Link
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sa-border px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:border-sa-primary/50 hover:text-sa-primary"
            >
              Write a review
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-4">
          {badges.map((badge) => (
            <Link
              key={badge.id}
              href={badge.href}
              target={badge.external ? "_blank" : undefined}
              rel={badge.external ? "noopener noreferrer" : undefined}
              className="rounded-2xl border border-sa-border bg-sa-surface/30 px-5 py-4 text-center transition hover:border-sa-primary/40"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                {badge.provider}
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-white">{badge.rating}</p>
              <p className="mt-1 text-xs text-sa-muted">{badge.label}</p>
            </Link>
          ))}
        </div>

        {reviews.length > 0 ? (
          <div className="mx-auto mt-20 max-w-4xl">
            <GoogleReviewsCarousel reviews={reviews} size="large" />
          </div>
        ) : (
          <p className="mx-auto mt-20 max-w-xl text-center text-sm text-sa-muted">
            Recent Google reviews will appear here once the Places API key is configured on the
            server.
          </p>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-sa-muted/80">
          Showing up to five recent public reviews from Google. View all {stats.reviewCount}{" "}
          on{" "}
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sa-primary underline-offset-2 hover:underline"
          >
            our Google Business Profile
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
