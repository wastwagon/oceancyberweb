import type { Metadata } from "next";
import { ProposalRequestForm } from "@/components/proposal/ProposalRequestForm";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Formal proposal request",
    description:
      "Request a structured project proposal with scope, timeline, and budget alignment in one clear form.",
  },
  "/tools/proposal",
);

export default function ProposalRequestPage({
  searchParams,
}: {
  searchParams?: { topic?: string };
}) {
  const topic = typeof searchParams?.topic === "string" ? searchParams.topic : "";
  return (
    <main className="min-h-screen bg-slate-50 pt-28 md:pt-32">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/80 to-slate-50">
        <div className="container mx-auto max-w-3xl px-4 pb-8 md:px-6 md:pb-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Self-serve</p>
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Request a formal proposal
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
            Share your current situation, budget band, timeline, and the exact sections you want in your proposal. We
            use this to send a better first draft faster.
          </p>
        </div>
      </section>
      <section className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <ProposalRequestForm initialTopic={topic} />
      </section>
    </main>
  );
}
