import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Figma,
  Layers,
  Palette,
  PenTool,
  Rocket,
  Shield,
} from "lucide-react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SITE_CTA } from "@/lib/marketing/site-cta";
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
    title: "How OceanCyber delivers projects",
    description:
      "Discovery, design, build, and launch with fixed milestones. Packages start from GHS 6,000 for teams in Ghana.",
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
          <h1 className="sa-title mt-6">How we deliver a project</h1>
          <p className="sa-lead mx-auto mt-3 max-w-2xl">
            The same four phases shown on the homepage — with engagement models, design detail, and
            proof links below. Packages start from GHS 6,000; scope is always confirmed in writing.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/pricing"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary underline underline-offset-4 hover:text-white"
            >
              Compare packages
            </Link>
            <Link
              href="/tools/project-cost"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
            >
              Estimate in cedis
            </Link>
            <Link
              href="/facts"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
            >
              Company facts
            </Link>
          </div>
        </div>
      </section>

      <section className="sa-section border-b border-sa-border">
        <div className="sa-container">
          <h2 className="sa-title mb-4 text-center">Four phases, one Accra team</h2>
          <p className="sa-subtitle mx-auto mb-12 max-w-2xl text-center">
            These match the process section on the homepage. Legal, fintech, governance, and
            commerce projects use the same spine with different compliance add-ons.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {deliveryPhases.map((phase) => (
              <article key={phase.step} className="sa-card p-5 md:p-8">
                <span className="font-heading text-3xl font-bold text-sa-primary">
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
                  <p className="text-sm font-medium text-sa-primary">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-heading text-base font-bold text-white">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">{phase.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center">
            <Link href="/services/ui-ux-design" className="sa-text-link text-sm">
              UI and brand design
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
                <p className="mt-2 font-heading text-sm font-bold text-sa-primary">
                  {model.priceHint}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted/85">{model.body}</p>
                <p className="mt-5 border-t border-sa-border pt-4 text-sm font-medium text-sa-primary">
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
                <h3 className="font-heading text-base font-semibold text-white">
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
            Named clients, measurable outcomes — browse the portfolio behind the metrics.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofLinks.map((proof) => (
              <Link
                key={proof.slug}
                href={`/portfolio/${proof.slug}`}
                className="sa-card sa-pressable group p-5 transition hover:border-sa-primary/40"
              >
                <span className="text-sm font-medium text-sa-primary">
                  {proof.sector}
                </span>
                <p className="mt-2 font-heading text-sm font-bold text-white group-hover:text-sa-primary">
                  {proof.title}
                </p>
                <p className="mt-3 font-heading text-2xl font-bold text-white">{proof.metric}</p>
                <p className="text-sm text-sa-muted">
                  {proof.metricLabel}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section border-t border-sa-border">
        <div className="sa-container max-w-3xl text-center">
          <h2 className="sa-title">Plan your scope</h2>
          <p className="sa-subtitle mx-auto mt-4 max-w-lg">
            Compare packages or run the estimator before you share goals in intake.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href={SITE_CTA.comparePackages.href} className="sa-btn-outline min-h-11 px-6">
              {SITE_CTA.comparePackages.label}
            </Link>
            <Link href={SITE_CTA.estimateInCedis.href} className="sa-btn-outline min-h-11 px-6">
              {SITE_CTA.estimateInCedis.label}
            </Link>
            <Link
              href="/facts"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline-offset-4 hover:underline"
            >
              Company facts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
