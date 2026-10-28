import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { MarketingRelatedReading } from "@/components/marketing/MarketingRelatedReading";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { proofOutcomes } from "@/lib/startup-agency/content";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { geoPageRelatedReading } from "@/lib/marketing/related-reading-presets";
import { SITE_CTA, getStartedHref } from "@/lib/marketing/site-cta";
import { cybersecurityDisclosureShort } from "@/lib/marketing/cyber-licence";
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
  const cyberNote =
    page.topicKey === "cybersecurity" ? cybersecurityDisclosureShort() : null;
  const related = geoPageRelatedReading(page.topicKey);

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
          "@type": "ProfessionalService",
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
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 pt-20">
        <div className="sticky top-[var(--sa-mobile-header)] z-20 border-b border-sa-border bg-sa-bg/80 backdrop-blur-sm lg:top-28">
          <div className="sa-container max-w-3xl py-3 md:py-4">
            <Link
              href={page.serviceHref}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to service overview
            </Link>
          </div>
        </div>

        <header className="relative border-b border-sa-border">
          <div className="relative aspect-[21/9] w-full max-h-[min(52vh,520px)] min-h-[280px] md:min-h-[400px]">
            <Image
              src={page.image}
              alt={page.h1}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg via-sa-bg/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="sa-container max-w-3xl px-0 md:px-0">
                <span className="inline-flex min-h-8 items-center rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 text-sm font-medium text-sa-primary backdrop-blur-md">
                  {page.eyebrow}
                </span>
                <h1 className="sa-title-lg !text-left mt-4 text-white">{page.h1}</h1>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-sa-muted/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-sa-primary" aria-hidden />
                    {p.address.street}, Accra
                  </span>
                  <span className="text-sa-border">·</span>
                  <span>From {page.priceLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="sa-container max-w-3xl py-12 md:py-16">
          <div className="space-y-4 text-lg font-medium leading-relaxed text-white md:text-xl border-l-2 border-sa-primary pl-6 mb-12">
            <p>{page.intro}</p>
          </div>

          {cyberNote ? (
            <p className="mb-10 rounded-2xl border border-sa-border bg-sa-surface/40 px-4 py-3 text-sm leading-relaxed text-sa-muted/90">
              {cyberNote}
            </p>
          ) : null}

          <p className="text-base leading-relaxed text-sa-muted/85">
            Also see{" "}
            <Link href={page.siblingHref} className="sa-text-link font-medium">
              {page.siblingLabel}
            </Link>
            , the{" "}
            <Link href={page.serviceHref} className="sa-text-link font-medium">
              full service overview
            </Link>
            , and{" "}
            <Link href="/pricing" className="sa-text-link font-medium">
              package pricing from {page.priceLabel}
            </Link>
            .
          </p>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">What you get</h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-sa-muted/85">
              {page.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              {page.city === "accra"
                ? "Why Accra teams pick OceanCyber"
                : "Why Ghana teams pick OceanCyber"}
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-sa-muted/85">
              {page.whyUs.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            {page.city === "accra" ? (
              <>
                <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  Accra proof you can verify
                </h2>
                <ul className="mt-6 space-y-3 text-base leading-relaxed text-sa-muted/85">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                    <span>
                      Office at {p.address.street}, Accra — meet the team before you buy. Founded{" "}
                      {p.foundedYear}, {p.teamSize}-person delivery team.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                    <span>
                      Google reviews on our Accra Business Profile — see{" "}
                      <Link href="/reviews" className="sa-text-link">
                        our reviews page
                      </Link>{" "}
                      for the live rating and count. Team members can copy Maps listing text from{" "}
                      <Link href="/facts" className="sa-text-link">
                        Company facts
                      </Link>
                      .
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" aria-hidden />
                    <span>
                      Greater Accra clients (Airport Residential, East Legon, Tema, Spintex corridor)
                      work with the same Accra engineers — no outsourced “local” front desk.
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  Delivered from Accra across Ghana
                </h2>
                <p className="mt-6 text-base leading-relaxed text-sa-muted/85">
                  Discovery and engineering run from {p.address.street}, Accra. Kumasi, Takoradi,
                  Tamale, and remote Ghana teams get the same GHS packages and Accra support channel.
                </p>
              </>
            )}
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              Results clients can open
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-sa-muted/85">
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
          </section>

          <section className="mt-14 border-t border-sa-border pt-10">
            <h2 className="font-heading text-2xl font-semibold text-white">Common questions</h2>
            <FaqPageJsonLd items={page.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
            <dl className="mt-8 space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-heading text-base font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-sa-muted/85">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <MarketingRelatedReading links={related} />

          <div className="mt-16 sa-card p-8 md:p-10">
            <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Plan the project</h2>
            <p className="mt-3 text-sm text-sa-muted/80">
              Share goals and timeline — we will recommend the right package and milestone plan from
              Accra.
            </p>
            <Link
              href={getStartedHref({ topic: page.h1 })}
              className="sa-btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              {SITE_CTA.getStarted.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
