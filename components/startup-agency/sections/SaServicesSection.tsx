"use client";

import Link from "next/link";
import Image from "next/image";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { serviceCards } from "@/lib/startup-agency/content";

export function SaServicesSection() {
  return (
    <section
      id="services"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container text-center">
        <SaReveal className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-sa-primary">★ ★ ★ ★ ★</span>
            <span className="sa-eyebrow">5.0 Based on delivery reviews</span>
          </div>
          <h2 className="sa-title uppercase font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-bold">
            View Our Services
          </h2>
        </SaReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s, i) => (
            <SaReveal key={s.title} delay={i * 0.1}>
              <Link href={s.href} className="group block text-left">
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-sa-border bg-sa-surface">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-sa-primary sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted sm:text-base">
                  {s.desc}
                </p>
              </Link>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
