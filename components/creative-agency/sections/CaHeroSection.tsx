"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Play, Twitter } from "lucide-react";
import { SaShowreelModal } from "@/components/startup-agency/SaShowreelModal";
import { heroServiceSlides, serviceCards } from "@/lib/startup-agency/content";

const tickerItems = [
  ...serviceCards.map((s) => s.title),
  ...serviceCards.slice(0, 3).map((s) => s.title),
];

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/oceancyber", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/oceancyber", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/oceancyber", label: "X" },
  { icon: Facebook, href: "https://facebook.com/oceancyber", label: "Facebook", accent: true },
] as const;

export function CaHeroSection() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const heroImage = heroServiceSlides[0].image;

  return (
    <>
      <section
        id="hero"
        className="ae-band-dark relative flex min-h-[100dvh] w-full flex-col overflow-hidden pt-[max(5rem,env(safe-area-inset-top))] md:pt-24"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 13px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-1 flex-col px-4 pb-28 pt-10 sm:px-8 md:px-[75px] md:pb-32 md:pt-16">
          <div className="flex flex-1 items-stretch gap-6 lg:gap-10">
            {/* Social rail — desktop */}
            <div className="hidden w-12 shrink-0 flex-col items-center justify-center gap-4 self-center md:flex">
              <div className="h-16 w-px bg-white/30" aria-hidden />
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={
                    "accent" in s && s.accent
                      ? "flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[var(--ae-primary)] text-black transition hover:scale-105"
                      : "flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white hover:bg-white/10"
                  }
                >
                  <s.icon className="h-[18px] w-[18px]" aria-hidden />
                </Link>
              ))}
              <div className="h-16 w-px bg-white/30" aria-hidden />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h2 className="ae-display text-[clamp(3.25rem,12vw,11.625rem)]">
                <span className="block">Design</span>
                <span className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:mt-2">
                  <span className="ae-display-fade">Driven</span>
                  <span className="ae-display-fade">Impact</span>
                </span>
                <span className="relative mt-1 flex flex-wrap items-center gap-4 md:mt-2 md:gap-8">
                  <button
                    type="button"
                    onClick={() => setShowreelOpen(true)}
                    className="sa-pressable relative z-10 flex h-[72px] w-[min(100%,280px)] shrink-0 items-center justify-center rounded-full bg-[#c4c4c4] sm:h-[100px] sm:w-[320px] md:h-[160px] md:w-[420px] lg:w-[621px]"
                    aria-label="Watch showreel"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-sm md:h-20 md:w-20">
                      <Play className="ml-0.5 h-6 w-6 fill-current md:h-8 md:w-8" aria-hidden />
                    </span>
                  </button>
                  <span className="ae-display-fade block text-[clamp(3.25rem,12vw,11.625rem)]">
                    Agency
                  </span>
                </span>
              </h2>

              <div className="mt-8 hidden h-[2px] w-full max-w-3xl bg-white md:mt-4 md:block md:max-w-[752px] md:translate-x-[min(28vw,420px)]" aria-hidden />

              <p className="mt-6 max-w-xl text-base text-white/75 md:mt-8 md:text-lg">
                We design and build digital products that help African businesses grow —
                from brand and UX to launch.
              </p>
            </div>
          </div>
        </div>

        {/* Orange service ticker — template bottom bar */}
        <div className="ae-primary-bar absolute inset-x-0 bottom-0 z-20 h-[72px] overflow-hidden md:h-[100px]">
          <div className="flex h-full w-max items-center animate-ae-marquee">
            {[0, 1].map((dup) => (
              <ul
                key={dup}
                className="flex h-full list-none items-center gap-10 px-6 md:gap-14 md:px-8"
                aria-hidden={dup === 1}
              >
                {tickerItems.map((label, i) => (
                  <li
                    key={`${dup}-${label}-${i}`}
                    className="flex shrink-0 items-center gap-3 font-heading text-lg font-bold text-black md:text-[30px] md:leading-10"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-black md:h-[10px] md:w-[10px]" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <SaShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
}
