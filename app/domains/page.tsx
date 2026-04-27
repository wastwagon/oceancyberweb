import type { Metadata } from "next";
import Link from "next/link";
import { DomainSearchPanel, RegistrarValueProps } from "@/components/domains/DomainSearchPanel";

export const metadata: Metadata = {
  title: "Domains & SSL",
  description:
    "Search domain availability powered by Namecheap. SSL and hosting bundles with OceanCyber professional setup.",
};

export default function DomainsPage() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-50">
        <div className="container mx-auto max-w-6xl px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Domain &amp; security store
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Find your name on the web
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            Light, high-trust layout inspired by leading registrars—white surfaces,
            crisp typography, and a single primary action color for search and CTAs.
          </p>

          <div className="mx-auto mt-12 max-w-3xl">
            <DomainSearchPanel />
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-slate-500">
            Live checks use the Namecheap API from your server only. Pricing,
            checkout, and transfers are handled with you directly—we never expose API
            keys in the browser.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Built for a global audience
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Same product pillars as Hostinger, Namecheap, and GoDaddy: fast discovery,
          transparent availability, and SSL alongside domains.
        </p>
        <div className="mt-12">
          <RegistrarValueProps />
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-ocean-200/80 bg-gradient-to-br from-ocean-50/90 to-white p-6 text-center shadow-sm">
          <p className="text-sm font-bold text-ocean-900">Need a home for that domain?</p>
          <p className="mt-1 text-sm text-slate-600">
            cPanel &amp; WHM hosting on our Namecheap-linked reseller—competitive
            launch, grow, and scale plans.
          </p>
          <Link
            href="/hosting"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-ocean-600 px-6 text-sm font-bold text-white transition hover:bg-ocean-700"
          >
            View hosting packages
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Next steps</h2>
          <p className="max-w-2xl text-slate-600">
            Registration, SSL issuance (CSR, DCV), and renewals use additional
            Namecheap commands such as{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              namecheap.domains.create
            </code>{" "}
            and{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              namecheap.ssl.create
            </code>
            . Tell us your target domains and we wire the full flow on your VPS.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ocean-600 px-8 text-sm font-bold text-white shadow-md transition hover:bg-ocean-700"
          >
            Talk to sales
          </Link>
        </div>
      </section>
    </div>
  );
}
