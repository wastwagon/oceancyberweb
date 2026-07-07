"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Code, Smartphone, Shield, ShoppingCart, Cloud, Palette } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { serviceCards } from "@/lib/startup-agency/content";

function getServiceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("ui") || t.includes("brand") || t.includes("ux")) return Palette;
  if (t.includes("web")) return Code;
  if (t.includes("mobile")) return Smartphone;
  if (t.includes("cyber")) return Shield;
  if (t.includes("commerce")) return ShoppingCart;
  if (t.includes("cloud") || t.includes("hosting")) return Cloud;
  return Code;
}

export function SaServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-sa-border bg-sa-bg py-16 md:py-32"
    >
      <div className="sa-container">
        <SaSectionHeader
          align="center"
          eyebrow="Services"
          title="What we do"
          className="mb-16"
        />

        <div className="space-y-4 md:space-y-8">
          {serviceCards.map((service, index) => {
            const Icon = getServiceIcon(service.title);
            const imageFirst = index % 2 === 0;

            return (
              <SaReveal key={service.title} delay={index * 0.08}>
                <Link
                  href={service.href}
                  className="sa-pressable group grid overflow-hidden rounded-3xl border border-white/10 bg-sa-surface/30 transition-colors duration-300 active:scale-[0.99] hover:border-sa-primary/30 hover:bg-white/[0.03] md:min-h-[300px] md:grid-cols-2 lg:min-h-[340px]"
                >
                  <div
                    className={`relative aspect-[16/10] w-full md:aspect-auto md:min-h-[300px] lg:min-h-[340px] ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />
                  </div>

                  <div
                    className={`flex flex-col justify-center gap-6 p-6 md:p-10 lg:p-12 ${
                      imageFirst
                        ? "md:border-l md:border-white/10"
                        : "md:order-1 md:border-r md:border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sa-primary text-black transition-colors duration-300 group-hover:bg-white md:h-14 md:w-14">
                          <Icon className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white md:text-2xl lg:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-300 group-hover:border-sa-primary group-hover:bg-sa-primary group-hover:text-black">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="max-w-xl text-sm leading-relaxed text-sa-muted md:text-base">
                      {service.desc}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sa-primary transition group-hover:text-white">
                      Explore service
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </SaReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
