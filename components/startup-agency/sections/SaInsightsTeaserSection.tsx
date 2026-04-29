import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { blogTeasers } from "@/lib/startup-agency/content";

export function SaInsightsTeaserSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
              Insights
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
              Latest notes
            </h2>
          </div>
          <Link
            href="/insights"
            className="font-heading text-sm font-semibold uppercase tracking-wide text-sa-primary hover:underline"
          >
            View all
          </Link>
        </SaReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {blogTeasers.map((post, i) => (
            <SaReveal key={post.title} delay={i * 0.05}>
              <Link
                href={post.href}
                className="group block rounded-2xl border border-sa-border bg-sa-surface/50 p-6 transition hover:border-sa-primary/50"
              >
                <p className="text-xs text-sa-muted">{post.date}</p>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white group-hover:text-sa-primary">
                  {post.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sa-primary">
                  Read
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
