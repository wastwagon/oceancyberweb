"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { getProjectCategories } from "@/lib/data/projects-helpers";
import type { PortfolioCaseStudy } from "@/lib/types/portfolio-case-study";
import { cn } from "@/lib/utils";
import { fadeUpProps, fadeUpSoft, staggerDelay } from "@/lib/scroll-reveal";

const MotionLink = motion(Link);

function VolumetricBackground() {
  return null;
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
  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [6, -6]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );
  const glareX = useSpring(useTransform(mx, [-0.5, 0.5], [20, 80]), springConfig);
  const glareY = useSpring(useTransform(my, [-0.5, 0.5], [20, 80]), springConfig);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06), transparent 55%)`;

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
          className="group/card relative block h-full overflow-hidden rounded-3xl border border-sa-border bg-sa-surface transition-colors hover:border-sa-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sa-primary"
          whileTap={{ scale: 0.99 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
            style={{ background: glare }}
          />
          <div className="relative z-[1]">{children}</div>
        </MotionLink>
      </motion.div>
    </motion.div>
  );
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < n
              ? "fill-sa-primary text-sa-primary"
              : "fill-sa-border text-sa-border",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function GridProjectCard({
  project,
  index,
}: {
  project: PortfolioCaseStudy;
  index: number;
}) {
  const body = (
    <>
      <div className="relative aspect-[16/10] min-h-[10.5rem] w-full overflow-hidden rounded-t-3xl md:min-h-[12rem] border-b border-sa-border">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale transition duration-700 group-hover/card:scale-110 group-hover/card:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent opacity-80" />
        
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-md">
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-sa-bg/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
              {project.year}
            </span>
          </div>
          <StarRow n={project.rating} />
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-white md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary">{project.client}</p>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-sa-muted/80">
          {project.description}
        </p>

        {project.metrics ? (
          <div className="mt-6 flex items-baseline gap-2 border-t border-sa-border pt-4">
            <span className="font-heading text-xl font-bold text-white sm:text-2xl">
              {project.metrics.increase}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
              {project.metrics.metric}
            </span>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-sa-border bg-sa-bg px-3 py-1 text-[10px] font-bold tracking-widest text-sa-muted uppercase"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 ? (
            <span className="self-center text-[10px] font-bold text-sa-muted/50 uppercase">
              +{project.tech.length - 3}
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-sa-border pt-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
          <span>Open case study</span>
          <span aria-hidden className="text-base transition-transform duration-300 group-hover/card:translate-x-2">→</span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div {...fadeUpSoft} transition={staggerDelay(index, 0.07)}>
      <TiltCard href={`/portfolio/${project.slug}`} className="h-full">
        {body}
      </TiltCard>
    </motion.div>
  );
}

function CategoryFilter({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (c: string) => void;
  categories: readonly string[];
}) {
  return (
    <div
      className="mb-8 flex flex-wrap items-center gap-2 md:mb-12"
      role="tablist"
      aria-label="Filter by industry"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "All"}
        onClick={() => onChange("All")}
        className={cn(
          "rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
          value === "All"
            ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
            : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50 hover:text-white"
        )}
      >
        All work
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={value === c}
          onClick={() => onChange(c)}
          className={cn(
            "max-w-full truncate rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
            value === c
              ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
              : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50 hover:text-white"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

const HOME_VERTICAL_AUTOPLAY_MS = 9000;

function HomeVerticalImageSlide({
  project,
  index,
}: {
  project: PortfolioCaseStudy;
  index: number;
}) {
  return (
    <div
      data-slide
      className="snap-start snap-always flex shrink-0 justify-center pb-6 sm:pb-8 lg:pb-10"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group/vslide relative block w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-sa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sa-bg sm:max-w-[min(100%,30rem)] lg:max-w-[min(100%,34rem)] xl:max-w-[min(100%,38rem)]"
        aria-label={`${project.title} — view case study`}
      >
        <div className="rounded-3xl border border-sa-border bg-sa-surface p-2 sm:p-3 transition-colors hover:border-sa-primary/50">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sa-bg border border-sa-border">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover object-center grayscale transition duration-700 ease-out group-hover/vslide:scale-105 group-hover/vslide:grayscale-0"
              sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 520px"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

function PortfolioHomeVerticalSplit({ projects }: { projects: PortfolioCaseStudy[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const rafId = useRef(0);
  const indexRef = useRef(0);
  const n = projects.length;
  const active = projects[index] ?? projects[0];

  const updateIndexFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = el.querySelectorAll<HTMLElement>("[data-slide]");
    if (slides.length === 0) return;
    const mid = el.scrollTop + el.clientHeight / 2;
    let closest = 0;
    let minD = Infinity;
    slides.forEach((s, i) => {
      const c = s.offsetTop + s.offsetHeight / 2;
      const d = Math.abs(c - mid);
      if (d < minD) {
        minD = d;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  const scrollTo = useCallback(
    (targetIndex: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[targetIndex];
      if (!slide) return;
      const max = el.scrollHeight - el.clientHeight;
      const target = slide.offsetTop - (el.clientHeight - slide.offsetHeight) / 2;
      const top = Math.max(0, Math.min(target, max));
      el.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion],
  );

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        updateIndexFromScroll();
      });
    };
    const el = scrollerRef.current;
    if (el) {
      el.addEventListener("scroll", onScroll, { passive: true });
    }
    const onResize = () => onScroll();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (el) {
        el.removeEventListener("scroll", onScroll);
      }
      cancelAnimationFrame(rafId.current);
    };
  }, [updateIndexFromScroll, projects.length]);

  useEffect(() => {
    if (n < 2 || reduceMotion || paused) return;
    const t = setInterval(() => {
      const next = (indexRef.current + 1) % n;
      scrollTo(next);
    }, HOME_VERTICAL_AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n, paused, reduceMotion, scrollTo]);

  return (
    <div
      className="group/vsplit min-h-0 w-full mt-10 md:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client projects"
    >
      <div className="grid min-h-0 gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-0">
        <aside className="flex min-h-0 flex-col justify-between gap-10 lg:col-span-4 lg:sticky lg:top-32 lg:self-start xl:col-span-5">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div
                className="h-px w-12 shrink-0 bg-sa-primary/50"
                aria-hidden
              />
              <p className="sa-eyebrow">
                Studio portfolio
              </p>
            </div>
            <h2 className="sa-title !text-left text-4xl lg:text-5xl">
              Selected
              <br />
              <span className="text-sa-primary">work</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-sa-muted/80">
              Scroll for projects—each frame shows the full preview. Open a case for scope and outcomes.
            </p>
          </div>

          <div className="flex flex-col gap-8 border-t border-sa-border pt-8">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? undefined : { opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                {active.category}
                <span className="mx-2 font-normal text-sa-border">·</span>
                {active.year}
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                {active.title}
              </h3>
              <p className="mt-2 text-sm text-sa-muted">{active.client}</p>
              <Link
                href={`/portfolio/${active.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-all hover:text-white"
              >
                Case study
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </Link>
            </motion.div>

            {n > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <p
                  className="font-mono text-sm tabular-nums tracking-wider text-sa-muted"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="text-2xl font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-sa-border">/</span>
                  <span>{String(n).padStart(2, "0")}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => scrollTo((index - 1 + n) % n)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sa-border bg-sa-surface text-sa-muted transition-colors hover:border-sa-primary hover:text-white"
                  >
                    <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => scrollTo((index + 1) % n)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sa-border bg-sa-surface text-sa-muted transition-colors hover:border-sa-primary hover:text-white"
                  >
                    <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="min-h-0 lg:col-span-8 lg:border-l lg:border-sa-border lg:pl-10 xl:col-span-7">
          <div
            ref={scrollerRef}
            className="max-h-[min(50svh,450px)] touch-pan-y snap-y snap-mandatory overflow-y-auto scroll-smooth overscroll-y-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-h-[min(55svh,500px)] lg:max-h-[min(65svh,650px)]"
          >
            <div className="flex flex-col items-stretch">
              {projects.map((project, i) => (
                <HomeVerticalImageSlide key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioWork({
  mode = "home",
  className,
  projects,
}: {
  mode?: "home" | "page";
  className?: string;
  projects: PortfolioCaseStudy[];
}) {
  const isPage = mode === "page";
  const [category, setCategory] = useState("All");

  const projectCategories = useMemo(() => getProjectCategories(projects), [projects]);

  const list = useMemo(() => {
    if (!isPage || category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [isPage, category, projects]);

  const singleFiltered = Boolean(isPage && category !== "All" && list.length === 1);

  return (
    <section
      className={cn(
        "sa-section relative z-10",
        isPage ? "" : "pt-24 pb-20 md:pt-32 md:pb-28",
        className,
      )}
    >
      <div className={cn("sa-container", isPage ? "" : "max-w-7xl")}>
        {isPage ? (
          <div className="mb-12">
            <h2 className="sa-title !text-left mt-0">Browse projects</h2>
            <p className="sa-subtitle !text-left mt-4 mb-10 max-w-2xl">
              Use filters to focus on a sector, or open any card for the full case write-up.
            </p>
            <CategoryFilter
              value={category}
              onChange={setCategory}
              categories={projectCategories}
            />
            {list.length === 0 ? (
              <p className="rounded-3xl border border-sa-border border-dashed p-10 text-center text-sm text-sa-muted">
                No projects in this category yet.
                <button
                  type="button"
                  onClick={() => setCategory("All")}
                  className="mt-4 block w-full font-bold text-sa-primary underline"
                >
                  Show all
                </button>
              </p>
            ) : null}
          </div>
        ) : null}

        {list.length > 0 ? (
          <div className={cn("w-full", isPage ? "mt-4" : "mt-0")}>
            {!isPage ? (
              <PortfolioHomeVerticalSplit projects={list} />
            ) : singleFiltered && list[0] ? (
              <div className="mx-auto max-w-3xl">
                <GridProjectCard project={list[0]} index={0} />
              </div>
            ) : (
              <div className="grid auto-rows-auto gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {list.map((project, i) => (
                  <GridProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}

        <motion.div
          {...fadeUpProps}
          transition={{ ...fadeUpProps.transition, delay: 0.1 }}
          className="mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="sa-card p-10 md:p-16">
            <h3 className="sa-title">
              {isPage ? "Ready to ship your product?" : "Talk to our team"}
            </h3>
            <p className="sa-subtitle mx-auto mt-6">
              {isPage
                ? "Tell us about goals, users, and timeline. We will respond with a focused proposal."
                : "Tell us what you're building—we'll follow up with next steps."}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?topic=Project%20from%20portfolio"
                className="sa-btn-primary"
              >
                Talk to our team
              </Link>
              {isPage ? null : (
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sa-border px-8 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition hover:border-sa-primary hover:text-white"
                >
                  Full portfolio
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
