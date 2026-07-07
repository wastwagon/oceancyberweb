"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Layers3,
  LineChart,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
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

const editorialPillars = [
  {
    icon: Shield,
    title: "Security & resilience",
    body: "Threat posture, incident readiness, and practical controls for teams shipping fast.",
  },
  {
    icon: Layers3,
    title: "Platform decisions",
    body: "Architecture patterns, stack trade-offs, and execution sequencing that reduces rework.",
  },
  {
    icon: LineChart,
    title: "Growth systems",
    body: "How product, commerce, and automation choices influence conversion and retention.",
  },
] as const;

type InsightsPageClientProps = {
  posts: InsightPost[];
};

function InsightCover({
  post,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  post: InsightPost;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={post.image}
        alt={post.title}
        fill
        className={`object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03] ${className}`}
        sizes={sizes}
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg via-sa-bg/20 to-transparent opacity-90" />
    </>
  );
}

function ArticleMeta({ post }: { post: InsightPost }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
      <time dateTime={post.date}>{post.date}</time>
      <span className="text-sa-border">·</span>
      <span>{post.readTime}</span>
      <span className="text-sa-border">·</span>
      <span className="text-sa-primary/80">OceanCyber Research</span>
    </div>
  );
}

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
  const topicCount = new Set(posts.map((p) => p.category)).size;

  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />

      <section className="sa-page-intro relative z-10 overflow-hidden border-b border-sa-border">
        <div className="sa-container relative z-10 pb-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.div variants={heroMotion.item}>
              <SaSectionHeader
                as="h1"
                size="page"
                eyebrow="Insights"
                title={
                  <>
                    Thought
                    <span className="text-sa-primary"> leadership</span>
                  </>
                }
                subtitle="Perspectives on security, platforms, and digital transformation across Ghana and Africa — written for leaders who ship."
                subtitleVariant="lead"
              />
            </motion.div>

            <motion.div
              variants={heroMotion.item}
              className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 md:gap-4"
            >
              {[
                { value: String(posts.length), label: "Articles" },
                { value: String(topicCount), label: "Topics" },
                { value: "GH & Africa", label: "Focus" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-sa-border/80 bg-sa-surface/40 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="font-heading text-lg font-bold text-white md:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-sa-border py-10 md:py-12">
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
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sa-muted/50"
                aria-hidden
              />
              <input
                id="insights-search"
                name="q"
                type="search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Search articles…"
                autoComplete="off"
                className="min-h-[48px] w-full rounded-xl border border-sa-border bg-sa-surface/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-sa-muted/50 backdrop-blur-sm transition focus:border-sa-primary focus:outline-none"
              />
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="submit" className="sa-btn-primary min-h-[48px] px-6">
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
              const count =
                cat === "All"
                  ? posts.length
                  : posts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => router.replace(buildInsightsHref(q, cat))}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    active
                      ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
                      : "border-sa-border bg-sa-surface/60 text-sa-muted hover:border-sa-primary/50 hover:text-white"
                  }`}
                >
                  {cat}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            {editorialPillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={staggerDelay(index, 0.06)}
                  className="group sa-card border-sa-border/50 p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-sa-primary/25 bg-sa-primary/10 text-sa-primary transition group-hover:border-sa-primary/50">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="sa-card-title">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-sa-muted/80">
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {filtered.length > 0 ? (
            <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-sa-muted/50">
              Showing {filtered.length} article{filtered.length === 1 ? "" : "s"}
              {category !== "All" ? ` in ${category}` : ""}
              {q ? ` matching “${q}”` : ""}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <div className="sa-card flex flex-col items-center justify-center border-dashed border-sa-border/40 p-16 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sa-border bg-sa-surface">
                <Search className="h-8 w-8 text-sa-muted/40" />
              </div>
              <h3 className="sa-title">No matches found</h3>
              <p className="sa-subtitle mx-auto mt-3 max-w-sm">
                {q ? (
                  <>
                    We couldn&apos;t find articles matching &ldquo;
                    <span className="text-white">{q}</span>&rdquo;. Try different
                    keywords or reset filters.
                  </>
                ) : (
                  "No articles in this category yet. Check back soon for new notes."
                )}
              </p>
              <Link href="/insights" className="sa-btn-outline mt-8 !min-h-[40px] text-xs">
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              {featured ? (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.55 }}
                  className="group sa-card mb-12 overflow-hidden md:mb-14"
                >
                  <div className="flex flex-col lg:flex-row lg:items-stretch">
                    <Link
                      href={insightArticlePath(featured.slug)}
                      className="relative block aspect-[16/10] w-full overflow-hidden border-b border-sa-border lg:aspect-auto lg:w-[52%] lg:min-h-[360px] lg:border-b-0 lg:border-r"
                    >
                      <InsightCover
                        post={featured}
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-sa-primary/30 bg-sa-bg/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-md">
                          {featured.category}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-sa-bg/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                          <Sparkles className="h-3 w-3 text-sa-primary" aria-hidden />
                          Featured
                        </span>
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col justify-center p-6 md:p-10 lg:p-12">
                      <ArticleMeta post={featured} />
                      <h2 className="sa-card-title mt-4 text-xl md:text-2xl">
                        <Link
                          href={insightArticlePath(featured.slug)}
                          className="transition hover:text-sa-primary"
                        >
                          {featured.title}
                        </Link>
                      </h2>
                      <p className="sa-subtitle mt-4 max-w-xl text-left">
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
              ) : null}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {rest.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={staggerDelay(index, 0.06)}
                    className="group sa-card flex h-full flex-col overflow-hidden"
                  >
                    <Link
                      href={insightArticlePath(post.slug)}
                      className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-sa-border"
                    >
                      <InsightCover post={post} sizes="(max-width: 768px) 100vw, 33vw" />
                      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-sa-primary/30 bg-sa-bg/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary backdrop-blur-md">
                        {post.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <ArticleMeta post={post} />
                      <h2 className="sa-card-title mt-3">
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
                      <Link
                        href={insightArticlePath(post.slug)}
                        className="group/link mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:text-white"
                      >
                        Read article
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-4xl">
          <motion.div {...fadeUpSoft} className="sa-card relative overflow-hidden p-10 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,243,64,0.08),transparent_60%)]" />
            <div className="relative">
              <SaSectionHeader
                eyebrow="Stay in the loop"
                title="Editorial newsletter"
                subtitle="Long-form notes on security, product, and digital growth in Ghana and Africa. We only write when it's worth your time."
              />
              <form
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
                onSubmit={(e) => e.preventDefault()}
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
                  className="min-h-[48px] flex-1 rounded-xl border border-sa-border bg-sa-bg/60 px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none"
                />
                <button type="submit" className="sa-btn-primary min-h-[48px] shrink-0">
                  Notify me
                </button>
              </form>
              <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-sa-muted/40">
                No spam. Unsubscribe anytime once the program is live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="sa-btn-outline !min-h-[42px] text-[10px]">
                  Discuss a topic
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-6 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition hover:border-sa-primary hover:bg-sa-primary/20"
                >
                  See our work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
