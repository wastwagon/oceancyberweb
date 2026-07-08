"use client";

import { Cloud, Lock, Server } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import {
  deliveryStandards,
  technologyPartners,
} from "@/lib/marketing/premium-trust";

const icons = [Server, Cloud, Lock] as const;

export function PartnersAndStandardsSection() {
  return (
    <section className="sa-section relative z-10 border-b border-sa-border">
      <div className="sa-container">
        <SaReveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="sa-eyebrow">Platforms & standards</p>
          <h2 className="sa-title mt-3">Built on rails your stakeholders already trust</h2>
          <p className="sa-subtitle mx-auto mt-3">
            We integrate proven payment, cloud, and engineering platforms — with security and compliance context for Ghana.
          </p>
        </SaReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologyPartners.map((partner, i) => (
            <SaReveal key={partner.name} delay={i * 0.05}>
              <div className="sa-card h-full p-6">
                <p className="font-heading text-base font-bold text-white">{partner.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-sa-muted/80">{partner.description}</p>
              </div>
            </SaReveal>
          ))}
        </div>

        <SaReveal delay={0.15} className="mt-14">
          <p className="text-center font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-sa-muted/60">
            How we deliver
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliveryStandards.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={item.title} className="sa-card flex h-full flex-col p-5">
                  <Icon className="h-5 w-5 text-sa-primary" aria-hidden />
                  <p className="mt-3 font-heading text-sm font-bold text-white">{item.title}</p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-sa-muted/75">{item.description}</p>
                </div>
              );
            })}
          </div>
        </SaReveal>
      </div>
    </section>
  );
}
