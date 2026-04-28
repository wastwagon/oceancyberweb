"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects as staticProjects } from "@/lib/data/projects";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { fadeUpProps, staggerDelay } from "@/lib/scroll-reveal";

type Project = PortfolioCaseStudy;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={staggerDelay(index, 0.07)}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-2 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {project.category} · {project.year}
          </p>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">{project.title}</h3>
          <p className="text-sm text-slate-600">{project.client}</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
          <p className="pt-1 text-sm font-semibold text-ocean-700">View project →</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function Portfolio({ cases }: { cases?: PortfolioCaseStudy[] }) {
  const projects = cases && cases.length > 0 ? cases : staticProjects;
  const [featured, ...rest] = projects;
  const conciseProjects = rest.slice(0, 3);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-20 pt-24 md:pb-24 md:pt-28"
    >
      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div {...fadeUpProps} className="mx-auto max-w-6xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2.5 text-sm font-medium tracking-wide text-ocean-800 shadow-sm"
          >
            Selected Work
          </motion.span>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Portfolio that proves outcomes
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Inspired by top global studio patterns: fewer, stronger case studies with clear context and easy next steps.
          </p>
        </motion.div>

        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2"
          >
            <div className="relative min-h-[280px] md:min-h-[430px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">
                Featured case
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{featured.client}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 md:line-clamp-2 md:text-base">
                {featured.description}
              </p>
              <Link
                href={`/portfolio/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean-700"
              >
                Read full case study →
              </Link>
            </div>
          </motion.div>
        ) : null}

        {conciseProjects.length > 0 ? (
          <div className="mx-auto mt-8 grid max-w-6xl gap-6 md:mt-10 md:grid-cols-2">
            {conciseProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : null}

        <motion.div
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.12 }}
          className="mx-auto mt-14 max-w-6xl text-center md:mt-16"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Want a portfolio-worthy project?
            </h3>
            <p className="mb-6 text-slate-600">Tell us your goals and we&apos;ll recommend the best engagement path.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-7 py-3 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
              >
                Start your project
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
