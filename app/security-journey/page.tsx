"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Link from "next/link";
import {
  fadeUpProps,
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";

const journeySteps = [
  {
    phase: "Assessment",
    title: "Security audit & risk analysis",
    description:
      "A structured evaluation of your security posture: surface risks, compliance gaps, and threat scenarios relevant to your industry.",
    features: [
      "Vulnerability scanning",
      "Risk assessment",
      "Compliance audit",
      "Security gap analysis",
    ],
  },
  {
    phase: "Planning",
    title: "Security strategy development",
    description:
      "A tailored roadmap that aligns controls, policies, and architecture with your business goals and regulatory obligations.",
    features: [
      "Security framework design",
      "Policy development",
      "Incident response planning",
      "Security architecture",
    ],
  },
  {
    phase: "Implementation",
    title: "Solution deployment",
    description:
      "Controlled rollout of controls and tooling, minimizing disruption while hardening identity, network, and endpoints.",
    features: [
      "Firewall configuration",
      "Endpoint protection",
      "Network security",
      "Access control systems",
    ],
  },
  {
    phase: "Monitoring",
    title: "Continuous security monitoring",
    description:
      "Always-on visibility into events and anomalies: correlation, alerting, and tuning so signal rises above noise.",
    features: [
      "Real-time threat detection",
      "Security event monitoring",
      "Log analysis",
      "Alert management",
    ],
  },
  {
    phase: "Response",
    title: "Incident response & recovery",
    description:
      "When minutes matter: containment, eradication, and recovery runbooks executed with clear communication and evidence handling.",
    features: [
      "Incident investigation",
      "Containment strategies",
      "Data recovery",
      "Post-incident analysis",
    ],
  },
  {
    phase: "Optimization",
    title: "Enhancement & training",
    description:
      "Iterate controls as threats evolve, with metrics-driven improvements plus security culture through targeted enablement.",
    features: [
      "Security awareness training",
      "Policy updates",
      "Technology upgrades",
      "Performance optimization",
    ],
  },
] as const;

const stats = [
  {
    value: "99.9%",
    label: "Uptime posture",
    detail: "Architected for resilient, monitored operations.",
  },
  {
    value: "24/7",
    label: "Coverage model",
    detail: "Detection and escalation paths you can rely on.",
  },
  {
    value: "60%+",
    label: "Typical risk reduction",
    detail: "After remediation cycles on comparable programs.",
  },
] as const;

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

export default function SecurityJourneyPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <PageAmbient />

      {/* Hero */}
      <section className="sa-page-intro relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center justify-center gap-2"
            >
              <Shield className="h-4 w-4" aria-hidden />
              Security program
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title-lg mx-auto max-w-4xl text-balance"
            >
              Your security
              <br />
              <span className="text-sa-primary">journey, engineered</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-lead mx-auto mt-3"
            >
              Six disciplined phases, from first assessment through continuous
              improvement, so protection, compliance, and operations move
              together.
            </motion.p>
          </motion.div>

          {/* Phase strip */}
          <motion.div
            {...fadeUpSoft}
            className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2 md:gap-3"
          >
            {journeySteps.map((step, i) => (
              <span
                key={step.phase}
                className="inline-flex items-center gap-2 rounded-full border border-sa-border bg-black/40 px-3 py-1.5 text-[11px] font-medium text-sa-muted shadow-sm md:text-xs"
              >
                <span className="font-mono text-sa-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.phase}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey steps */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-3xl md:max-w-4xl">
          <motion.div {...fadeUpProps} className="mb-14 md:mb-16">
            <p className="sa-eyebrow mb-3 block">
              Phased delivery
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              How we run the program
            </h2>
            <p className="mt-4 max-w-xl text-sa-muted/80 md:text-lg">
              Each phase has clear outcomes, artifacts, and handoffs, so
              leadership always knows what was delivered and what comes next.
            </p>
          </motion.div>

          <div className="relative pl-2 md:pl-4">
            <div
              className="absolute left-[15px] top-4 bottom-24 w-px bg-gradient-to-b from-sa-primary/80 via-sa-primary/40 to-transparent md:left-[19px]"
              aria-hidden
            />
            <ol className="space-y-8 md:space-y-10">
              {journeySteps.map((step, index) => (
                <motion.li
                  key={step.phase}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={staggerDelay(index, 0.06)}
                  className="relative pl-9 md:pl-11"
                >
                  <span
                    className="absolute left-[15px] top-8 z-[1] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-sa-bg bg-sa-primary shadow-[0_0_14px_rgba(187,243,64,0.35)] md:left-[19px]"
                    aria-hidden
                  />
                  <div className="sa-card overflow-hidden transition-colors hover:border-sa-primary/50">
                    <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:gap-10 md:p-8">
                      <div className="shrink-0 md:w-[7.5rem]">
                        <p className="font-mono text-4xl font-bold leading-none text-white/10 md:text-5xl">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-sa-primary">
                          Phase {index + 1}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {step.phase}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-sa-muted/80 md:text-[0.9375rem]">
                          {step.description}
                        </p>
                        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {step.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5 text-sm text-sa-muted/80"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary"
                                strokeWidth={2}
                                aria-hidden
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-5xl">
          <motion.div {...fadeUpProps} className="mb-12 text-center md:mb-14">
            <p className="sa-eyebrow mb-3 block">
              Outcomes
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Security by the numbers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sa-muted/80 md:text-lg">
              Targets we design programs around: measured, reviewed, and
              reported in language your board understands.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {stats.map((s, index) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.07)}
                className="sa-card p-8 text-center"
              >
                <div className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 font-heading text-[10px] font-semibold uppercase tracking-widest text-sa-primary">
                  {s.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sa-section relative z-10">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpProps}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
              Start your security journey
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              Book a discovery session, and we&apos;ll map your current posture,
              priorities, and a practical first 90 days.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="sa-btn-primary">
                Schedule security assessment
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
