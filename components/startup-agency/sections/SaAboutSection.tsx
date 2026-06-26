import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaReviewBadges } from "@/components/startup-agency/sections/SaReviewBadges";
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
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sa-primary animate-pulse" />
                <span className="sa-eyebrow">Our Agency</span>
              </div>
              <h2 className="sa-title text-left">
                Design craft meets engineering discipline
              </h2>
              <p className="sa-subtitle mt-6 text-left">
                OceanCyber is an Accra-based product studio. We partner with ambitious
                teams to shape brands, design intuitive experiences, and ship software
                that performs under real-world pressure — across Ghana, London, and
                global markets.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-sa-muted">
                From fintech and e-commerce to professional services, we combine UX
                research, visual design, and secure engineering so your product looks
                premium and scales with confidence.
              </p>
            </SaReveal>

            <SaReveal delay={0.15} className="mt-10 grid grid-cols-3 gap-4">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-sa-border bg-sa-surface/40 px-4 py-5 text-center"
                >
                  <p className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </SaReveal>

            <SaReveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="sa-btn-primary gap-2">
                Our story
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="sa-btn-outline">
                Start a project
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
