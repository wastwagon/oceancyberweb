import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { withCanonical } from "@/lib/seo/canonical";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";
const path = "/services/web-design-in-ghana";
const pageUrl = `${SITE_URL}${path}`;

export const metadata: Metadata = withCanonical(
  {
    title: "Web Designer in Ghana",
    description:
      "Web designer and website developer in Ghana. OceanCyber designs and builds company websites, online stores, and web apps for Accra, Kumasi, Tema, Takoradi, and businesses nationwide.",
  },
  path,
);

const faqs = [
  {
    question: "Do you serve all of Ghana?",
    answer:
      "Yes. We design and build websites for businesses anywhere in Ghana. The studio is in Accra. Clients in Kumasi, Tema, Takoradi, Cape Coast, Tamale, and other cities work with us by call and screen-share when an in-person meeting is not needed.",
  },
  {
    question: "Are you web designers or web developers?",
    answer:
      "Both. As web designers we shape the look, structure, and messaging. As website developers we build the working site: pages, forms, speed, and the technical setup Google needs. Most Ghana businesses hire one studio for both.",
  },
  {
    question: "Where is the studio?",
    answer:
      "232 Nii Kwashiefio Avenue, Accra. Accra clients can meet locally. The same team, phone number, and delivery process cover the rest of the country.",
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
          { "@type": "ListItem", position: 3, name: "Web designer in Ghana", item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        name: "Web design and website development in Ghana",
        serviceType: ["Web design", "Web development", "Website development"],
        url: pageUrl,
        areaServed: { "@type": "Country", name: "Ghana" },
        description:
          "Web designers and website developers for businesses across Ghana, delivered from OceanCyber's Accra studio.",
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
              <li className="text-sa-muted">Web designer in Ghana</li>
            </ol>
          </nav>

          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-sa-primary">
            Nationwide Ghana
          </p>
          <h1 className="sa-title-lg mt-3">
            Web designer in Ghana
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">
            OceanCyber designs and builds websites for businesses across Ghana—from Accra and
            Kumasi to Tema, Takoradi, and remote teams nationwide. One Accra studio, one phone
            number, clear delivery.
          </p>

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
              232 Nii Kwashiefio Avenue, Accra, Ghana
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
