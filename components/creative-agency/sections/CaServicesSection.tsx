"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { serviceCards } from "@/lib/startup-agency/content";

const TAGS: Record<string, string[]> = {
  "UI/UX & Brand": ["ART DIRECTION", "BRANDING", "LOGO DESIGN"],
  "Web Development": ["NEXT.JS", "PERFORMANCE", "SEO"],
  "Mobile Apps": ["IOS", "ANDROID", "PRODUCT"],
  "E‑commerce": ["STOREFRONT", "CHECKOUT", "GROWTH"],
  Cybersecurity: ["AUDITS", "HARDENING", "MONITORING"],
  "Cloud Hosting": ["DOMAINS", "SSL", "UPTIME"],
};

/** Aeolla services: full-width editorial rows; OC serviceCards content + images. */
export function CaServicesSection() {
  const rows = serviceCards.slice(0, 5);
  const [active, setActive] = useState(1);

  return (
    <section id="services" className="ae-band-dark relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1770px] px-4 sm:px-8 lg:px-[75px]">
        <SaReveal>
          <p className="ae-eyebrow">Our services</p>
        </SaReveal>
      </div>

      <div className="relative mt-10">
        {/* Hover preview image — template center card */}
        <div className="pointer-events-none absolute left-1/2 top-8 z-20 hidden h-[538px] w-[444px] -translate-x-1/2 overflow-hidden rounded-[10px] lg:block">
          <Image
            src={rows[active]?.image ?? rows[0].image}
            alt=""
            fill
            className="object-cover transition duration-500"
            sizes="444px"
          />
        </div>

        <ul className="relative z-10">
          {rows.map((service, index) => {
            const isHot = active === index;
            const tags = TAGS[service.title] ?? ["DESIGN", "BUILD", "LAUNCH"];

            return (
              <li key={service.title}>
                <Link
                  href={service.href}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`group relative flex min-h-[140px] flex-col justify-center border-t border-white/15 px-4 transition-colors sm:px-8 md:min-h-[152px] lg:flex-row lg:items-center lg:justify-between lg:px-[75px] ${
                    isHot ? "bg-[var(--ae-primary)] text-black" : "bg-transparent text-white"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4 py-6 md:gap-8">
                    <span
                      className={`font-heading text-sm font-bold md:text-base ${
                        isHot ? "text-black/50" : "text-white/35"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <h3 className="font-heading text-[clamp(1.75rem,4.5vw,4.5rem)] font-bold uppercase leading-none tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pb-6 lg:max-w-xl lg:justify-end lg:pb-0">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex h-9 items-center rounded-full border px-5 text-[11px] font-medium uppercase tracking-wider md:h-9 md:text-[15px] ${
                          isHot ? "border-black text-black" : "border-white/15 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className={`ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                        isHot ? "border-black bg-black text-[var(--ae-primary)]" : "border-white/20"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
          <div className="border-t border-white/15" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
