import { StartupAgencyFooter } from "@/components/startup-agency/StartupAgencyFooter";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { StartupAgencyNavbar } from "@/components/startup-agency/StartupAgencyNavbar";
import { StartupAgencyProgressBar } from "@/components/startup-agency/StartupAgencyProgressBar";
import { SaAboutSection } from "@/components/startup-agency/sections/SaAboutSection";
import { SaCtaStripSection } from "@/components/startup-agency/sections/SaCtaStripSection";
import { SaHeroSection } from "@/components/startup-agency/sections/SaHeroSection";
import { SaHomeFaqSection } from "@/components/startup-agency/sections/SaHomeFaqSection";
import { SaInsightsTeaserSection } from "@/components/startup-agency/sections/SaInsightsTeaserSection";
import { SaMarqueeSection } from "@/components/startup-agency/sections/SaMarqueeSection";
import { SaPricingSection } from "@/components/startup-agency/sections/SaPricingSection";
import { SaProcessSection } from "@/components/startup-agency/sections/SaProcessSection";
import { SaProjectsCtaSection } from "@/components/startup-agency/sections/SaProjectsCtaSection";
import { SaServicesSection } from "@/components/startup-agency/sections/SaServicesSection";
import { SaTechSection } from "@/components/startup-agency/sections/SaTechSection";
import { SaTestimonialsSection } from "@/components/startup-agency/sections/SaTestimonialsSection";

export function StartupAgencyHome() {
  return (
    <div
      className="sa-shell relative min-h-screen bg-sa-bg text-sa-muted antialiased"
      data-marketing-surface="startup-agency"
    >
      <a href="#startup-main-content" className="skip-link-startup">
        Skip to content
      </a>
      <StartupAgencyProgressBar />

      <main id="startup-main-content" className="pb-24 pt-24 md:pb-0 md:pt-28" tabIndex={-1}>
        <h1 className="sr-only">
          OceanCyber — Web and mobile app development in Ghana
        </h1>

        <SaHeroSection />
        <SaMarqueeSection />
        <SaAboutSection />
        <SaServicesSection />
        <SaProcessSection />
        <SaTechSection />
        <SaProjectsCtaSection />
        <SaTestimonialsSection />
        <SaPricingSection />
        <SaHomeFaqSection />
        <SaCtaStripSection />
        <SaInsightsTeaserSection />
      </main>

      <StartupAgencyMobileQuickBar />
    </div>
  );
}
