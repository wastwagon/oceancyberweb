import { Star } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { testimonials } from "@/lib/startup-agency/content";

export function SaTestimonialsSection() {
  // Duplicate the array a few times to ensure the marquee has enough content to scroll smoothly
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="sa-section scroll-mt-28 overflow-hidden border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-10 text-center">
          <span className="sa-eyebrow">Testimonials</span>
          <h2 className="sa-title mt-3 md:text-4xl">Client feedback</h2>
        </SaReveal>
      </div>

      <div className="relative mt-8 flex w-full flex-col items-center justify-center overflow-hidden py-4">
        {/* Left/Right fading gradients for a premium blend effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-sa-bg to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-sa-bg to-transparent md:w-48" />

        <div className="flex w-max animate-sa-marquee gap-6 hover:[animation-play-state:paused] md:gap-8">
          {marqueeItems.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="sa-card flex w-[320px] shrink-0 flex-col justify-between p-8 transition-colors hover:border-sa-primary/50 md:w-[400px]"
            >
              <div>
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sa-primary text-sa-primary" />
                  ))}
                </div>
                <p className="text-base italic leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sa-border bg-gradient-to-br from-sa-primary/25 to-black font-heading text-sm font-bold text-sa-primary"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-heading font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-sa-muted uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
