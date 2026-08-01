"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { aboutWorkPreview } from "@/lib/startup-agency/content";

const FILTERS = ["All", "Web", "Mobile", "Brand", "Security"] as const;
type PortfolioFilter = (typeof FILTERS)[number];

type WorkItem = (typeof aboutWorkPreview)[number];

function itemMatchesFilter(item: WorkItem, filter: PortfolioFilter) {
  if (filter === "All") return true;
  return (item.tags as readonly string[]).includes(filter);
}

function spanForIndex(index: number, total: number) {
  if (total === 1) return "col-span-12 aspect-[21/9] min-h-[280px]";
  if (total === 2) {
    return index === 0
      ? "col-span-12 md:col-span-7 aspect-[16/11]"
      : "col-span-12 md:col-span-5 aspect-[4/5] md:min-h-[360px]";
  }
  if (total === 3) {
    return [
      "col-span-12 md:col-span-7 aspect-[16/11]",
      "col-span-12 sm:col-span-6 md:col-span-5 aspect-[4/5]",
      "col-span-12 sm:col-span-6 md:col-span-12 aspect-[21/9]",
    ][index];
  }
  return [
    "col-span-12 md:col-span-7 aspect-[16/11]",
    "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-auto md:min-h-[420px]",
    "col-span-12 sm:col-span-6 md:col-span-4 aspect-square",
    "col-span-12 sm:col-span-6 md:col-span-4 aspect-square",
    "col-span-12 sm:col-span-6 md:col-span-4 aspect-square",
    "col-span-12 md:col-span-8 aspect-[21/9]",
  ][index] ?? "col-span-12 sm:col-span-6 md:col-span-4 aspect-square";
}

/** Aeolla portfolio = LIGHT cream band with working category filters. */
export function CaPortfolioSection() {
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () => aboutWorkPreview.filter((item) => itemMatchesFilter(item, filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<PortfolioFilter, number> = {
      All: aboutWorkPreview.length,
      Web: 0,
      Mobile: 0,
      Brand: 0,
      Security: 0,
    };
    for (const item of aboutWorkPreview) {
      for (const tag of item.tags) {
        if (tag in map) map[tag as Exclude<PortfolioFilter, "All">] += 1;
      }
    }
    return map;
  }, []);

  return (
    <section id="projects" className="ae-band-light relative overflow-hidden py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1770px] px-4 sm:px-8 lg:px-[75px]">
        <SaReveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="ae-eyebrow">Portfolio</p>
            <h2 className="ae-title-light mt-4 text-[clamp(2rem,4vw,3.5rem)]">
              Recent projects
            </h2>
            <p className="ae-body-light mt-3 text-sm md:text-base" aria-live="polite">
              Showing {filtered.length} of {aboutWorkPreview.length}
              {filter !== "All" ? ` · ${filter}` : ""}
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter portfolio projects"
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              const count = counts[f];
              const disabled = f !== "All" && count === 0;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={disabled}
                  onClick={() => setFilter(f)}
                  className={`sa-pressable inline-flex h-10 items-center gap-2 rounded-full px-5 text-xs font-bold uppercase tracking-wider transition ${
                    active
                      ? "bg-[var(--ae-primary)] text-black"
                      : "border border-[var(--ae-ink)]/20 text-[var(--ae-ink)] hover:border-[var(--ae-primary)] hover:text-[var(--ae-primary)]"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {f}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-black/15 text-black" : "bg-[var(--ae-ink)]/8 text-[var(--ae-ink-subtle)]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </SaReveal>

        <div className="mt-12 min-h-[220px]">
          {filtered.length === 0 ? (
            <div className="rounded-[10px] border border-[var(--ae-line-light)] bg-white/50 px-6 py-16 text-center">
              <p className="font-heading text-lg font-bold uppercase tracking-wide text-[var(--ae-ink)]">
                No projects in this filter
              </p>
              <p className="ae-body-light mt-2 text-sm">
                Try another category or reset to All.
              </p>
              <button
                type="button"
                onClick={() => setFilter("All")}
                className="sa-pressable mt-6 inline-flex min-h-11 items-center rounded-full bg-[var(--ae-primary)] px-6 text-xs font-bold uppercase tracking-wider text-black"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-12 gap-4 md:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.title}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, delay: index * 0.04 }}
                    className={spanForIndex(index, filtered.length)}
                  >
                    <Link
                      href={item.href}
                      className="group relative block h-full min-h-[220px] overflow-hidden rounded-[10px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ae-primary)]">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-extrabold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio?tab=creative"
            className="sa-pressable inline-flex min-h-12 items-center rounded-full border border-[var(--ae-ink)]/25 px-8 text-sm font-bold uppercase tracking-wider text-[var(--ae-ink)] hover:border-[var(--ae-primary)] hover:text-[var(--ae-primary)]"
          >
            Open full portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
