"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Code, Smartphone, Shield, ShoppingCart, Cloud, Palette } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
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
      className="relative overflow-hidden border-b border-sa-border bg-sa-bg py-24 md:py-32"
    >
      <div className="sa-container">
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-8 flex w-full max-w-4xl items-center">
            <div className="h-px flex-1 bg-white/20" />
            <div className="mx-6 flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Services
            </div>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <h2 className="text-center font-heading text-4xl font-bold uppercase tracking-widest text-white md:text-5xl lg:text-6xl">
            What We Do
          </h2>
        </div>

        <div className="border-t border-white/20">
          {serviceCards.map((service, index) => {
            const Icon = getServiceIcon(service.title);

            return (
              <SaReveal key={service.title} delay={index * 0.08}>
                <Link
                  href={service.href}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-5 border-b border-white/20 px-4 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[minmax(0,240px)_176px_minmax(0,1fr)_auto] md:gap-x-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,280px)_192px_minmax(0,1fr)_auto] lg:gap-x-10"
                >
                  <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sa-primary text-black transition-colors duration-300 group-hover:bg-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-white md:text-xl lg:text-2xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="col-start-2 row-start-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-sa-primary md:col-start-4">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>

                  <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-sa-surface md:col-span-1 md:col-start-2 md:row-start-1 md:aspect-[4/3]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition group-hover:opacity-40" />
                  </div>

                  <div className="col-span-2 border-t border-white/10 pt-5 md:col-span-1 md:col-start-3 md:row-start-1 md:border-l md:border-t-0 md:py-2 md:pl-8 lg:pl-10">
                    <p className="text-sm leading-relaxed text-sa-muted">{service.desc}</p>
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
