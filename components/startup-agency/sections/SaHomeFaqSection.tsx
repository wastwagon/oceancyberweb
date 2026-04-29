import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";

export function SaHomeFaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 border-b border-sa-border py-16 md:scroll-mt-32 md:py-24"
    >
      <FaqPageJsonLd />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SaReveal className="mb-10 text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sa-primary">
            FAQ
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Common questions
          </h2>
        </SaReveal>
        <StartupAgencyFaq />
      </div>
    </section>
  );
}
