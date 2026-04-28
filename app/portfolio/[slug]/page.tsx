import { notFound } from "next/navigation";
import {
  DetailIntroMotion,
  DetailPageHeroAmbient,
} from "@/components/layout/DetailPageMotion";
import { projects as buildTimeFallbackProjects } from "@/lib/data/projects";
import { getPortfolioCaseStudyBySlug } from "@/lib/data/portfolio-loader";
import { prisma } from "@/lib/db";

/** Always resolve case study from DB / fallback so admin edits show without per-path static rebuild. */
export const dynamic = "force-dynamic";

interface PortfolioDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = await getPortfolioCaseStudyBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900">
      <DetailPageHeroAmbient />
      <div className="container relative z-10 mx-auto px-6 py-32 md:px-8">
        <div className="mx-auto max-w-4xl">
          <DetailIntroMotion>
            <>
              {/* Breadcrumb */}
              <div className="mb-8">
                <a
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-cyan-300 transition-colors hover:text-cyan-100"
                >
                  ← Back to Portfolio
                </a>
              </div>

              {/* Project Header */}
              <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 p-8 backdrop-blur-xl">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                        {project.category}
                      </span>
                      <span className="text-sm text-cyan-300/70">{project.year}</span>
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

          {/* Project Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Project Image */}
              <div className="bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl overflow-hidden">
                <div className="relative h-64 md:h-96">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-cyan-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-cyan-300/70 text-sm ml-2">{project.rating}/5 Rating</span>
              </div>

              {/* Project Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-100">Project Overview</h2>
                <p className="text-cyan-200/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Services */}
              {project.services && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">Services Provided</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 bg-teal-500/10 border border-teal-400/20 text-teal-200 text-sm font-medium rounded-lg"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">Results & Impact</h2>
                  <p className="text-cyan-200/80 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-cyan-300/50">"</div>
                    <div>
                      <p className="text-cyan-200/80 leading-relaxed italic">
                        {project.testimonial}
                      </p>
                      <div className="mt-4 text-right">
                        <div className="text-cyan-100 font-semibold">{project.client}</div>
                        <div className="text-cyan-300/70 text-sm">Client</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-100">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-cyan-100 mb-4">Project Details</h3>
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

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-lg">
                    View Case Study
                  </button>
                  <button className="w-full px-6 py-3 border border-cyan-400/50 text-cyan-200 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all">
                    View Live Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Pre-render known slugs at build; other slugs resolve at runtime (`dynamicParams` default). */
export async function generateStaticParams() {
  try {
    const rows = await prisma.project.findMany({ select: { slug: true } });
    const slugs = new Set(rows.map((r) => r.slug));
    for (const p of buildTimeFallbackProjects) {
      slugs.add(p.slug);
    }
    return [...slugs].map((slug) => ({ slug }));
  } catch {
    return buildTimeFallbackProjects.map((project) => ({ slug: project.slug }));
  }
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const project = await getPortfolioCaseStudyBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
  };
}
