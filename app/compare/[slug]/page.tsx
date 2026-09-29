import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoIntentPageView } from "@/components/seo/SeoIntentPageView";
import {
  getIntentPage,
  intentArticleMetadata,
  intentPagesByKind,
} from "@/lib/seo/intent-pages";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return intentPagesByKind("compare").map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return intentArticleMetadata("compare", params.slug);
}

export default function CompareArticlePage({ params }: Props) {
  const page = getIntentPage("compare", params.slug);
  if (!page) notFound();
  return <SeoIntentPageView page={page} />;
}
