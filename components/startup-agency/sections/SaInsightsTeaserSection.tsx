"use client";

import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaWhenVisibleImage } from "@/components/startup-agency/SaWhenVisibleImage";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { blogTeasers } from "@/lib/startup-agency/content";

export function SaInsightsTeaserSection() {
  return (
    <section id="insights" className="sa-section scroll-mt-28 md:scroll-mt-32">
      <div className="sa-container">
        <SaReveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SaSectionHeader align="left" eyebrow="Insights" title="Latest notes" />
          <Link
            href="/insights"
            className="inline-flex min-h-11 items-center text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
          >
            View all insights
          </Link>
        </SaReveal>

        <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
          {blogTeasers.map((post, i) => (
            <SaReveal key={post.title} delay={i * 0.1} className={i > 0 ? "hidden md:block" : undefined}>
              <Link
                href={post.href}
                className="group block"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
                  <SaWhenVisibleImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Category Badge - Tab Style */}
                  <div className="absolute bottom-0 left-0 rounded-tr-[10px] bg-sa-primary px-3 py-1.5 font-heading text-sm font-semibold text-black">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 text-sm text-sa-muted">
                    <span>{post.date}</span>
                    <span className="h-3 w-[1px] bg-sa-border" />
                    <span>By {post.author}</span>
                  </div>
                  
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-sa-primary md:text-xl">
                    {post.title}
                  </h3>

                  <div className="mt-6 inline-block">
                    <span className="relative pb-1 font-heading text-sm font-medium text-white transition-all duration-300">
                      Read more
                      <span className="absolute bottom-0 left-0 h-[3px] w-full bg-sa-primary transition-all duration-300 group-hover:h-[5px]" />
                    </span>
                  </div>
                </div>
              </Link>
            </SaReveal>
          ))}
        </div>

        <div className="mt-12 border-t border-sa-border pt-8">
          <p className="font-heading text-sm font-semibold text-white">Buyer guides</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li>
              <Link href="/guides/website-cost-in-ghana" className="font-semibold text-sa-primary hover:underline">
                Website cost in Ghana
              </Link>
            </li>
            <li>
              <Link href="/alternatives/wix-ghana" className="font-semibold text-sa-primary hover:underline">
                Wix alternatives
              </Link>
            </li>
            <li>
              <Link href="/alternatives/shopify-ghana" className="font-semibold text-sa-primary hover:underline">
                Shopify alternatives
              </Link>
            </li>
            <li>
              <Link href="/guides/dwumapos-for-ghana-shops" className="font-semibold text-sa-primary hover:underline">
                DwumaPOS for Ghana shops
              </Link>
            </li>
            <li>
              <Link href="/guides" className="font-semibold text-sa-primary hover:underline">
                All guides
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
