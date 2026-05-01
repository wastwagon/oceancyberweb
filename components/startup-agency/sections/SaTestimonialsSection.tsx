"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { testimonials } from "@/lib/startup-agency/content";

export function SaTestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Vertical parallax transforms for each column
  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [-50, -250]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  // Distribute testimonials into 3 columns (repeating to fill space)
  const col1 = [...testimonials, ...testimonials].slice(0, 4);
  const col2 = [...testimonials, ...testimonials].slice(1, 5);
  const col3 = [...testimonials, ...testimonials].slice(2, 6);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="sa-section relative scroll-mt-28 overflow-hidden border-b border-sa-border md:scroll-mt-32 h-[1200px] lg:h-[1500px]"
    >
      <div className="sa-container relative z-20">
        <SaReveal className="mb-10 text-center">
          <span className="sa-eyebrow">Testimonials</span>
          <h2 className="sa-title mt-3 md:text-4xl">Client feedback</h2>
        </SaReveal>
      </div>

      <div className="absolute inset-0 top-[20%] z-10 flex w-full justify-center gap-6 px-6 lg:gap-8 lg:px-12">
        {/* Column 1 */}
        <motion.div style={{ y: yCol1 }} className="flex flex-1 flex-col gap-6 lg:gap-8">
          {col1.map((t, index) => (
            <TestimonialCard key={`c1-${index}`} t={t} />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: yCol2 }} className="flex flex-1 flex-col gap-6 lg:gap-8">
          {col2.map((t, index) => (
            <TestimonialCard key={`c2-${index}`} t={t} />
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: yCol3 }} className="hidden flex-1 flex-col gap-6 lg:flex lg:gap-8">
          {col3.map((t, index) => (
            <TestimonialCard key={`c3-${index}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade for the wall */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-sa-bg via-sa-bg/80 to-transparent" />
    </section>
  );
}

type TestimonialType = typeof testimonials[number];

function TestimonialCard({ t }: { t: TestimonialType }) {
  return (
    <div className="sa-card flex flex-col justify-between p-6 transition-all duration-500 hover:border-sa-primary/50 lg:p-8">
      <div>
        <div className="mb-4 flex gap-1 lg:mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-sa-primary text-sa-primary lg:h-4 lg:w-4" />
          ))}
        </div>
        <p className="text-sm italic leading-relaxed text-white/90 lg:text-base">&ldquo;{t.quote}&rdquo;</p>
      </div>
      <div className="mt-6 flex items-center gap-4 lg:mt-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sa-border bg-gradient-to-br from-sa-primary/25 to-black font-heading text-xs font-bold text-sa-primary lg:h-12 lg:w-12 lg:text-sm">
          {t.initials}
        </span>
        <div>
          <p className="font-heading text-sm font-semibold text-white lg:text-base">{t.name}</p>
          <p className="text-[10px] text-sa-muted uppercase tracking-wider lg:text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}
