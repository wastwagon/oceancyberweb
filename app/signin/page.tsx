"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signIn } from "@/lib/auth-client";
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
      <path d="M168 52a10 10 0 0 0-10 10v8h20v-8a10 10 0 0 0-10-10Z" fill="#38bdf8" fillOpacity="0.85" />
      <circle cx="168" cy="50" r="6" fill="#0ea5e9" />
      <rect x="153" y="98" width="30" height="4" rx="2" fill="#38bdf8" />
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
    <main className="sa-shell min-h-screen bg-sa-bg pt-24 pb-16 md:py-32">
      <div className="sa-container mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="sa-card p-8 md:p-10 border-sa-border">
          <p className="sa-eyebrow inline-flex">
            Client access
          </p>
          <h1 className="sa-title !text-left mt-5 text-3xl md:text-4xl">
            Sign in to your OceanCyber account
          </h1>
          <p className="sa-subtitle !text-left mt-4">
            Access wallet top-ups, renewal tracking, request history, and project milestones
            in one secure dashboard.
          </p>
          <div className="mt-8 rounded-3xl border border-sa-primary/20 bg-sa-primary/5 p-6 flex justify-center backdrop-blur-sm">
            <AuthIllustration />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary text-center">
              Secure account access
            </div>
            <div className="rounded-2xl border border-sa-border bg-sa-surface p-4 text-[10px] font-bold uppercase tracking-widest text-sa-primary text-center">
              Billing & project visibility
            </div>
          </div>
        </section>

        <section className="sa-card p-8 md:p-10 border-sa-border h-fit">
          <h2 className="font-heading text-2xl font-bold text-white">Sign in</h2>
          <p className="mt-2 text-sm text-sa-muted/70">
            Use your account details to continue.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-sa-muted/80 text-center">
            No account yet?{" "}
            <Link
              href={`/signup${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
              className="font-bold text-sa-primary hover:text-white transition-colors"
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
    <Suspense fallback={<main className="sa-shell min-h-screen bg-sa-bg px-4 py-32 text-center text-sa-muted">Loading…</main>}>
      <SignInForm />
    </Suspense>
  );
}
