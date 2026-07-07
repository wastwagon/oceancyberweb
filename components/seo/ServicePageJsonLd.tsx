import {
  absoluteSiteImageUrl,
  geoTaggedImageObject,
  imageContentLocation,
} from "@/lib/seo/image-geo";

type ServicePageJsonLdProps = {
  path: string;
  name: string;
  description: string;
  image: string;
};

export function ServicePageJsonLd({
  path,
  name,
  description,
  image,
}: ServicePageJsonLdProps) {
  const pageUrl = absoluteSiteImageUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
