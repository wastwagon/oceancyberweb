/**
 * ACTIVE homepage — Lime “Startup Agency” shell.
 *
 * Alternate / WIP home: Aeolla Creative Agency at `/home-creative`
 * (`CreativeAgencyHome`).
 */
import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { StartupAgencyProgressBar } from "@/components/startup-agency/StartupAgencyProgressBar";
import { SaAboutSection } from "@/components/startup-agency/sections/SaAboutSection";
import { SaCtaStripSection } from "@/components/startup-agency/sections/SaCtaStripSection";
import { SaDomainSearchSection } from "@/components/startup-agency/sections/SaDomainSearchSection";
import { SaCostEstimatorSection } from "@/components/startup-agency/sections/SaCostEstimatorSection";
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
import { SaPromoSection } from "@/components/startup-agency/sections/SaPromoSection";
import { VideoTestimonialSection } from "@/components/marketing/VideoTestimonialSection";

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

      <main id="startup-main-content" className="sa-mobile-header-pad sa-mobile-tab-pad md:pb-0 md:pt-28" tabIndex={-1}>
        <h1 className="sr-only">
          OceanCyber — UI/UX design, web and mobile app development in Ghana
        </h1>

        <SaHeroSection />
        <SaMarqueeSection />
        <SaAboutSection />
        <SaServicesSection />
        <SaPortfolioGallerySection />
        <SaProcessSection />

        <SaTestimonialsSectionWithData />
        <VideoTestimonialSection variant="home" />
        <SaTrustSection />
        <SaPricingSection />
        <SaCostEstimatorSection />
        <SaTechSection />
        <SaPromoSection />
        <SaHomeFaqSection />
        <SaCtaStripSection />

        <SaDomainSearchSection />
        <SaInsightsTeaserSection />
      </main>

      <StartupAgencyFooter />
      <StartupAgencyMobileQuickBar />
    </div>
  );
}
