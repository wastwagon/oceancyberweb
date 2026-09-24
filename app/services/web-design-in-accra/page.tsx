import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { withCanonical } from "@/lib/seo/canonical";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-accra";
const pageUrl = `${SITE_URL}${path}`;
const ghanaUrl = `${SITE_URL}/services/web-design-in-ghana`;

export const metadata: Metadata = withCanonical(
  {
    title: "Web Designer in Accra",
    description:
      "Web designer in Accra for company websites, online stores, and web apps. Part of OceanCyber's nationwide Ghana web design service, based on Nii Kwashiefio Avenue.",
  },
  path,
);

export default function WebDesignAccraPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: "Web designer in Ghana", item: ghanaUrl },
          { "@type": "ListItem", position: 4, name: "Web designer in Accra", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: "Web design in Accra",
        serviceType: ["Web design", "Web development"],
        url: pageUrl,
        areaServed: { "@type": "City", name: "Accra" },
        description:
          "Web designer in Accra for company websites and web apps, delivered from OceanCyber on Nii Kwashiefio Avenue.",
      },
    ],
  };

  return (
    <div className="bg-sa-bg text-sa-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-sa-border">
        <div className="sa-container max-w-3xl pb-14 pt-28 md:pb-20 md:pt-36">
          <nav aria-label="Breadcrumb" className="text-sm text-sa-muted/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-sa-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/services" className="hover:text-sa-primary">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/services/web-design-in-ghana" className="hover:text-sa-primary">
                  Ghana
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-sa-muted">Accra</li>
            </ol>
          </nav>

          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-sa-primary">
            Accra studio
          </p>
          <h1 className="sa-title-lg mt-3">
            Web designer in Accra
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">
            Local studio on Nii Kwashiefio Avenue for Accra businesses that want design and
            build in one place. Nationwide delivery uses the same team—see our{" "}
            <Link href="/services/web-design-in-ghana" className="text-sa-primary hover:underline">
              web designer in Ghana
            </Link>{" "}
            page for coverage outside Accra.
          </p>

          <div className="mt-6 flex items-start gap-3 text-sm text-sa-muted/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
            232 Nii Kwashiefio Avenue, Accra, Ghana
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-started" className="sa-btn-primary inline-flex items-center gap-2">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="sa-btn-outline inline-flex items-center gap-2">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
