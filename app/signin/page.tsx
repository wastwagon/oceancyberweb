"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2, ShieldCheck, Zap } from "lucide-react";

function SignInForm() {
  const params = useSearchParams();
  const nextPath = params.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await signIn(email, password);
      const target = nextPath || (user.isAdmin ? "/admin" : "/dashboard");
      // Full navigation so the HttpOnly session cookie is sent on the next request.
      window.location.assign(target);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials. Please verify your entry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-sa-primary/30">
      {/* Forced Dark Template Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-sa-primary/10 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[60%] w-[60%] rounded-full bg-sa-primary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.05]" />
      </div>

      <div className="sa-container relative z-10 flex min-h-screen flex-col items-center justify-center py-20">
        <div className="grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
          
          {/* Brand/Value Proposition (Startup Agency Theme) */}
          <section className="hidden lg:block">
            <div className="inline-flex items-center gap-3 rounded-full border border-sa-primary/20 bg-sa-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-sa-primary">
              <ShieldCheck className="h-4 w-4" />
              Secure Login
            </div>
            <h1 className="mt-8 font-heading text-6xl font-black leading-[1.05] tracking-tight text-white xl:text-7xl">
              Welcome <br />
              <span className="text-sa-primary">Back</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-sa-muted/60">
              Sign in to manage your digital infrastructure, track project updates, 
              and access your secure client workspace.
            </p>
            
            <div className="mt-12 flex gap-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sa-surface border border-sa-border">
                  <Zap className="h-6 w-6 text-sa-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Project Visibility</div>
                  <div className="text-xs text-sa-muted/40">Real-time status</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sa-surface border border-sa-border">
                  <ShieldCheck className="h-6 w-6 text-sa-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Secure Access</div>
                  <div className="text-xs text-sa-muted/40">Zero-trust protocols</div>
                </div>
              </div>
            </div>
          </section>

          {/* Login Card (Premium Glassmorphism) */}
          <section className="w-full">
            <div className="relative overflow-hidden rounded-[40px] border border-sa-border bg-[#0d0d10]/90 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="font-heading text-4xl font-bold text-white">Sign In</h2>
                <p className="mt-3 text-sa-muted/50">
                  Enter your credentials to continue to your dashboard.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-primary/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="admin@oceancyber.net"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-sa-border bg-sa-bg/50 px-5 py-4 text-sm text-white outline-none ring-sa-primary/10 transition-all focus:border-sa-primary focus:ring-4 placeholder:text-sa-muted/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-sa-primary/70">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-sa-border bg-sa-bg/50 px-5 py-4 text-sm text-white outline-none ring-sa-primary/10 transition-all focus:border-sa-primary focus:ring-4 placeholder:text-sa-muted/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sa-muted/30 hover:text-sa-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="animate-in fade-in slide-in-from-top-1 rounded-2xl border border-rose-500/20 bg-rose-500/5 px-4 py-4 text-sm font-medium text-rose-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="sa-btn-primary group w-full justify-center py-5 text-base font-bold tracking-wide"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-10 border-t border-sa-border pt-8 text-center">
                <p className="text-sm text-sa-muted/40">
                  New project?{" "}
                  <Link
                    href={`/signup${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                    className="font-bold text-sa-primary hover:underline underline-offset-8"
                  >
                    Register Organization
                  </Link>
                </p>
              </div>
            </div>

            {/* Mobile Footer Branding */}
            <div className="mt-12 text-center lg:hidden">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-sa-muted/20">
                OceanCyber Infrastructure
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black flex items-center justify-center text-sa-primary font-heading uppercase tracking-widest">Initialising Security Protocol...</main>}>
      <SignInForm />
    </Suspense>
  );
}
