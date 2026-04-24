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

const securityHeroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const securityHeroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const securityHeroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: securityHeroEase },
  },
};

const SECURITY_HERO_GRID = 52;

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 75% at 50% 0%, black 0%, transparent 78%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(480px,55vh)] w-[min(100%,880px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.26)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

/** Hero - conic drift + breathing core + right spotlight & reflection sweep */
function SecurityHeroAmbient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Right-side pool - soft “spotlight” (static when reduced motion) */}
      {reduceMotion ? (
        <div
          className="absolute -right-[5%] top-[6%] h-[min(78vh,720px)] w-[min(72vw,640px)] opacity-[0.32]"
          style={{
            background:
              "radial-gradient(ellipse 72% 58% at 72% 32%, rgba(147,197,253,0.22) 0%, rgba(59,130,246,0.14) 38%, rgba(20,50,150,0.08) 58%, transparent 76%)",
            filter: "blur(58px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute -right-[6%] top-[4%] h-[min(82vh,760px)] w-[min(78vw,680px)]"
          style={{
            background:
              "radial-gradient(ellipse 74% 60% at 70% 34%, rgba(191,219,254,0.2) 0%, rgba(96,165,250,0.26) 28%, rgba(59,130,246,0.14) 52%, rgba(20,50,150,0.06) 72%, transparent 82%)",
            filter: "blur(56px)",
          }}
          animate={{
            opacity: [0.26, 0.44, 0.3, 0.4, 0.26],
            x: [0, -28, 8, 0],
            scale: [1, 1.04, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute inset-0 opacity-[0.55]"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, transparent 40%, rgba(255,255,255,0.06) 49.5%, rgba(224,242,254,0.14) 50%, rgba(255,255,255,0.06) 50.5%, transparent 60%, transparent 100%)",
              mixBlendMode: "overlay",
            }}
            animate={{ x: ["-40%", "45%", "-40%"] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.2,
            }}
          />
          <motion.div
            className="absolute left-1/2 top-[5%] h-[min(140vmin,1100px)] w-[min(140vmin,1100px)] -translate-x-1/2 rounded-full blur-[115px]"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 50%, rgba(20,50,150,0.75) 0deg, rgba(59,130,246,0.35) 100deg, rgba(147,197,253,0.2) 200deg, rgba(20,50,150,0.65) 300deg, rgba(20,50,150,0.75) 360deg)",
              opacity: 0.16,
            }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(96,165,250,0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20,50,150,0.5) 1px, transparent 1px)
              `,
              backgroundSize: `${SECURITY_HERO_GRID}px ${SECURITY_HERO_GRID}px`,
              maskImage:
                "linear-gradient(118deg, transparent 34%, black 50%, transparent 66%)",
              WebkitMaskImage:
                "linear-gradient(118deg, transparent 34%, black 50%, transparent 66%)",
              mixBlendMode: "screen",
            }}
            animate={{
              x: [100, -120, 40, 0],
              y: [0, 28, -18, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : null}

      {reduceMotion ? (
        <div
          className="absolute left-1/2 top-[4%] h-[min(400px,45vh)] w-[min(92vw,720px)] -translate-x-1/2 opacity-[0.62]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,50,150,0.4) 0%, transparent 70%)",
            filter: "blur(84px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute left-1/2 top-[4%] h-[min(400px,45vh)] w-[min(92vw,720px)] -translate-x-1/2 blur-[84px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,50,150,0.44) 0%, transparent 70%)",
          }}
          animate={{
            opacity: [0.5, 0.88, 0.55, 0.78, 0.5],
            scale: [1, 1.1, 0.96, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_96%_80%_at_50%_28%,transparent_36%,rgba(0,0,10,0.58)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#00000a]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/40 via-transparent to-[#00000a]" />
    </div>
  );
}

/** Phased steps - timeline rail pulse + diagonal sweep */
function SecurityStepsAmbient() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#00000a]/40 via-transparent to-[#00000a]/90" aria-hidden />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-[15px] top-[5%] h-[90%] w-16 -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-blue-400/28 to-transparent blur-2xl md:left-[19px] md:w-24"
        animate={{
          opacity: [0.2, 0.55, 0.32, 0.48, 0.2],
          scaleY: [0.88, 1.06, 0.94, 1.02, 0.88],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-y-[-20%] -left-[30%] w-[50%] -skew-x-[9deg] opacity-[0.35]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.035) 46%, rgba(191,219,254,0.08) 50%, rgba(255,255,255,0.035) 54%, transparent 100%)",
        }}
        animate={{ x: ["-6vw", "118vw"] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3.5,
        }}
      />
      <motion.div
        className="absolute -bottom-[28%] left-[-15%] h-[min(420px,50vh)] w-[min(520px,75vw)] rounded-full bg-[#143296cc]/[0.18] blur-[100px]"
        animate={{
          opacity: [0.22, 0.42, 0.28, 0.36, 0.22],
          scale: [1, 1.1, 0.98, 1.04, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 0.6,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00000a]/55 via-transparent to-[#00000a]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/30 via-transparent to-[#00000a]/85" />
    </div>
  );
}

/** Stats - slow counter-rotating soft pools */
function SecurityStatsAmbient() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(20,50,150,0.12)_0%,transparent_55%,rgba(0,0,10,0.75)_100%)]"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[min(380px,42vh)] w-[min(480px,55vw)] rounded-full bg-blue-500/[0.1] blur-[95px]"
        animate={{
          x: [0, 36, -12, 0],
          y: [0, 22, -8, 0],
          opacity: [0.35, 0.55, 0.4, 0.5, 0.35],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-[18%] bottom-[5%] h-[min(360px,40vh)] w-[min(440px,52vw)] rounded-full bg-[#143296cc]/[0.2] blur-[90px]"
        animate={{
          x: [0, -32, 14, 0],
          y: [0, -18, 20, 0],
          scale: [1, 1.08, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 1.2,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_25%,rgba(0,0,10,0.65)_100%)]" />
    </div>
  );
}

/** CTA - tight vignette + slow edge pulse */
function SecurityCtaAmbient() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#00000a]/45 via-transparent to-[#00000a]/80" aria-hidden />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(90%,520px)] w-[min(95%,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.2)_0%,transparent_70%)] blur-[80px]"
        animate={{
          opacity: [0.25, 0.45, 0.3, 0.4, 0.25],
          scale: [1, 1.04, 0.99, 1.03, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/50 via-transparent to-[#00000a]/70" />
    </div>
  );
}

export default function SecurityJourneyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      {/* Hero - taller band, content vertically centered */}
      <section className="relative z-10 flex min-h-[68vh] flex-col justify-center overflow-hidden border-b border-white/[0.06] py-28 md:min-h-[74vh] md:py-36">
        <SecurityHeroAmbient />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 py-4 text-center md:px-8 md:py-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={securityHeroContainer}
          >
            <motion.span
              variants={securityHeroItem}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 will-change-transform"
            >
              <Shield className="h-3.5 w-3.5 text-blue-400" aria-hidden />
              Security program
            </motion.span>
            <motion.h1
              variants={securityHeroItem}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl will-change-transform"
            >
              Your security
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
                journey, engineered
              </span>
            </motion.h1>
            <motion.p
              variants={securityHeroItem}
              className="mx-auto mt-8 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-400 md:text-lg will-change-transform"
            >
              Six disciplined phases, from first assessment through continuous
              improvement, so protection, compliance, and operations move
              together.
            </motion.p>
          </motion.div>

          {/* Phase strip - at-a-glance */}
          <motion.div
            {...fadeUpSoft}
            className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2 md:gap-3"
          >
            {journeySteps.map((step, i) => (
              <span
                key={step.phase}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-300 md:text-xs"
              >
                <span className="font-mono text-blue-400/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.phase}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey steps */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <SecurityStepsAmbient />
        <div className="container relative z-10 mx-auto max-w-3xl px-6 md:max-w-4xl md:px-8">
          <motion.div {...fadeUpProps} className="mb-14 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              Phased delivery
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-4xl">
              How we run the program
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-400 md:text-base">
              Each phase has clear outcomes, artifacts, and handoffs, so
              leadership always knows what was delivered and what comes next.
            </p>
          </motion.div>

          <div className="relative pl-2 md:pl-4">
            <div
              className="absolute left-[15px] top-4 bottom-24 w-px bg-gradient-to-b from-blue-500/70 via-[#143296cc]/75 to-blue-400/15 md:left-[19px]"
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
                    className="absolute left-[15px] top-8 z-[1] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#00000a] bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.5)] md:left-[19px]"
                    aria-hidden
                  />
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#143296cc]/40">
                    <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:gap-10 md:p-8">
                      <div className="shrink-0 md:w-[7.5rem]">
                        <p className="font-mono text-4xl font-bold leading-none text-white/[0.07] md:text-5xl">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/95">
                          Phase {index + 1}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {step.phase}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-[0.9375rem]">
                          {step.description}
                        </p>
                        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {step.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5 text-sm text-slate-300"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-blue-500/90"
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
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] py-20 md:py-24">
        <SecurityStatsAmbient />
        <div className="container relative z-10 mx-auto max-w-5xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mb-12 text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              Outcomes
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-4xl">
              Security by the numbers
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 md:text-base">
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
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-colors hover:border-[#143296cc]/35"
              >
                <div className="font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-blue-200/90">
                  {s.label}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 md:text-sm">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 overflow-hidden py-20 md:py-24">
        <SecurityCtaAmbient />
        <div className="container relative z-10 mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Start your security journey
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Book a discovery session, and we&apos;ll map your current posture,
              priorities, and a practical first 90 days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/25 transition-all hover:brightness-110 active:scale-[0.98] md:text-base"
            >
              Schedule security assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
