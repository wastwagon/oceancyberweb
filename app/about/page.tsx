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
    bio: "Technology leader with 15+ years of experience in product delivery and cybersecurity programs across Africa.",
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
    bio: "Software architect focused on scalable cloud systems and maintainable enterprise application architecture.",
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



export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">

      {/* Hero */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={aboutHeroContainer}
          >
            <motion.span
              variants={aboutHeroItem}
              className="sa-eyebrow mb-6 inline-flex items-center justify-center gap-2"
            >
              About OceanCyber
            </motion.span>
            <motion.h1
              variants={aboutHeroItem}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              Building Africa&apos;s
              <br />
              <span className="text-sa-primary">digital backbone</span>
            </motion.h1>
            <motion.p
              variants={aboutHeroItem}
              className="sa-subtitle mx-auto mt-8"
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
                className="sa-card px-4 py-5 text-center"
              >
                <div className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-heading text-[10px] font-semibold uppercase tracking-widest text-sa-muted/70">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <motion.div
              {...fadeFromLeft}
              className="lg:col-span-5"
            >
              <p className="sa-eyebrow mb-3 block">
                How we work
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Mission &amp; principles
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-sa-muted/80 md:text-base">
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
                    className="sa-card group flex gap-4 p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sa-border bg-black/40 text-sa-primary transition-colors group-hover:border-sa-primary">
                      <pillar.Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-sa-muted/80">
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
              <p className="sa-eyebrow mb-3 block">
                Where we&apos;re headed
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
                Vision
              </h2>
              <div className="sa-card mt-8 overflow-hidden !rounded-3xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/Africa Trade Chamber.webp"
                    alt="OceanCyber, vision for a digitally empowered Africa"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
                </div>
                <div className="space-y-5 p-8 md:p-10">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
                    Building Africa&apos;s digital future
                  </h3>
                  <p className="text-sm leading-relaxed text-sa-muted/80 md:text-base">
                    We envision a continent where every business, from
                    startups to enterprises, can compete globally with secure,
                    beautiful, and reliable technology.
                  </p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "100+ African businesses supported",
                      "99.9% client satisfaction focus",
                      "15+ countries served",
                      "24/7 security operations mindset",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex items-center gap-2 text-xs text-sa-muted/80 sm:text-sm"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary shadow-[0_0_8px_rgba(187,243,64,0.35)]" />
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
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container">
          <motion.div {...fadeUpProps} className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <p className="sa-eyebrow mb-3 block">
              People
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              Leadership &amp; craft
            </h2>
            <p className="mt-4 text-sa-muted/80 md:text-lg">
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
                className="sa-card group flex flex-col overflow-hidden md:flex-row md:items-stretch"
              >
                <div className="relative h-44 w-full shrink-0 overflow-hidden md:h-auto md:w-[42%] md:min-h-[260px]">
                  <Image
                    src={member.image}
                    alt={`Showcase work, ${member.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out grayscale group-hover:scale-[1.03] group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-sa-surface/60 md:to-sa-surface" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8 md:pl-7">
                  <div>
                    <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-sa-primary">
                      {member.role}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sa-muted/80 md:text-[0.9375rem]">
                      {member.bio}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-sa-border pt-5">
                    <p className="mb-2.5 font-heading text-[10px] font-semibold uppercase tracking-widest text-sa-muted/50">
                      Focus areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-sa-border bg-black/40 px-2.5 py-1 text-[11px] font-medium leading-none text-sa-muted transition-colors group-hover:border-sa-primary"
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
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container max-w-2xl md:max-w-3xl">
          <motion.div {...fadeUpProps} className="mb-14 text-center md:mb-16">
            <p className="sa-eyebrow mb-3 block">
              Timeline
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              Our journey
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sa-muted/80 md:text-lg">
              From a focused Accra studio to a regional partner: milestones
              that mark how we scale responsibility with growth.
            </p>
          </motion.div>

          <div className="relative pl-2 md:pl-4">
            <div
              className="absolute left-[15px] top-3 bottom-8 w-px bg-gradient-to-b from-sa-primary/80 via-sa-primary/40 to-transparent md:left-[19px]"
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
                    className="absolute left-[15px] top-[1.35rem] z-[1] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-sa-bg bg-sa-primary shadow-[0_0_14px_rgba(187,243,64,0.35)] md:left-[19px] md:top-6"
                    aria-hidden
                  />
                  <div className="sa-card min-w-0 flex-1 p-5 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-heading text-xs font-semibold uppercase tracking-widest text-sa-primary">
                        {milestone.year}
                      </span>
                      <span className="font-heading text-[10px] font-semibold uppercase tracking-widest text-sa-muted/50">
                        Milestone
                      </span>
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-white md:text-xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sa-muted/80">
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
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpProps}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
              Ready to work with us?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              Tell us about your product, security posture, or growth goals, and
              we&apos;ll respond with a clear path forward.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="sa-btn-primary">
                Talk to our team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
