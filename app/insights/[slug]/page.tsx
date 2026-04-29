import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticleView } from "@/components/insights/InsightArticleView";
import {
  getInsightPostBySlug,
  insightArticlePath,
  insightPosts,
} from "@/lib/insights/content";

const siteBase =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://oceancyber.net";

interface InsightArticlePageProps {
  params: { slug: string };
}

export default function InsightArticlePage({ params }: InsightArticlePageProps) {
  const post = getInsightPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return <InsightArticleView post={post} />;
}

export function generateStaticParams() {
  return insightPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: InsightArticlePageProps): Metadata {
  const post = getInsightPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article not found",
      description: "This insight could not be found.",
    };
  }

  const canonicalPath = insightArticlePath(post.slug);
  const pageUrl = `${siteBase}${canonicalPath}`;
  const ogImage = post.image.startsWith("http")
    ? post.image
    : `${siteBase}${post.image}`;

  return {
    title: `${post.title} — Insights`,
    description: post.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: pageUrl,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}
