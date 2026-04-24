"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  ArrowRight,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  fadeFromLeft,
  fadeFromRight,
  fadeUpProps,
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

const teamMembers = [
  {
    name: "Marcus Owusu",
    role: "Founder & CEO",
    image: "/images/EGP Ghana.webp",
    bio: "Technology visionary with 15+ years of experience in digital transformation and cybersecurity solutions across Africa.",
    expertise: [
      "Strategic Leadership",
      "Digital Transformation",
      "Cybersecurity",
      "Business Development",
    ],
  },
  {
    name: "Sarah Mensah",
    role: "CTO & Lead Architect",
    image: "/images/Fitch Advisory.webp",
    bio: "Software architect specializing in scalable cloud solutions and cutting-edge technologies for enterprise applications.",
    expertise: ["Cloud Architecture", "DevOps", "AI/ML", "System Design"],
  },
  {
    name: "Kwame Nkrumah",
    role: "Head of Security",
    image: "/images/Juelle Hair.webp",
    bio: "Certified cybersecurity expert dedicated to protecting businesses from evolving digital threats.",
    expertise: [
      "Security Auditing",
      "Incident Response",
      "Compliance",
      "Risk Management",
    ],
  },
  {
    name: "Ama Serwaa",
    role: "Creative Director",
    image: "/images/Tour World Tourism.webp",
    bio: "Award-winning designer passionate about creating user experiences that blend beauty with functionality.",
    expertise: ["UI/UX Design", "Brand Identity", "Digital Marketing", "User Research"],
  },
];

const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description: "OceanCyber established in Accra, Ghana",
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Secured our first enterprise client in the financial sector",
  },
  {
    year: "2020",
    title: "Team Expansion",
    description: "Grew from 5 to 25 team members across multiple African countries",
  },
  {
    year: "2021",
    title: "Award Recognition",
    description: "Recognized as Top Tech Company in West Africa",
  },
  {
    year: "2022",
    title: "International Expansion",
    description: "Opened offices in Nigeria and Kenya",
  },
  {
    year: "2023",
    title: "100+ Clients",
    description: "Successfully served 100+ businesses across various industries",
  },
  {
    year: "2024",
    title: "Innovation Lab",
    description: "Launched R&D lab focusing on AI and blockchain technologies",
  },
];

const stats = [
  { label: "Years of craft", value: "15+" },
  { label: "Clients served", value: "100+" },
  { label: "Industries", value: "12+" },
  { label: "SOC coverage", value: "24/7" },
];

const missionPillars = [
  {
    title: "Innovation",
    body: "We push the boundaries of technology so your business stays ahead in a fast-moving digital landscape.",
    Icon: Sparkles,
  },
  {
    title: "Excellence",
    body: "Every engagement is held to a high bar: architecture, security, design, and delivery you can stake your reputation on.",
    Icon: Award,
  },
  {
    title: "Partnership",
    body: "We work as an extension of your team: clear communication, shared goals, and outcomes measured in your success.",
    Icon: UsersRound,
  },
] as const;

const aboutHeroEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const aboutHeroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const aboutHeroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: aboutHeroEase },
  },
};

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.22]"
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
            "radial-gradient(ellipse 95% 80% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(520px,60vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.28)_0%,transparent_72%)] blur-[90px]" />
    </div>
  );
}

/** Finer grid than home hero (64px); motion language = conic + drifting band, not radial circle wave */
const ABOUT_HERO_GRID_PX = 56;

function AboutHeroAmbient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Wide top arc - violet / indigo halo (soft spotlight behind headline) */}
      {reduceMotion ? (
        <div
          className="absolute left-1/2 top-[-16%] h-[min(68vh,640px)] w-[min(118vw,900px)] -translate-x-1/2 opacity-[0.52]"
          style={{
            background:
              "radial-gradient(ellipse 125% 80% at 50% 0%, rgba(216,204,255,0.2) 0%, rgba(167,139,250,0.26) 14%, rgba(139,92,246,0.28) 26%, rgba(99,102,241,0.16) 42%, rgba(49,46,129,0.08) 55%, transparent 72%)",
            filter: "blur(76px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute left-1/2 top-[-18%] h-[min(72vh,680px)] w-[min(128vw,960px)] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 132% 84% at 50% 0%, rgba(224,214,255,0.2) 0%, rgba(180,167,255,0.26) 10%, rgba(139,92,246,0.32) 22%, rgba(124,58,237,0.22) 38%, rgba(79,70,229,0.12) 52%, rgba(30,27,75,0.06) 62%, transparent 76%)",
            filter: "blur(72px)",
          }}
          animate={{
            opacity: [0.5, 0.78, 0.55, 0.7, 0.5],
            scale: [1, 1.035, 0.99, 1.02, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute left-1/2 top-[8%] h-[min(150vmin,1180px)] w-[min(150vmin,1180px)] -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              background:
                "conic-gradient(from 40deg at 50% 50%, rgba(20,50,150,0.7) 0deg, rgba(96,165,250,0.35) 95deg, rgba(191,219,254,0.22) 175deg, rgba(20,50,150,0.55) 265deg, rgba(20,50,150,0.7) 360deg)",
              opacity: 0.18,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59,130,246,0.45) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20,50,150,0.55) 1px, transparent 1px)
              `,
              backgroundSize: `${ABOUT_HERO_GRID_PX}px ${ABOUT_HERO_GRID_PX}px`,
              maskImage:
                "linear-gradient(102deg, transparent 36%, black 50%, transparent 64%)",
              WebkitMaskImage:
                "linear-gradient(102deg, transparent 36%, black 50%, transparent 64%)",
              mixBlendMode: "screen",
            }}
            animate={{
              x: [-140, 160, -60, 0],
              y: [0, 36, -24, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-x-[-25%] top-[28%] h-[min(22vh,180px)] bg-gradient-to-b from-transparent via-blue-400/15 to-transparent blur-md"
            animate={{
              y: ["-35%", "40%", "-15%"],
              opacity: [0, 0.55, 0.12, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.2,
            }}
          />
        </>
      ) : null}

      {reduceMotion ? (
        <div
          className="absolute left-1/2 top-[6%] h-[min(420px,48vh)] w-[min(92vw,760px)] -translate-x-1/2 opacity-[0.65]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,50,150,0.38) 0%, transparent 68%)",
            filter: "blur(88px)",
          }}
        />
      ) : (
        <motion.div
          className="absolute left-1/2 top-[6%] h-[min(420px,48vh)] w-[min(92vw,760px)] -translate-x-1/2 blur-[88px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,50,150,0.42) 0%, transparent 68%)",
          }}
          animate={{
            opacity: [0.48, 0.82, 0.52, 0.75, 0.48],
            scale: [1, 1.09, 0.97, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_96%_78%_at_50%_32%,transparent_38%,rgba(0,0,10,0.55)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/35 via-transparent to-[#00000a]" />
    </div>
  );
}

/** Soft top / edge sheen so Mission + Vision reads like light on a dark surface */
function MissionVisionAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.9]"
        style={{
          background: `
            radial-gradient(ellipse 115% 65% at 50% -5%, rgba(255,255,255,0.1) 0%, rgba(147,197,253,0.06) 22%, transparent 55%),
            radial-gradient(ellipse 85% 55% at 100% 25%, rgba(96,165,250,0.07) 0%, transparent 52%),
            radial-gradient(ellipse 70% 45% at 0% 60%, rgba(20,50,150,0.12) 0%, transparent 48%)
          `,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00000a]/20 to-[#00000a]/65" />
    </div>
  );
}

/** Slow drifting light orbs + sliding grid - animated, unlike Mission static sheen */
function TeamSectionAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[18%] -top-[28%] h-[min(520px,58vh)] w-[min(520px,58vw)] rounded-full bg-blue-400/[0.14] blur-[100px]"
        animate={{
          x: [0, 42, -16, 0],
          y: [0, 32, 10, 0],
          scale: [1, 1.14, 1.03, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      />
      <motion.div
        className="absolute -right-[14%] top-[12%] h-[min(440px,50vh)] w-[min(460px,52vw)] rounded-full bg-[#143296cc]/[0.24] blur-[92px]"
        animate={{
          x: [0, -38, 20, 0],
          y: [0, -22, 26, 0],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 2,
        }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[-35%] h-[min(380px,45vh)] w-[min(90%,720px)] rounded-[100%] bg-sky-400/[0.07] blur-[120px]"
        animate={{
          opacity: [0.35, 0.6, 0.4, 0.35],
          x: [0, -24, 12, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      <motion.div
        className="absolute inset-[-40%] opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 88% 78% at 50% 42%, black 12%, transparent 70%)",
        }}
        animate={{ x: [0, 44, 0], y: [0, 44, 0] }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/40 via-transparent to-[#00000a]/80" />
    </div>
  );
}

/**
 * Timeline section: vertical rail glow + sweeping diagonal highlight + corner pool.
 * Different from Team (orbiting blobs + grid) and Mission (static reflection).
 */
function JourneySectionAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-[15px] top-[6%] h-[88%] w-20 -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent blur-2xl md:left-[19px] md:w-28"
        animate={{
          opacity: [0.22, 0.58, 0.36, 0.52, 0.22],
          scaleY: [0.9, 1.08, 0.96, 1.04, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-y-[-25%] -left-[35%] w-[55%] -skew-x-[10deg] opacity-[0.4]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 45%, rgba(191,219,254,0.09) 50%, rgba(255,255,255,0.04) 55%, transparent 100%)",
        }}
        animate={{ x: ["-8vw", "125vw"] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4,
        }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[20%] h-[min(480px,55vh)] w-[min(560px,85vw)] rounded-full bg-[#143296cc]/[0.22] blur-[110px]"
        animate={{
          opacity: [0.28, 0.48, 0.34, 0.42, 0.28],
          scale: [1, 1.12, 0.98, 1.06, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 0.8,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00000a]/65 via-transparent to-[#00000a]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00000a]/35 via-transparent to-[#00000a]/88" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      {/* Hero - layered motion distinct from home Hero (circle grid wave) */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] pb-20 pt-28 md:pb-28 md:pt-36">
        <AboutHeroAmbient />
        <div className="container relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={aboutHeroContainer}
          >
            <motion.span
              variants={aboutHeroItem}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 will-change-transform"
            >
              About OceanCyber
            </motion.span>
            <motion.h1
              variants={aboutHeroItem}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl will-change-transform"
            >
              Building Africa&apos;s
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
                digital backbone
              </span>
            </motion.h1>
            <motion.p
              variants={aboutHeroItem}
              className="mx-auto mt-8 max-w-2xl text-pretty text-center text-lg font-light leading-relaxed text-slate-400 md:text-xl will-change-transform"
            >
              We design and secure the platforms businesses rely on, from
              first sketch to production-grade infrastructure, with a team
              obsessed with clarity, performance, and trust.
            </motion.p>
          </motion.div>

          <motion.div
            {...fadeUpSoft}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <MissionVisionAmbient />
        <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <motion.div
              {...fadeFromLeft}
              className="lg:col-span-5"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
                How we work
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Mission &amp; principles
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
                Three commitments shape every roadmap, line of code, and
                security review we ship for our partners.
              </p>
              <div className="mt-10 space-y-4">
                {missionPillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={staggerDelay(index, 0.07)}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#143296cc]/40 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#143296cc]/15 text-blue-300 transition-colors group-hover:border-[#143296cc]/50">
                      <pillar.Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {pillar.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeFromRight}
              className="lg:col-span-7"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
                Where we&apos;re headed
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Vision
              </h2>
              <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/40">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/Africa Trade Chamber.webp"
                    alt="OceanCyber, vision for a digitally empowered Africa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00000a] via-[#00000a]/40 to-transparent" />
                </div>
                <div className="space-y-5 p-8 md:p-10">
                  <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                    Leading Africa&apos;s digital future
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                    We envision a continent where every business, from
                    startups to enterprises, can compete globally with secure,
                    beautiful, and reliable technology.
                  </p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "100+ African businesses transformed",
                      "99.9% client satisfaction focus",
                      "15+ countries served",
                      "24/7 security operations mindset",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <TeamSectionAmbient />
        <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-8">
          <motion.div {...fadeUpProps} className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              People
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Leadership &amp; craft
            </h2>
            <p className="mt-4 text-slate-400 md:text-lg">
              A multidisciplinary team blending strategy, engineering, and
              design, built for ambitious African brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.08)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-[#143296cc]/45 hover:shadow-xl hover:shadow-[#143296cc]/10 md:flex-row md:items-stretch"
              >
                {/* Visual - wide strip on mobile, left column on desktop */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden md:h-auto md:w-[42%] md:min-h-[260px]">
                  <Image
                    src={member.image}
                    alt={`Showcase work, ${member.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00000a]/90 via-[#00000a]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#00000a]/25 md:to-[#00000a]/85" />
                </div>

                {/* Copy - role first, then name / bio; skills in a distinct footer band */}
                <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8 md:pl-7">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-400/95">
                      {member.role}
                    </p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-[0.9375rem]">
                      {member.bio}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                      Focus areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium leading-none text-slate-300 transition-colors group-hover:border-white/15"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <JourneySectionAmbient />
        <div className="container relative z-10 mx-auto max-w-2xl px-6 md:max-w-3xl md:px-8">
          <motion.div {...fadeUpProps} className="mb-14 text-center md:mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/90">
              Timeline
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Our journey
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400 md:text-lg">
              From a focused Accra studio to a regional partner: milestones
              that mark how we scale responsibility with growth.
            </p>
          </motion.div>

          <div className="relative pl-2 md:pl-4">
            <div
              className="absolute left-[15px] top-3 bottom-8 w-px bg-gradient-to-b from-blue-500/70 via-[#143296cc]/75 to-blue-400/15 md:left-[19px]"
              aria-hidden
            />
            <ol className="space-y-5">
              {milestones.map((milestone, index) => (
                <motion.li
                  key={milestone.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={revealViewport}
                  transition={staggerDelay(index, 0.04)}
                  className="relative flex gap-4 pl-9 md:gap-5 md:pl-11"
                >
                  <span
                    className="absolute left-[15px] top-[1.35rem] z-[1] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#00000a] bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.55)] md:left-[19px] md:top-6"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#143296cc]/35 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-300/90">
                        {milestone.year}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                        Milestone
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {milestone.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14"
          >
            <h2 className="text-2xl font-bold text-center tracking-tight text-white md:text-4xl">
              Ready to work with us?
            </h2>
            <p className="mx-auto mt-4 text-center max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Tell us about your product, security posture, or growth goals, and
              we&apos;ll respond with a clear path forward.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/25 transition-all hover:brightness-110 active:scale-[0.98] md:text-base"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
