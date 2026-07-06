"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

export function CaseStudies() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <PageAmbient />

      <section
        id="case-studies"
        className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36"
      >
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center justify-center gap-2"
            >
              <Layers className="h-4 w-4" aria-hidden />
              Success stories
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              Case
              <span className="text-sa-primary"> studies</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-8"
            >
              Selected engagements across finance, commerce, legal, and
              associations, architecture, security, and product delivery in
              one narrative per project.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.07)}
              >
                <Link
                  href={`/portfolio/${study.slug}`}
                  className="sa-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-sa-primary/50 md:flex-row md:items-stretch"
                >
                  <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-[44%] md:min-h-[260px]">
                    <Image
                      src={study.image}
                      alt={`${study.client}, ${study.title}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 38vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-sa-surface/60 md:to-sa-surface" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-sa-border bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {study.category}
                      </span>
                      <span className="rounded-full border border-sa-border bg-black/40 px-3 py-1 font-mono text-[10px] font-medium text-sa-muted backdrop-blur-md">
                        {study.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between border-t border-sa-border p-6 md:border-t-0 md:border-l md:p-8 md:pl-7">
                    <div>
                      <p className="font-heading text-[10px] font-semibold uppercase tracking-widest text-sa-primary">
                        {study.client}
                      </p>
                      <h2 className="mt-2 font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                        {study.title}
                      </h2>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-sa-muted/80 md:line-clamp-5 md:text-[0.9375rem]">
                        {study.description}
                      </p>
                    </div>

                    <div className="mt-8 flex border-t border-sa-border pt-6">
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sa-primary transition-colors group-hover:text-white">
                        Read case study
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpSoft}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
              Ready for your own story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              Share where you are today, and we&apos;ll propose scope, timeline, and
              a security-aware delivery plan.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="sa-btn-primary">
                Start your project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
