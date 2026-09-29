import Image from "next/image";
import Link from "next/link";
import {
  intentKindMeta,
  intentPagePath,
  intentPagesUpdated,
  intentPagesUpdatedLabel,
  type IntentPage,
  type IntentTable,
} from "@/lib/seo/intent-pages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";

function IntentTable({ table }: { table: IntentTable }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-sa-border">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr className="border-b border-sa-border bg-sa-surface/60">
            {table.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={`px-4 py-3 font-heading font-semibold text-white ${
                  index === 0 ? "sticky left-0 bg-sa-surface" : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-sa-border/80 last:border-b-0">
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    index === 0 ? "sticky left-0 bg-sa-bg font-medium text-white" : "text-sa-muted/80"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SeoIntentPageView({ page }: { page: IntentPage }) {
  const kind = intentKindMeta[page.kind];
  const path = intentPagePath(page);
  const pageUrl = `${SITE_URL}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: kind.label, item: `${SITE_URL}${kind.path}` },
          { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
        ],
      },
      {
        "@type": "Article",
        headline: page.title,
        description: page.description,
        image: `${SITE_URL}${page.image}`,
        mainEntityOfPage: pageUrl,
        datePublished: intentPagesUpdated,
        dateModified: intentPagesUpdated,
        author: { "@type": "Organization", name: "OceanCyber", url: SITE_URL },
        publisher: { "@type": "Organization", name: "OceanCyber", url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
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
                <Link href={kind.path} className="hover:text-sa-primary">
                  {kind.label}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="max-w-[12rem] truncate text-sa-muted sm:max-w-md" title={page.title}>
                {page.title}
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-sm font-semibold text-sa-primary">{page.eyebrow}</p>
          <h1 className="sa-title-lg mt-3">{page.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">{page.intro}</p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-sa-border">
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <p className="mt-4 text-sm text-sa-muted/60">
            Updated <time dateTime={intentPagesUpdated}>{intentPagesUpdatedLabel}</time>
            {" · "}
            OceanCyber, Accra
          </p>
          <div className="mt-8">
            <Link href={page.cta.href} className="sa-btn-primary w-full sm:w-auto">
              {page.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {page.table ? (
        <section className="border-b border-sa-border py-14 md:py-20">
          <div className="sa-container max-w-4xl">
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              {page.table.caption}
            </h2>
            <IntentTable table={page.table} />
          </div>
        </section>
      ) : null}

      {page.sections.map((section) => (
        <section key={section.heading} className="border-b border-sa-border py-14 md:py-20">
          <div className={`sa-container ${section.table ? "max-w-4xl" : "max-w-3xl"}`}>
            <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-sa-muted/80 md:text-base">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.steps ? (
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-sa-muted/80 md:text-base">
                {section.steps.map((step) => (
                  <li key={step} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            ) : null}
            {section.bullets ? (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-sa-muted/80 md:text-base">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.table ? <IntentTable table={section.table} /> : null}
            {section.example ? (
              <aside className="mt-8 rounded-2xl border border-sa-border bg-sa-surface/40 p-6 md:p-8">
                <h3 className="font-heading text-lg font-semibold text-white">{section.example.title}</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-sa-muted/80 md:text-base">
                  {section.example.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.example.link ? (
                  <Link
                    href={section.example.link.href}
                    className="mt-4 inline-flex text-sm font-semibold text-sa-primary hover:underline"
                  >
                    {section.example.link.label}
                  </Link>
                ) : null}
              </aside>
            ) : null}
            {section.links ? (
              <ul className="mt-6 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-semibold text-sa-primary hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Common questions
          </h2>
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

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            Related reading
          </h2>
          <ul className="mt-6 space-y-3">
            {page.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-semibold text-sa-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">
            {page.cta.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-sa-muted/80 md:text-base">{page.cta.body}</p>
          <div className="mt-8">
            <Link href={page.cta.href} className="sa-btn-primary w-full sm:w-auto">
              {page.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
