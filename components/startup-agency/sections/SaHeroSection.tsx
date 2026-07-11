"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";
import { SaShowreelModal } from "@/components/startup-agency/SaShowreelModal";
import { heroServiceSlides, heroTagline } from "@/lib/startup-agency/content";

export function SaHeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100dvh] w-full overflow-hidden bg-sa-bg pt-[max(5rem,env(safe-area-inset-top))] md:h-screen md:min-h-[600px] md:pt-20"
      >
        <div className="hero-grid-cells opacity-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="hero-grid-cell" />
          ))}
        </div>

        <div className="absolute inset-0 z-0 md:hidden">
          <ServicePageHeroBanner
            image={heroServiceSlides[0].image}
            alt={heroServiceSlides[0].imageAlt}
          />
        </div>

        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pb-8 transition-opacity duration-700 pointer-events-none md:px-0 md:pb-0 ${
            hoveredIndex !== null ? "md:opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-4 flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary animate-pulse" />
            <span className="text-[11px] font-medium text-white/80 md:text-[10px] md:font-bold md:uppercase md:tracking-[0.2em]">
              Engineered for results
            </span>
          </div>
          <p
            className="hidden font-heading text-[12vw] font-bold uppercase leading-none tracking-tighter md:block"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.4)",
              color: "transparent",
            }}
            aria-hidden
          >
            OceanCyber
          </p>
          <p className="sa-lead mx-auto max-w-xl text-balance text-center text-white/85 md:mt-0">
            {heroTagline}
          </p>
          <div className="pointer-events-auto mt-6 flex w-full max-w-sm flex-col gap-3 px-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
            <button
              type="button"
              onClick={() => setShowreelOpen(true)}
              className="sa-pressable inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-[15px] font-semibold text-white backdrop-blur-md sm:w-auto md:rounded-full md:text-[10px] md:font-bold md:uppercase md:tracking-[0.14em]"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden />
              Watch showreel
            </button>
            <Link
              href="/portfolio"
              className="sa-pressable inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-sa-primary bg-sa-primary px-5 py-3 text-[15px] font-semibold text-sa-bg sm:w-auto md:rounded-full md:text-[10px] md:font-bold md:uppercase md:tracking-[0.14em]"
            >
              View our work
            </Link>
            <Link
              href="/pricing"
              className="sa-pressable inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-[15px] font-semibold text-white backdrop-blur-md sm:w-auto md:rounded-full md:text-[10px] md:font-bold md:uppercase md:tracking-[0.14em]"
            >
              View pricing
            </Link>
          </div>
          <div className="mt-6 text-xs font-medium text-sa-muted/60 md:text-[11px] md:uppercase md:tracking-[0.3em]">
            Accra · London · Global
          </div>
        </div>

        <div
          className={`absolute inset-0 z-0 hidden transition-opacity duration-1000 md:block ${
            hoveredIndex !== null ? "opacity-0" : "opacity-40"
          }`}
        >
          <Image
            src={heroServiceSlides[0].image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {heroServiceSlides.map((slide, index) => (
          <div
            key={`bg-${slide.title}`}
            className={`absolute inset-0 z-0 hidden transition-all duration-1000 ease-in-out md:block ${
              hoveredIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </div>
        ))}

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
                    <span className="h-1.5 w-1.5 rounded-full bg-sa-primary animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                      Engineered for Results
                    </span>
                  </div>

                  <h2
                    className={`font-heading text-sm font-bold uppercase tracking-widest text-white transition-all duration-500 md:text-2xl ${
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
