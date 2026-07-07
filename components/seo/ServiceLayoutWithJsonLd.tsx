import { ServicePageJsonLd } from "@/components/seo/ServicePageJsonLd";
import { getServicePageSeo } from "@/lib/seo/service-page-seo";

type Props = {
  path: string;
  children: React.ReactNode;
};

export function ServiceLayoutWithJsonLd({ path, children }: Props) {
  const seo = getServicePageSeo(path);

  return (
    <>
      {seo ? (
        <ServicePageJsonLd
          path={seo.path}
          name={seo.name}
          description={seo.description}
          image={seo.image}
        />
      ) : null}
      {children}
    </>
  );
}
