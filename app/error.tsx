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
    <main className="flex min-h-screen flex-col items-center justify-center bg-sa-bg px-6 py-24 text-center text-sa-muted">
      <p className="sa-eyebrow block">
        Error
      </p>
      <h1 className="sa-title mt-4 max-w-lg text-balance md:text-4xl">
        Something went wrong
      </h1>
      <p className="sa-subtitle mt-4 mx-auto max-w-md">
        We couldn&apos;t complete that action. You can try again, go home, or contact us if it keeps
        happening.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="sa-btn-primary min-h-[48px] px-6 text-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sa-border bg-sa-surface px-6 text-sm font-semibold text-white transition hover:border-sa-primary hover:bg-black/20"
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
