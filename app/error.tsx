"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600">
        Error
      </p>
      <h1 className="mt-4 max-w-lg text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
        We couldn&apos;t complete that action. You can try again, go home, or contact us if it keeps
        happening.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition hover:brightness-110"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-ocean-200 hover:bg-slate-50"
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
