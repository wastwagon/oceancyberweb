import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { proofOutcomes } from "@/lib/startup-agency/content";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import type { GeoProofKey, GeoServicePage } from "@/lib/seo/geo-service-pages";

const PROOF_BY_KEY: Record<GeoProofKey, (typeof proofOutcomes)[number]> = {
  "fitch-advisory": proofOutcomes[0],
  "fitch-attorneys": proofOutcomes[1],
  "thinq-shopping": proofOutcomes[2],
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";

type Props = {
  page: GeoServicePage;
};

export function GeoServicePageView({ page }: Props) {
  const pageUrl = `${SITE_URL}${page.path}`;
  const p = googleBusinessProfile;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: page.h1, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: page.h1,
        serviceType: page.serviceTypes,
        url: pageUrl,
        areaServed:
          page.city === "accra"
            ? [
                { "@type": "City", name: "Accra" },
                { "@type": "AdministrativeArea", name: "Greater Accra" },
              ]
            : { "@type": "Country", name: "Ghana" },
        description: page.description,
        offers: {
          "@type": "Offer",
          priceCurrency: "GHS",
          price: String(page.startingPriceGhs),
          url: `${SITE_URL}/pricing`,
        },
        provider: {
          "@type": "Organization",
          name: "OceanCyber",
          url: SITE_URL,
          address: {
            "@type": "PostalAddress",
            streetAddress: p.address.street,
            addressLocality: p.address.locality,
            addressCountry: p.address.countryCode,
          },
        },
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
              <li className="text-sa-muted">{page.city === "accra" ? "Accra" : "Ghana"}</li>
            </ol>
          </nav>

          <p className="mt-8 text-sm font-semibold text-sa-primary">{page.eyebrow}</p>
          <h1 className="sa-title-lg mt-3">{page.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">{page.intro}</p>

          <div className="mt-6 flex items-start gap-3 text-sm text-sa-muted/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
            {p.address.street}, Accra, Ghana
          </div>

          <p className="mt-4 text-sm text-sa-muted/80">
            Also see{" "}
            <Link href={page.siblingHref} className="sa-text-link font-medium">
              {page.siblingLabel}
            </Link>
            , the{" "}
            <Link href={page.serviceHref} className="sa-text-link font-medium">
              {page.serviceHref === "/services"
                ? "all services hub"
                : "full service overview"}
            </Link>
            , and{" "}
            <Link href="/pricing" className="sa-text-link font-medium">
              package pricing from {page.priceLabel}
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            What you get
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sa-muted/80">
            {page.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-heading text-2xl font-semibold text-white md:text-3xl">
            {page.city === "accra"
              ? "Why Accra teams pick OceanCyber"
              : "Why Ghana teams pick OceanCyber"}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sa-muted/80">
            {page.whyUs.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          {page.city === "accra" ? (
            <>
              <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                Accra proof you can verify
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sa-muted/80">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                  <span>
                    Office at {p.address.street}, Accra — meet the team before you
                    buy. Founded {p.foundedYear}, {p.teamSize}-person delivery team.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                  <span>
                    {p.rating} from {p.reviewCount} Google reviews on our Accra
                    Business Profile — not anonymous marketplace ratings.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                  <span>
                    Greater Accra clients (Airport Residential, East Legon, Tema,
                    Spintex corridor) work with the same Accra engineers — no
                    outsourced “local” front desk.
                  </span>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                Delivered from Accra across Ghana
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-sa-muted/80">
                Discovery and engineering run from {p.address.street}, Accra.
                Kumasi, Takoradi, Tamale, and remote Ghana teams get the same GHS
                packages and Accra support channel.
              </p>
            </>
          )}

          <h2 className="mt-14 font-heading text-2xl font-semibold text-white md:text-3xl">
            Results clients can open
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-sa-muted/80">
            {page.proofKeys.map((key) => {
              const item = PROOF_BY_KEY[key];
              return (
                <li key={item.client}>
                  <Link href={item.path} className="sa-text-link-quiet">
                    {item.client}
                  </Link>
                  {" — "}
                  {item.result}{" "}
                  <a href={item.href} className="sa-text-link font-medium">
                    Live site
                  </a>
                </li>
              );
            })}
          </ul>

          <h2 className="mt-14 font-heading text-2xl font-semibold text-white md:text-3xl">
            Common questions
          </h2>
          <FaqPageJsonLd items={page.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          <dl className="mt-8 space-y-6">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-heading text-base font-semibold text-white">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-sa-muted/75">{faq.answer}</dd>
              </div>
            ))}
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
              <Link href="/pricing" className="sa-text-link">
                Package pricing from {page.priceLabel}
              </Link>
            </li>
            <li>
              <Link href="/tools/project-cost" className="sa-text-link">
                Estimate scope in Ghana cedis
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="sa-text-link">
                Google reviews
              </Link>
            </li>
            <li>
              <Link href="/get-started" className="sa-text-link">
                Get started
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
