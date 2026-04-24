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
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
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
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.26)_0%,transparent_72%)] blur-[88px]" />
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
    <main className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] pb-16 pt-28 md:pb-20 md:pt-36">
        <HeroSectionMotionLayers />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
            >
              <Newspaper className="h-3.5 w-3.5 text-blue-400" aria-hidden />
              Insights
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Thought
              <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
                {" "}
                leadership
              </span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-400 md:text-lg"
            >
              Perspectives on security, platforms, and digital transformation
              across Ghana and Africa, written for leaders who ship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-b border-white/[0.06] py-10 md:py-12">
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
                      ? "border-[#143296cc] bg-[#143296cc]/20 text-white shadow-md shadow-[#143296cc]/15"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
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
            <p className="py-16 text-center text-slate-400">
              No articles in this category yet. Try another filter.
            </p>
          ) : (
            <>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.55 }}
                className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#143296cc]/40 md:mb-12"
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
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#00000a]/35 md:to-[#00000a]/90" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {featured.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-[10px] text-slate-200 backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <time dateTime={featured.date}>{featured.date}</time>
                      <span className="text-slate-600">·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
                      {featured.excerpt}
                    </p>
                    <Link
                      href={contactHrefForTopic(featured.title)}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/20 transition-all hover:brightness-110"
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
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-0.5 hover:border-[#143296cc]/40 hover:shadow-lg hover:shadow-[#143296cc]/10"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a]/80 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
                        {post.excerpt}
                      </p>
                      <Link
                        href={contactHrefForTopic(post.title)}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200"
                      >
                        Discuss this topic
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Editorial newsletter
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
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
                className="min-h-[48px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-[#143296cc]/60 focus:outline-none focus:ring-2 focus:ring-[#143296cc]/30"
              />
              <button
                type="submit"
                className="min-h-[48px] shrink-0 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-6 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/20 transition-all hover:brightness-110"
              >
                Notify me
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-600">
              No spam. Unsubscribe anytime, once the program is live.
            </p>
          </motion.div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </main>
  );
}
