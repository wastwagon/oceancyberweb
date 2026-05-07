"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api-config";

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
      const res = await fetch(`${getApiBaseUrl()}/contact/proposal`, {
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
      <div className="sa-card border-sa-primary/50 bg-sa-primary/10 p-6 text-sm text-white">
        <p className="text-base font-bold text-white">Proposal request received</p>
        <p className="mt-2 text-sa-muted/80">
          We will review your requirements and send a formal proposal plan. If you requested a walkthrough, we will
          suggest meeting slots.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="sa-card space-y-5 p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" placeholder="Your full name" />
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Work email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" placeholder="you@company.com" />
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Phone (optional)</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" placeholder="+233..." />
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Company (optional)</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" placeholder="Company name" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Project type</label>
          <select value={projectType} onChange={(e) => setProjectType(e.target.value as (typeof PROJECT_TYPES)[number]["id"])} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white">
            {PROJECT_TYPES.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Decision deadline (optional)</label>
          <input type="date" value={decisionDeadline} onChange={(e) => setDecisionDeadline(e.target.value)} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-sa-muted/80 ml-1">Current situation and objectives</label>
        <textarea value={currentSituation} onChange={(e) => setCurrentSituation(e.target.value)} rows={4} className="mt-1 w-full resize-none rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm" placeholder="Explain your current setup, pain points, and what the proposal should solve." />
      </div>

      <div>
        <p className="text-sm font-medium text-sa-muted/80 ml-1">What should the proposal include?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SCOPE_OPTIONS.map((item) => {
            const on = requiredScope.has(item);
            return (
              <button type="button" key={item} onClick={() => toggleScope(item)} className={cn("rounded-xl border px-4 py-3 text-left text-sm transition-all", on ? "border-sa-primary bg-sa-primary/10 text-sa-primary" : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50")}>
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Budget range</label>
          <select value={budgetBand} onChange={(e) => setBudgetBand(e.target.value as (typeof BUDGET_OPTIONS)[number])} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white">
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80 ml-1">Target timeline</label>
          <select value={timelineBand} onChange={(e) => setTimelineBand(e.target.value as (typeof TIMELINE_OPTIONS)[number])} className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white">
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-start gap-3 rounded-xl border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted">
          <input type="checkbox" checked={needsNda} onChange={(e) => setNeedsNda(e.target.checked)} className="mt-0.5 h-4 w-4 accent-sa-primary" />
          We need an NDA before sharing more details.
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted">
          <input type="checkbox" checked={wantsProposalWalkthrough} onChange={(e) => setWantsProposalWalkthrough(e.target.checked)} className="mt-0.5 h-4 w-4 accent-sa-primary" />
          We want a proposal walkthrough call.
        </label>
      </div>

      {status === "error" && errorMessage ? (
        <p className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">{errorMessage}</p>
      ) : null}

      <div className="pt-2">
        <button type="submit" disabled={!isValid || status === "loading"} className="sa-btn-primary w-full sm:w-auto min-h-[44px] px-8 disabled:opacity-50">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request formal proposal"
          )}
        </button>
      </div>
    </form>
  );
}
