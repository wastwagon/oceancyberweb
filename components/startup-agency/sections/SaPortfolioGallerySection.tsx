"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import {
  PortfolioWorkTypeChips,
  type WorkTypeFilter,
} from "@/components/portfolio/PortfolioWorkTypeChips";
import { siteImagePaths } from "@/lib/seo/site-image-paths";
import { fallbackPortfolioCaseStudies } from "@/lib/data/projects";
import { getPublicProjects } from "@/lib/auth-client";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import {
  enrichPortfolioCaseStudy,
  getProjectTypeLabel,
  resolveProjectType,
} from "@/lib/portfolio/project-type";

const BENTO_LAYOUT = [
  "md:col-span-2 md:row-span-2 md:min-h-[420px] lg:min-h-[520px]",
  "aspect-[16/10] md:aspect-auto md:min-h-[200px] lg:min-h-[248px]",
  "aspect-[16/10] md:aspect-auto md:min-h-[200px] lg:min-h-[248px]",
  "aspect-[4/3] md:aspect-auto md:min-h-[220px] lg:min-h-[248px]",
  "aspect-[4/3] md:aspect-auto md:min-h-[220px] lg:min-h-[248px]",
  "aspect-[4/3] md:aspect-auto md:min-h-[220px] lg:min-h-[248px]",
] as const;

export function SaPortfolioGallerySection() {
  const [dynamicProjects, setDynamicProjects] = useState<PortfolioCaseStudy[]>([]);
  const [workType, setWorkType] = useState<WorkTypeFilter>("All");
  const [activeProject, setActiveProject] = useState<PortfolioCaseStudy | null>(null);

  const closeLightbox = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeLightbox]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicProjects();
        if (data && data.length > 0) {
          setDynamicProjects(
            data.map((p) =>
              enrichPortfolioCaseStudy({
                title: p.title,
                category: p.category,
                description: p.description,
                tech: p.techStack,
                gradient: "from-sa-primary to-sa-bg",
                image: p.imageUrl || siteImagePaths.portfolio.creativeHub,
                slug: p.slug,
                year: new Date().getFullYear().toString(),
                client: p.title,
                rating: 5,
              }),
            ),
          );
        }
      } catch (err) {
        console.error("Failed to fetch dynamic projects:", err);
      }
    }
    load();
  }, []);

  const baseProjects = useMemo(
    () => fallbackPortfolioCaseStudies.map(enrichPortfolioCaseStudy),
    [],
  );

  const allProjects =
    dynamicProjects.length > 0
      ? [baseProjects[0]!, ...dynamicProjects].filter(Boolean)
      : baseProjects;

  const filteredProjects = useMemo(() => {
    if (workType === "All") return allProjects.slice(0, 6);
    return allProjects
      .filter((p) => resolveProjectType(p) === workType)
      .slice(0, 6);
  }, [allProjects, workType]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-sa-border bg-sa-bg py-16 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sa-primary/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]"
      />

      <div className="sa-container relative z-10">
        <SaSectionHeader
          align="center"
          eyebrow="Portfolio"
          title="Selected work"
          subtitle="A curated look at the interfaces, brands, and digital products we craft for ambitious teams."
          className="mb-12 md:mb-16"
        />

        <div className="mb-10">
          <PortfolioWorkTypeChips value={workType} onChange={setWorkType} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-sa-muted/70">
              {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} shown
            </p>
            <Link
              href={workType === "All" ? "/portfolio" : `/portfolio?type=${workType}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:text-white"
            >
              View full portfolio
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-sm text-sa-muted">
            No projects in this category yet.{" "}
            <button
              type="button"
              className="font-bold text-sa-primary underline"
              onClick={() => setWorkType("All")}
            >
              Show all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-4">
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                index={index}
                layoutClass={BENTO_LAYOUT[index] ?? BENTO_LAYOUT[5]}
                featured={index === 0}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.category}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={closeLightbox}
              aria-label="Close image preview"
            />

            <motion.button
              type="button"
              onClick={closeLightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.05 }}
              className="absolute right-4 top-4 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-sa-surface/90 text-white transition hover:border-sa-primary hover:text-sa-primary md:right-8 md:top-8"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </motion.button>

            <motion.figure
              className="relative z-[101] w-full max-w-6xl overflow-hidden rounded-3xl border border-sa-border bg-sa-surface shadow-2xl shadow-black/50"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                <Image
                  src={activeProject.image}
                  alt={activeProject.category}
                  fill
                  className="bg-black object-contain"
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority
                />
              </div>
              <figcaption className="flex flex-col gap-4 border-t border-sa-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
                <div>
                  <p className="font-heading text-base font-bold uppercase tracking-widest text-sa-primary md:text-lg">
                    {getProjectTypeLabel(resolveProjectType(activeProject))}
                  </p>
                  <p className="mt-1 text-sm text-white/80">{activeProject.category}</p>
                </div>
                <Link
                  href={`/portfolio/${activeProject.slug}`}
                  className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-sa-primary"
                >
                  View case study
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function PortfolioCard({
  project,
  index,
  layoutClass,
  featured,
  onOpen,
}: {
  project: PortfolioCaseStudy;
  index: number;
  layoutClass: string;
  featured?: boolean;
  onOpen: () => void;
}) {
  const type = resolveProjectType(project);
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <SaReveal delay={index * 0.06} className={layoutClass}>
      <div className="group/card relative h-full">
        <Link
          href={`/portfolio/${project.slug}`}
          aria-label={`View ${project.category} case study`}
          className={`group relative flex h-full min-h-[220px] w-full overflow-hidden rounded-3xl border border-white/10 bg-sa-surface text-left transition duration-500 hover:border-sa-primary/40 hover:shadow-[0_0_40px_-12px_rgba(0,255,200,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sa-primary md:min-h-[280px] ${
            featured ? "min-h-[260px] md:min-h-[360px]" : ""
          }`}
        >
          <Image
            src={project.image}
            alt={project.category}
            fill
            className="object-cover brightness-105 saturate-110 transition duration-700 ease-out group-hover:scale-[1.04]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            priority={featured}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 transition duration-500 group-hover:from-black/70" />

          <span
            className={`absolute left-5 top-5 font-heading font-bold text-white/15 transition group-hover:text-white/25 ${
              featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {indexLabel}
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
            <span className="mb-2 inline-block rounded-full border border-sa-primary/50 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-sm">
              {getProjectTypeLabel(type)}
            </span>
            <p
              className={`font-heading font-bold uppercase tracking-wide text-white ${
                featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg"
              }`}
            >
              {project.category}
            </p>
            {featured ? (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 line-clamp-2">
                {project.description}
              </p>
            ) : null}
            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-sa-primary opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100">
              View case study
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.category} visual preview`}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-100 backdrop-blur-sm transition duration-300 hover:border-sa-primary hover:text-sa-primary focus:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sa-primary md:opacity-0 md:group-hover/card:opacity-100"
        >
          <ZoomIn className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </SaReveal>
  );
}
