"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import type { GooglePlaceReview } from "@/lib/google-places-stats";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

type Props = {
  reviews: GooglePlaceReview[];
  className?: string;
  /** Larger typography and padding on the dedicated /reviews page */
  size?: "default" | "large";
};

function StarRow({ rating, className }: { rating: number; className?: string }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "text-sm leading-none",
            i < fullStars || (i === fullStars && hasHalf)
              ? "text-sa-primary"
              : "text-sa-muted/25",
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CarouselReviewCard({
  review,
  size,
}: {
  review: GooglePlaceReview;
  size: "default" | "large";
}) {
  const large = size === "large";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[28px] border border-sa-border/80 bg-gradient-to-br from-sa-surface/80 via-sa-surface/50 to-sa-bg/40 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)] backdrop-blur-sm md:p-8",
        large && "md:p-10",
      )}
    >
      <Quote
        className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 text-sa-primary/[0.07] md:h-28 md:w-28"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <StarRow rating={review.rating} className={large ? "scale-110 origin-left" : undefined} />
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sa-border/60 bg-sa-bg/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sa-muted">
          <FcGoogle className="h-3.5 w-3.5" aria-hidden />
          Google
        </span>
      </div>

      <blockquote
        className={cn(
          "relative mt-5 flex-1 text-sm leading-relaxed text-sa-muted/95 md:text-base md:leading-relaxed",
          large && "md:text-lg md:leading-relaxed",
        )}
      >
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      <footer className="relative mt-6 flex items-center gap-4 border-t border-sa-border/50 pt-5">
        {review.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profilePhotoUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-sa-primary/20"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-black ring-2 ring-sa-primary/20">
            {review.initials}
          </div>
        )}
        <div className="min-w-0">
          {review.authorUrl ? (
            <Link
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-bold text-white transition hover:text-sa-primary md:text-base"
            >
              {review.name}
            </Link>
          ) : (
            <p className="truncate text-sm font-bold text-white md:text-base">{review.name}</p>
          )}
          <p className="text-xs text-sa-muted md:text-sm">{review.role}</p>
        </div>
      </footer>
    </article>
  );
}

export function GoogleReviewsCarousel({ reviews, className, size = "default" }: Props) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const count = reviews.length;

  const goTo = useCallback(
    (index: number, dir?: number) => {
      if (count < 1) return;
      setDirection(dir ?? (index > active ? 1 : -1));
      setActive(((index % count) + count) % count);
    },
    [active, count],
  );

  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  useEffect(() => {
    if (count < 2 || reduceMotion || paused) return;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, goNext, paused, reduceMotion]);

  if (count === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir >= 0 ? 48 : -48,
      opacity: reduceMotion ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir >= 0 ? -48 : 48,
      opacity: reduceMotion ? 1 : 0,
    }),
  };

  return (
    <div
      className={cn("relative mx-auto w-full max-w-3xl", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Google reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={cn(
          "relative min-h-[280px] md:min-h-[300px]",
          size === "large" && "md:min-h-[340px]",
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <CarouselReviewCard review={reviews[active]!} size={size} />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 -left-2 z-10 hidden items-center md:flex">
            <button
              type="button"
              onClick={goPrev}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-sa-border bg-sa-bg/90 text-white shadow-lg backdrop-blur transition hover:border-sa-primary/50 hover:text-sa-primary"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 -right-2 z-10 hidden items-center md:flex">
            <button
              type="button"
              onClick={goNext}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-sa-border bg-sa-bg/90 text-white shadow-lg backdrop-blur transition hover:border-sa-primary/50 hover:text-sa-primary"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-sa-border bg-sa-surface/50 text-white transition hover:border-sa-primary/40 md:hidden"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
              {reviews.map((review, i) => (
                <button
                  key={`${review.name}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Review ${i + 1} of ${count} by ${review.name}`}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active
                      ? "w-8 bg-sa-primary"
                      : "w-2 bg-sa-muted/30 hover:bg-sa-muted/50",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-sa-border bg-sa-surface/50 text-white transition hover:border-sa-primary/40 md:hidden"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mx-auto mt-4 flex max-w-xs flex-wrap items-center justify-center gap-2">
            {reviews.map((review, i) => (
              <button
                key={`thumb-${review.name}-${i}`}
                type="button"
                onClick={() => goTo(i, i > active ? 1 : -1)}
                className={cn(
                  "rounded-full transition-all",
                  i === active
                    ? "ring-2 ring-sa-primary ring-offset-2 ring-offset-sa-bg"
                    : "opacity-60 hover:opacity-100",
                )}
                aria-label={`Show review by ${review.name}`}
              >
                {review.profilePhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.profilePhotoUrl}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                    {review.initials}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
