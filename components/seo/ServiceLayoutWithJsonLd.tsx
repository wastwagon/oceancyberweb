import { ServicePageJsonLd } from "@/components/seo/ServicePageJsonLd";
import { resolveServicePageDescription } from "@/lib/seo/service-layout-metadata";
import { getServiceHubFaqs } from "@/lib/seo/service-hub-faqs";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

type Props = {
  path: string;
  children: React.ReactNode;
};

export async function ServiceLayoutWithJsonLd({ path, children }: Props) {
  const seo = getServicePageSeo(path);
  const faqs = getServiceHubFaqs(path);
  const description = seo ? await resolveServicePageDescription(path) : undefined;

  return (
    <>
      {seo && description ? (
        <ServicePageJsonLd
          path={seo.path}
          name={seo.name}
          description={description}
          image={seo.image}
          offerPriceGhs={seo.offerPriceGhs}
          faqs={faqs}
        />
      ) : null}
      {children}
    </>
  );
}
