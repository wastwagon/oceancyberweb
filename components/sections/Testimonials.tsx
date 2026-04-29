"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fallbackTestimonialCards } from "@/lib/data/testimonials-fallback";
import type { TestimonialCard } from "@/lib/types/testimonial-card";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

/** Light premium: subtle grid + sky bloom (registrar / SaaS feel). */
function TestimonialsAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 18%, black 12%, transparent 72%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(520px,70vh)] w-[min(92vw,800px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_68%)] blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-white/60 to-slate-100" />
    </div>
  );
}

export function Testimonials({ cards }: { cards?: TestimonialCard[] }) {
  const testimonials = cards && cards.length > 0 ? cards : fallbackTestimonialCards;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50 to-white py-20 md:py-28"
    >
      <TestimonialsAmbient />

      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 md:px-8">
        <motion.div {...fadeUpProps} className="mx-auto mb-12 max-w-4xl md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ocean-800 shadow-sm sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-ocean-500 shadow-sm" aria-hidden />
            Client feedback
          </motion.span>

          <h2 className="mx-auto mb-5 max-w-4xl text-balance text-center text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Trusted by teams across Ghana
            <br />
            <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
              for delivery and support
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-center text-base font-normal leading-relaxed text-slate-600 md:text-lg">
            Real outcomes from organizations we partner with long term — not one-off launches.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.08)}
              className={`group relative flex flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-8 shadow-md shadow-slate-200/35 ring-1 ring-slate-200/40 transition-colors duration-300 hover:border-ocean-200/70 hover:shadow-lg md:p-9 ${
                index === 1 ? "md:mt-6" : ""
              }`}
            >
              <div className="mb-8 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 fill-current ${i < testimonial.rating ? "text-amber-400" : "text-slate-300"}`}
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mb-8 text-base font-normal italic leading-relaxed text-slate-700 md:text-lg">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ocean-200 bg-gradient-to-br from-ocean-600 to-ocean-800 text-lg font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  {testimonial.initials}
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500">
                  {testimonial.role}
                </div>
                <div className="mt-0.5 text-sm text-slate-600">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUpProps} className="mt-16 md:mt-20">
          <Link href="/contact" className="w-full sm:w-auto">
            <button
              type="button"
              className="min-h-[48px] w-full rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-10 py-4 font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Talk to our team
            </button>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
