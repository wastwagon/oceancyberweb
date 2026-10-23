import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { SaSectionHeader } from "@/components/startup-agency/SaSectionHeader";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";
import { faqItems } from "@/lib/startup-agency/content";
import type { HomeFaqItem } from "@/lib/trust/review-trust";

type Props = {
  items?: readonly HomeFaqItem[];
};

export function SaHomeFaqSection({ items = faqItems }: Props) {
  return (
    <section
      id="faq"
      className="sa-section scroll-mt-28 border-b border-sa-border md:scroll-mt-32"
    >
      <FaqPageJsonLd items={items} />
      <div className="sa-container">
        <SaReveal className="mb-10">
          <SaSectionHeader eyebrow="FAQ" title="Common questions" />
        </SaReveal>
        <StartupAgencyFaq items={items} />
      </div>
    </section>
  );
}
