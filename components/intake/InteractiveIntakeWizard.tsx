"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api-config";

type MeetingType = "discovery_call" | "proposal_walkthrough" | "asynchronous_quote";
type ContactMethod = "email" | "phone" | "whatsapp";

const SERVICE_OPTIONS = [
  "Website build",
  "Mobile app",
  "E-commerce",
  "Cybersecurity",
  "Ongoing support",
  "Local growth (Google Business Profile, SEO)",
] as const;

const BUDGET_OPTIONS = [
  "Under GHS 10,000",
  "GHS 10,000 - 30,000",
  "GHS 30,000 - 80,000",
  "GHS 80,000+",
] as const;
const TIMELINE_OPTIONS = ["ASAP (under 1 month)", "1-3 months", "3-6 months", "6+ months"] as const;
const STEPS = ["Basics", "Needs", "Budget", "Booking"] as const;

export function InteractiveIntakeWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [serviceNeeds, setServiceNeeds] = useState<Set<string>>(() => new Set());
  const [goals, setGoals] = useState("");
  const [budgetBand, setBudgetBand] = useState<(typeof BUDGET_OPTIONS)[number]>(BUDGET_OPTIONS[1]);
  const [timelineBand, setTimelineBand] = useState<(typeof TIMELINE_OPTIONS)[number]>(TIMELINE_OPTIONS[1]);
  const [hasExistingSite, setHasExistingSite] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [meetingType, setMeetingType] = useState<MeetingType>("discovery_call");
  const [preferredDate, setPreferredDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canNext = useMemo(() => {
    if (step === 0) return name.trim().length >= 2 && /@/.test(email);
    if (step === 1) return serviceNeeds.size > 0 && goals.trim().length >= 12;
    return true;
  }, [step, name, email, serviceNeeds, goals]);

  const toggleService = (service: string) => {
    setServiceNeeds((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => {
    if (!canNext) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch(`${getApiBaseUrl()}/contact/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          serviceNeeds: Array.from(serviceNeeds),
          goals: goals.trim(),
          budgetBand,
          timelineBand,
          hasExistingSite,
          contactMethod,
          meetingType,
          preferredDate: preferredDate || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Could not submit right now. Please try again.");
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
      <div className="sa-card border-sa-primary/50 bg-sa-primary/10 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 text-sa-primary" />
          <div>
            <h2 className="text-xl font-bold text-white">Request received</h2>
            <p className="mt-2 text-sm text-sa-muted">
              Thanks. We saved your intake and will respond with next steps. If you asked for a call, we will confirm
              your slot by {contactMethod === "email" ? "email" : contactMethod}.
            </p>
            <div className="mt-4">
              <Link
                href="/tools/proposal"
                className="sa-btn-primary min-h-[40px] px-3 py-2 text-sm"
              >
                Continue to formal proposal request
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="sa-card p-4 sm:p-6">
      <ol className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((label, idx) => (
          <li
            key={label}
            className={cn(
              "rounded-xl border px-3 py-2 font-heading text-[10px] font-semibold uppercase tracking-widest",
              idx === step
                ? "border-sa-primary bg-sa-primary/10 text-sa-primary"
                : idx < step
                  ? "border-sa-primary/50 bg-sa-primary/5 text-sa-primary/80"
                  : "border-sa-border bg-sa-surface text-sa-muted/50",
            )}
          >
            {idx + 1}. {label}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Work email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Phone (optional)</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
                placeholder="+233..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Company (optional)</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
                placeholder="Company name"
              />
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div>
              <p className="text-sm font-medium text-sa-muted/80 ml-1">What do you need?</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((opt) => {
                  const on = serviceNeeds.has(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleService(opt)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        on
                          ? "border-sa-primary bg-sa-primary/10 text-sa-primary"
                          : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50",
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Main goals</label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                className="mt-1 w-full resize-none rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white placeholder:text-sa-muted/50 transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
                placeholder="Example: Increase qualified leads, launch online payments, and let customers book without calling."
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Budget range</label>
              <select
                value={budgetBand}
                onChange={(e) => setBudgetBand(e.target.value as (typeof BUDGET_OPTIONS)[number])}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white"
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Target timeline</label>
              <select
                value={timelineBand}
                onChange={(e) => setTimelineBand(e.target.value as (typeof TIMELINE_OPTIONS)[number])}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white"
              >
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted">
              <input
                type="checkbox"
                checked={hasExistingSite}
                onChange={(e) => setHasExistingSite(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-sa-primary"
              />
              We already have a website or app and need improvement or migration.
            </label>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-sa-muted/80 ml-1">Preferred contact</label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
                  className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-sa-muted/80 ml-1">Next step</label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value as MeetingType)}
                  className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm [&>option]:bg-sa-surface [&>option]:text-white"
                >
                  <option value="discovery_call">Discovery call</option>
                  <option value="proposal_walkthrough">Proposal walkthrough</option>
                  <option value="asynchronous_quote">Asynchronous quote (no call)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-sa-muted/80 ml-1">Preferred date/time (optional)</label>
              <input
                type="datetime-local"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-white transition-all focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary text-sm"
              />
            </div>
            <div className="rounded-xl border border-sa-border bg-sa-surface p-4 text-sm text-sa-muted/80">
              <p className="mb-1">
                <span className="font-semibold text-white">Scope:</span> {Array.from(serviceNeeds).join(", ") || "—"}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-white">Budget:</span> {budgetBand}
              </p>
              <p>
                <span className="font-semibold text-white">Timeline:</span> {timelineBand}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && errorMessage ? (
        <p className="mt-4 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-2 border-t border-sa-border pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || status === "loading"}
          className="inline-flex items-center gap-2 rounded-full border border-sa-border bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-sa-primary disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext || status === "loading"}
            className="sa-btn-primary min-h-[44px] px-6 text-sm disabled:opacity-50"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className="sa-btn-primary min-h-[44px] px-6 text-sm disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit request"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
