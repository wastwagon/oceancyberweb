"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import { SaShowreelModal } from "@/components/startup-agency/SaShowreelModal";
import { SITE_CTA, getStartedHref } from "@/lib/marketing/site-cta";
import { heroServiceSlides, heroTagline } from "@/lib/startup-agency/content";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import {
  homeHeroH1,
  homeHeroSupportLine,
} from "@/lib/seo/ghana-local-market";

type Props = {
  tagline?: string;
  /** Live from Places API when configured; falls back to static GBP in page shell. */
  heroReviewsLine?: string;
};

export function SaHeroSection({ tagline = heroTagline, heroReviewsLine }: Props) {
  const reviewsLine =
    heroReviewsLine ??
    `Rated ${googleBusinessProfile.rating.toFixed(1)} from ${googleBusinessProfile.reviewCount} Google reviews`;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const hoveredSlide = hoveredIndex === null ? null : heroServiceSlides[hoveredIndex];

  return (
    <>
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-sa-bg md:h-screen md:min-h-[600px] md:pt-28"
      >
        <div className="hero-grid-cells hidden opacity-20 md:flex">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="hero-grid-cell" />
          ))}
        </div>

        <div
          className={`relative z-10 flex min-h-[calc(100dvh-var(--sa-mobile-tab-bar)-var(--sa-mobile-header))] flex-col items-center justify-center px-4 pb-6 pt-[var(--sa-mobile-header)] pointer-events-none md:absolute md:inset-0 md:min-h-0 md:px-0 md:py-0 md:transition-opacity md:duration-700 ${
            hoveredIndex !== null ? "md:opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
            <span className="text-sm font-medium text-white/80">
              Accra team · since {googleBusinessProfile.foundedYear}
            </span>
          </div>
          <h1 className="sa-title-lg mx-auto max-w-2xl text-balance text-center">
            {homeHeroH1}
          </h1>
          <p className="sa-lead mx-auto mt-3 max-w-xl text-balance text-center text-white/85">
            {tagline}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-sm text-white/70">
            {homeHeroSupportLine}
          </p>
          <p className="pointer-events-auto mt-3 text-center text-sm font-medium text-white/65">
            <Link href="/reviews" className="underline-offset-2 hover:underline">
              {reviewsLine}
            </Link>
            {" · "}
            packages from GHS 6,000 · MoMo &amp; Paystack
          </p>
          <div className="pointer-events-auto mt-6 flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none">
            <Link
              href={getStartedHref({ topic: "Project from homepage hero" })}
              className="sa-btn-primary w-full sm:w-auto"
            >
              {SITE_CTA.getStarted.label}
            </Link>
          </div>
          <div className="pointer-events-auto mt-4 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 md:flex">
            <Link
              href={SITE_CTA.selectedWork.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
            >
              {SITE_CTA.selectedWork.label}
            </Link>
            <button
              type="button"
              onClick={() => setShowreelOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              Watch showreel
            </button>
          </div>
        </div>

        {/* Desktop-only hero plate: real URL lives on <source>; tiny data URI avoids empty-src console errors and mobile downloads. */}
        <picture
          className={`absolute inset-0 z-0 hidden md:block ${
            hoveredSlide ? "opacity-0" : "opacity-40"
          }`}
        >
          <source media="(min-width: 768px)" srcSet={heroServiceSlides[0].image} />
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
          />
        </picture>

        {hoveredSlide ? (
          <div className="absolute inset-0 z-0 hidden md:block">
            <Image
              src={hoveredSlide.image}
              alt={hoveredSlide.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </div>
        ) : null}

        <div className="relative z-20 hidden min-h-0 w-full border-t border-white/5 md:flex md:h-full md:flex-row">
          {heroServiceSlides.map((slide, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={slide.title}
                href={slide.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex min-h-[72px] flex-1 cursor-pointer items-center justify-between border-b border-white/10 px-5 py-4 transition-all duration-700 ease-in-out last:border-b-0 md:min-h-0 md:flex-col md:items-end md:justify-end md:border-b-0 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:hover:flex-[2]"
              >
                <div className="flex w-full flex-col items-start md:mb-20 md:items-center md:text-center">
                  <div className="mb-1 hidden items-center justify-center gap-2 md:mb-4 md:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
                    <span className="text-sm font-medium text-white/80">
                      Built for results
                    </span>
                  </div>

                  <span
                    className={`font-heading text-base font-bold text-white transition-all duration-500 md:text-2xl ${
                      isHovered ? "text-sa-primary" : ""
                    }`}
                  >
                    {slide.title}
                  </span>

                  <div
                    className={`hidden h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-all duration-500 md:mt-6 md:flex ${
                      isHovered
                        ? "border-sa-primary bg-sa-primary/20 scale-125"
                        : "group-hover:border-white group-hover:bg-white/10"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transform transition-all duration-500 ${
                        isHovered ? "-rotate-45 text-sa-primary" : "text-white"
                      }`}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                <span className="text-white/40 md:hidden" aria-hidden>
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <SaShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
}
