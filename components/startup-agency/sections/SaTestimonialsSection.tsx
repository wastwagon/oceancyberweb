"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { getPublicTestimonials } from "@/lib/auth-client";
import { getGoogleBusinessProfileUrl } from "@/lib/startup-agency/google-business";
import { SaGoogleReviewsBanner } from "@/components/startup-agency/sections/SaGoogleReviewsBanner";
import { GoogleReviewCard } from "@/components/startup-agency/sections/GoogleReviewCard";
import type { GooglePlaceReview, GooglePlaceStats } from "@/lib/google-places-stats";
import { cn } from "@/lib/utils";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating?: number;
  authorUrl?: string;
  profilePhotoUrl?: string;
}

type Props = {
  googleStats: GooglePlaceStats;
  googleReviews: GooglePlaceReview[];
};

export function SaTestimonialsSection({ googleStats, googleReviews }: Props) {
  const reduceMotion = useReducedMotion();
  const [adminTestimonials, setAdminTestimonials] = useState<TestimonialData[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicTestimonials();
        if (data && data.length > 0) {
          setAdminTestimonials(
            data.map((t) => ({
              quote: t.content,
              name: t.name,
              role: t.role,
              initials: t.initials || t.name.slice(0, 2).toUpperCase(),
            })),
          );
        }
      } catch (err) {
        console.error("Failed to fetch dynamic testimonials:", err);
      }
    }
    load();
  }, []);

  const googleCards: TestimonialData[] = googleReviews.map((review) => ({
    quote: review.quote,
    name: review.name,
    role: review.role,
    initials: review.initials,
    rating: review.rating,
    authorUrl: review.authorUrl,
    profilePhotoUrl: review.profilePhotoUrl,
  }));

  const displayTestimonials =
    adminTestimonials.length > 0 ? adminTestimonials : googleCards;

  const profileUrl = getGoogleBusinessProfileUrl();

  return (
    <section id="testimonials" className="sa-section relative overflow-hidden bg-sa-bg border-b border-sa-border">
      <div className="sa-container relative z-10">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
            <span className="sa-eyebrow">Social Proof</span>
          </div>
          <h2 className="sa-title">What clients say on Google</h2>
          <p className="sa-subtitle mx-auto mt-4 max-w-2xl">
            Recent reviews from our Google Business Profile. Read the full list on Google.
          </p>
        </div>

        <SaGoogleReviewsBanner stats={googleStats} />

        {displayTestimonials.length === 0 ? (
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
        ) : reduceMotion ? (
          <div className="grid gap-6 md:grid-cols-3">
            {displayTestimonials.map((t, index) => (
              <LegacyOrGoogleCard key={`${t.name}-${index}`} testimonial={t} />
            ))}
          </div>
        ) : (
          <div className="relative grid h-[600px] grid-cols-1 gap-6 md:grid-cols-3">
            <div className="absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-sa-bg to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-sa-bg to-transparent" />

            <TestimonialColumn items={displayTestimonials} direction="down" speed="slow" />
            <div className="hidden md:block">
              <TestimonialColumn items={[...displayTestimonials].reverse()} direction="up" speed="fast" />
            </div>
            <div className="hidden md:block">
              <TestimonialColumn items={displayTestimonials} direction="down" speed="slow" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function LegacyOrGoogleCard({ testimonial: t }: { testimonial: TestimonialData }) {
  if (t.rating !== undefined) {
    return (
      <GoogleReviewCard
        review={{
          quote: t.quote,
          name: t.name,
          role: t.role,
          rating: t.rating,
          initials: t.initials,
          authorUrl: t.authorUrl,
          profilePhotoUrl: t.profilePhotoUrl,
        }}
        className="h-full bg-sa-surface/40"
      />
    );
  }

  return <AdminTestimonialCard testimonial={t} />;
}

function AdminTestimonialCard({ testimonial: t }: { testimonial: TestimonialData }) {
  return (
    <div className="sa-card flex h-full flex-col justify-between p-8">
      <p className="text-base leading-relaxed text-sa-muted/90 italic">
        {`${String.fromCharCode(8220)}${t.quote}${String.fromCharCode(8221)}`}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sa-primary font-heading text-sm font-bold text-black">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{t.name}</p>
          <p className="text-xs text-sa-muted">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialColumn({
  items,
  direction = "up",
  speed = "normal",
}: {
  items: TestimonialData[];
  direction?: "up" | "down";
  speed?: "slow" | "normal" | "fast";
}) {
  const speedClass = {
    slow: "duration-[40s]",
    normal: "duration-[30s]",
    fast: "duration-[25s]",
  }[speed];

  const loopItems = [...items, ...items];

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <div
        className={cn(
          "flex flex-col gap-6",
          direction === "up" ? "animate-sa-marquee-vertical-up" : "animate-sa-marquee-vertical-down",
          speedClass,
          "group-hover:[animation-play-state:paused]",
        )}
      >
        {loopItems.map((t, i) => (
          <LegacyOrGoogleCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}
