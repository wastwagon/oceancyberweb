import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { serviceCards } from "@/lib/startup-agency/content";

export function SaServicesSection() {
  return (
    <section
      id="services"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <div className="sa-container">
        <SaReveal className="mb-12 text-center">
          <span className="sa-eyebrow">Services</span>
          <h2 className="sa-title mt-3">What we deliver</h2>
          <p className="sa-subtitle mx-auto">
            Focused capabilities with clear handoffs — pick a lane and we&apos;ll scope the rest.
          </p>
        </SaReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s, i) => (
            <SaReveal key={s.title} delay={i * 0.05}>
              <Link
                href={s.href}
                className="sa-card group flex h-full flex-col p-6 md:p-7 hover:shadow-lg hover:shadow-sa-primary/5"
              >
                <h3 className="font-heading text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-sa-muted">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-[0.14em] text-sa-primary">
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
