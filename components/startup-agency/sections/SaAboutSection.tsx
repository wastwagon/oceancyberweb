import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { SaTeamCollage } from "@/components/startup-agency/sections/SaTeamCollage";
import { aboutStats } from "@/lib/startup-agency/content";

export function SaAboutSection() {
  return (
    <section
      id="about"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SaReveal>
              <SaSectionHeader
                align="left"
                eyebrow="Our Agency"
                title="Design craft meets engineering discipline"
                subtitle="OceanCyber is an Accra-based company. We partner with ambitious teams to shape brands, design intuitive experiences, and ship software that holds up in real use across Ghana and for clients abroad."
              />
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted">
                From fintech and e-commerce to professional services, we combine UX
                research, visual design, and secure engineering so your product looks
                premium and scales with confidence.
              </p>
            </SaReveal>

            <SaReveal delay={0.15} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-sa-border bg-sa-surface/40 px-4 py-5 text-center"
                >
                  <p className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-sa-muted/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </SaReveal>

            <SaReveal delay={0.25} className="mt-8">
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary underline-offset-4 hover:underline"
              >
                Our story
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </SaReveal>
          </div>

          <SaReveal delay={0.2}>
            <SaTeamCollage />
          </SaReveal>
        </div>
      </div>
    </section>
  );
}
