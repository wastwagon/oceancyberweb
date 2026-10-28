import type { Metadata } from "next";
import Link from "next/link";
import { WebDesignGeoPageView } from "@/components/seo/WebDesignGeoPageView";
import { withCanonical } from "@/lib/seo/canonical";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import { resolveServicePageDescription } from "@/lib/seo/service-layout-metadata";
import { webDesignAccraFaqs } from "@/lib/seo/web-design-geo-faqs";
import { siteImagePaths } from "@/lib/seo/site-image-paths";
import {
  webDesignAccraExtraLinks,
  webDesignGeoRelatedReading,
} from "@/lib/marketing/web-design-geo-related";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-accra";
const pageUrl = `${SITE_URL}${path}`;
const ghanaUrl = `${SITE_URL}/services/web-design-in-ghana`;

export async function generateMetadata(): Promise<Metadata> {
  const description = await resolveServicePageDescription(path);
  return withCanonical(
    {
      title: "Best web design company in Accra, from GHS 6,000",
      description,
    },
    path,
  );
}

export default async function WebDesignAccraPage() {
  const stats = await getGooglePlaceStats();
  const faqs = webDesignAccraFaqs(stats);
  const serviceDescription = await resolveServicePageDescription(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: "Web design company in Ghana", item: ghanaUrl },
          { "@type": "ListItem", position: 4, name: "Web design company in Accra", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: "Best web design company in Accra",
        serviceType: [
          "Web design company",
          "Website design company",
          "Website development",
          "Website developers",
        ],
        url: pageUrl,
        areaServed: { "@type": "City", name: "Accra" },
        description: serviceDescription,
        offers: {
          "@type": "Offer",
          priceCurrency: "GHS",
          price: "6000",
          url: `${SITE_URL}/pricing`,
        },
      },
    ],
  };

  const relatedReading = [...webDesignGeoRelatedReading, ...webDesignAccraExtraLinks];

  return (
    <WebDesignGeoPageView
      jsonLd={jsonLd}
      heroImage={siteImagePaths.work.brandSystem}
      eyebrow="Accra · from GHS 6,000"
      h1="Best web design company in Accra"
      intro={
        <p>
          Company websites designed and built in one Accra office — structure, visuals, and
          engineering together, so you are not bouncing between a designer and a separate developer.
          Packages from GHS 6,000. Meet us at 47 Nii Kwashiefio Avenue. Outside Greater Accra, see{" "}
          <Link href="/services/web-design-in-ghana" className="sa-text-link font-medium">
            web design in Ghana
          </Link>
          .
        </p>
      }
      showOfficePin
      ctaTopic="Web design in Accra"
      faqs={faqs}
      proofHeading="Results in Accra"
      relatedReading={relatedReading}
    />
  );
}
