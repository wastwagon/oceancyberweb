import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { withCanonical } from "@/lib/seo/canonical";
import { proofOutcomes } from "@/lib/startup-agency/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-accra";
const pageUrl = `${SITE_URL}${path}`;
const ghanaUrl = `${SITE_URL}/services/web-design-in-ghana`;

export const metadata: Metadata = withCanonical(
  {
    title: "Best web design company in Accra",
    description:
      "Best web design company in Accra for company websites, online stores, and web apps. OceanCyber is at 47 Nii Kwashiefio Avenue, rated 4.9 from 54 Google reviews.",
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
          { "@type": "ListItem", position: 3, name: "Web design company in Ghana", item: ghanaUrl },
          { "@type": "ListItem", position: 4, name: "Web design company in Accra", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: "Best web design company in Accra",
        serviceType: ["Web design", "Web development"],
        url: pageUrl,
        areaServed: { "@type": "City", name: "Accra" },
        description:
          "Best web design company in Accra for company websites and web apps. OceanCyber, 47 Nii Kwashiefio Avenue, rated 4.9 from 54 Google reviews.",
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
            Best in Accra
          </p>
          <h1 className="sa-title-lg mt-3">
            Best web design company in Accra
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">
            OceanCyber is the company Accra businesses hire for design and build in one place.
            Rated 4.9 from 54 Google reviews, with 25 people at 47 Nii Kwashiefio Avenue. For
            the rest of Ghana, see our{" "}
            <Link href="/services/web-design-in-ghana" className="text-sa-primary hover:underline">
              web design company in Ghana
            </Link>{" "}
            page for coverage outside Accra.
          </p>

          <div className="mt-6 flex items-start gap-3 text-sm text-sa-muted/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
            47 Nii Kwashiefio Avenue, Accra, Ghana
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

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Results in Accra
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sa-muted/80">
            {proofOutcomes.map((item) => (
              <li key={item.client}>
                <a href={item.href} className="font-semibold text-white hover:text-sa-primary">
                  {item.client}
                </a>
                {" — "}
                {item.result}
              </li>
            ))}
          </ul>
          <h2 className="mt-14 font-heading text-2xl font-semibold text-white md:text-3xl">
            Common questions
          </h2>
          <FaqPageJsonLd
            items={[
              {
                q: "Who is the best web design company in Accra?",
                a: "OceanCyber, at 47 Nii Kwashiefio Avenue. Founded in 2008, with 25 people and a 4.9 rating from 54 Google reviews.",
              },
              {
                q: "Where can we meet?",
                a: "The only office is at 47 Nii Kwashiefio Avenue, Accra. Call +233 242 565 695.",
              },
            ]}
          />
          <dl className="mt-8 space-y-6">
            <div>
              <dt className="font-heading text-base font-semibold text-white">
                Who is the best web design company in Accra?
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-sa-muted/75">
                OceanCyber, at 47 Nii Kwashiefio Avenue. Founded in 2008, with 25 people and a 4.9 rating from 54 Google reviews.
              </dd>
            </div>
            <div>
              <dt className="font-heading text-base font-semibold text-white">Where can we meet?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-sa-muted/75">
                The only office is at 47 Nii Kwashiefio Avenue, Accra. Call +233 242 565 695.
              </dd>
            </div>
          </dl>
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
