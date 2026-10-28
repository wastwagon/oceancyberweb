import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailView } from "@/components/portfolio/CaseStudyDetailView";
import { CaseStudyPageJsonLd } from "@/components/seo/CaseStudyPageJsonLd";
import { getCaseStudyNarrativeBySlug } from "@/lib/data/case-studies";
import {
  getPortfolioCaseStudyBySlug,
  getPortfolioSlugs,
  getRelatedPortfolioProjects,
} from "@/lib/data/portfolio-loader";
import {
  portfolioDetailRobots,
  portfolioDetailTitle,
  portfolioOgImageAlt,
  portfolioOpenGraphTitle,
} from "@/lib/portfolio/portfolio-seo-metadata";
import { withCanonical } from "@/lib/seo/canonical";

const siteBase =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

interface PortfolioDetailPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300;

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = await getPortfolioCaseStudyBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const narrative = getCaseStudyNarrativeBySlug(params.slug);
  const relatedProjects = await getRelatedPortfolioProjects(
    params.slug,
    project.category,
  );

  return (
    <>
      <CaseStudyPageJsonLd project={project} narrative={narrative} />
      <CaseStudyDetailView
        project={project}
        backHref="/portfolio"
        backLabel="Back to portfolio"
        sidebarTitle="Project details"
        detailTitle="View all projects"
        narrative={narrative}
        relatedProjects={relatedProjects}
      />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const project = await getPortfolioCaseStudyBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const narrative = getCaseStudyNarrativeBySlug(params.slug);
  const description =
    narrative?.impact ??
    project.results ??
    project.description.slice(0, 160);

  const ogImage = project.image.startsWith("http")
    ? project.image
    : `${siteBase}${project.image}`;

  const ogAlt = portfolioOgImageAlt(project);
  const robots = portfolioDetailRobots(project);

  return withCanonical(
    {
      title: portfolioDetailTitle(project),
      description,
      ...(robots ? { robots } : {}),
      openGraph: {
        title: portfolioOpenGraphTitle(project),
        description,
        type: "article",
        images: [{ url: ogImage, alt: ogAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title: portfolioOpenGraphTitle(project),
        description,
        images: [ogImage],
      },
    },
    `/portfolio/${params.slug}`,
  );
}
