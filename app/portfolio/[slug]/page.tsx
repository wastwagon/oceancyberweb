import { notFound } from "next/navigation";
import { CaseStudyDetailView } from "@/components/portfolio/CaseStudyDetailView";
import {
  getPortfolioCaseStudyBySlug,
  getPortfolioSlugs,
} from "@/lib/data/portfolio-loader";

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
    <CaseStudyDetailView
      project={project}
      backHref="/portfolio"
      backLabel="← Back to Portfolio"
      sidebarTitle="Project Details"
      detailTitle="View all portfolio"
    />
  );
}

/** Pre-render known slugs at build; other slugs resolve at runtime (`dynamicParams` default). */
export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
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
    alternates: {
      canonical: `/portfolio/${params.slug}`,
    },
  };
}
