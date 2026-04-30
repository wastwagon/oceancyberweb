"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects as staticProjects } from "@/lib/data/projects";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { fadeUpProps, staggerDelay } from "@/lib/scroll-reveal";

type Project = PortfolioCaseStudy;

function PortfolioCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={staggerDelay(index, 0.06)}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="sa-card group relative flex h-full flex-col overflow-hidden text-left"
      >
        <div className="relative min-h-[210px] overflow-hidden sm:min-h-[230px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 grayscale group-hover:scale-[1.03] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex h-full flex-col p-4 sm:p-5 md:p-6">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-wide text-sa-primary">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 font-heading text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 text-[11px] text-sa-muted/70 sm:text-sm">{project.client}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sa-muted/80 sm:line-clamp-2">
            {project.description}
          </p>
          {project.metrics ? (
            <p className="mt-3 text-sm font-semibold text-sa-muted">
              Outcome:{" "}
              <span className="text-sa-primary">
                {project.metrics.increase} {project.metrics.metric}
              </span>
            </p>
          ) : null}
          <div className="mt-5 border-t border-sa-border pt-4">
            <span className="inline-flex items-center text-sm font-semibold text-sa-primary transition-colors group-hover:text-white">
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
      className="sa-section relative overflow-hidden"
    >
      <div className="sa-container">
        <motion.div {...fadeUpProps} className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.45 }}
            className="sa-eyebrow mb-5 inline-flex items-center"
          >
            Portfolio
          </motion.span>
          <h2 className="sa-title mb-4 sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
            Case studies with measurable outcomes
          </h2>
          <p className="sa-subtitle mx-auto">
            Explore recent delivery work across industries, with goals, execution
            details, and outcomes.
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
          className="sa-card mx-auto mt-12 max-w-3xl p-10 text-center md:mt-16 md:p-14"
        >
          <div className="mx-auto">
            <h3 className="font-heading mb-3 text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Planning your next digital product?
            </h3>
            <p className="mb-5 text-sm text-sa-muted/80 sm:mb-6 sm:text-base">
              Share your goals and we&apos;ll recommend the right engagement model
              and rollout path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="sa-btn-primary">
                Talk to our team
              </Link>
              <Link href="/case-studies" className="sa-btn-outline">
                View all case studies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
