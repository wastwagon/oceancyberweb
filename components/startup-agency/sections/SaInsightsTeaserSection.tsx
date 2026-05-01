"use client";

import Link from "next/link";
import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { blogTeasers } from "@/lib/startup-agency/content";

export function SaInsightsTeaserSection() {
  return (
    <section id="insights" className="sa-section scroll-mt-28 md:scroll-mt-32">
      <div className="sa-container">
        <SaReveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="sa-eyebrow">Insights</span>
            <h2 className="sa-title mt-2 md:text-4xl">Latest notes</h2>
          </div>
          <Link
            href="/insights"
            className="sa-button-outline"
          >
            View all insights
          </Link>
        </SaReveal>

        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {blogTeasers.map((post, i) => (
            <SaReveal key={post.title} delay={i * 0.1}>
              <Link
                href={post.href}
                className="group block"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Badge - Tab Style */}
                  <div className="absolute bottom-0 left-0 bg-sa-primary px-4 py-2 font-heading text-[10px] font-bold uppercase tracking-wider text-black rounded-tr-[10px]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 text-xs text-sa-muted">
                    <span>{post.date}</span>
                    <span className="h-3 w-[1px] bg-sa-border" />
                    <span>By {post.author}</span>
                  </div>
                  
                  <h3 className="mt-4 font-heading text-xl font-bold uppercase leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-sa-primary lg:text-2xl">
                    {post.title}
                  </h3>

                  <div className="mt-6 inline-block">
                    <span className="relative pb-1 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all duration-300">
                      Read more
                      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-sa-primary transition-all duration-300 group-hover:h-[5px]" />
                    </span>
                  </div>
                </div>
              </Link>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
