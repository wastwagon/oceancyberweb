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
import { PartnersAndStandardsSection } from "@/components/marketing/PartnersAndStandardsSection";
import { VideoTestimonialSection } from "@/components/marketing/VideoTestimonialSection";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

type AboutTeamMember = {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials?: string;
  image?: string;
};

const teamMembers: AboutTeamMember[] = [
  {
    name: googleBusinessProfile.founderName,
    role: googleBusinessProfile.founderRole,
    initials: "GA",
    bio: "Leads client work, delivery standards, and the Accra team that designs, builds, and secures products for Ghana businesses.",
    expertise: [
      "Client delivery",
      "Web and mobile",
      "Cybersecurity",
      "Business development",
    ],
  },
];

const milestones = [
  {
    year: String(googleBusinessProfile.foundedYear),
    title: "Opened in Accra",
    description: "OceanCyber started serving Ghana businesses from Accra.",
  },
  {
    year: "2019",
    title: "Enterprise delivery",
    description: "Grew into larger financial-sector and professional-services projects.",
  },
  {
    year: "2020",
    title: `Team of ${googleBusinessProfile.teamSize}`,
    description: `A team of ${googleBusinessProfile.teamSize} at ${googleBusinessProfile.address.street}.`,
  },
  {
    year: "2023",
    title: "100+ clients",
    description: "Supported 100+ businesses from Accra across 12 industries.",
  },
  {
    year: "2025",
    title: "4.9 Google rating",
    description: `${googleBusinessProfile.reviewCount} verified Google reviews from real client work.`,
  },
];

const stats = [
  { label: "Founded", value: String(googleBusinessProfile.foundedYear) },
  { label: "People", value: String(googleBusinessProfile.teamSize) },
  { label: "Clients served", value: "100+" },
  { label: "Industries", value: "12+" },
];

const missionPillars = [
  {
    title: "Ship on time",
    body: "We agree scope and milestones up front, then deliver working software you can use — not endless slide decks.",
    Icon: Sparkles,
  },
  {
    title: "Build it properly",
    body: "Design, engineering, and security sit in one Accra team so quality does not get lost between vendors.",
    Icon: Award,
  },
  {
    title: "Stay reachable",
    body: "You can call, WhatsApp, or meet us at the office. Updates are plain English, with clear next steps.",
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
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">

      {/* Hero */}
      <section className="sa-page-intro relative z-10 overflow-hidden border-b border-sa-border">
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
              className="sa-title-lg mx-auto max-w-4xl text-balance"
            >
              Web, mobile, and security
              <br />
              <span className="text-sa-primary">for Ghana businesses</span>
            </motion.h1>
            <motion.p
              variants={aboutHeroItem}
              className="sa-lead mx-auto mt-3"
            >
              From our Accra office since {googleBusinessProfile.foundedYear}. A team of{" "}
              {googleBusinessProfile.teamSize} at {googleBusinessProfile.address.street},
              rated {googleBusinessProfile.rating} from{" "}
              {googleBusinessProfile.reviewCount} Google reviews.
            </motion.p>
            <motion.div variants={aboutHeroItem} className="mt-8">
              <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
                Get started
              </Link>
            </motion.div>
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
                <div className="mt-1 text-sm font-medium text-sa-muted">
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
              <h2 className="sa-title">
                Mission &amp; principles
              </h2>
              <p className="sa-subtitle mt-3 max-w-md text-left">
                How we work with Accra and Ghana clients — from first brief to
                launch and support.
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
              <h2 className="sa-title">
                Vision
              </h2>
              <div className="sa-card mt-8 overflow-hidden !rounded-3xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/Africa Trade Chamber.webp"
                    alt="OceanCyber Accra team delivery for Ghana businesses"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
                </div>
                <div className="space-y-5 p-8 md:p-10">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
                    Accra office, Ghana-wide clients
                  </h3>
                  <p className="text-sm leading-relaxed text-sa-muted/80 md:text-base">
                    We help Ghana businesses go online properly — websites, apps,
                    shops, and security — with fixed GHS packages and a team you
                    can meet in person.
                  </p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "100+ businesses supported",
                      "One office, in Accra",
                      `Team of ${googleBusinessProfile.teamSize}`,
                      "12 industry verticals served",
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
            <h2 className="sa-title">
              Who you work with
            </h2>
            <p className="sa-subtitle mx-auto mt-3">
              Founder-led delivery from Accra, with designers, engineers, and
              security specialists on the same team.{" "}
              <Link
                href="/team"
                className="sa-text-link font-medium"
              >
                Meet the wider team →
              </Link>
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
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out grayscale group-hover:scale-[1.03] group-hover:grayscale-0"
                      sizes="(max-width: 1024px) 100vw, 38vw"
                    />
                  ) : (
                    <div className="flex h-full min-h-[11rem] items-center justify-center bg-sa-surface md:min-h-[260px]">
                      <span className="font-heading text-4xl font-bold tracking-[0.08em] text-sa-primary">
                        {member.initials ?? member.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-sa-surface/60 md:to-sa-surface" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8 md:pl-7">
                  <div>
                    <p className="text-sm font-semibold text-sa-primary">
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
                    <p className="mb-2.5 text-sm font-medium text-sa-muted">
                      Focus areas
                    </p>
                    <ul className="sa-chip-scroller">
                      {member.expertise.map((skill) => (
                        <li key={skill} className="sa-chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
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
            <h2 className="sa-title">
              Our journey
            </h2>
            <p className="sa-subtitle mx-auto mt-3 max-w-xl">
              Milestones from the Accra office since {googleBusinessProfile.foundedYear}.
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
                      <span className="text-sm font-semibold text-sa-primary">
                        {milestone.year}
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

      <VideoTestimonialSection variant="about" />
      <PartnersAndStandardsSection />

      {/* CTA */}
      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpProps}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="sa-title">
              Ready to work with us?
            </h2>
            <p className="sa-subtitle mx-auto mt-3 max-w-lg">
              Tell us about your product, security posture, or growth goals, and
              we&apos;ll respond with a clear path forward.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link href="/contact" className="sa-btn-primary w-full sm:w-auto">
                Talk to our team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
