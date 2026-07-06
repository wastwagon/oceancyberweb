"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Newspaper, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";
import {
  buildInsightsHref,
  insightArticlePath,
  insightCategories,
  parseInsightCategoryParam,
  type InsightPost,
} from "@/lib/insights/content";

function contactHrefForTopic(title: string) {
  return `/contact?topic=${encodeURIComponent(title)}`;
}

type InsightsPageClientProps = {
  posts: InsightPost[];
};

export function InsightsPageClient({ posts }: InsightsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const category = useMemo(
    () => parseInsightCategoryParam(searchParams.get("category")),
    [searchParams],
  );

  const [draft, setDraft] = useState(q);

  useEffect(() => {
    setDraft(q);
  }, [q]);

  const byCategory = useMemo(() => {
    if (category === "All") return posts;
    return posts.filter((p) => p.category === category);
  }, [category, posts]);

  const filtered = useMemo(() => {
    if (!q) return byCategory;
    const ql = q.toLowerCase();
    return byCategory.filter(
      (p) =>
        p.title.toLowerCase().includes(ql) ||
        p.excerpt.toLowerCase().includes(ql) ||
        p.category.toLowerCase().includes(ql),
    );
  }, [byCategory, q]);

  const [featured, ...rest] = filtered;

  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" aria-hidden />
              Insights
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl"
            >
              Thought
              <span className="text-sa-primary"> leadership</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
            >
              Perspectives on security, platforms, and digital transformation
              across Ghana and Africa, written for leaders who ship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-b border-sa-border">
        <div className="sa-container">
          <form
            role="search"
            className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(buildInsightsHref(draft, category));
            }}
          >
            <label htmlFor="insights-search" className="sr-only">
              Search insights
            </label>
            <input
              id="insights-search"
              name="q"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search articles…"
              autoComplete="off"
              className="min-h-[48px] flex-1 rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none transition"
            />
            <div className="flex shrink-0 gap-2 sm:flex-row">
              <button
                type="submit"
                className="sa-btn-primary min-h-[48px] px-6"
              >
                Search
              </button>
              {q ? (
                <Link
                  href={buildInsightsHref("", category)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-sa-border bg-sa-surface px-5 text-sm font-semibold text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
                >
                  Clear
                </Link>
              ) : null}
            </div>
          </form>

          <motion.div
            {...fadeUpSoft}
            className="mt-8 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Filter by category"
          >
            {insightCategories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    router.replace(buildInsightsHref(q, cat));
                  }}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    active
                      ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
                      : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid gap-4 md:grid-cols-3 mb-16">
            {[
              {
                title: "Security & resilience",
                body: "Threat posture, incident readiness, and practical controls for teams shipping fast.",
              },
              {
                title: "Platform decisions",
                body: "Architecture patterns, stack trade-offs, and execution sequencing that reduces rework.",
              },
              {
                title: "Growth systems",
                body: "How product, commerce, and automation choices influence conversion and retention.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="sa-card p-6 border-sa-border/50"
              >
                <p className="font-heading text-sm font-bold text-white">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-sa-muted/80">{item.body}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="sa-card flex flex-col items-center justify-center p-16 text-center border-dashed border-sa-border/40">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sa-surface border border-sa-border">
                <Search className="h-8 w-8 text-sa-muted/40" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">No matches found</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-sa-muted/60">
                {q ? (
                  <>
                    We couldn&apos;t find any articles matching &ldquo;<span className="text-white font-semibold">{q}</span>&rdquo;. 
                    Try adjusting your keywords or refine your filters.
                  </>
                ) : (
                  "There are currently no articles in this category. We're constantly publishing new insights, so check back soon."
                )}
              </p>
              <div className="mt-8">
                <Link
                  href="/insights"
                  className="sa-btn-outline !min-h-[40px] text-xs"
                >
                  Clear All Filters
                </Link>
              </div>
            </div>
          ) : (
            <>
              {featured && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.55 }}
                  className="sa-card mb-10 overflow-hidden md:mb-12"
                >
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    <Link
                      href={insightArticlePath(featured.slug)}
                      className="relative block aspect-[16/10] w-full border-b border-sa-border md:aspect-auto md:w-[48%] md:min-h-[320px] md:border-b-0 md:border-r"
                    >
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        className="object-cover object-center grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg via-transparent to-transparent opacity-80 md:bg-gradient-to-r" />
                      <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-md">
                          {featured.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-sa-bg/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                          Featured
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col justify-center p-6 md:p-10 lg:p-12">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                        <time dateTime={featured.date}>{featured.date}</time>
                        <span className="text-sa-border">·</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <h2 className="mt-4 font-heading text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                        <Link
                          href={insightArticlePath(featured.slug)}
                          className="transition hover:text-sa-primary"
                        >
                          {featured.title}
                        </Link>
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-sa-muted/80 md:text-base">
                        {featured.excerpt}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          href={insightArticlePath(featured.slug)}
                          className="sa-btn-primary gap-2"
                        >
                          Read article
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link
                          href={contactHrefForTopic(featured.title)}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-6 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary hover:text-white"
                        >
                          Talk to our team
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={staggerDelay(index, 0.06)}
                    className="sa-card flex h-full flex-col overflow-hidden"
                  >
                    <Link
                      href={insightArticlePath(post.slug)}
                      className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-sa-border"
                    >
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover object-top grayscale transition-transform duration-700 ease-out hover:scale-105 hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg/80 via-transparent to-transparent" />
                      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-md">
                        {post.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                        <time dateTime={post.date}>{post.date}</time>
                        <span className="text-sa-border">·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-3 font-heading text-lg font-bold leading-snug tracking-tight text-white">
                        <Link
                          href={insightArticlePath(post.slug)}
                          className="transition hover:text-sa-primary"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-sa-muted/80">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                        <Link
                          href={insightArticlePath(post.slug)}
                          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:text-white"
                        >
                          Read article
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpSoft}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="sa-title !text-3xl">
              Editorial newsletter
            </h2>
            <p className="sa-subtitle mx-auto mt-4 max-w-lg text-sm">
              We&apos;re building a mailing list for long-form notes and release
              notes. Leave your email, and we&apos;ll only write when it&apos;s
              worth your time.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="insights-email" className="sr-only">
                Email
              </label>
              <input
                id="insights-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
                className="min-h-[48px] flex-1 rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none transition"
              />
              <button
                type="submit"
                className="sa-btn-primary min-h-[48px] shrink-0"
              >
                Notify me
              </button>
            </form>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">
              No spam. Unsubscribe anytime, once the program is live.
            </p>
            <Link
              href="/services/website-to-mobile-app"
              className="mt-6 inline-flex min-h-[42px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-6 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition hover:border-sa-primary hover:bg-sa-primary/20 hover:text-white"
            >
              Convert your website into a mobile app
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
