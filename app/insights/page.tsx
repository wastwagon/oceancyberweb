import type { Metadata } from "next";
import { Suspense } from "react";
import { InsightsPageClient } from "@/components/insights/InsightsPageClient";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Insights",
    description:
      "Thought leadership on security, platforms, and digital transformation — Ghana and Africa.",
  },
  "/insights",
);

function InsightsLoadingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <p className="text-sm text-slate-500">Loading insights…</p>
    </main>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<InsightsLoadingFallback />}>
      <InsightsPageClient />
    </Suspense>
  );
}
