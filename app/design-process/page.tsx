import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Figma, Layers, Palette, PenTool, Rocket } from "lucide-react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { processSteps } from "@/lib/startup-agency/content";

export const metadata: Metadata = {
  title: "Design Process",
  description:
    "OceanCyber's UI/UX and brand design process — research, Figma prototypes, design systems, and engineering handoff.",
  alternates: { canonical: "/design-process" },
};

const designPhases = [
  {
    icon: PenTool,
    title: "Discover",
    body: "Stakeholder interviews, user journeys, and success metrics before pixels.",
  },
  {
    icon: Layers,
    title: "Wireframe",
    body: "Low-fidelity flows that validate structure and reduce rework in build.",
  },
  {
    icon: Figma,
    title: "Prototype",
    body: "Clickable Figma demos for usability tests and stakeholder sign-off.",
  },
  {
    icon: Palette,
    title: "Design system",
    body: "Tokens, components, and specs your engineering team can ship at scale.",
  },
  {
    icon: Rocket,
    title: "Handoff & QA",
    body: "Redlines, assets, and design QA through launch.",
  },
] as const;

export default function DesignProcessPage() {
  return (
    <main className="sa-shell relative min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-section border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container text-center">
          <p className="sa-eyebrow">How we design</p>
          <h1 className="sa-title mt-6">A design process built for shipping</h1>
          <p className="sa-lead mx-auto mt-3 max-w-2xl">
            We do not stop at mockups. Every engagement connects user research, brand
            alignment, and engineering-ready deliverables — so your product looks premium
            and launches on schedule.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/services/ui-ux-design" className="sa-btn-primary gap-2">
              UI/UX services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/portfolio" className="sa-btn-outline">
              See design in our work
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-12 text-center">
            Five phases of craft
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {designPhases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={phase.title} className="sa-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 text-sa-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/50">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-heading text-sm font-bold uppercase tracking-widest text-white">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">{phase.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-12 text-center">
            Fits our delivery model
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-sa-border bg-sa-surface/30 p-6">
                <span className="font-heading text-2xl font-bold text-sa-primary">0{step.step}</span>
                <h3 className="mt-4 font-heading text-lg font-bold uppercase text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container text-center">
          <h2 className="sa-title">Ready for a design sprint?</h2>
          <p className="sa-subtitle mx-auto mt-4 max-w-xl">
            Tell us about your product and we will propose a discovery workshop and Figma roadmap.
          </p>
          <Link
            href="/contact?topic=UI%2FUX%20design%20sprint"
            className="sa-btn-primary mt-8 inline-flex gap-2"
          >
            Book discovery
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
