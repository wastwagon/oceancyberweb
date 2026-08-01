import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { StartupAgencyProgressBar } from "@/components/startup-agency/StartupAgencyProgressBar";
import { CaAboutSection } from "@/components/creative-agency/sections/CaAboutSection";
import { CaBlogSection } from "@/components/creative-agency/sections/CaBlogSection";
import { CaHeroSection } from "@/components/creative-agency/sections/CaHeroSection";
import { CaPortfolioSection } from "@/components/creative-agency/sections/CaPortfolioSection";
import { CaProcessSection } from "@/components/creative-agency/sections/CaProcessSection";
import { CaServicesSection } from "@/components/creative-agency/sections/CaServicesSection";
import { CaTeamSection } from "@/components/creative-agency/sections/CaTeamSection";
import { CaVideoSection } from "@/components/creative-agency/sections/CaVideoSection";
import { CaWhyChooseSection } from "@/components/creative-agency/sections/CaWhyChooseSection";

/**
 * WIP Aeolla “01_Creative agency” homepage layout.
 * Alternating dark + warm cream bands (template is NOT all-dark).
 * Uses OceanCyber images/content. Keeps StartupAgencyNavbar + Footer.
 *
 * Preview URL: `/home-creative`
 * Active live home: classic at `/` (`StartupAgencyHomeClassic`).
 */
export function CreativeAgencyHome() {
  return (
    <div
      className="relative min-h-screen bg-[var(--ae-light,#f3eee6)] text-[var(--ae-ink,#111)] antialiased"
      data-marketing-surface="creative-agency"
      data-home-variant="aeolla-01"
    >
      <a href="#creative-main-content" className="skip-link-startup">
        Skip to content
      </a>
      <StartupAgencyProgressBar />

      <main
        id="creative-main-content"
        className="sa-mobile-header-pad sa-mobile-tab-pad md:pb-0 md:pt-0"
        tabIndex={-1}
      >
        <h1 className="sr-only">
          OceanCyber — design-driven impact agency in Ghana
        </h1>

        {/* Dark */}
        <CaHeroSection />
        {/* Light */}
        <CaAboutSection />
        {/* Dark */}
        <CaServicesSection />
        {/* Light */}
        <CaPortfolioSection />
        {/* Light */}
        <CaWhyChooseSection />
        {/* Photo band */}
        <CaVideoSection />
        {/* Dark */}
        <CaProcessSection />
        {/* Light */}
        <CaTeamSection />
        {/* Light */}
        <CaBlogSection />
      </main>

      <StartupAgencyFooter />
      <StartupAgencyMobileQuickBar />
    </div>
  );
}

