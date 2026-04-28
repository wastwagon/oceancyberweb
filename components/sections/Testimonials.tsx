"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fallbackTestimonialCards } from "@/lib/data/testimonials-fallback";
import type { TestimonialCard } from "@/lib/types/testimonial-card";
import { fadeUpProps, revealViewport, staggerDelay } from "@/lib/scroll-reveal";

/** Background treatment aligned with Hero (`#00000a`, brand blue grid / glow). */
function TestimonialsAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 18%, black 12%, transparent 72%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(520px,70vh)] w-[min(92vw,800px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.28)_0%,transparent_68%)] blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00000a]" />
    </div>
  );
}

export function Testimonials({ cards }: { cards?: TestimonialCard[] }) {
  const testimonials = cards && cards.length > 0 ? cards : fallbackTestimonialCards;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#00000a] py-24 md:py-32"
    >
      <TestimonialsAmbient />

      <div className="container relative z-10 mx-auto px-6 text-center md:px-8">
        <motion.div {...fadeUpProps} className="mx-auto mb-16 max-w-4xl md:mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={revealViewport}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-blue-300 backdrop-blur-md"
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
              aria-hidden
            />
            Client stories
          </motion.span>

          <h2 className="mx-auto mb-6 max-w-4xl text-balance text-center text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            What Our Clients Say
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
              About Our Work
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-center text-lg font-light leading-relaxed text-slate-400 md:text-xl">
            98% satisfaction rate. Hear how we help businesses across Ghana
            build trust and grow online.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={staggerDelay(index, 0.1)}
              className={`group relative flex flex-col items-center rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-md transition-all duration-500 hover:border-[#143296cc]/50 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-[#143296cc]/10 ${
                index === 1 ? "md:mt-8" : ""
              }`}
            >
              <div className="mb-8 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 fill-current ${i < testimonial.rating ? "text-blue-400" : "text-slate-600"}`}
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mb-10 text-lg font-light italic leading-relaxed text-slate-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#143296cc] bg-gradient-to-br from-[#143296cc] to-ocean-600 text-xl font-bold text-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                  {testimonial.initials}
                </div>
                <div className="text-lg font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-500">
                  {testimonial.role}
                </div>
                <div className="mt-0.5 text-sm text-slate-400">
                  {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUpProps} className="mt-16 md:mt-20">
          <Link href="/contact">
            <button
              type="button"
              className="rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-10 py-4 font-bold text-white shadow-lg shadow-[#143296cc]/20 transition-all hover:brightness-125 active:scale-95"
            >
              Book an appointment
            </button>
          </Link>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </section>
  );
}
