import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Figma,
  Layers,
  Palette,
  PenTool,
  Rocket,
  Shield,
} from "lucide-react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { withCanonical } from "@/lib/seo/canonical";
import {
  clientCommitments,
  deliveryPhases,
  designPhases,
  engagementModels,
  proofLinks,
} from "@/lib/marketing/how-we-work-content";

export const metadata: Metadata = withCanonical(
  {
    title: "How we work",
    description:
      "OceanCyber's premium delivery model — discovery, design, phased build, security-aware launch, and ongoing support for Ghana and West Africa.",
  },
  "/how-we-work",
);

const designIcons = [PenTool, Layers, Figma, Palette, Rocket] as const;

export default function HowWeWorkPage() {
  return (
    <main className="sa-shell relative min-h-screen bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="sa-page-intro border-b border-sa-border">
        <div className="sa-container text-center">
          <p className="sa-eyebrow">Delivery</p>
          <h1 className="sa-title mt-6">How we work with premium clients</h1>
          <p className="sa-lead mx-auto mt-3 max-w-2xl">
            Structured discovery, visible milestones, and security-aware engineering — built for
            teams in legal, fintech, governance, and commerce who cannot afford surprises at launch.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="sa-btn-primary gap-2">
              Start intake
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/tools/project-cost" className="sa-btn-outline">
              Project calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-4 text-center">Four phases, one accountable team</h2>
          <p className="sa-subtitle mx-auto mb-12 max-w-2xl text-center">
            Every engagement follows the same spine — adapted to your sector, stack, and compliance
            scope.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {deliveryPhases.map((phase) => (
              <article key={phase.step} className="sa-card p-7 md:p-8">
                <span className="font-heading text-3xl font-black text-sa-primary">
                  0{phase.step}
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/85">{phase.body}</p>
                <ul className="mt-5 space-y-2">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-sa-muted/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="design" className="sa-section scroll-mt-28 border-b border-sa-border bg-sa-surface/10">
        <div className="sa-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="sa-eyebrow">Design</p>
            <h2 className="sa-title mt-3">Design process built for shipping</h2>
            <p className="sa-subtitle mx-auto mt-3">
              We do not stop at mockups. Research, Figma prototypes, and engineering handoff stay in
              one delivery thread.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {designPhases.map((phase, i) => {
              const Icon = designIcons[i] ?? PenTool;
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
          <p className="mt-10 text-center">
            <Link href="/services/ui-ux-design" className="text-sm font-semibold text-sa-primary hover:underline">
              UI/UX & brand design services →
            </Link>
          </p>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-12 text-center">Engagement models</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <article key={model.title} className="sa-card flex h-full flex-col p-7">
                <h3 className="font-heading text-lg font-bold text-white">{model.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted/85">{model.body}</p>
                <p className="mt-5 border-t border-sa-border pt-4 text-xs font-medium uppercase tracking-wider text-sa-primary">
                  {model.fit}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border bg-sa-surface/10">
        <div className="sa-container">
          <h2 className="sa-title mb-12 text-center">What you can expect from us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientCommitments.map((item) => (
              <div key={item.title} className="sa-card p-6">
                <Shield className="mb-4 h-5 w-5 text-sa-primary" aria-hidden />
                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-4 text-center">Proof, not promises</h2>
          <p className="sa-subtitle mx-auto mb-10 max-w-xl text-center">
            Named clients, measurable outcomes — read the case studies behind the metrics.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofLinks.map((proof) => (
              <Link
                key={proof.slug}
                href={`/portfolio/${proof.slug}`}
                className="sa-card sa-pressable group p-5 transition hover:border-sa-primary/40"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                  {proof.sector}
                </span>
                <p className="mt-2 font-heading text-sm font-bold text-white group-hover:text-sa-primary">
                  {proof.title}
                </p>
                <p className="mt-3 font-heading text-2xl font-bold text-white">{proof.metric}</p>
                <p className="text-[11px] uppercase tracking-wider text-sa-muted/70">
                  {proof.metricLabel}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-3xl text-center">
          <h2 className="sa-title">Ready to scope your programme?</h2>
          <p className="sa-subtitle mx-auto mt-4 max-w-lg">
            Start with intake, request a formal proposal, or estimate investment in Ghana cedis — we
            respond with clear next steps, not a generic brochure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-started" className="sa-btn-primary gap-2">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/tools/proposal" className="sa-btn-outline !min-h-[44px]">
              Request proposal
            </Link>
            <Link
              href="/tools/security-assessment"
              className="inline-flex min-h-[44px] items-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-6 text-xs font-bold uppercase tracking-widest text-sa-primary transition hover:border-sa-primary"
            >
              Security assessment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
