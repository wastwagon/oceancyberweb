import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { blogTeasers } from "@/lib/startup-agency/content";

export function SaInsightsTeaserSection() {
  return (
    <section id="insights" className="sa-section scroll-mt-28 md:scroll-mt-32">
      <div className="sa-container">
        <SaReveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="sa-eyebrow">Insights</span>
            <h2 className="sa-title mt-2 md:text-4xl">Latest notes</h2>
          </div>
          <Link
            href="/insights"
            className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-sa-primary underline-offset-4 transition duration-300 hover:underline"
          >
            View all
          </Link>
        </SaReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {blogTeasers.map((post, i) => (
            <SaReveal key={post.title} delay={i * 0.05}>
              <Link
                href={post.href}
                className="sa-card group block p-6 md:p-7"
              >
                <p className="text-xs text-sa-muted">{post.date}</p>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white group-hover:text-sa-primary">
                  {post.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sa-primary">
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
