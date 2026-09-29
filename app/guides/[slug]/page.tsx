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
  return intentPagesByKind("guide").map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return intentArticleMetadata("guide", params.slug);
}

export default function GuidePage({ params }: Props) {
  const page = getIntentPage("guide", params.slug);
  if (!page) notFound();
  return <SeoIntentPageView page={page} />;
}
