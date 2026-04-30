import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";

export function SaProjectsCtaSection() {
  return (
    <section
      id="projects"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container text-center">
        <SaReveal>
          <span className="sa-eyebrow">Projects</span>
          <h2 className="sa-title mt-3 md:text-4xl">Projects</h2>
          <p className="sa-subtitle mx-auto">
            See case studies with goals, execution notes, and measurable outcomes.
          </p>
          <Link
            href="/projects"
            className="sa-btn-primary mt-8"
          >
            View projects
          </Link>
        </SaReveal>
      </div>
    </section>
  );
}
