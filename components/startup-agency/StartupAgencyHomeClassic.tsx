/**
 * ACTIVE homepage — Lime “Startup Agency” shell.
 *
 * Alternate / WIP home: Aeolla Creative Agency at `/home-creative`
 * (`CreativeAgencyHome`).
 */
import { Suspense } from "react";
import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { StartupAgencyProgressBar } from "@/components/startup-agency/StartupAgencyProgressBar";
import { SaAboutSection } from "@/components/startup-agency/sections/SaAboutSection";
import { SaCtaStripSection } from "@/components/startup-agency/sections/SaCtaStripSection";
import { SaHeroSection } from "@/components/startup-agency/sections/SaHeroSection";
import { SaHomeFaqSection } from "@/components/startup-agency/sections/SaHomeFaqSection";
import { SaInsightsTeaserSection } from "@/components/startup-agency/sections/SaInsightsTeaserSection";
import { SaMarqueeSection } from "@/components/startup-agency/sections/SaMarqueeSection";
import { SaPricingSection } from "@/components/startup-agency/sections/SaPricingSection";
import { SaProcessSection } from "@/components/startup-agency/sections/SaProcessSection";
import { SaPortfolioGallerySection } from "@/components/startup-agency/sections/SaPortfolioGallerySection";
import { SaServicesSection } from "@/components/startup-agency/sections/SaServicesSection";
import { SaTechSection } from "@/components/startup-agency/sections/SaTechSection";
import { SaTestimonialsSectionWithData } from "@/components/startup-agency/sections/SaTestimonialsSectionWithData";
import { SaTrustSection } from "@/components/startup-agency/sections/SaTrustSection";

export function StartupAgencyHomeClassic() {
  return (
    <div
      className="sa-shell relative min-h-screen bg-sa-bg text-sa-muted antialiased"
      data-marketing-surface="startup-agency"
      data-home-variant="classic"
    >
      <a href="#startup-main-content" className="skip-link-startup">
        Skip to content
      </a>
      <StartupAgencyProgressBar />

      <main id="startup-main-content" className="sa-mobile-tab-pad md:pb-0" tabIndex={-1}>
        <SaHeroSection />
        <SaMarqueeSection />
        <SaAboutSection />
        <SaServicesSection />
        <SaPortfolioGallerySection />
        <SaProcessSection />

        <Suspense
          fallback={
            <section
              id="testimonials"
              className="sa-section border-b border-sa-border bg-sa-bg"
              aria-busy="true"
            >
              <div className="sa-container">
                <p className="text-sm text-sa-muted">Loading reviews…</p>
              </div>
            </section>
          }
        >
          <SaTestimonialsSectionWithData />
        </Suspense>
        <SaTrustSection />
        <SaPricingSection />
        <SaTechSection />
        <SaHomeFaqSection />
        <SaCtaStripSection />
        <SaInsightsTeaserSection />
      </main>

      <StartupAgencyFooter />
      <StartupAgencyMobileQuickBar />
    </div>
  );
}
