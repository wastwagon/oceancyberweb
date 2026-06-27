"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import {
  PortfolioWorkTypeChips,
  type WorkTypeFilter,
} from "@/components/portfolio/PortfolioWorkTypeChips";
import { fallbackPortfolioCaseStudies } from "@/lib/data/projects";
import { getPublicProjects } from "@/lib/auth-client";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import {
  enrichPortfolioCaseStudy,
  getProjectTypeLabel,
  resolveProjectType,
} from "@/lib/portfolio/project-type";

export function SaPortfolioGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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
                image: p.imageUrl || "/images/portfolio-showcase/portfolio-creative-hub.webp",
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

  const xLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-sa-border bg-sa-bg py-10 lg:py-20"
    >
      <div className="sa-container relative z-20 mb-8">
        <PortfolioWorkTypeChips value={workType} onChange={setWorkType} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-sa-muted/70">
            {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"} shown
          </p>
          <Link
            href={workType === "All" ? "/portfolio" : `/portfolio?type=${workType}`}
            className="text-xs font-bold uppercase tracking-widest text-sa-primary hover:text-white"
          >
            View full portfolio →
          </Link>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="sa-container py-16 text-center text-sm text-sa-muted">
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
        <>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                Projects
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-0 overflow-hidden">
            <motion.div
              style={{ x: xLeft }}
              className="-ml-[10%] grid w-[120%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.slice(0, 3).map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={() => setActiveProject(project)}
                />
              ))}
            </motion.div>

            <motion.div
              style={{ x: xRight }}
              className="-ml-[10%] grid w-[120%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.slice(3, 6).map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  project={project}
                  index={index + 3}
                  isHighlight={index === 1}
                  onOpen={() => setActiveProject(project)}
                />
              ))}
            </motion.div>
          </div>
        </>
      )}

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
            aria-label={activeProject.title}
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
                  alt={activeProject.title}
                  fill
                  className="bg-black object-contain"
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  priority
                />
              </div>
              <figcaption className="border-t border-sa-border px-5 py-4 md:px-6 md:py-5">
                <p className="font-heading text-base font-bold text-white md:text-lg">
                  {activeProject.title}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sa-primary">
                  {activeProject.category}
                </p>
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
  isHighlight,
  onOpen,
}: {
  project: PortfolioCaseStudy;
  index: number;
  isHighlight?: boolean;
  onOpen: () => void;
}) {
  const type = resolveProjectType(project);

  return (
    <SaReveal
      delay={index * 0.05}
      className={`group relative h-[320px] overflow-hidden border-sa-border transition-all duration-500 hover:z-10 md:h-[400px] ${
        isHighlight ? "ring-1 ring-inset ring-sa-primary/30" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${project.title}`}
        className="block h-full w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sa-primary"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover brightness-105 saturate-110 transition duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" aria-hidden />
        </div>
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-sa-primary/50 bg-black/60 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-sm">
            {getProjectTypeLabel(type)}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-sa-primary">
            {project.category}
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold text-white md:text-2xl">
            {project.title}
          </h3>
        </div>
      </button>
    </SaReveal>
  );
}
