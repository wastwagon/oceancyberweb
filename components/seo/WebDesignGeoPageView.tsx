import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { MarketingRelatedReading } from "@/components/marketing/MarketingRelatedReading";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { proofOutcomes } from "@/lib/startup-agency/content";
import type { RelatedReadingLink } from "@/lib/marketing/related-reading-presets";
import { SITE_CTA, getStartedHref } from "@/lib/marketing/site-cta";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export type WebDesignGeoFaq = { question: string; answer: string };

type Props = {
  jsonLd: object;
  heroImage: string;
  eyebrow: string;
  h1: string;
  intro: ReactNode;
  showOfficePin?: boolean;
  ctaTopic: string;
  faqs: WebDesignGeoFaq[];
  proofHeading?: string;
  relatedReading?: RelatedReadingLink[];
  showContactBlock?: boolean;
  children?: ReactNode;
};

export function WebDesignGeoPageView({
  jsonLd,
  heroImage,
  eyebrow,
  h1,
  intro,
  showOfficePin,
  ctaTopic,
  faqs,
  proofHeading = "Results",
  relatedReading,
  showContactBlock,
  children,
}: Props) {
  const p = googleBusinessProfile;

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
              href="/services/web-design"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to web design
            </Link>
          </div>
        </div>

        <header className="relative border-b border-sa-border">
          <div className="relative aspect-[21/9] w-full max-h-[min(52vh,520px)] min-h-[280px] md:min-h-[400px]">
            <Image
              src={heroImage}
              alt={h1}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-bg via-sa-bg/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="sa-container max-w-3xl px-0 md:px-0">
                <span className="inline-flex min-h-8 items-center rounded-full border border-sa-primary/20 bg-sa-bg/80 px-3 text-sm font-medium text-sa-primary backdrop-blur-md">
                  {eyebrow}
                </span>
                <h1 className="sa-title-lg !text-left mt-4 text-white">{h1}</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="sa-container max-w-3xl py-12 md:py-16">
          <div className="space-y-4 text-lg font-medium leading-relaxed text-white md:text-xl border-l-2 border-sa-primary pl-6 mb-10">
            {typeof intro === "string" ? <p>{intro}</p> : intro}
          </div>

          {showOfficePin ? (
            <div className="mb-10 flex items-start gap-3 text-sm text-sa-muted/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
              {p.address.street}, Accra, Ghana
            </div>
          ) : null}

          <Link
            href={getStartedHref({ topic: ctaTopic })}
            className="sa-btn-primary inline-flex w-full sm:w-auto"
          >
            {SITE_CTA.getStarted.label}
          </Link>

          {children ? <div className="mt-14 space-y-14 border-t border-sa-border pt-14">{children}</div> : null}

          <section className={children ? "mt-14" : "mt-14 border-t border-sa-border pt-14"}>
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">{proofHeading}</h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-sa-muted/85">
              {proofOutcomes.map((item) => (
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
              ))}
            </ul>
          </section>

          <section className="mt-14 border-t border-sa-border pt-10">
            <h2 className="font-heading text-2xl font-semibold text-white">Common questions</h2>
            <FaqPageJsonLd items={faqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
            <dl className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-heading text-base font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-relaxed text-sa-muted/85">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          {relatedReading && relatedReading.length > 0 ? (
            <MarketingRelatedReading links={relatedReading} />
          ) : null}

          {showContactBlock ? (
            <section className="mt-14 border-t border-sa-border pt-10">
              <h2 className="font-heading text-2xl font-semibold text-white">Contact</h2>
              <ul className="mt-6 space-y-3 text-sm text-sa-muted">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                  {p.address.street}, Accra, Ghana
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                  <a href="tel:+233242565695" className="hover:text-sa-primary">
                    +233 242 565 695
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                  <a href="mailto:info@oceancyber.net" className="hover:text-sa-primary">
                    info@oceancyber.net
                  </a>
                </li>
              </ul>
            </section>
          ) : null}

          <div className="mt-16 sa-card p-8 md:p-10">
            <h2 className="font-heading text-xl font-bold text-white md:text-2xl">Plan the project</h2>
            <p className="mt-3 text-sm text-sa-muted/80">
              Compare packages in cedis, read buyer guides, or start a brief — same Accra team for Ghana-wide
              delivery.
            </p>
            <Link
              href={getStartedHref({ topic: ctaTopic })}
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
