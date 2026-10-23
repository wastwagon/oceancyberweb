import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { StartupAgencyFaq } from "@/components/startup-agency/StartupAgencyFaq";
import { getServiceHubFaqs } from "@/lib/seo/service-hub-faqs";

type Props = {
  path: string;
  title?: string;
};

export function ServiceHubFaqSection({ path, title = "Common questions" }: Props) {
  const hubFaqs = getServiceHubFaqs(path) ?? [];
  const items = hubFaqs.map((item) => ({ q: item.q, a: item.a }));
  if (items.length === 0) return null;

  return (
    <section className="sa-section relative z-10 border-t border-sa-border">
      <FaqPageJsonLd items={items} />
      <div className="sa-container max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
        <div className="mt-8">
          <StartupAgencyFaq items={items} />
        </div>
      </div>
    </section>
  );
}
