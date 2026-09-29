import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
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
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <InsightArticleJsonLd post={post} />

      <article className="relative z-10 pt-20">
        <div className="sticky top-[var(--sa-mobile-header)] z-20 border-b border-sa-border bg-sa-bg/80 backdrop-blur-sm lg:top-28">
          <div className="sa-container max-w-3xl py-3 md:py-4">
            <Link
              href={buildInsightsHref("", "All")}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to insights
            </Link>
          </div>
        </div>

        <header className="border-b border-sa-border relative">
          <div className="relative aspect-[21/9] w-full max-h-[min(52vh,520px)] min-h-[280px] md:min-h-[400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg via-sa-bg/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="sa-container max-w-3xl px-0 md:px-0">
                <span className="inline-flex min-h-8 items-center rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 text-sm font-medium text-sa-primary backdrop-blur-md">
                  {post.category}
                </span>
                <h1 className="sa-title-lg !text-left mt-4 text-white">
                  {post.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-sa-muted/80">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="text-sa-border">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="sa-container max-w-3xl py-12 md:py-16">
          <p className="text-lg font-medium leading-relaxed text-white md:text-xl border-l-2 border-sa-primary pl-6 mb-12">
            {post.excerpt}
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-sa-muted/90">
            {post.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {post.sections?.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-heading text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-sa-muted/90">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-sa-muted/90">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.links ? (
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-semibold text-sa-primary hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {post.related && post.related.length > 0 ? (
            <nav className="mt-14 border-t border-sa-border pt-8" aria-label="Related reading">
              <h2 className="font-heading text-xl font-semibold text-white">Related reading</h2>
              <ul className="mt-4 space-y-2">
                {post.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-semibold text-sa-primary hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="mt-16 sa-card p-8 md:p-10">
            <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
              Want to explore this for your team?
            </h2>
            <p className="mt-3 text-sm text-sa-muted/80">
              Tell us about priorities and timelines—we&apos;ll route you to the right lead.
            </p>
            <Link
              href={contactHrefForTopic(post.title)}
              className="sa-btn-primary mt-8 w-full gap-2 sm:w-auto"
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
