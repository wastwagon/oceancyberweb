import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { projects as staticProjects } from "@/lib/data/projects";

export function SaProjectsCtaSection() {
  const featuredProjects = staticProjects.slice(0, 4);

  return (
    <section
      id="projects"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="sa-eyebrow">Projects</span>
            <h2 className="sa-title mt-3 md:text-4xl">Featured work</h2>
          </div>
          <Link href="/portfolio" className="sa-btn-outline shrink-0">
            View all projects
          </Link>
        </SaReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <SaReveal
              key={project.slug}
              delay={index * 0.1}
              className={`group flex flex-col ${index % 2 !== 0 ? "md:mt-16" : ""}`}
            >
              <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden sa-card p-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </Link>
              <div className="mt-6 flex flex-col items-start px-2">
                <p className="font-heading text-xs font-semibold uppercase tracking-widest text-sa-primary">
                  {project.category}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white transition-colors group-hover:text-sa-primary">
                  {project.title}
                </h3>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-sa-primary group-hover:text-sa-primary"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
