import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InsightArticleJsonLd } from "@/components/seo/InsightArticleJsonLd";
import { buildInsightsHref, type InsightPost } from "@/lib/insights/content";

function contactHrefForTopic(title: string) {
  return `/contact?topic=${encodeURIComponent(title)}`;
}

type Props = {
  post: InsightPost;
};

export function InsightArticleView({ post }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <InsightArticleJsonLd post={post} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(2, 106, 255, 0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2, 106, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 0%, transparent 70%)",
          }}
        />
      </div>

      <article className="relative z-10">
        <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-3xl px-6 py-8 md:px-8 md:py-10">
            <Link
              href={buildInsightsHref("", "All")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-700 transition hover:text-ocean-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to insights
            </Link>
          </div>
        </div>

        <header className="border-b border-slate-200/80">
          <div className="relative aspect-[21/9] w-full max-h-[min(52vh,520px)] min-h-[200px] md:min-h-[280px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="container mx-auto max-w-3xl px-0 md:px-0">
                <span className="inline-block rounded-full border border-white/25 bg-slate-900/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {post.category}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="text-slate-400">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
          <p className="text-lg font-medium leading-relaxed text-slate-800 md:text-xl">
            {post.excerpt}
          </p>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-600">
            {post.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-ocean-50/80 to-white p-8 shadow-sm ring-1 ring-slate-200/50 md:p-10">
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              Want to explore this for your team?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tell us about priorities and timelines—we&apos;ll route you to the right lead.
            </p>
            <Link
              href={contactHrefForTopic(post.title)}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
