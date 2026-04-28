"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useRef } from "react";
import { projects as staticProjects } from "@/lib/data/projects";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { fadeUpProps, fadeUpSoft, staggerDelay } from "@/lib/scroll-reveal";

type Project = PortfolioCaseStudy;

const MotionLink = motion(Link);

function VolumetricBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-50/95 via-white to-slate-100/90">
      <div
        className="absolute left-1/2 top-[-10%] h-[min(70vh,560px)] w-[min(120vw,900px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(2,106,255,0.12)_0%,transparent_70%)] blur-[90px]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(2, 106, 255, 0.35) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

const springConfig = { stiffness: 280, damping: 28, mass: 0.6 };

function TiltCard({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springConfig);
  const glareX = useSpring(useTransform(mx, [-0.5, 0.5], [20, 80]), springConfig);
  const glareY = useSpring(useTransform(my, [-0.5, 0.5], [20, 80]), springConfig);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 55%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <MotionLink
          href={href}
          className="group/card relative block h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-200/60 outline-none ring-1 ring-slate-200/40 transition-shadow hover:border-ocean-200/80 hover:shadow-slate-300/50 focus-visible:ring-2 focus-visible:ring-ocean-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          whileTap={{ scale: 0.99 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
            style={{ background: glare }}
          />
          <div className="relative z-[1]">{children}</div>
        </MotionLink>
      </motion.div>
    </motion.div>
  );
}

function FeaturedShowcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900/5 shadow-2xl shadow-slate-300/40"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative block min-h-[280px] md:min-h-[380px] lg:min-h-[420px]"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: imageY, scale }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-95 transition duration-700 group-hover:opacity-100"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </motion.div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.18] mix-blend-overlay`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/35 to-transparent md:via-slate-900/22" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-transparent to-transparent md:from-slate-900/55" />

        <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 md:flex-row md:items-end md:justify-between md:p-10 lg:p-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="mb-3 flex flex-wrap gap-2"
            >
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-blue-200 backdrop-blur-sm">
                {project.category}
              </span>
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-sm">
                {project.year}
              </span>
            </motion.div>
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-ocean-300/90 md:text-base">{project.client}</p>
            <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-300 md:line-clamp-3 md:text-base">
              {project.description}
            </p>
            {project.metrics && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 inline-flex items-baseline gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md"
              >
                <span className="bg-gradient-to-r from-blue-200 to-ocean-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {project.metrics.increase}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {project.metrics.metric}
                </span>
              </motion.div>
            )}
          </div>

          <motion.span
            className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-ocean-300/80 bg-ocean-600/85 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition group-hover:border-ocean-200 group-hover:bg-ocean-700/90 md:mt-0 md:self-end"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            View case study
            <motion.span aria-hidden className="inline-block" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              →
            </motion.span>
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

function GridProjectCard({
  project,
  index,
  wide,
}: {
  project: Project;
  index: number;
  wide: boolean;
}) {
  return (
    <motion.div
      className={wide ? "md:col-span-2" : ""}
      {...fadeUpSoft}
      transition={staggerDelay(index, 0.07)}
    >
      <TiltCard href={`/portfolio/${project.slug}`} className="h-full">
        <div className="relative h-44 overflow-hidden md:h-48">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-25`} />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-90 transition duration-500 group-hover/card:scale-105"
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ocean-200 backdrop-blur-sm">
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-sm">
              {project.year}
            </span>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-200/80 bg-white p-5 md:p-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
            <p className="text-xs text-ocean-600">{project.client}</p>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{project.description}</p>

          {project.metrics && (
            <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
              <span className="bg-gradient-to-r from-ocean-600 to-cyan-600 bg-clip-text text-xl font-bold text-transparent">
                {project.metrics.increase}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {project.metrics.metric}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200/90 bg-slate-50/90 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 ? (
              <span className="text-[10px] text-slate-500">+{project.tech.length - 4}</span>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-ocean-700">
            <span>Open case study</span>
            <span aria-hidden className="transition-transform duration-200 group-hover/card:translate-x-0.5">→</span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Portfolio({ cases }: { cases?: PortfolioCaseStudy[] }) {
  const projects = cases && cases.length > 0 ? cases : staticProjects;
  const [featured, ...rest] = projects;

  const wideAt = (i: number) => i === 2 || i === rest.length - 1;

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36"
    >
      <VolumetricBackground />

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div {...fadeUpProps} className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2.5 text-sm font-medium tracking-wide text-ocean-800 shadow-sm"
          >
            Featured Projects
          </motion.span>
          <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Our Work
          </h2>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-slate-600">
            Showcasing transformative digital solutions that drive real business results
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-7xl space-y-8 md:mt-16 md:space-y-10">
          <FeaturedShowcase project={featured} index={0} />

          <div className="grid auto-rows-fr gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
            {rest.map((project, i) => (
              <GridProjectCard
                key={project.slug}
                project={project}
                index={i}
                wide={wideAt(i)}
              />
            ))}
          </div>
        </div>

        <motion.div
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.12 }}
          className="mx-auto mt-24 max-w-7xl text-center md:mt-28"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Ready to see your project featured here?
            </h3>
            <p className="mb-8 font-light text-slate-600">Let&apos;s create something amazing together</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 font-semibold text-white shadow-lg shadow-ocean-600/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
