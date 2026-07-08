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

  return withCanonical(
    {
      title: `${project.title} — Case Study`,
      description,
      openGraph: {
        title: `${project.title} | OceanCyber Case Study`,
        description,
        type: "article",
        images: [{ url: ogImage, alt: `${project.title} — OceanCyber client work` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} | OceanCyber Case Study`,
        description,
        images: [ogImage],
      },
    },
    `/portfolio/${params.slug}`,
  );
}
