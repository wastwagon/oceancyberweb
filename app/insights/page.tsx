import { Suspense } from "react";
import { InsightsPageClient } from "@/components/insights/InsightsPageClient";

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
