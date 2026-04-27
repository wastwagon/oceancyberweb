"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  { id: "website", label: "Website" },
  { id: "mobile_app", label: "Mobile app" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "security", label: "Cybersecurity" },
  { id: "support", label: "Ongoing support" },
  { id: "other", label: "Other" },
] as const;

const SCOPE_OPTIONS = [
  "Technical scope breakdown",
  "Timeline by phase",
  "Cost breakdown in GHS",
  "Team and responsibilities",
  "Support and maintenance options",
] as const;

const BUDGET_OPTIONS = ["Under GHS 10,000", "GHS 10,000 - 30,000", "GHS 30,000 - 80,000", "GHS 80,000+"] as const;
const TIMELINE_OPTIONS = ["ASAP (under 1 month)", "1-3 months", "3-6 months", "6+ months"] as const;

type ProposalRequestFormProps = {
  initialTopic?: string;
};

export function ProposalRequestForm({ initialTopic }: ProposalRequestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPES)[number]["id"]>("website");
  const topicFromUrl = initialTopic?.trim() || "";
  const [currentSituation, setCurrentSituation] = useState(
    topicFromUrl ? `Context from help center: ${topicFromUrl}\n\n` : "",
  );
  const [requiredScope, setRequiredScope] = useState<Set<string>>(
    () => new Set(["Technical scope breakdown", "Cost breakdown in GHS"]),
  );
  const [budgetBand, setBudgetBand] = useState<(typeof BUDGET_OPTIONS)[number]>(BUDGET_OPTIONS[1]);
  const [timelineBand, setTimelineBand] = useState<(typeof TIMELINE_OPTIONS)[number]>(TIMELINE_OPTIONS[1]);
  const [decisionDeadline, setDecisionDeadline] = useState("");
  const [needsNda, setNeedsNda] = useState(false);
  const [wantsProposalWalkthrough, setWantsProposalWalkthrough] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValid = name.trim().length > 1 && /@/.test(email) && currentSituation.trim().length >= 20 && requiredScope.size > 0;

  const toggleScope = (item: string) => {
    setRequiredScope((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || status === "loading") return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/proposal/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          projectType,
          currentSituation: currentSituation.trim(),
          requiredScope: Array.from(requiredScope),
          budgetBand,
          timelineBand,
          decisionDeadline: decisionDeadline || undefined,
          needsNda,
          wantsProposalWalkthrough,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Could not submit your request right now.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
        <p className="text-base font-bold">Proposal request received</p>
        <p className="mt-2">
          We will review your requirements and send a formal proposal plan. If you requested a walkthrough, we will
          suggest meeting slots.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Your full name" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Work email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="you@company.com" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Phone (optional)</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="+233..." />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Company (optional)</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Company name" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">Project type</label>
          <select value={projectType} onChange={(e) => setProjectType(e.target.value as (typeof PROJECT_TYPES)[number]["id"])} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
            {PROJECT_TYPES.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Decision deadline (optional)</label>
          <input type="date" value={decisionDeadline} onChange={(e) => setDecisionDeadline(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-800">Current situation and objectives</label>
        <textarea value={currentSituation} onChange={(e) => setCurrentSituation(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Explain your current setup, pain points, and what the proposal should solve." />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">What should the proposal include?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SCOPE_OPTIONS.map((item) => {
            const on = requiredScope.has(item);
            return (
              <button type="button" key={item} onClick={() => toggleScope(item)} className={cn("rounded-xl border px-3 py-2 text-left text-sm", on ? "border-ocean-500 bg-ocean-50 text-ocean-900" : "border-slate-200 bg-white text-slate-700")}>
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">Budget range</label>
          <select value={budgetBand} onChange={(e) => setBudgetBand(e.target.value as (typeof BUDGET_OPTIONS)[number])} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-800">Target timeline</label>
          <select value={timelineBand} onChange={(e) => setTimelineBand(e.target.value as (typeof TIMELINE_OPTIONS)[number])} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <input type="checkbox" checked={needsNda} onChange={(e) => setNeedsNda(e.target.checked)} className="mt-0.5 h-4 w-4" />
          We need an NDA before sharing more details.
        </label>
        <label className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <input type="checkbox" checked={wantsProposalWalkthrough} onChange={(e) => setWantsProposalWalkthrough(e.target.checked)} className="mt-0.5 h-4 w-4" />
          We want a proposal walkthrough call.
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
      ) : null}

      <button type="submit" disabled={!isValid || status === "loading"} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-ocean-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request formal proposal"
        )}
      </button>
    </form>
  );
}
