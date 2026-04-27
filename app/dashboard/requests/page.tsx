"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearAccessToken, getProfile, listClientRequests, type ClientRequestRow } from "@/lib/auth-client";

function sourceLabel(source: string | null) {
  if (source === "contact_form") return "Contact form";
  if (source === "project_calculator") return "Project calculator";
  if (source === "chat") return "Chat";
  if (source === "intake_wizard") return "Interactive intake";
  if (source === "proposal_request") return "Proposal request";
  return source || "General";
}

function statusBadge(status: string) {
  if (status === "won") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "contacted") return "border-ocean-200 bg-ocean-50 text-ocean-800";
  if (status === "lost") return "border-slate-300 bg-slate-100 text-slate-700";
  return "border-amber-200 bg-amber-50 text-amber-900";
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
    <main className="bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">Dashboard</p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Project requests</h1>
            <p className="mt-1 text-sm text-slate-600">{email || "Signed-in user"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Back to billing
            </Link>
            <button
              type="button"
              onClick={() => {
                clearAccessToken();
                window.location.href = "/signin";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Sign out
            </button>
          </div>
        </header>

        {loading ? <p className="text-slate-600">Loading requests...</p> : null}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {!loading && !error ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your submitted requests</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Track request status across intake, proposal, calculator, and contact submissions.
                </p>
              </div>
              <Link
                href="/get-started"
                className="rounded-lg bg-ocean-600 px-3 py-2 text-sm font-bold text-white hover:bg-ocean-700"
              >
                New request
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Last update</th>
                    <th className="py-2 pr-4">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td className="py-3 text-slate-600" colSpan={4}>
                        No requests yet.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r.id} className="border-t border-slate-100 align-top">
                        <td className="py-3 pr-4">{sourceLabel(r.source)}</td>
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusBadge(
                              r.status,
                            )}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4 whitespace-nowrap text-slate-600">
                          {new Date(r.updatedAt).toLocaleString()}
                        </td>
                        <td className="max-w-xl py-3 pr-4 text-slate-700">
                          {r.message.slice(0, 180)}
                          {r.message.length > 180 ? "..." : ""}
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
