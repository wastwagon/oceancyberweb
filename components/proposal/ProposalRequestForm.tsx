"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicApiFetch } from "@/lib/public-api";
import { trackLeadConversion } from "@/lib/analytics/conversions";
import { PostSubmitBooking } from "@/components/booking/PostSubmitBooking";
import { AppAlert } from "@/components/ui/AppAlert";
import { SaButton } from "@/components/ui/SaButton";
import { SaField } from "@/components/ui/SaField";
import { SaInput, SaTextarea } from "@/components/ui/SaInput";
import { SaSelect } from "@/components/ui/SaSelect";

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
      const res = await publicApiFetch("contact/proposal", {
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
      trackLeadConversion("proposal_request");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <div className="sa-card border-sa-primary/50 bg-sa-primary/10 p-6 text-sm text-white">
          <p className="text-base font-bold text-white">Proposal request received</p>
          <p className="mt-2 text-sa-muted/80">
            We will review your requirements and send a formal proposal plan. If you requested a walkthrough, book a
            slot below.
          </p>
        </div>
        <PostSubmitBooking
          title="Schedule a proposal walkthrough"
          prefill={`name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}`}
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="sa-card space-y-sa-xl p-5 md:p-6">
      <div className="grid gap-sa-lg sm:grid-cols-2">
        <SaField id="proposal-name" label="Name" required>
          <SaInput
            id="proposal-name"
            density="compact"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3"
            placeholder="Your full name"
          />
        </SaField>
        <SaField id="proposal-email" label="Work email" required>
          <SaInput
            id="proposal-email"
            density="compact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3"
            placeholder="you@company.com"
          />
        </SaField>
        <SaField id="proposal-phone" label="Phone" optional>
          <SaInput
            id="proposal-phone"
            density="compact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="py-3"
            placeholder="+233..."
          />
        </SaField>
        <SaField id="proposal-company" label="Company" optional>
          <SaInput
            id="proposal-company"
            density="compact"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="py-3"
            placeholder="Company name"
          />
        </SaField>
      </div>

      <div className="grid gap-sa-lg sm:grid-cols-2">
        <SaField id="proposal-type" label="Project type">
          <SaSelect
            id="proposal-type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as (typeof PROJECT_TYPES)[number]["id"])}
          >
            {PROJECT_TYPES.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.label}
              </option>
            ))}
          </SaSelect>
        </SaField>
        <SaField id="proposal-deadline" label="Decision deadline" optional>
          <SaInput
            id="proposal-deadline"
            density="compact"
            type="date"
            value={decisionDeadline}
            onChange={(e) => setDecisionDeadline(e.target.value)}
            className="py-3"
          />
        </SaField>
      </div>

      <SaField id="proposal-situation" label="Current situation and objectives" required>
        <SaTextarea
          id="proposal-situation"
          density="compact"
          value={currentSituation}
          onChange={(e) => setCurrentSituation(e.target.value)}
          rows={4}
          className="py-3"
          placeholder="Explain your current setup, pain points, and what the proposal should solve."
        />
      </SaField>

      <div>
        <p className="sa-label">What should the proposal include?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {SCOPE_OPTIONS.map((item) => {
            const on = requiredScope.has(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleScope(item)}
                className={cn(
                  "rounded-sa-lg border px-4 py-3 text-left text-sm transition-all",
                  on
                    ? "border-sa-primary bg-sa-primary/10 text-sa-primary"
                    : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-sa-lg sm:grid-cols-2">
        <SaField id="proposal-budget" label="Budget range">
          <SaSelect
            id="proposal-budget"
            value={budgetBand}
            onChange={(e) => setBudgetBand(e.target.value as (typeof BUDGET_OPTIONS)[number])}
          >
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </SaSelect>
        </SaField>
        <SaField id="proposal-timeline" label="Target timeline">
          <SaSelect
            id="proposal-timeline"
            value={timelineBand}
            onChange={(e) => setTimelineBand(e.target.value as (typeof TIMELINE_OPTIONS)[number])}
          >
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SaSelect>
        </SaField>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-start gap-3 rounded-sa-lg border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted">
          <input
            type="checkbox"
            checked={needsNda}
            onChange={(e) => setNeedsNda(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-sa-primary"
          />
          We need an NDA before sharing more details.
        </label>
        <label className="flex items-start gap-3 rounded-sa-lg border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted">
          <input
            type="checkbox"
            checked={wantsProposalWalkthrough}
            onChange={(e) => setWantsProposalWalkthrough(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-sa-primary"
          />
          We want a proposal walkthrough call.
        </label>
      </div>

      {status === "error" && errorMessage ? <AppAlert variant="error">{errorMessage}</AppAlert> : null}

      <div className="pt-2">
        <SaButton type="submit" size="sm" disabled={!isValid || status === "loading"} className="w-full px-8 sm:w-auto">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request formal proposal"
          )}
        </SaButton>
      </div>
    </form>
  );
}
