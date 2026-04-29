"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signIn } from "@/lib/auth-client";

function AuthIllustration() {
  return (
    <svg viewBox="0 0 220 140" className="h-auto w-full max-w-[320px]" fill="none" aria-hidden>
      <rect x="10" y="20" width="96" height="64" rx="10" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
      <rect x="22" y="32" width="58" height="8" rx="4" fill="#7DD3FC" />
      <rect x="22" y="46" width="72" height="6" rx="3" fill="#38BDF8" fillOpacity="0.85" />
      <rect x="22" y="58" width="50" height="6" rx="3" fill="#0EA5E9" fillOpacity="0.75" />
      <rect x="126" y="14" width="84" height="112" rx="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.2" />
      <rect x="138" y="26" width="60" height="60" rx="8" fill="#EFF6FF" stroke="#93C5FD" />
      <path d="M168 52a10 10 0 0 0-10 10v8h20v-8a10 10 0 0 0-10-10Z" fill="#3B82F6" fillOpacity="0.85" />
      <circle cx="168" cy="50" r="6" fill="#60A5FA" />
      <rect x="153" y="98" width="30" height="4" rx="2" fill="#60A5FA" />
    </svg>
  );
}

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push(nextPath || "/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200/60 md:p-10">
          <p className="inline-flex rounded-full border border-ocean-200 bg-ocean-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ocean-800">
            Client access
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Sign in to your OceanCyber account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Access wallet top-ups, renewal tracking, request history, and project milestones
            in one secure dashboard.
          </p>
          <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-blue-50/70 to-white p-4 md:p-5">
            <AuthIllustration />
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
              Secure account access
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
              Billing and project visibility
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
          <p className="mt-1 text-sm text-slate-600">
            Use your account details to continue.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-ocean-500 focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-ocean-500 focus:ring-2"
              required
            />
          </div>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600">
            No account yet?{" "}
            <Link
              href={`/signup${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
              className="font-semibold text-ocean-700 hover:text-ocean-800"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="bg-slate-50 px-4 py-16 text-slate-600">Loading…</main>}>
      <SignInForm />
    </Suspense>
  );
}

