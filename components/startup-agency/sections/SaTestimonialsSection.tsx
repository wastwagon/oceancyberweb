"use client";

import { useEffect, useState } from "react";
import { testimonials as staticTestimonials } from "@/lib/startup-agency/content";
import { getPublicTestimonials } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export function SaTestimonialsSection() {
  const [dynamicTestimonials, setDynamicTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const displayTestimonials = dynamicTestimonials.length > 0 ? dynamicTestimonials : staticTestimonials;

  // Split into 3 columns for varied movement
  const col1 = [...displayTestimonials, ...displayTestimonials];
  const col2 = [...displayTestimonials, ...displayTestimonials];
  const col3 = [...displayTestimonials, ...displayTestimonials];

  return (
    <section id="testimonials" className="sa-section relative overflow-hidden bg-sa-bg border-b border-sa-border">
      <div className="sa-container relative z-10">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" />
            <span className="sa-eyebrow">Social Proof</span>
          </div>
          <h2 className="sa-title">What our partners say</h2>
        </div>

        <div className="relative grid h-[600px] grid-cols-1 gap-6 md:grid-cols-3">
          {/* Fading Gradients */}
          <div className="absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-sa-bg to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-sa-bg to-transparent" />

          {/* Column 1: Slow Downwards */}
          <TestimonialColumn items={col1} direction="down" speed="slow" />
          
          {/* Column 2: Faster Upwards (Visible on MD+) */}
          <div className="hidden md:block">
            <TestimonialColumn items={col2} direction="up" speed="fast" />
          </div>

          {/* Column 3: Slow Downwards (Visible on MD+) */}
          <div className="hidden md:block">
            <TestimonialColumn items={col3} direction="down" speed="slow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialColumn({ 
  items, 
  direction = "up", 
  speed = "normal" 
}: { 
  items: any[], 
  direction?: "up" | "down",
  speed?: "slow" | "normal" | "fast"
}) {
  const speedClass = {
    slow: "duration-[40s]",
    normal: "duration-[30s]",
    fast: "duration-[25s]"
  }[speed];

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
        {items.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="sa-card group/card flex flex-col justify-between p-8 transition-all hover:border-sa-primary/40 hover:bg-sa-surface/50"
          >
            <p className="text-base leading-relaxed text-sa-muted/90 italic">
              "{t.quote}"
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
        ))}
      </div>
    </div>
  );
}
