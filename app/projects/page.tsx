import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Projects",
    description:
      "A complete view of selected OceanCyber work, from quick wins to multi-phase digital delivery.",
  },
  "/projects",
);

export default async function ProjectsPage() {
  const cases = await getPortfolioCaseStudies();

  return (
    <main className="sa-shell min-h-screen text-white">
      <section className="border-b border-sa-border bg-black pt-28 md:pt-32">
        <div className="sa-container max-w-5xl pb-12 text-center md:pb-16">
          <p className="sa-eyebrow">Projects</p>
          <h1 className="sa-title mt-4 text-balance">
            Delivery snapshots from real engagements
          </h1>
          <p className="sa-subtitle mx-auto max-w-3xl">
            Explore the same case library as our portfolio with project-first framing for
            discovery, review, and handoff.
          </p>
        </div>
      </section>
      <div className="[&_.bg-gradient-to-b]:!bg-black [&_.from-slate-50]:!from-black [&_.to-slate-100]:!to-black [&_.text-slate-900]:!text-white [&_.text-slate-600]:!text-sa-muted [&_.border-slate-200\\/80]:!border-sa-border [&_.border-slate-200\\/90]:!border-sa-border [&_.bg-white]:!bg-sa-surface/50">
        <Portfolio cases={cases} />
      </div>
    </main>
  );
}
