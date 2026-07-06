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
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted pt-28 md:pt-32">
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-8 md:pb-10">
          <p className="sa-eyebrow mb-3 text-center block">Self-serve</p>
          <h1 className="sa-title mt-3 text-center md:text-4xl">
            Request a formal proposal
          </h1>
          <p className="sa-lead mx-auto mt-3 text-center">
            Share your current situation, budget band, timeline, and the exact sections you want in your proposal. We
            use this to send a better first draft faster.
          </p>
        </div>
      </section>
      <section className="sa-container relative z-10 max-w-3xl py-8 md:py-10">
        <ProposalRequestForm initialTopic={topic} />
      </section>
    </main>
  );
}
