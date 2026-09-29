import type { Metadata } from "next";
import Link from "next/link";
import { withCanonical } from "@/lib/seo/canonical";
import {
  intentKindMeta,
  intentPagePath,
  intentPagesByKind,
  type IntentKind,
} from "@/lib/seo/intent-pages";

export function intentHubMetadata(kind: IntentKind): Metadata {
  const meta = intentKindMeta[kind];
  return withCanonical(
    {
      title: meta.hubTitle,
      description: meta.hubDescription,
    },
    meta.path,
  );
}

export function SeoIntentHub({ kind }: { kind: IntentKind }) {
  const meta = intentKindMeta[kind];
  const pages = intentPagesByKind(kind);
  const otherKinds = (Object.keys(intentKindMeta) as IntentKind[]).filter(
    (item) => item !== kind,
  );

  return (
    <div className="bg-sa-bg text-sa-muted">
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
              <li className="text-sa-muted">{meta.label}</li>
            </ol>
          </nav>
          <h1 className="sa-title-lg mt-8">{meta.hubTitle}</h1>
          <p className="mt-5 text-lg leading-relaxed text-sa-muted/80">{meta.hubDescription}</p>
        </div>
      </section>

      <section className="border-b border-sa-border py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <ul className="space-y-4">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={intentPagePath(page)}
                  className="sa-card group block p-6 transition-colors hover:border-sa-primary/40"
                >
                  <p className="text-sm font-semibold text-sa-primary">{page.eyebrow}</p>
                  <h2 className="mt-2 font-heading text-xl font-semibold text-white group-hover:text-sa-primary">
                    {page.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-sa-muted/75">{page.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="sa-container max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-white">More buyer pages</h2>
          <ul className="mt-6 space-y-3">
            {otherKinds.map((item) => (
              <li key={item}>
                <Link
                  href={intentKindMeta[item].path}
                  className="text-sm font-semibold text-sa-primary hover:underline"
                >
                  {intentKindMeta[item].hubTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
