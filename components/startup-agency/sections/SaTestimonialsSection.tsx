"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { googleReviewHighlights } from "@/lib/startup-agency/google-business";
import { getPublicTestimonials } from "@/lib/auth-client";
import { SaGoogleReviewsBanner } from "@/components/startup-agency/sections/SaGoogleReviewsBanner";
import { cn } from "@/lib/utils";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export function SaTestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const [dynamicTestimonials, setDynamicTestimonials] = useState<TestimonialData[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicTestimonials();
        if (data && data.length > 0) {
          setDynamicTestimonials(
            data.map((t) => ({
              quote: t.content,
              name: t.name,
              role: t.role,
              initials: t.initials || t.name.slice(0, 2).toUpperCase(),
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch dynamic testimonials:", err);
      }
    }
    load();
  }, []);

  const displayTestimonials =
    dynamicTestimonials.length > 0 ? dynamicTestimonials : [...googleReviewHighlights];

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
            Highlights from verified Google reviews. Read the full list on our Business Profile.
          </p>
        </div>

        <SaGoogleReviewsBanner />

        {reduceMotion ? (
          <div className="grid gap-6 md:grid-cols-3">
            {displayTestimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
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

function TestimonialCard({ testimonial: t }: { testimonial: TestimonialData }) {
  const isGoogle = t.name === "Verified on Google";

  return (
    <div className="sa-card flex flex-col justify-between p-8">
      <p className="text-base leading-relaxed text-sa-muted/90 italic">
        {`${String.fromCharCode(8220)}${t.quote}${String.fromCharCode(8221)}`}
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-bold ${
            isGoogle ? "bg-white text-black" : "bg-sa-primary text-black"
          }`}
        >
          {isGoogle ? "G" : t.initials}
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
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {loopItems.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}
