"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import { SaShowreelModal } from "@/components/startup-agency/SaShowreelModal";
import { heroServiceSlides, heroTagline } from "@/lib/startup-agency/content";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export function SaHeroSection() {
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
          className={`relative z-10 flex min-h-[calc(100svh-var(--sa-mobile-tab-bar))] flex-col items-center justify-center px-4 pb-8 pt-[max(4.5rem,env(safe-area-inset-top))] pointer-events-none md:absolute md:inset-0 md:min-h-0 md:px-0 md:py-0 md:transition-opacity md:duration-700 ${
            hoveredIndex !== null ? "md:opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
            <span className="text-sm font-medium text-white/80">
              Best in Accra and Ghana · since {googleBusinessProfile.foundedYear}
            </span>
          </div>
          <h1 className="sa-title-lg mx-auto max-w-2xl text-balance text-center">
            Best web design company in Accra and Ghana
          </h1>
          <p className="sa-lead mx-auto mt-3 max-w-xl text-balance text-center text-white/85">
            {heroTagline}
          </p>
          <div className="pointer-events-auto mt-6 flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none">
            <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline-offset-4 hover:text-sa-primary hover:underline"
            >
              Talk to our team
            </Link>
          </div>
          <div className="pointer-events-auto mt-4 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 md:flex">
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline-offset-4 hover:text-sa-primary hover:underline"
            >
              View portfolio
            </Link>
            <button
              type="button"
              onClick={() => setShowreelOpen(true)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 hover:text-sa-primary hover:underline"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              Watch showreel
            </button>
          </div>
        </div>

        <picture
          className={`absolute inset-0 z-0 hidden md:block ${
            hoveredSlide ? "opacity-0" : "opacity-40"
          }`}
        >
          <source media="(min-width: 768px)" srcSet={heroServiceSlides[0].image} />
          <img
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
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

                  <h2
                    className={`font-heading text-base font-bold text-white transition-all duration-500 md:text-2xl ${
                      isHovered ? "text-sa-primary" : ""
                    }`}
                  >
                    {slide.title}
                  </h2>

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
