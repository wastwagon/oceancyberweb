"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signUp } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

function AuthIllustration() {
  return (
    <svg viewBox="0 0 220 140" className="h-auto w-full max-w-[320px] opacity-80" fill="none" aria-hidden>
      <rect x="10" y="20" width="96" height="64" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <rect x="22" y="32" width="58" height="8" rx="4" fill="#334155" />
      <rect x="22" y="46" width="72" height="6" rx="3" fill="#38bdf8" fillOpacity="0.85" />
      <rect x="22" y="58" width="50" height="6" rx="3" fill="#0ea5e9" fillOpacity="0.75" />
      <rect x="126" y="14" width="84" height="112" rx="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.2" />
      <rect x="138" y="26" width="60" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeOpacity="0.3" />
      <circle cx="168" cy="56" r="12" fill="#38bdf8" fillOpacity="0.85" />
      <path d="M154 94c4-8 9-12 14-12s10 4 14 12" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <rect x="153" y="102" width="30" height="4" rx="2" fill="#38bdf8" />
    </svg>
  );
}

function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get("next");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUp(email, password, fullName);
      router.push(nextPath || "/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-32">
      <div className="sa-container mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="sa-card p-8 md:p-10 border-sa-border">
          <p className="sa-eyebrow inline-flex">
            New account
          </p>
          <h1 className="sa-title !text-left mt-5 text-3xl md:text-4xl">
            Create your OceanCyber client account
          </h1>
          <p className="sa-subtitle !text-left mt-4">
            Open your workspace for project requests, renewal operations, wallet funding,
            and milestone payment tracking.
          </p>
          <div className="mt-8 rounded-3xl border border-sa-primary/20 bg-sa-primary/5 p-6 flex justify-center backdrop-blur-sm">
            <AuthIllustration />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary text-center">
              Fast onboarding flow
            </div>
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary text-center">
              Dashboard + payments
            </div>
          </div>
        </section>

        <section className="sa-card p-8 md:p-10 border-sa-border h-fit">
          <h2 className="font-heading text-2xl font-bold text-white">Create account</h2>
          <p className="mt-2 text-sm text-sa-muted/70">
            Set up secure access in less than a minute.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-2 block">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white outline-none focus:border-sa-primary transition"
                placeholder="e.g. Ama Owusu"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white outline-none focus:border-sa-primary transition"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={10}
                className="w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white outline-none focus:border-sa-primary transition"
                required
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="sa-btn-primary w-full min-h-[48px] justify-center mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-sa-muted/80 text-center">
            Already have an account?{" "}
            <Link
              href={`/signin${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
              className="font-bold text-sa-primary hover:text-white transition-colors"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<main className="sa-shell min-h-screen bg-sa-bg px-4 py-32 text-center text-sa-muted">Loading…</main>}>
      <SignUpForm />
    </Suspense>
  );
}
