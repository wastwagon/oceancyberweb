import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaProjectsCtaSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 md:px-8">
        <SaReveal>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sa-muted">
            See case studies with goals, execution notes, and measurable outcomes.
          </p>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-sa-primary bg-sa-primary px-8 font-heading text-sm font-bold uppercase tracking-wide text-sa-bg transition hover:bg-transparent hover:text-sa-primary"
          >
            View portfolio
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
