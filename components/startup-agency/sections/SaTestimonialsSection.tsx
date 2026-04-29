import { Star } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { testimonials } from "@/lib/startup-agency/content";

export function SaTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-10 text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
            Testimonials
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Client feedback
          </h2>
        </SaReveal>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:snap-none md:grid-cols-3 md:overflow-visible">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-[min(100%,340px)] shrink-0 snap-center rounded-2xl border border-sa-border bg-sa-surface/60 p-8 md:min-w-0"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sa-primary text-sa-primary" />
                ))}
              </div>
              <p className="text-base italic leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sa-border bg-gradient-to-br from-sa-primary/25 to-black font-heading text-sm font-bold text-sa-primary"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-heading font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-sa-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
