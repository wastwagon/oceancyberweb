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
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 justify-center gap-6 opacity-[0.3]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[720px] w-1 bg-gradient-to-b from-ocean-300/50 via-ocean-200/20 to-transparent blur-[70px]"
            style={{
              transform: `rotate(${(i - 2) * 12}deg)`,
              transformOrigin: "top center",
            }}
          />
        ))}
      </div>
      <div
        className="absolute left-1/2 top-[-12%] z-[1] aspect-video w-[110%] -translate-x-1/2 rounded-[100%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 102, 204, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 55%)`;

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
          className="group/card relative block h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm outline-none ring-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-ocean-200/80 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < n
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200",
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
  const accentPalette = [
    {
      glow: "from-cyan-300/35 via-ocean-300/15 to-transparent",
      dot: "bg-cyan-300/70",
      ring: "border-cyan-200/50",
    },
    {
      glow: "from-violet-300/30 via-indigo-300/15 to-transparent",
      dot: "bg-violet-300/70",
      ring: "border-violet-200/50",
    },
    {
      glow: "from-emerald-300/30 via-teal-300/15 to-transparent",
      dot: "bg-emerald-300/70",
      ring: "border-emerald-200/50",
    },
  ] as const;
  const accent = accentPalette[index % accentPalette.length];

  const body = (
    <>
      <div className="relative aspect-[16/10] min-h-[10.5rem] w-full overflow-hidden rounded-t-2xl md:min-h-[12rem]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-25`}
        />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-700 group-hover/card:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
        <div
          className={cn(
            "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl",
            accent.glow,
          )}
        />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5">
          <span className={cn("h-2 w-2 rounded-full", accent.dot)} />
          <span className={cn("h-4 w-4 rounded-full border", accent.ring)} />
          <span className={cn("h-2.5 w-2.5 rounded-full", accent.dot)} />
        </div>
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ocean-100 backdrop-blur-md">
              {project.category}
            </span>
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-100 backdrop-blur-sm">
              {project.year}
            </span>
          </div>
          <StarRow n={project.rating} />
        </div>
      </div>

      <div className="space-y-3 p-4 sm:space-y-3.5 sm:p-5 md:p-6">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg md:text-xl">
            {project.title}
          </h3>
          <p className="mt-0.5 text-[11px] font-medium text-ocean-600 sm:text-xs">{project.client}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 sm:line-clamp-2">
          {project.description}
        </p>

        {project.metrics ? (
          <div className="flex items-baseline gap-2 border-t border-slate-100/80 pt-3">
            <span className="bg-gradient-to-r from-ocean-600 to-cyan-600 bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
              {project.metrics.increase}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {project.metrics.metric}
            </span>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700 sm:px-2.5"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 ? (
            <span className="self-center text-[10px] text-slate-500">
              +{project.tech.length - 4}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-bold text-ocean-600">
          <span>Open case study</span>
          <span aria-hidden className="text-base transition-transform duration-200 group-hover/card:translate-x-1">→</span>
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
      className="mb-8 flex flex-wrap items-center justify-center gap-2 md:mb-10 md:justify-start"
      role="tablist"
      aria-label="Filter by industry"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "All"}
        onClick={() => onChange("All")}
        className={cn(
          "rounded-full px-4 py-2 text-xs font-bold transition md:text-sm",
          value === "All"
            ? "bg-ocean-600 text-white shadow-md shadow-ocean-600/25"
            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-ocean-200",
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
            "max-w-full truncate rounded-full px-3.5 py-2 text-xs font-semibold transition md:px-4 md:text-sm",
            value === c
              ? "bg-ocean-600 text-white shadow-md shadow-ocean-600/25"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-ocean-200",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

const HOME_VERTICAL_AUTOPLAY_MS = 9000;

/** Landscape frame — full image visible (letterboxed), compact spacing. */
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
      className="snap-start snap-always flex shrink-0 justify-center pb-2.5 last:pb-0 sm:pb-3 lg:pb-3.5"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group/vslide relative block w-full max-w-full outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:max-w-[min(100%,26rem)] lg:max-w-[min(100%,30rem)] xl:max-w-[min(100%,34rem)]"
        aria-label={`${project.title} — view case study`}
      >
        <div className="rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm transition duration-200 hover:border-ocean-200/70 hover:shadow-md sm:p-1.5">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 ring-1 ring-inset ring-slate-200/60">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-contain object-center p-1 transition duration-300 ease-out group-hover/vslide:opacity-[0.97]"
              sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 520px"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Home portfolio: sticky editorial column (left) + vertical snap-scroll of large imagery (right).
 * Active project on the left updates from scroll position.
 */
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
      className="group/vsplit min-h-0 w-full"
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
      <div className="grid min-h-0 gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
        <aside className="flex min-h-0 flex-col justify-between gap-6 lg:col-span-4 lg:sticky lg:top-20 lg:self-start xl:col-span-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div
                className="h-px w-8 shrink-0 bg-gradient-to-r from-ocean-500 to-transparent"
                aria-hidden
              />
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                Studio portfolio
              </p>
            </div>
            <h2 className="max-w-[12ch] text-balance text-3xl font-light leading-[1.08] tracking-tight text-slate-500 sm:text-4xl lg:text-[2.15rem] xl:text-[2.5rem]">
              Selected
              <br />
              <span className="font-semibold text-slate-900">work</span>
            </h2>
            <p className="mt-4 max-w-[17rem] text-xs leading-relaxed text-slate-600 sm:text-[13px]">
              Scroll for projects—each frame shows the full preview. Open a case for scope and outcomes.
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-slate-200/80 pt-6">
            <motion.div
              key={active.slug}
              initial={reduceMotion ? undefined : { opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                {active.category}
                <span className="mx-1.5 font-normal text-slate-300">·</span>
                {active.year}
              </p>
              <h3 className="mt-2 text-pretty text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
                {active.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{active.client}</p>
              <Link
                href={`/portfolio/${active.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ocean-600 transition hover:gap-2.5"
              >
                Case study
                <span aria-hidden className="text-sm font-light">
                  →
                </span>
              </Link>
            </motion.div>

            {n > 1 ? (
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p
                  className="font-mono text-xs tabular-nums tracking-tight text-slate-400"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="text-2xl font-medium tracking-tighter text-slate-900">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1.5 align-middle text-base text-slate-300">/</span>
                  <span className="align-middle text-slate-500">{String(n).padStart(2, "0")}</span>
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => scrollTo((index - 1 + n) % n)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => scrollTo((index + 1) % n)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ) : null}

            <Link
              href="/portfolio"
              className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 transition hover:text-slate-900"
            >
              Full index →
            </Link>
          </div>
        </aside>

        <div className="min-h-0 lg:col-span-8 lg:border-l lg:border-slate-200/50 lg:pl-6 xl:col-span-8 xl:pl-8">
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-1 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-1.5">
            <div
              ref={scrollerRef}
              className="max-h-[min(44svh,400px)] touch-pan-y snap-y snap-mandatory overflow-y-auto scroll-smooth overscroll-y-contain [-webkit-overflow-scrolling:touch] [scrollbar-color:rgba(148,163,184,0.35)_transparent] [scrollbar-width:thin] sm:max-h-[min(48svh,440px)] lg:max-h-[min(52svh,480px)]"
            >
              <div className="flex flex-col items-stretch py-0.5">
                {projects.map((project, i) => (
                  <HomeVerticalImageSlide key={project.slug} project={project} index={i} />
                ))}
              </div>
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
        "relative",
        isPage
          ? "overflow-hidden bg-gradient-to-b from-slate-100/80 to-slate-50 pb-20 pt-2 md:pb-28"
          : "overflow-x-hidden overflow-y-visible pb-16 pt-20 md:pb-20 md:pt-24",
        className,
      )}
    >
      {isPage ? null : <VolumetricBackground />}

      <div
        className={cn(
          "relative z-10 mx-auto",
          isPage ? "px-4 md:px-6" : "w-full max-w-[min(100rem,100%)] px-4 sm:px-5 lg:px-8 xl:px-10",
        )}
      >
        {isPage ? (
          <div className="mb-2 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Browse projects</h2>
            <p className="mt-1.5 text-sm text-slate-600 md:text-base">
              Use filters to focus on a sector, or open any card for the full case write-up.
            </p>
            <CategoryFilter
              value={category}
              onChange={setCategory}
              categories={projectCategories}
            />
            {list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center text-slate-500">
                No projects in this category yet.
                <button
                  type="button"
                  onClick={() => setCategory("All")}
                  className="mt-2 block w-full text-ocean-600 font-semibold underline"
                >
                  Show all
                </button>
              </p>
            ) : null}
          </div>
        ) : null}

        {list.length > 0 ? (
          <div
            className={cn(
              isPage ? "mx-auto mt-4 max-w-7xl space-y-8 md:space-y-10" : "mt-6 w-full md:mt-7",
            )}
          >
            {!isPage ? (
              <PortfolioHomeVerticalSplit projects={list} />
            ) : singleFiltered && list[0] ? (
              <div className="mx-auto max-w-2xl">
                <GridProjectCard project={list[0]} index={0} />
              </div>
            ) : (
              <div className="grid auto-rows-auto gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
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
          className={cn(
            "mx-auto max-w-7xl",
            isPage ? "mt-20 text-center" : "mt-10 text-center md:mt-12",
          )}
        >
          <div
            className={cn(
              "mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 shadow-lg shadow-slate-200/50",
              isPage ? "p-8 md:p-10" : "p-6 md:p-8",
            )}
          >
            <h3 className="text-xl font-extrabold text-slate-900 md:text-2xl">
              {isPage ? "Ready to ship your product?" : "Talk to our team"}
            </h3>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              {isPage
                ? "Tell us about goals, users, and timeline. We will respond with a focused proposal — billing in cedis, payments via Paystack when you are ready to proceed."
                : "Tell us what you’re building—we’ll follow up with next steps."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact?topic=Project%20from%20portfolio%20page"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-7 py-3 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
              >
                Talk to our team
              </Link>
              {isPage ? null : (
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
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
