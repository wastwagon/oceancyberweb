import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  DetailIntroMotion,
} from "@/components/layout/DetailPageMotion";
import { CaseStudyDesignGallery } from "@/components/portfolio/CaseStudyDesignGallery";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { getDesignArtifactsForProject } from "@/lib/portfolio/design-artifacts";
import { resolveProjectType, getProjectTypeLabel } from "@/lib/portfolio/project-type";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";

type CaseStudyNarrative = {
  challenge?: string;
  solution?: string;
  impact?: string;
};

type Props = {
  project: PortfolioCaseStudy;
  backHref: string;
  backLabel: string;
  sidebarTitle: string;
  detailTitle: string;
  narrative?: CaseStudyNarrative | null;
  relatedProjects?: PortfolioCaseStudy[];
};

export function CaseStudyDetailView({
  project,
  backHref,
  backLabel,
  sidebarTitle,
  detailTitle,
  narrative,
  relatedProjects = [],
}: Props) {
  const designArtifacts = getDesignArtifactsForProject(project);
  const projectType = resolveProjectType(project);

  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted antialiased">
      <SaPageAmbient />
      
      <div className="sa-container relative z-10 py-32">
        <div className="mx-auto max-w-6xl">
          <DetailIntroMotion>
            <>
              <div className="mb-12">
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sa-primary transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
                </Link>
              </div>

              <div className="mb-12 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <span className="sa-eyebrow">
                    {project.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-sa-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-sa-muted/60">
                    {project.year}
                  </span>
                </div>
                <h1 className="sa-title-lg mt-6">
                  {project.title}
                </h1>
                <p className="mt-4 text-xl font-medium text-sa-muted/80">
                  {project.client}
                </p>
              </div>
            </>
          </DetailIntroMotion>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <div className="sa-card overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/40 to-transparent" />
                </div>
              </div>

              {/* Quick Metrics */}
              {project.metrics ? (
                <div className="sa-card p-8 border-l-4 border-sa-primary">
                  <div className="text-4xl font-black text-white md:text-5xl">
                    {project.metrics.increase}
                  </div>
                  <div className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-sa-primary">
                    {project.metrics.metric}
                  </div>
                </div>
              ) : null}

              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  Project Overview
                </h2>
                <p className="text-lg leading-relaxed text-sa-muted/90">
                  {project.description}
                </p>
              </div>

              {narrative?.challenge || narrative?.solution || narrative?.impact ? (
                <div className="space-y-10">
                  {narrative?.challenge ? (
                    <div className="space-y-4">
                      <h3 className="font-heading text-xl font-bold text-white">
                        The Challenge
                      </h3>
                      <p className="leading-relaxed text-sa-muted/80">
                        {narrative.challenge}
                      </p>
                    </div>
                  ) : null}
                  {narrative?.solution ? (
                    <div className="space-y-4">
                      <h3 className="font-heading text-xl font-bold text-white">
                        Our Solution
                      </h3>
                      <p className="leading-relaxed text-sa-muted/80">
                        {narrative.solution}
                      </p>
                    </div>
                  ) : null}
                  {narrative?.impact ? (
                    <div className="space-y-4">
                      <h3 className="font-heading text-xl font-bold text-white">
                        Impact & Results
                      </h3>
                      <p className="leading-relaxed text-sa-muted/80">
                        {narrative.impact}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <CaseStudyDesignGallery
                artifacts={designArtifacts}
                projectTitle={project.title}
              />

              {project.services ? (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold text-white">
                    Services Provided
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-sa-border bg-sa-surface/50 px-4 py-2 text-xs font-bold text-sa-muted/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.testimonial ? (
                <div className="sa-card relative p-8 md:p-12">
                  <span className="absolute -top-4 left-8 text-6xl font-serif text-sa-primary/20">
                    {String.fromCharCode(8220)}
                  </span>
                  <div className="relative z-10">
                    <p className="text-xl italic leading-relaxed text-white/90">
                      {project.testimonial}
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-sa-primary/10 flex items-center justify-center text-sa-primary font-bold">
                        {project.client[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {project.client}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-sa-muted/60">
                          Verified Client Partner
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="sa-card p-8">
                  <h3 className="font-heading mb-8 text-sm font-bold uppercase tracking-[0.2em] text-sa-primary">
                    {sidebarTitle}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">Client</span>
                      <span className="font-bold text-white">{project.client}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">Industry</span>
                      <span className="font-bold text-white">{project.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">Delivery type</span>
                      <span className="font-bold text-white">
                        {getProjectTypeLabel(projectType)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">Year</span>
                      <span className="font-bold text-white">{project.year}</span>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-sa-border">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50 mb-4">Core Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-medium text-white/70 bg-white/5 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sa-btn-primary w-full justify-center"
                    >
                      Visit live site
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  ) : null}
                  <Link
                    href={`/contact?topic=${encodeURIComponent(project.title)}`}
                    className={project.liveUrl ? "sa-btn-outline w-full justify-center" : "sa-btn-primary w-full justify-center"}
                  >
                    Discuss this project
                  </Link>
                  <Link href={backHref} className="sa-btn-outline w-full justify-center">
                    {detailTitle}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="mt-20 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">Related work</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/portfolio/${item.slug}`}
                    className="sa-card group overflow-hidden transition hover:border-sa-primary/30"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-heading text-lg font-bold text-white group-hover:text-sa-primary">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

