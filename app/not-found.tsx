import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested is not available.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600">
        404
      </p>
      <h1 className="mt-4 max-w-lg text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
        The link may be outdated or the URL was mistyped. Try the homepage, or reach out if you need
        something specific.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition hover:brightness-110"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-ocean-200 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Contact us
        </Link>
      </div>
    </main>
  );
}
