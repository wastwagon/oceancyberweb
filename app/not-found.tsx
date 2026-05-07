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
    <main className="flex min-h-screen flex-col items-center justify-center bg-sa-bg px-6 py-24 text-center text-sa-muted">
      <p className="sa-eyebrow block">
        404
      </p>
      <h1 className="sa-title mt-4 max-w-lg text-balance md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="sa-subtitle mt-4 mx-auto max-w-md">
        The link may be outdated or the URL was mistyped. Try the homepage, or reach out if you need
        something specific.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="sa-btn-primary min-h-[48px] px-6 text-sm"
        >
          <Home className="mr-2 h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-6 text-sm font-semibold text-white transition hover:border-sa-primary hover:bg-black/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
          Contact us
        </Link>
      </div>
    </main>
  );
}
