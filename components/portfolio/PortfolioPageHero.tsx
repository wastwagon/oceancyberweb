import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";

export function PortfolioPageHero({
  projectCount,
  categoryCount,
}: {
  projectCount: number;
  categoryCount: number;
}) {

  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/95 to-slate-100/90">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-ocean-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 pb-14 pt-28 text-center md:px-6 md:pb-16 md:pt-32">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean-200/80 bg-ocean-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ocean-800 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden />
          Selected work
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Digital products with measurable impact
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
          From fintech and e-commerce to events and professional services—each
          build is designed for performance, security, and growth. Every project
          is delivered with local partnership from Accra, with a global
          product-grade standard.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
          <li className="rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-3 text-left shadow-sm backdrop-blur-sm">
            <p className="text-2xl font-bold tabular-nums text-slate-900">
              {projectCount}+
            </p>
            <p className="text-xs font-medium text-slate-500">launches featured</p>
          </li>
          <li className="rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-3 text-left shadow-sm backdrop-blur-sm">
            <p className="text-2xl font-bold tabular-nums text-slate-900">
              {categoryCount}
            </p>
            <p className="text-xs font-medium text-slate-500">industry verticals</p>
          </li>
          <li className="rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-3 text-left shadow-sm backdrop-blur-sm">
            <p className="text-2xl font-bold text-slate-900">5★</p>
            <p className="text-xs font-medium text-slate-500">client ratings</p>
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact?topic=New%20project%20%E2%80%94%20from%20portfolio"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-ocean-600 px-6 text-sm font-bold text-white shadow-lg shadow-ocean-600/20 transition hover:bg-ocean-700"
          >
            Start a similar project
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:border-ocean-200 hover:bg-slate-50"
          >
            <Layers className="h-4 w-4" aria-hidden />
            Case studies
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Invoices and deposits in{" "}
          <strong className="text-slate-700">GHS</strong> via{" "}
          <strong className="text-slate-700">Paystack</strong> when you are ready
          to pay—add keys from the Paystack dashboard to{" "}
          <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[11px]">.env</code> (see <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[11px]">.env.example</code>).
        </p>
      </div>
    </header>
  );
}
