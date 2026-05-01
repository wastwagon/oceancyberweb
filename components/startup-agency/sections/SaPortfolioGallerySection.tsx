"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { projects as staticProjects, Project } from "@/lib/data/projects";
import { getPublicProjects, type AdminSiteProjectRow } from "@/lib/auth-client";

export function SaPortfolioGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  
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
            data.map((p) => ({
              title: p.title,
              category: p.category,
              image: p.imageUrl || "/images/placeholder-project.png",
              slug: p.slug,
              link: p.slug.startsWith("http") ? p.slug : `/portfolio/${p.slug}`,
              description: p.description,
              tech: p.techStack,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch dynamic projects:", err);
      }
    }
    load();
  }, []);

  const displayProjects = dynamicProjects.length > 0 ? dynamicProjects : staticProjects.slice(0, 6);

  // Parallax: top row moves left, bottom row moves right
  const xLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

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
            <PortfolioCard 
              key={project.slug} 
              project={project} 
              index={index + 3} 
              isHighlight={index === 1} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioCard({ 
  project, 
  index, 
  isHighlight 
}: { 
  project: Project; 
  index: number; 
  isHighlight?: boolean 
}) {
  return (
    <SaReveal
      delay={index * 0.05}
      className={`group relative overflow-hidden border-sa-border h-64 transition-all duration-500 hover:z-10 ${
        isHighlight ? "ring-1 ring-inset ring-sa-primary/20" : ""
      }`}
    >
      <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-sa-bg/90 via-sa-bg/20 to-transparent p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-sa-primary">
            {project.category}
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold text-white">
            {project.title}
          </h3>
          <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 text-sa-primary transition-transform duration-300 group-hover:translate-x-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="forward"
                data-icon="arrow-right"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </SaReveal>
  );
}
