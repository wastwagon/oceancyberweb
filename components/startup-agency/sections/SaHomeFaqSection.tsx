import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";

export function SaHomeFaqSection() {
  return (
    <section
      id="faq"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <FaqPageJsonLd />
      <div className="sa-container">
        <SaReveal className="mb-10 text-center">
          <span className="sa-eyebrow">FAQ</span>
          <h2 className="sa-title mt-3 md:text-4xl">Common questions</h2>
        </SaReveal>
        <StartupAgencyFaq />
      </div>
    </section>
  );
}
