import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { serviceCards } from "@/lib/startup-agency/content";

export function SaServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-12 text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
            Services
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            What we deliver
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sa-muted">
            Focused capabilities with clear handoffs — pick a lane and we&apos;ll scope the rest.
          </p>
        </SaReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s, i) => (
            <SaReveal key={s.title} delay={i * 0.05}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-sa-border bg-sa-surface/50 p-6 transition hover:border-sa-primary/60 hover:shadow-lg hover:shadow-sa-primary/5"
              >
                <h3 className="font-heading text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-wide text-sa-primary">
                  View service
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </SaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
