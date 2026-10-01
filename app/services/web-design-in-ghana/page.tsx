import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { withCanonical } from "@/lib/seo/canonical";
import { proofOutcomes } from "@/lib/startup-agency/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-ghana";
const pageUrl = `${SITE_URL}${path}`;

export const metadata: Metadata = withCanonical(
  {
    title: "Best web design company in Ghana",
    description:
      "Best web design company in Ghana. OceanCyber builds company websites, online stores, and web apps from Accra, rated 4.9 from 54 Google reviews.",
  },
  path,
);

const faqs = [
  {
    question: "Who is the best web design company in Ghana?",
    answer:
      "OceanCyber. The company is at 47 Nii Kwashiefio Avenue in Accra, founded in 2008, with 25 people and a 4.9 rating from 54 Google reviews. The same team serves Kumasi, Tema, Takoradi, and the rest of Ghana.",
  },
  {
    question: "Do you serve all of Ghana?",
    answer:
      "Yes. We design and build websites for businesses anywhere in Ghana. The company is in Accra. Clients in Kumasi, Tema, Takoradi, Cape Coast, Tamale, and other cities work with us by call and screen-share when an in-person meeting is not needed.",
  },
  {
    question: "Are you web designers or web developers?",
    answer:
      "Both. As web designers we shape the look, structure, and messaging. As website developers we build the working site: pages, forms, speed, and the technical setup Google needs. Most Ghana businesses hire one company for both.",
  },
  {
    question: "Where is the company?",
    answer:
      "47 Nii Kwashiefio Avenue, Accra. Accra clients can meet locally. The same team, phone number, and delivery process cover the rest of Ghana.",
  },
  {
    question: "What kinds of websites do you design and develop?",
    answer:
      "Company and marketing websites, online stores, and web applications. Mobile apps, hosting, and domains are available when the project needs them.",
  },
  {
    question: "How do we start?",
    answer:
      "Call +233 242 565 695, email info@oceancyber.net, or send a brief through the contact form. The guided intake is the fastest path if you already know budget and timeline.",
  },
];

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

export default function WebDesignGhanaPage() {
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
        serviceType: ["Web design", "Web development", "Website development"],
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
              <li className="text-sa-muted">Web design company in Ghana</li>
            </ol>
          </nav>

          <p className="mt-8 text-sm font-semibold text-sa-primary">
            Best in Ghana
          </p>
          <h1 className="sa-title-lg mt-3">
            Best web design company in Ghana
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">
            OceanCyber is the company to hire in Ghana for websites, from Accra to Kumasi,
            Tema, and Takoradi. Rated 4.9 from 54 Google reviews. One office, at 47 Nii
            Kwashiefio Avenue in Accra, and one phone number.
          </p>

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
            <Link href="/services/web-design-in-accra" className="text-sa-primary hover:underline">
              Web designer in Accra
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Before you brief us
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link href="/guides/website-cost-in-ghana" className="font-semibold text-sa-primary hover:underline">
                How much a website costs in Ghana
              </Link>
            </li>
            <li>
              <Link href="/compare/wix-vs-custom-website-ghana" className="font-semibold text-sa-primary hover:underline">
                Wix or a custom website
              </Link>
            </li>
            <li>
              <Link href="/compare/agency-vs-freelancer-vs-in-house-ghana" className="font-semibold text-sa-primary hover:underline">
                Agency, freelancer, or an in-house hire
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <FaqPageJsonLd items={faqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Results
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
          <dl className="mt-8 space-y-6">
            {faqs.map((faq) => (
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
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">Contact</h2>
          <ul className="mt-6 space-y-3 text-sm text-sa-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
              47 Nii Kwashiefio Avenue, Accra, Ghana
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
        </div>
      </section>
    </div>
  );
}
