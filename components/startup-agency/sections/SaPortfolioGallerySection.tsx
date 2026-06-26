"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
                image: p.imageUrl || "/images/creative-template.png",
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
      className="relative border-b border-sa-border bg-sa-bg overflow-hidden py-10 lg:py-20"
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
          <div className="absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                Projects
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0 w-full overflow-hidden">
            <motion.div
              style={{ x: xLeft }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[120%] -ml-[10%]"
            >
              {filteredProjects.slice(0, 3).map((project, index) => (
                <PortfolioCard key={project.slug} project={project} index={index} />
              ))}
            </motion.div>

            <motion.div
              style={{ x: xRight }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[120%] -ml-[10%]"
            >
              {filteredProjects.slice(3, 6).map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  project={project}
                  index={index + 3}
                  isHighlight={index === 1}
                />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

function PortfolioCard({
  project,
  index,
  isHighlight,
}: {
  project: PortfolioCaseStudy;
  index: number;
  isHighlight?: boolean;
}) {
  const type = resolveProjectType(project);

  return (
    <SaReveal
      delay={index * 0.05}
      className={`group relative overflow-hidden border-sa-border h-[320px] md:h-[400px] transition-all duration-500 hover:z-10 ${
        isHighlight ? "ring-1 ring-inset ring-sa-primary/20" : ""
      }`}
    >
      <Link href={`/portfolio/${project.slug}`} className="block h-full w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-sa-primary/40 bg-black/70 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-sm">
            {getProjectTypeLabel(type)}
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-sa-bg/90 via-sa-bg/20 to-transparent p-6 opacity-100 transition-all duration-500 md:opacity-0 md:group-hover:opacity-100">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-sa-primary">
            {project.category}
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold text-white">{project.title}</h3>
        </div>
      </Link>
    </SaReveal>
  );
}
