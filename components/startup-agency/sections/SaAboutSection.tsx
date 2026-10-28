import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { SaAgencySpotlight } from "@/components/startup-agency/sections/SaAgencySpotlight";
import { SITE_CTA } from "@/lib/marketing/site-cta";
import { aboutStats, companyPresence } from "@/lib/startup-agency/content";

type Props = {
  presenceSubtitle?: string;
};

export function SaAboutSection({ presenceSubtitle = companyPresence }: Props) {
  return (
    <section
      id="about"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32 bg-sa-bg"
    >
      <div className="sa-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SaReveal>
              <SaSectionHeader
                align="left"
                eyebrow="Our Agency"
                title="We design in Figma and build in-house in Accra"
                subtitle={presenceSubtitle}
              />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-sa-muted md:text-base">
                We are a web and mobile development agency in Accra — design, engineering, hosting, and
                security consulting in one team, not a handoff chain. That keeps your site or app
                consistent as you add features, logins, or payments.
              </p>
            </SaReveal>

            <SaReveal delay={0.12} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-sa-border bg-sa-surface/30 px-4 py-4 text-center sm:py-5"
                >
                  <p className="font-heading text-lg font-bold text-white md:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-sa-muted/90 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </SaReveal>

            <SaReveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={SITE_CTA.ourStory.href}
                className="sa-btn-primary inline-flex min-h-11 w-full sm:w-auto"
              >
                {SITE_CTA.ourStory.label}
              </Link>
              <Link
                href={SITE_CTA.howWeWork.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-sa-primary underline underline-offset-4 hover:text-white"
              >
                {SITE_CTA.howWeWork.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </SaReveal>
          </div>

          <SaReveal delay={0.15}>
            <SaAgencySpotlight />
          </SaReveal>
        </div>
      </div>
    </section>
  );
}
