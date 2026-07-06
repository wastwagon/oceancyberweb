"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import type { PortfolioProjectType } from "@/lib/types/portfolio-project-type";
import { getProjectCategories } from "@/lib/data/projects-helpers";
import {
  getProjectTypeLabel,
  resolveProjectType,
} from "@/lib/portfolio/project-type";
import {
  PortfolioWorkTypeChips,
  type WorkTypeFilter,
} from "@/components/portfolio/PortfolioWorkTypeChips";
import { fadeUpProps, staggerDelay } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";

const VALID_TYPES = new Set<PortfolioProjectType>(["design", "development", "hybrid"]);

function ProjectTypeBadge({ type }: { type: PortfolioProjectType }) {
  return (
    <span className="rounded-full border border-sa-primary/30 bg-sa-primary/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-sa-primary">
      {getProjectTypeLabel(type)}
    </span>
  );
}

function PortfolioLibraryCard({
  project,
  index,
}: {
  project: PortfolioCaseStudy;
  index: number;
}) {
  const type = resolveProjectType(project);

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
        <div className="relative min-h-[260px] overflow-hidden md:min-h-[300px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-105 saturate-110 transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <ProjectTypeBadge type={type} />
          </div>
        </div>
        <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-wide text-sa-primary">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-2 font-heading text-lg font-bold tracking-tight text-white md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-sa-muted/70">{project.client}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sa-muted/80">
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

export function PortfolioFilteredLibrary(props: {
  projects: PortfolioCaseStudy[];
  showHeader?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <section className="sa-section">
          <div className="sa-container py-20 text-center text-sm text-sa-muted">
            Loading portfolio…
          </div>
        </section>
      }
    >
      <PortfolioFilteredLibraryInner {...props} />
    </Suspense>
  );
}

function PortfolioFilteredLibraryInner({
  projects,
  showHeader = true,
}: {
  projects: PortfolioCaseStudy[];
  showHeader?: boolean;
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("All");
  const [workType, setWorkType] = useState<WorkTypeFilter>("All");

  useEffect(() => {
    const t = searchParams.get("type");
    if (t && VALID_TYPES.has(t as PortfolioProjectType)) {
      setWorkType(t as PortfolioProjectType);
    }
  }, [searchParams]);

  const categories = useMemo(() => getProjectCategories(projects), [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const categoryOk = category === "All" || p.category === category;
      const type = resolveProjectType(p);
      const typeOk = workType === "All" || type === workType;
      return categoryOk && typeOk;
    });
  }, [projects, category, workType]);

  return (
    <section className="sa-section relative overflow-hidden" id="portfolio-library">
      <div className="sa-container">
        {showHeader ? (
          <motion.div {...fadeUpProps} className="mx-auto max-w-6xl text-center">
            <span className="sa-eyebrow mb-5 inline-flex items-center">Portfolio</span>
            <h2 className="sa-title mb-4 sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
              Case studies with measurable outcomes
            </h2>
            <p className="sa-subtitle mx-auto">
              Filter by delivery type or industry — each project includes design process
              artifacts where applicable.
            </p>
          </motion.div>
        ) : null}

        <div className={cn("space-y-4", showHeader ? "mt-12" : "mt-0")}>
          <PortfolioWorkTypeChips value={workType} onChange={setWorkType} />

          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by industry">
            <FilterPill active={category === "All"} onClick={() => setCategory("All")}>
              All industries
            </FilterPill>
            {categories.map((c) => (
              <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterPill>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 rounded-3xl border border-dashed border-sa-border p-10 text-center text-sm text-sa-muted">
            No projects match these filters.{" "}
            <button
              type="button"
              className="font-bold text-sa-primary underline"
              onClick={() => {
                setCategory("All");
                setWorkType("All");
              }}
            >
              Reset filters
            </button>
          </p>
        ) : (
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((project, index) => (
              <PortfolioLibraryCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}

        <motion.div
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.12 }}
          className="sa-card mx-auto mt-12 max-w-3xl p-10 text-center md:mt-16 md:p-14"
        >
          <h3 className="font-heading mb-3 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Planning your next digital product?
          </h3>
          <p className="mb-5 text-sm text-sa-muted/80 sm:mb-6 sm:text-base">
            Share your goals and we&apos;ll recommend the right engagement model and rollout path.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="sa-btn-primary">
              Talk to our team
            </Link>
            <Link href="/portfolio" className="sa-btn-outline">
              View full portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
        active
          ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
          : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
