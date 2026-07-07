import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { StartupAgencyNavbar } from "@/components/startup-agency/StartupAgencyNavbar";
import { StartupAgencyProgressBar } from "@/components/startup-agency/StartupAgencyProgressBar";
import { SaAboutSection } from "@/components/startup-agency/sections/SaAboutSection";
import { SaClientLogosSection } from "@/components/startup-agency/sections/SaClientLogosSection";
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
import type { ClientLogoEntry } from "@/lib/startup-agency/client-logos-runtime";

type StartupAgencyHomeProps = {
  clientLogos: ClientLogoEntry[];
};

export function StartupAgencyHome({ clientLogos }: StartupAgencyHomeProps) {
  return (
    <div
      className="sa-shell relative min-h-screen bg-sa-bg text-sa-muted antialiased"
      data-marketing-surface="startup-agency"
    >
      <a href="#startup-main-content" className="skip-link-startup">
        Skip to content
      </a>
      <StartupAgencyProgressBar />

      <main id="startup-main-content" className="sa-mobile-header-pad sa-mobile-tab-pad md:pb-0 md:pt-28" tabIndex={-1}>
        <h1 className="sr-only">
          OceanCyber — UI/UX design, web and mobile app development in Ghana
        </h1>

        {/* Phase 1: Hero → trust → story → services → work */}
        <SaHeroSection />
        <SaMarqueeSection />
        <SaClientLogosSection entries={clientLogos} />
        <SaAboutSection />
        <SaServicesSection />
        <SaPortfolioGallerySection />
        <SaProcessSection />

        {/* Phase 2: Social proof, pricing, tools */}
        <SaTestimonialsSectionWithData />
        <SaTrustSection />
        <SaPricingSection />
        <SaCostEstimatorSection />
        <SaTechSection />
        <SaPromoSection />
        <SaHomeFaqSection />
        <SaCtaStripSection />

        {/* Commerce utilities after conversion path */}
        <SaDomainSearchSection />
        <SaInsightsTeaserSection />
      </main>

      <StartupAgencyFooter />
      <StartupAgencyMobileQuickBar />
    </div>
  );
}
