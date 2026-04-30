"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { projects as staticProjects } from "@/lib/data/projects";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";

/** Featured grid cap keeps motion stagger sane and nudges users to `/portfolio` for the full library. */
const DEFAULT_VISIBLE_CAP = 12;

function ProjectCard({ project, index }: { project: PortfolioCaseStudy; index: number }) {
  return (
    <SaReveal delay={Math.min(index, 17) * 0.06}>
      <Link
        href={`/portfolio/${project.slug}`}
        className="sa-card group flex h-full flex-col overflow-hidden p-0"
      >
        <div className="relative min-h-[200px] w-full overflow-hidden sm:min-h-[220px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-sa-muted">
            {project.category} · {project.year}
          </p>
          <h2 className="mt-2 font-heading text-lg font-bold leading-tight text-white md:text-xl">
            {project.title}
          </h2>
          <p className="mt-1 text-xs text-sa-muted sm:text-sm">{project.client}</p>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-sa-muted">
            {project.description}
          </p>
          {project.metrics ? (
            <p className="mt-3 text-sm font-semibold text-white">
              Outcome:{" "}
              <span className="text-sa-primary">
                {project.metrics.increase} {project.metrics.metric}
              </span>
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-[0.14em] text-sa-primary">
            View case study
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </SaReveal>
  );
}

export function SaProjectsPageGrid({
  cases,
  maxVisible = DEFAULT_VISIBLE_CAP,
}: {
  cases?: PortfolioCaseStudy[];
  /** Max cards on this page; remainder surfaced via portfolio link. */
  maxVisible?: number;
}) {
  const projects = cases && cases.length > 0 ? cases : staticProjects;
  const total = projects.length;
  const cap = Math.max(1, maxVisible);
  const visible = projects.slice(0, cap);
  const truncated = total > cap;

  return (
    <section className="sa-section border-b border-sa-border" aria-label="Project case studies">
      <div className="sa-container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {truncated ? (
          <p className="mt-8 text-center text-sm text-sa-muted">
            Showing {cap} of {total} case studies. Browse the full library on the portfolio page.
          </p>
        ) : null}

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-sm text-sa-muted">
            {truncated
              ? "Every engagement is also listed on the main portfolio with the same detail pages."
              : "Want the full marketing portfolio view? It lives on the main portfolio surface with the same case library."}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/portfolio" className="sa-btn-outline min-h-[48px] px-6 text-xs">
              {truncated ? "View all case studies" : "Open portfolio"}
            </Link>
            <Link href="/contact" className="sa-btn-primary min-h-[48px] px-6 text-xs">
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
