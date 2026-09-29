import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { withCanonical } from "@/lib/seo/canonical";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-accra";
const pageUrl = `${SITE_URL}${path}`;
const ghanaUrl = `${SITE_URL}/services/web-design-in-ghana`;

export const metadata: Metadata = withCanonical(
  {
    title: "Web designer in Accra",
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

          <p className="mt-8 text-sm font-semibold text-sa-primary">
            Accra company
          </p>
          <h1 className="sa-title-lg mt-3">
            Web designer in Accra
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">
            Local company on Nii Kwashiefio Avenue for Accra businesses that want design and
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

          <div className="mt-8 flex flex-col items-start gap-3">
            <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-sa-primary"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Plan the project
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link href="/guides/website-cost-in-ghana" className="font-semibold text-sa-primary hover:underline">
                How much a website costs in Ghana
              </Link>
            </li>
            <li>
              <Link href="/compare/agency-vs-freelancer-vs-in-house-ghana" className="font-semibold text-sa-primary hover:underline">
                Agency, freelancer, or an in-house hire
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="font-semibold text-sa-primary hover:underline">
                Package pricing
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
