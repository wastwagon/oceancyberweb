"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  fadeUpSoft,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
};

const blogPosts: InsightPost[] = [
  {
    slug: "future-cybersecurity-africa",
    title: "The Future of Cybersecurity in Africa",
    excerpt:
      "Exploring the evolving cybersecurity landscape across African nations and the unique challenges and opportunities that lie ahead.",
    image: "/images/EGP Ghana.webp",
    category: "Security",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    slug: "digital-transformation-ghana",
    title: "Digital Transformation: A Ghanaian Perspective",
    excerpt:
      "How businesses in Ghana are embracing digital transformation to stay competitive in the global market.",
    image: "/images/Fitch Advisory.webp",
    category: "Technology",
    date: "March 10, 2024",
    readTime: "7 min read",
  },
  {
    slug: "fintech-banking-unbanked",
    title: "Fintech Revolution: Banking the Unbanked",
    excerpt:
      "Examining how fintech solutions are bringing financial services to underserved communities across Africa.",
    image: "/images/Juelle Hair.webp",
    category: "Finance",
    date: "March 5, 2024",
    readTime: "6 min read",
  },
  {
    slug: "ecommerce-emerging-markets",
    title: "E-commerce Growth in Emerging Markets",
    excerpt:
      "Strategies for success in the rapidly growing e-commerce sector across emerging African economies.",
    image: "/images/Tour World Tourism.webp",
    category: "Business",
    date: "February 28, 2024",
    readTime: "8 min read",
  },
  {
    slug: "ai-ml-practical",
    title: "AI and Machine Learning: Practical Applications",
    excerpt:
      "Real-world applications of AI and ML technologies that are transforming industries today.",
    image: "/images/Africa Trade Chamber.webp",
    category: "Innovation",
    date: "February 20, 2024",
    readTime: "10 min read",
  },
  {
    slug: "data-privacy-compliance",
    title: "Data Privacy and Compliance in the Digital Age",
    excerpt:
      "Understanding data protection regulations and implementing effective privacy measures for your business.",
    image: "/images/Fitch Attorney.webp",
    category: "Compliance",
    date: "February 15, 2024",
    readTime: "4 min read",
  },
];

const categories = [
  "All",
  "Security",
  "Technology",
  "Finance",
  "Business",
  "Innovation",
  "Compliance",
] as const;

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

function contactHrefForTopic(title: string) {
  return `/contact?topic=${encodeURIComponent(title)}`;
}

export default function InsightsPage() {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === category);
  }, [category]);

  const [featured, ...rest] = filtered;

  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <PageAmbient />

      <section className="relative z-10 overflow-hidden border-b border-slate-200/80 pb-16 pt-28 md:pb-20 md:pt-36">
        <HeroSectionMotionLayers tone="light" />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-800 shadow-sm"
            >
              <Newspaper className="h-3.5 w-3.5 text-ocean-600" aria-hidden />
              Insights
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
            >
              Thought
              <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                leadership
              </span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-600 md:text-lg"
            >
              Perspectives on security, platforms, and digital transformation
              across Ghana and Africa, written for leaders who ship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200/80 py-10 md:py-12">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            {...fadeUpSoft}
            className="flex flex-wrap justify-center gap-2 md:justify-start md:gap-2.5"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all md:px-5 md:text-[11px] ${
                    active
                      ? "border-ocean-600 bg-ocean-50 text-ocean-900 shadow-sm shadow-slate-200/40"
                      : "border-slate-200/90 bg-white text-slate-600 ring-1 ring-slate-200/40 hover:border-ocean-200 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-slate-600">
              No articles in this category yet. Try another filter.
            </p>
          ) : (
            <>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.55 }}
                className="mb-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-200/50 transition-colors hover:border-ocean-200/80 hover:shadow-md md:mb-12"
              >
                <div className="flex flex-col md:flex-row md:items-stretch">
                  <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-[48%] md:min-h-[280px]">
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-slate-900/2 md:to-slate-900/3" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/25 bg-slate-900/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {featured.category}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/20 px-3 py-1 font-mono text-[10px] text-slate-100 backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center border-t border-slate-100 p-6 md:border-t-0 md:border-l md:border-slate-200/60 md:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <time dateTime={featured.date}>{featured.date}</time>
                      <span className="text-slate-400">·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                      {featured.excerpt}
                    </p>
                    <Link
                      href={contactHrefForTopic(featured.title)}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                      Discuss this topic
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </motion.article>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {rest.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={staggerDelay(index, 0.06)}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-200/50 transition-all hover:-translate-y-0.5 hover:border-ocean-200/80 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-900/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col border-t border-slate-100 p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-slate-900">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>
                      <Link
                        href={contactHrefForTopic(post.title)}
                        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition-colors hover:text-ocean-900"
                      >
                        Discuss this topic
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="relative z-10 border-t border-slate-200/80 py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-10 text-center shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 backdrop-blur-sm md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Editorial newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 md:text-base">
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
                className="min-h-[48px] flex-1 rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200"
              />
              <button
                type="submit"
                className="min-h-[48px] shrink-0 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Notify me
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-500">
              No spam. Unsubscribe anytime, once the program is live.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
