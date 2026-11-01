import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import {
  intentKindMeta,
  intentPagePath,
  intentPagesUpdated,
  intentPagesUpdatedLabel,
  type IntentPage,
  type IntentTable,
} from "@/lib/seo/intent-pages";
import { MarketingArticleFigure } from "@/components/seo/MarketingArticleMedia";
import { portfolioImageFromHref } from "@/lib/seo/intent-portfolio-images";
import { SITE_CTA, getStartedHref } from "@/lib/marketing/site-cta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";

/** Prefill intake goals from the guide title when CTA points at /get-started. */
function resolveIntentCtaHref(page: IntentPage): string {
  if (page.cta.href === SITE_CTA.getStarted.href) {
    return getStartedHref({ topic: page.title });
  }
  return page.cta.href;
}

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

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_IMAGE_ONLY_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;

function formatIntentUpdatedLabel(page: IntentPage): string {
  if (page.dateModified) {
    const parsed = new Date(page.dateModified);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    }
  }
  return intentPagesUpdatedLabel;
}

function renderMarkdownInline(
  text: string,
  sponsored: boolean,
  keyPrefix: string,
): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let linkIndex = 0;
  const re = new RegExp(MARKDOWN_LINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <IntentOutboundLink
        key={`${keyPrefix}-md-${linkIndex}`}
        href={match[2]}
        label={match[1]}
        sponsored={sponsored}
        className="sa-text-link"
      />,
    );
    linkIndex += 1;
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length === 1 ? parts[0] : parts;
}

function IntentRichParagraph({
  text,
  sponsored,
  id,
}: {
  text: string;
  sponsored: boolean;
  id: string;
}) {
  const trimmed = text.trim();
  const imageMatch = trimmed.match(MARKDOWN_IMAGE_ONLY_RE);
  if (imageMatch) {
    return <MarketingArticleFigure src={imageMatch[2]} alt={imageMatch[1] || ""} />;
  }
  return <p>{renderMarkdownInline(text, sponsored, id)}</p>;
}

function resolveOutboundHref(href: string, page: IntentPage): string {
  if (href === SITE_CTA.getStarted.href) {
    return getStartedHref({ topic: page.title });
  }
  return href;
}

function IntentSectionLinks({
  links,
  inline,
  page,
  sponsored,
}: {
  links: NonNullable<IntentPage["sections"][number]["links"]>;
  inline?: boolean;
  page: IntentPage;
  sponsored: boolean;
}) {
  if (inline) {
    return (
      <p className="mt-6 text-sm leading-relaxed">
        {links.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? <span aria-hidden> · </span> : null}
            <IntentOutboundLink
              href={resolveOutboundHref(link.href, page)}
              label={link.label}
              sponsored={sponsored}
              className="sa-text-link"
            />
          </span>
        ))}
      </p>
    );
  }
  return (
    <ul className="mt-6 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <IntentOutboundLink
            href={resolveOutboundHref(link.href, page)}
            label={link.label}
            sponsored={sponsored}
            className="sa-text-link text-sm"
          />
        </li>
      ))}
    </ul>
  );
}

function IntentOutboundLink({
  href,
  label,
  sponsored,
  className,
}: {
  href: string;
  label: ReactNode;
  sponsored?: boolean;
  className?: string;
}) {
  const external = isExternalHref(href);
  const rel = [
    external ? "noopener" : null,
    external ? "noreferrer" : null,
    sponsored && external ? "sponsored" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={className}
      {...(external
        ? { target: "_blank", rel: rel || undefined }
        : {})}
    >
      {label}
    </Link>
  );
}

export function SeoIntentPageView({ page }: { page: IntentPage }) {
  const kind = intentKindMeta[page.kind];
  const path = intentPagePath(page);
  const pageUrl = `${SITE_URL}${path}`;
  /** Paid/affiliate pages only — editorial product guides omit partnerBrand (dofollow). */
  const partner = page.partnerBrand;
  const sponsorOutbound = Boolean(partner);

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
        dateModified: page.dateModified ?? intentPagesUpdated,
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

  const updatedLabel = formatIntentUpdatedLabel(page);
  const updatedIso = page.dateModified ?? intentPagesUpdated;

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
              href={kind.path}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sa-primary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to {kind.label.toLowerCase()}
            </Link>
          </div>
        </div>

        <header className="relative border-b border-sa-border">
          <div className="relative aspect-[21/9] w-full max-h-[min(52vh,520px)] min-h-[280px] md:min-h-[400px]">
            <Image
              src={page.image}
              alt={page.imageAlt}
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
                <h1 className="sa-title-lg !text-left mt-4 text-white">{page.title}</h1>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-sa-muted/80">
                  <time dateTime={updatedIso}>Updated {updatedLabel}</time>
                  <span className="text-sa-border">·</span>
                  <span>OceanCyber, Accra</span>
                  {partner ? (
                    <>
                      <span className="text-sa-border">·</span>
                      <span>Partner guide for {partner.siteLabel}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="sa-container max-w-3xl py-12 md:py-16">
          <div className="space-y-4 text-lg font-medium leading-relaxed text-white md:text-xl border-l-2 border-sa-primary pl-6 mb-12">
            <IntentRichParagraph text={page.intro} sponsored={sponsorOutbound} id="intro-0" />
            {page.introParagraphs?.map((paragraph, index) => (
              <IntentRichParagraph
                key={paragraph}
                text={paragraph}
                sponsored={sponsorOutbound}
                id={`intro-${index + 1}`}
              />
            ))}
          </div>

          {partner ? (
            <aside
              className="mb-12 rounded-2xl border border-sa-border bg-sa-surface/40 p-6 text-sm leading-relaxed text-sa-muted/80"
              aria-label="Partner disclosure"
            >
              <p className="font-heading font-semibold text-white">
                Partner product: {partner.name}
              </p>
              <p className="mt-2">{partner.disclosure}</p>
              <p className="mt-3">
                <Link href={getStartedHref({ topic: page.title })} className="sa-text-link">
                  Custom build with OceanCyber
                </Link>
              </p>
            </aside>
          ) : null}

          {page.canonicalExternal ? (
            <aside
              className="mb-12 rounded-2xl border border-sa-primary/30 bg-sa-primary/5 p-6 text-sm leading-relaxed text-sa-muted/90"
              aria-label="Canonical product page"
            >
              <p className="font-heading font-semibold text-white">Full guide on DwumaPOS</p>
              <p className="mt-2">
                This page is a short summary. The canonical version is maintained on dwumapos.com:
              </p>
              <p className="mt-3">
                <IntentOutboundLink
                  href={page.canonicalExternal}
                  label={page.canonicalExternal.replace(/^https?:\/\//, "")}
                  className="sa-text-link font-medium"
                />
              </p>
            </aside>
          ) : null}

          {page.table ? (
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-white">{page.table.caption}</h2>
              <IntentTable table={page.table} />
            </section>
          ) : null}

          {page.sections.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-0">
              <h2 className="font-heading text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-sa-muted/90">
              {section.paragraphs.map((paragraph, index) => (
                <IntentRichParagraph
                  key={`${section.heading}-p-${index}`}
                  text={paragraph}
                  sponsored={sponsorOutbound}
                  id={`${section.heading}-p-${index}`}
                />
              ))}
            </div>
            {section.figure ? (
              <MarketingArticleFigure src={section.figure.src} alt={section.figure.alt} />
            ) : null}
            {section.steps ? (
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-base leading-relaxed text-sa-muted/90">
                {section.steps.map((step) => (
                  <li key={step} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            ) : null}
            {section.bullets ? (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-base leading-relaxed text-sa-muted/90">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{renderMarkdownInline(bullet, sponsorOutbound, `${section.heading}-b`)}</li>
                ))}
              </ul>
            ) : null}
            {section.trailingParagraphs ? (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-sa-muted/90">
                {section.trailingParagraphs.map((paragraph, index) => (
                  <IntentRichParagraph
                    key={`${section.heading}-trail-${index}`}
                    text={paragraph}
                    sponsored={sponsorOutbound}
                    id={`${section.heading}-trail-${index}`}
                  />
                ))}
              </div>
            ) : null}
            {section.table ? <IntentTable table={section.table} /> : null}
            {section.subsections?.map((subsection) => (
              <div key={subsection.heading} className="mt-10">
                <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
                  {subsection.heading}
                </h3>
                {subsection.paragraphs ? (
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-sa-muted/90">
                    {subsection.paragraphs.map((paragraph, index) => (
                      <IntentRichParagraph
                        key={`${subsection.heading}-p-${index}`}
                        text={paragraph}
                        sponsored={sponsorOutbound}
                        id={`${subsection.heading}-p-${index}`}
                      />
                    ))}
                  </div>
                ) : null}
                {subsection.table ? <IntentTable table={subsection.table} /> : null}
                {subsection.links ? (
                  <IntentSectionLinks
                    links={subsection.links}
                    page={page}
                    sponsored={sponsorOutbound}
                  />
                ) : null}
              </div>
            ))}
            {section.example ? (
              <aside className="mt-8 overflow-hidden rounded-2xl border border-sa-border bg-sa-surface/40">
                {section.example.link
                  ? (() => {
                      const exampleImage = portfolioImageFromHref(section.example.link.href);
                      return exampleImage ? (
                        <div className="relative aspect-[16/10] w-full border-b border-sa-border">
                          <Image
                            src={exampleImage}
                            alt={section.example.link.label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                          />
                        </div>
                      ) : null;
                    })()
                  : null}
                <div className="p-6 md:p-8">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {section.example.title}
                  </h3>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-sa-muted/90">
                    {section.example.paragraphs.map((paragraph, index) => (
                      <IntentRichParagraph
                        key={paragraph}
                        text={paragraph}
                        sponsored={sponsorOutbound}
                        id={`${section.heading}-ex-${index}`}
                      />
                    ))}
                  </div>
                  {section.example.link ? (
                    <IntentOutboundLink
                      href={resolveOutboundHref(section.example.link.href, page)}
                      label={section.example.link.label}
                      sponsored={sponsorOutbound}
                      className="sa-text-link mt-4 inline-flex text-sm"
                    />
                  ) : null}
                </div>
              </aside>
            ) : null}
            {section.links ? (
              <IntentSectionLinks
                links={section.links}
                inline={section.linksInline}
                page={page}
                sponsored={sponsorOutbound}
              />
            ) : null}
            </section>
          ))}

          <section className="mt-14 border-t border-sa-border pt-10">
            <h2 className="font-heading text-2xl font-semibold text-white">Common questions</h2>
            <div className="mt-8 space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-heading text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-sa-muted/85">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <nav className="mt-14 border-t border-sa-border pt-10" aria-label="Related reading">
            <h2 className="font-heading text-xl font-semibold text-white">Related reading</h2>
            <ul className="mt-4 space-y-2">
              {page.related.map((link) => (
                <li key={link.href}>
                  <IntentOutboundLink
                    href={resolveOutboundHref(link.href, page)}
                    label={link.label}
                    sponsored={sponsorOutbound}
                    className="sa-text-link text-sm"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 sa-card p-8 md:p-10">
            <h2 className="font-heading text-xl font-bold text-white md:text-2xl">{page.cta.title}</h2>
            <p className="mt-3 text-sm text-sa-muted/80">{page.cta.body}</p>
            <IntentOutboundLink
              href={resolveIntentCtaHref(page)}
              label={
                <>
                  {page.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              }
              sponsored={sponsorOutbound}
              className="sa-btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            />
          </div>
        </div>
      </article>
    </main>
  );
}
