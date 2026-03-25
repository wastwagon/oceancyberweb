import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/data/case-studies';

interface CaseStudyDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  // Find case study by slug
  const study = caseStudies.find(s => s.slug === params.slug);

  // If case study not found, return 404
  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900">
      <div className="container mx-auto px-6 md:px-8 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <a 
              href="/case-studies" 
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors"
            >
              ← Back to Case Studies
            </a>
          </div>

          {/* Case Study Header */}
          <div className="bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-sm font-medium text-cyan-200">
                    {study.category}
                  </span>
                  <span className="text-sm text-cyan-300/70">{study.year}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-2">
                  {study.title}
                </h1>
                <p className="text-cyan-200/80 text-lg">
                  {study.client}
                </p>
              </div>
              <div className="md:w-64">
                {study.metrics && (
                  <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                      {study.metrics.increase}
                    </div>
                    <div className="text-sm text-cyan-300/70 mt-1">
                      {study.metrics.metric}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Case Study Image */}
              <div className="bg-gradient-to-br from-ocean-800/50 to-ocean-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl overflow-hidden">
                <div className="relative h-64 md:h-96">
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={study.image}
                      alt={study.title}
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
                    className={`w-5 h-5 ${i < study.rating ? 'text-yellow-400 fill-yellow-400' : 'text-cyan-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-cyan-300/70 text-sm ml-2">{study.rating}/5 Rating</span>
              </div>

              {/* Project Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-cyan-100">Project Overview</h2>
                <p className="text-cyan-200/80 leading-relaxed">
                  {study.description}
                </p>
              </div>

              {/* Case Study Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-cyan-100 mb-3">The Challenge</h3>
                  <p className="text-cyan-200/80 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-cyan-100 mb-3">Our Solution</h3>
                  <p className="text-cyan-200/80 leading-relaxed">
                    {study.solution}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-cyan-100 mb-3">Impact & Results</h3>
                  <p className="text-cyan-200/80 leading-relaxed">
                    {study.impact}
                  </p>
                </div>
              </div>

              {/* Services */}
              {study.services && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">Services Provided</h2>
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((service) => (
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
              {study.results && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-cyan-100">Detailed Results</h2>
                  <p className="text-cyan-200/80 leading-relaxed">
                    {study.results}
                  </p>
                </div>
              )}

              {/* Testimonial */}
              {study.testimonial && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-cyan-300/50">"</div>
                    <div>
                      <p className="text-cyan-200/80 leading-relaxed italic">
                        {study.testimonial}
                      </p>
                      <div className="mt-4 text-right">
                        <div className="text-cyan-100 font-semibold">{study.client}</div>
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
                  {study.tech.map((tech) => (
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
                  <h3 className="text-lg font-bold text-cyan-100 mb-4">Case Study Details</h3>
                  <div className="space-y-3 text-cyan-200/80">
                    <div className="flex justify-between">
                      <span>Client:</span>
                      <span className="font-semibold">{study.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-semibold">{study.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-semibold">{study.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-semibold">{study.rating}/5</span>
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

// Generate static paths for better performance
export async function generateStaticParams() {
  return caseStudies.map(study => ({
    slug: study.slug
  }));
}

// Export metadata for SEO
export async function generateMetadata({ params }: CaseStudyDetailPageProps) {
  const study = caseStudies.find(s => s.slug === params.slug);

  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.'
    };
  }

  return {
    title: `${study.title} - Case Study`,
    description: study.description,
  };
}
