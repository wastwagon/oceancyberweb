"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects as staticProjects } from "@/lib/data/projects";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { fadeUpProps, staggerDelay } from "@/lib/scroll-reveal";

type Project = PortfolioCaseStudy;

function CardClipart() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[1]">
      <div className="relative h-16 w-20">
        <div className="absolute right-0 top-0 h-12 w-12 rounded-2xl border border-white/80 bg-white/85 shadow-sm backdrop-blur-sm" />
        <div className="absolute left-0 top-6 h-8 w-8 rounded-full border border-white/80 bg-white/75" />
        <div className="absolute right-3 top-3 h-6 w-6 rounded-lg bg-ocean-50" />
      </div>
    </div>
  );
}

function PortfolioCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={staggerDelay(index, 0.06)}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-ocean-50/40 opacity-90" />
        <CardClipart />
        <div className="relative min-h-[210px] overflow-hidden sm:min-h-[230px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex h-full flex-col p-4 sm:p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 text-base font-bold tracking-tight text-slate-900 sm:text-lg md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 text-[11px] text-slate-600 sm:text-sm">{project.client}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:line-clamp-2">
            {project.description}
          </p>
          {project.metrics ? (
            <p className="mt-3 text-sm font-semibold text-slate-800">
              Outcome:{" "}
              <span className="text-ocean-700">
                {project.metrics.increase} {project.metrics.metric}
              </span>
            </p>
          ) : null}
          <div className="mt-5 border-t border-slate-200/70 pt-4">
            <span className="inline-flex items-center text-sm font-semibold text-ocean-700">
              View case study →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Portfolio({ cases }: { cases?: PortfolioCaseStudy[] }) {
  const projects = cases && cases.length > 0 ? cases : staticProjects;
  const gridProjects = projects.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-20 pt-20 md:pb-24 md:pt-28"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <motion.div {...fadeUpProps} className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center rounded-full border border-ocean-200 bg-ocean-50/95 px-4 py-2 text-xs font-medium tracking-wide text-ocean-800 shadow-sm sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Portfolio
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
            Selected work with measurable outcomes
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Browse delivery snapshots across sectors, each presented with practical goals and results.
          </p>
        </motion.div>

        {gridProjects.length > 0 ? (
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {gridProjects.map((project, index) => (
              <PortfolioCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : null}

        <motion.div
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.12 }}
          className="mx-auto mt-12 max-w-6xl text-center md:mt-16"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
              Want a portfolio-worthy project?
            </h3>
            <p className="mb-5 text-sm text-slate-600 sm:mb-6 sm:text-base">Tell us your goals and we&apos;ll recommend the best engagement path.</p>
            <div className="grid w-full max-w-md grid-cols-1 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-7 py-3 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
              >
                Talk to our team
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                View all case studies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
