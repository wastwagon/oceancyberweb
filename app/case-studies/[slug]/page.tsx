import { notFound } from "next/navigation";
import { CaseStudyDetailView } from "@/components/portfolio/CaseStudyDetailView";
import { getCaseStudyNarrativeBySlug } from "@/lib/data/case-studies";
import {
  getPortfolioCaseStudyBySlug,
  getPortfolioSlugs,
} from "@/lib/data/portfolio-loader";

interface CaseStudyDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const study = await getPortfolioCaseStudyBySlug(params.slug);

  // If case study not found, return 404
  if (!study) {
    notFound();
  }

  const narrative = getCaseStudyNarrativeBySlug(params.slug);

  return (
    <CaseStudyDetailView
      project={study}
      backHref="/case-studies"
      backLabel="← Back to Case Studies"
      sidebarTitle="Case Study Details"
      detailTitle="View all case studies"
      narrative={narrative}
    />
  );
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Export metadata for SEO
export async function generateMetadata({ params }: CaseStudyDetailPageProps) {
  const study = await getPortfolioCaseStudyBySlug(params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: `${study.title} - Case Study`,
    description: study.description,
    alternates: {
      canonical: `/case-studies/${params.slug}`,
    },
  };
}
