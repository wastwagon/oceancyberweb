import type { Metadata } from "next";
import { Suspense } from "react";
import { InsightsPageClient } from "@/components/insights/InsightsPageClient";
import { getInsightPosts } from "@/lib/data/insights-loader";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 60;

export const metadata: Metadata = withCanonical(
  {
    title: "Insights",
    description:
      "Thought leadership on security, platforms, and digital transformation — Ghana and Africa.",
    alternates: {
      types: {
        "application/rss+xml": "/insights/feed.xml",
      },
    },
  },
  "/insights",
);

function InsightsLoadingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sa-bg">
      <p className="text-sm text-sa-muted/50">Loading insights…</p>
    </main>
  );
}

export default async function InsightsPage() {
  const posts = await getInsightPosts();

  return (
    <Suspense fallback={<InsightsLoadingFallback />}>
      <InsightsPageClient posts={posts} />
    </Suspense>
  );
}
