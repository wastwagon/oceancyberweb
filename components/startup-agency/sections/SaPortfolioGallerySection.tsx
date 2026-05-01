"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { projects, Project } from "@/lib/data/projects";

export function SaPortfolioGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: top row moves left, bottom row moves right
  const xLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const displayProjects = projects.slice(0, 6);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative border-b border-sa-border bg-sa-bg overflow-hidden py-10 lg:py-20"
    >
      {/* Central Badge */}
      <div className="absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-black">
            Projects
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-0 w-full overflow-hidden">
        {/* Row 1 – moves left */}
        <motion.div
          style={{ x: xLeft }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[120%] -ml-[10%]"
        >
          {displayProjects.slice(0, 3).map((project, index) => (
            <PortfolioCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>

        {/* Row 2 – moves right */}
        <motion.div
          style={{ x: xRight }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[120%] -ml-[10%]"
        >
          {displayProjects.slice(3, 6).map((project, index) => (
            <PortfolioCard key={project.slug} project={project} index={index + 3} isHighlight={index === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioCard({ project, index, isHighlight }: { project: Project; index: number; isHighlight?: boolean }) {
  return (
    <SaReveal
      delay={index * 0.05}
      className={`group relative overflow-hidden border-sa-border rounded-md h-64 hover:border-green-500 transition-colors ${isHighlight ? "bg-sa-primary" : ""}`}
    >
      <Link href={"#"} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">{project.category}</p>
          <h3 className="mt-1 font-heading text-base font-semibold text-white">{project.title}</h3>
        </div>
      </Link>
    </SaReveal>
  );
}
