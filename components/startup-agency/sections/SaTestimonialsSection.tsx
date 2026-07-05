"use client";

import Link from "next/link";
import { getGoogleBusinessProfileUrl } from "@/lib/startup-agency/google-business";
import { SaGoogleReviewsBanner } from "@/components/startup-agency/sections/SaGoogleReviewsBanner";
import { GoogleReviewsCarousel } from "@/components/startup-agency/sections/GoogleReviewsCarousel";
import type { GooglePlaceReview, GooglePlaceStats } from "@/lib/google-places-stats";

type Props = {
  googleStats: GooglePlaceStats;
  googleReviews: GooglePlaceReview[];
};

export function SaTestimonialsSection({ googleStats, googleReviews }: Props) {
  const profileUrl = getGoogleBusinessProfileUrl();

  return (
    <section
      id="testimonials"
      className="sa-section relative overflow-hidden border-b border-sa-border bg-sa-bg"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--sa-primary-rgb,212,255,0),0.08),transparent)]" />

      <div className="sa-container relative z-10">
        <div className="mb-12 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
            <span className="sa-eyebrow">Social Proof</span>
          </div>
          <h2 className="sa-title">What clients say on Google</h2>
          <p className="sa-subtitle mx-auto mt-4 max-w-2xl">
            Live reviews synced from our Google Business Profile — updated automatically.
          </p>
        </div>

        <SaGoogleReviewsBanner stats={googleStats} />

        {googleReviews.length === 0 ? (
          <p className="mx-auto max-w-xl text-center text-sm text-sa-muted">
            Reviews sync from Google when the Places API is configured.{" "}
            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sa-primary underline-offset-2 hover:underline"
            >
              Read reviews on Google
            </Link>
            .
          </p>
        ) : (
          <>
            <GoogleReviewsCarousel reviews={googleReviews} />
            <p className="mx-auto mt-10 max-w-lg text-center text-sm text-sa-muted">
              <Link
                href="/reviews"
                className="font-semibold text-sa-primary underline-offset-2 hover:underline"
              >
                View all Google reviews
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
