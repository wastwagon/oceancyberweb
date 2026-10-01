import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { blogTeasers } from "@/lib/startup-agency/content";

/** Aeolla blog = LIGHT cream band. */
export function CaBlogSection() {
  return (
    <section id="insights" className="ae-band-light relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1860px] px-4 sm:px-8 lg:px-[30px]">
        <SaReveal>
          <p className="ae-eyebrow">Latest blogs & insights</p>
        </SaReveal>

        <div className="mt-10 space-y-5">
          {blogTeasers.map((post, i) => {
            const day = String(13 - i).padStart(2, "0");
            const [month = "July", year = "2026"] = post.date.split(" ");

            return (
              <SaReveal key={post.title} delay={i * 0.06}>
                <Link
                  href={post.href}
                  className="group grid overflow-hidden rounded-[10px] border border-[var(--ae-line-light)] bg-white/60 transition hover:border-[var(--ae-primary)]/50 lg:grid-cols-[1fr_560px_1fr] lg:items-stretch"
                >
                  <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    <div className="flex items-start gap-3">
                      <span className="font-heading text-3xl font-extrabold leading-none text-[var(--ae-ink)] md:text-4xl">
                        {day}
                      </span>
                      <span className="pt-1 text-sm font-medium leading-tight text-[var(--ae-ink-subtle)]">
                        {month}
                        <br />
                        {year}
                      </span>
                    </div>
                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[var(--ae-ink)]/8 px-3 py-1 text-sm font-medium text-[var(--ae-ink)]">
                          by {post.author}
                        </span>
                        <span className="rounded-full bg-[var(--ae-primary)] px-3 py-1 text-sm font-medium text-black">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="mt-5 font-heading text-xl font-bold leading-snug tracking-tight text-[var(--ae-ink)] transition group-hover:text-[var(--ae-primary)] md:text-2xl lg:text-[28px] lg:leading-9">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  <div className="relative min-h-[220px] lg:min-h-[310px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 560px"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    <p className="ae-body-light text-sm leading-relaxed md:text-base">
                      Practical notes from OceanCyber — strategy, security, and product
                      delivery for teams in Ghana and for clients abroad, from Accra.
                    </p>
                    <span className="mt-8 inline-flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[var(--ae-ink)]/20 text-[var(--ae-ink)] transition group-hover:border-[var(--ae-primary)] group-hover:bg-[var(--ae-primary)] group-hover:text-black">
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </SaReveal>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/insights"
            className="sa-pressable inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-[var(--ae-ink)]/25 px-8 text-[15px] font-semibold text-[var(--ae-ink)] sm:w-auto sm:rounded-full"
          >
            View all insights
          </Link>
        </div>
      </div>
    </section>
  );
}
