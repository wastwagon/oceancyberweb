"use client";

import Link from "next/link";
import { getGoogleBusinessProfileUrl } from "@/lib/startup-agency/google-business";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { SaGoogleReviewsBanner } from "@/components/startup-agency/sections/SaGoogleReviewsBanner";
import { GoogleReviewsCarousel } from "@/components/startup-agency/sections/GoogleReviewsCarousel";
import { SaFeaturedQuotesStrip } from "@/components/startup-agency/sections/SaFeaturedQuotesStrip";
import type { GooglePlaceReview, GooglePlaceStats } from "@/lib/google-places-stats";
import type { TestimonialCard } from "@/lib/types/testimonial-card";

type Props = {
  googleStats: GooglePlaceStats;
  googleReviews: GooglePlaceReview[];
  featuredCards?: TestimonialCard[];
};

export function SaTestimonialsSection({ googleStats, googleReviews, featuredCards = [] }: Props) {
  const profileUrl = getGoogleBusinessProfileUrl();

  return (
    <section
      id="testimonials"
      className="sa-section relative overflow-hidden border-b border-sa-border bg-sa-bg"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(var(--sa-primary-rgb,212,255,0),0.08),transparent)]" />

      <div className="sa-container relative z-10">
        <SaSectionHeader
          className="mb-12 md:mb-14"
          eyebrow="Social Proof"
          title="What clients say on Google"
          subtitle="Live reviews synced from our Google Business Profile — updated automatically."
        />

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

        <SaFeaturedQuotesStrip cards={featuredCards} />
      </div>
    </section>
  );
}
