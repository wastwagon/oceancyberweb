import {
  absoluteSiteImageUrl,
  geoTaggedImageObject,
  imageContentLocation,
} from "@/lib/seo/image-geo";

export type ServiceFaqJsonLdItem = { q: string; a: string };

type ServicePageJsonLdProps = {
  path: string;
  name: string;
  description: string;
  image: string;
  /** Lowest published GHS price on this service — must match visible copy. */
  offerPriceGhs?: number;
  faqs?: readonly ServiceFaqJsonLdItem[];
};

export function ServicePageJsonLd({
  path,
  name,
  description,
  image,
  offerPriceGhs,
  faqs,
}: ServicePageJsonLdProps) {
  const pageUrl = absoluteSiteImageUrl(path);

  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    name,
    description,
    url: pageUrl,
    provider: {
      "@type": "ProfessionalService",
      name: "OceanCyber",
      url: absoluteSiteImageUrl("/"),
      areaServed: {
        "@type": "Place",
        name: "Accra, Ghana",
      },
      location: imageContentLocation(),
    },
    areaServed: imageContentLocation(),
    image: geoTaggedImageObject(image, { name, description }),
  };

  if (typeof offerPriceGhs === "number") {
    serviceNode.offers = {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: String(offerPriceGhs),
      url: absoluteSiteImageUrl("/pricing"),
      availability: "https://schema.org/InStock",
    };
  }

  const graph: Record<string, unknown>[] = [serviceNode];

  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  const jsonLd =
    graph.length === 1
      ? { "@context": "https://schema.org", ...serviceNode }
      : { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
