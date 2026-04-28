import Image from "next/image";
import Link from "next/link";
import {
  DetailIntroMotion,
  DetailPageHeroAmbient,
} from "@/components/layout/DetailPageMotion";
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
};

export function CaseStudyDetailView({
  project,
  backHref,
  backLabel,
  sidebarTitle,
  detailTitle,
  narrative,
}: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900">
      <DetailPageHeroAmbient />
      <div className="container relative z-10 mx-auto px-6 py-32 md:px-8">
        <div className="mx-auto max-w-4xl">
          <DetailIntroMotion>
            <>
              <div className="mb-8">
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 text-cyan-300 transition-colors hover:text-cyan-100"
                >
                  {backLabel}
                </Link>
              </div>

              <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 p-8 backdrop-blur-xl">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                        {project.category}
                      </span>
                      <span className="text-sm text-cyan-300/70">
                        {project.year}
                      </span>
                    </div>
                    <h1 className="mb-2 text-balance text-center text-4xl font-bold text-cyan-100 md:text-5xl">
                      {project.title}
                    </h1>
                    <p className="text-center text-lg text-cyan-200/80">
                      {project.client}
                    </p>
                  </div>
                  <div className="md:w-64">
                    {project.metrics ? (
                      <div className="rounded-lg border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 p-4">
                        <div className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-3xl font-bold text-transparent">
                          {project.metrics.increase}
                        </div>
                        <div className="mt-1 text-sm text-cyan-300/70">
                          {project.metrics.metric}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          </DetailIntroMotion>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl">
                <div className="relative h-64 md:h-96">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < project.rating ? "fill-yellow-400 text-yellow-400" : "text-cyan-400"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-cyan-300/70">
                  {project.rating}/5 Rating
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-100">
                  Project Overview
                </h2>
                <p className="leading-relaxed text-cyan-200/80">
                  {project.description}
                </p>
              </div>

              {narrative?.challenge || narrative?.solution || narrative?.impact ? (
                <div className="space-y-6">
                  {narrative?.challenge ? (
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-cyan-100">
                        The Challenge
                      </h3>
                      <p className="leading-relaxed text-cyan-200/80">
                        {narrative.challenge}
                      </p>
                    </div>
                  ) : null}
                  {narrative?.solution ? (
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-cyan-100">
                        Our Solution
                      </h3>
                      <p className="leading-relaxed text-cyan-200/80">
                        {narrative.solution}
                      </p>
                    </div>
                  ) : null}
                  {narrative?.impact ? (
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-cyan-100">
                        Impact & Results
                      </h3>
                      <p className="leading-relaxed text-cyan-200/80">
                        {narrative.impact}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {project.services ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">
                    Services Provided
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-lg border border-teal-400/20 bg-teal-500/10 px-3 py-1.5 text-sm font-medium text-teal-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.results ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">
                    Results & Impact
                  </h2>
                  <p className="leading-relaxed text-cyan-200/80">
                    {project.results}
                  </p>
                </div>
              ) : null}

              {project.testimonial ? (
                <div className="rounded-lg border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-cyan-300/50">"</div>
                    <div>
                      <p className="italic leading-relaxed text-cyan-200/80">
                        {project.testimonial}
                      </p>
                      <div className="mt-4 text-right">
                        <div className="font-semibold text-cyan-100">
                          {project.client}
                        </div>
                        <div className="text-sm text-cyan-300/70">Client</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-100">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 p-6 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-bold text-cyan-100">
                    {sidebarTitle}
                  </h3>
                  <div className="space-y-3 text-cyan-200/80">
                    <div className="flex justify-between">
                      <span>Client:</span>
                      <span className="font-semibold">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-semibold">{project.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-semibold">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-semibold">{project.rating}/5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/contact?topic=${encodeURIComponent(project.title)}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Discuss this project
                  </Link>
                  <Link
                    href={backHref}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-cyan-400/50 px-6 py-3 font-semibold text-cyan-200 transition-all hover:bg-cyan-500/10"
                  >
                    {detailTitle}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
