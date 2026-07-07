import { notFound, redirect } from "next/navigation";
import {
  featuredClientSlugs,
  getFeaturedClientBySlug,
} from "@/lib/data/featured-client-work";

interface PortfolioDetailPageProps {
  params: {
    slug: string;
  };
}

const LEGACY_STUDIO_SLUGS = new Set(["creative-hub-template"]);

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  if (LEGACY_STUDIO_SLUGS.has(params.slug)) {
    redirect("/creative-hub");
  }

  const client = getFeaturedClientBySlug(params.slug);
  if (client) {
    redirect(client.liveUrl);
  }

  notFound();
}

/** Only featured client slugs need static paths; others 404. */
export async function generateStaticParams() {
  return featuredClientSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const client = getFeaturedClientBySlug(params.slug);

  if (!client) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${client.title} — Live client work`,
    description: client.summary,
    alternates: {
      canonical: `/portfolio/${params.slug}`,
    },
  };
}
