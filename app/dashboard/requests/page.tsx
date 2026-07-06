"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProfile, listClientRequests, type ClientRequestRow } from "@/lib/auth-client";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { AppAlert } from "@/components/ui/AppAlert";
import { sourceLabel } from "@/lib/ops/format";
import { cn } from "@/lib/utils";

function unifiedCheckoutRef(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const maybe = (metadata as { checkoutRef?: unknown }).checkoutRef;
  return typeof maybe === "string" && maybe.trim() ? maybe : null;
}

function statusBadge(status: string) {
  if (status === "won") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  if (status === "contacted") return "border-sa-primary/30 bg-sa-primary/10 text-sa-primary";
  if (status === "lost") return "border-sa-border bg-sa-bg text-sa-muted/60";
  return "border-amber-500/30 bg-amber-500/10 text-amber-400";
}

export default function ClientRequestsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState<ClientRequestRow[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profile, requests] = await Promise.all([getProfile(), listClientRequests(80)]);
        setEmail(profile.email);
        setRows(requests);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Could not load requests");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="min-h-screen pb-16">
      <div className="sa-container max-w-5xl space-y-6 py-8 md:py-12">
        <header className="sa-card p-6 border-sa-border md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="sa-eyebrow inline-flex">Dashboard</p>
              <h1 className="sa-title !text-left mt-3 text-2xl md:text-3xl">Project requests</h1>
              <p className="mt-1 text-sm text-sa-muted/80">{email || "Signed-in user"}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
                Track submissions across intake, proposal requests, Namecheap checkout, and website-to-app quotes.
              </p>
            </div>
            <div className="rounded-2xl border border-sa-primary/20 bg-sa-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
              Lead status overview
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DashboardNav />
            <Link
              href="/services/website-to-mobile-app"
              className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-sa-primary/30 bg-sa-primary/10 px-5 text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:border-sa-primary hover:text-white"
            >
              App Quote
            </Link>
          </div>
        </header>

        {loading ? <p className="text-sa-muted text-sm px-2">Loading requests...</p> : null}
        {error ? <AppAlert variant="error">{error}</AppAlert> : null}

        {!loading && !error ? (
          <section className="sa-card p-6 border-sa-border md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">Your submitted requests</h2>
                <p className="mt-2 text-sm text-sa-muted/80">
                  Track request status across intake, proposal, calculator, and contact submissions.
                </p>
              </div>
              <Link
                href="/get-started"
                className="sa-btn-primary min-h-[44px] px-6 text-[10px]"
              >
                New request
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 border-b border-sa-border">
                  <tr>
                    <th className="py-3 pr-6">Type</th>
                    <th className="py-3 pr-6">Status</th>
                    <th className="py-3 pr-6">Last update</th>
                    <th className="py-3 pr-6">Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sa-border/50">
                  {rows.length === 0 ? (
                    <tr>
                      <td className="py-6 text-sa-muted/80 text-center" colSpan={4}>
                        No requests yet.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-sa-surface/50">
                        <td className="py-4 pr-6 text-white">{sourceLabel(r.source)}</td>
                        <td className="py-4 pr-6">
                          <span
                            className={cn(
                              "inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                              statusBadge(r.status)
                            )}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-4 pr-6 text-sa-muted/80">
                          {new Date(r.updatedAt).toLocaleString()}
                        </td>
                        <td className="py-4 pr-6 text-sa-muted whitespace-normal max-w-md">
                          {r.message.slice(0, 180)}
                          {r.message.length > 180 ? "..." : ""}
                          {r.source === "namecheap_unified_checkout" ? (
                            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                              Ref:{" "}
                              <span className="font-mono text-sa-muted">
                                {unifiedCheckoutRef(r.metadata) || "N/A"}
                              </span>
                            </p>
                          ) : null}
                          {r.linkedProjectId || r.status === "won" ? (
                            <Link
                              href={
                                r.linkedProjectId
                                  ? `/dashboard/projects#project-${r.linkedProjectId}`
                                  : "/dashboard/projects"
                              }
                              className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary hover:underline underline-offset-4"
                            >
                              View project →
                            </Link>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
