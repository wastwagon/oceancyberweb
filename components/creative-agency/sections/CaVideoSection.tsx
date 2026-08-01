"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { SaShowreelModal } from "@/components/startup-agency/SaShowreelModal";
import { showreelSlides } from "@/lib/startup-agency/content";

/** Aeolla mid-page video band — OC showreel imagery. */
export function CaVideoSection() {
  const [open, setOpen] = useState(false);
  const slide = showreelSlides[0];

  return (
    <>
      <section id="showreel" className="relative h-[60vw] max-h-[800px] min-h-[320px] w-full overflow-hidden bg-black md:h-[800px]">
        <Image
          src={slide.src}
          alt={slide.caption}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="sa-pressable flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[var(--ae-primary)] text-black transition hover:scale-105 md:h-[220px] md:w-[220px]"
            aria-label="Play showreel"
          >
            <Play className="ml-1 h-10 w-10 fill-current md:h-14 md:w-14" aria-hidden />
          </button>
        </div>
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          {slide.caption}
        </p>
      </section>
      <SaShowreelModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
