import type { Metadata } from "next";
import Link from "next/link";
import { WebDesignGeoPageView } from "@/components/seo/WebDesignGeoPageView";
import { withCanonical } from "@/lib/seo/canonical";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { resolveServicePageDescription } from "@/lib/seo/service-layout-metadata";
import { webDesignGhanaFaqs } from "@/lib/seo/web-design-geo-faqs";
import { siteImagePaths } from "@/lib/seo/site-image-paths";
import { webDesignGeoRelatedReading } from "@/lib/marketing/web-design-geo-related";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-ghana";
const pageUrl = `${SITE_URL}${path}`;

export async function generateMetadata(): Promise<Metadata> {
  const description = await resolveServicePageDescription(path);
  return withCanonical(
    {
      title: "Best web design company in Ghana, from GHS 6,000",
      description,
    },
    path,
  );
}

const cities = [
  "Accra",
  "Kumasi",
  "Tema",
  "Takoradi",
  "Cape Coast",
  "Tamale",
  "Sunyani",
  "Nationwide remote",
];

export default async function WebDesignGhanaPage() {
  const stats = await getGooglePlaceStats();
  const faqs = webDesignGhanaFaqs(stats);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: "Web design company in Ghana", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: "Best web design company in Ghana",
        serviceType: [
          "Web design company",
          "Website design company",
          "Website development",
          "Website developers",
        ],
        url: pageUrl,
        areaServed: { "@type": "Country", name: "Ghana" },
        description:
          "Best web design company in Ghana. Company websites, online stores, and web apps delivered from OceanCyber in Accra.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <WebDesignGeoPageView
      jsonLd={jsonLd}
      heroImage={siteImagePaths.work.brandSystem}
      eyebrow="Ghana · from GHS 6,000"
      h1="Best web design company in Ghana"
      intro={
        <p>
          Websites for Ghana businesses nationwide — designed and built from Accra for Kumasi, Tema,
          Takoradi, Tamale, and remote teams. Same GHS packages as Accra clients, one phone number,
          and screen-share discovery when you cannot visit. Prefer local meetings? See{" "}
          <Link href="/services/web-design-in-accra" className="sa-text-link font-medium">
            web design in Accra
          </Link>
          .
        </p>
      }
      ctaTopic="Web design in Ghana"
      faqs={faqs}
      relatedReading={webDesignGeoRelatedReading}
      showContactBlock
    >
      <section>
        <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
          Cities and coverage
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {cities.map((city) => (
            <li
              key={city}
              className="rounded-full border border-sa-border bg-sa-surface px-3 py-1.5 text-sm text-sa-muted"
            >
              {city}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-sa-muted/70">
          Looking for Accra specifically?{" "}
          <Link href="/services/web-design-in-accra" className="sa-text-link font-medium">
            Web designer in Accra
          </Link>
          .
        </p>
      </section>
    </WebDesignGeoPageView>
  );
}
