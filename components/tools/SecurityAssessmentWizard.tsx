"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { publicApiFetch } from "@/lib/public-api";
import { trackLeadConversion } from "@/lib/analytics/conversions";
import { PostSubmitBooking } from "@/components/booking/PostSubmitBooking";
import { SECURITY_DOMAINS } from "@/lib/security-assessment/config";
import { downloadSecurityAssessmentPdf } from "@/lib/security-assessment/generate-report-pdf";
import {
  computeAssessmentResult,
  type AnswerMap,
} from "@/lib/security-assessment/scoring";

const SCORE_LABELS = [
  { value: 0, label: "Not in place" },
  { value: 1, label: "Partial" },
  { value: 2, label: "In place" },
] as const;

type Phase = "questions" | "results" | "email" | "done";

export function SecurityAssessmentWizard() {
  const [domainIndex, setDomainIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [phase, setPhase] = useState<Phase>("questions");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const domain = SECURITY_DOMAINS[domainIndex];
  const result = useMemo(() => computeAssessmentResult(answers), [answers]);

  const domainComplete = domain.questions.every((q) => answers[q.id] !== undefined);

  function setAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function goNextDomain() {
    if (domainIndex < SECURITY_DOMAINS.length - 1) {
      setDomainIndex((i) => i + 1);
    } else {
      setPhase("results");
    }
  }

  async function submitEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await publicApiFetch("contact/security-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          company: company.trim() || undefined,
          scorePercent: result.percent,
          tier: result.tier.label,
          domainScores: result.domainScores,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not save your assessment.");
        return;
      }

      trackLeadConversion("security_assessment", result.tier.id);
      downloadSecurityAssessmentPdf(result, email.trim());
      setPhase("done");
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Try again.");
    }
  }

  if (phase === "done") {
    return (
      <div className="space-y-6">
        <div className="sa-card border-sa-primary/40 bg-sa-primary/10 p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">Report downloaded</h2>
          <p className="mt-2 text-sm text-sa-muted/85">
            Your {result.percent}% ({result.tier.label}) assessment is saved. Our security team can walk through
            priorities on a 30-minute review call.
          </p>
          <button
            type="button"
            onClick={() => downloadSecurityAssessmentPdf(result, email.trim())}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary hover:text-white"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download PDF again
          </button>
        </div>
        <PostSubmitBooking
          prefill={`email=${encodeURIComponent(email.trim())}`}
          title="Book a security review"
          description="Optional: pick a time for a complimentary posture review with our security lead."
        />
        <Link href="/security-journey" className="text-sm font-semibold text-sa-primary hover:underline">
          Explore our security journey →
        </Link>
      </div>
    );
  }

  if (phase === "email") {
    return (
      <form onSubmit={submitEmail} className="sa-card space-y-5 p-6 md:p-8">
        <div>
          <h2 className="text-xl font-bold text-white">Get your full report</h2>
          <p className="mt-2 text-sm text-sa-muted/85">
            Enter your work email to download a PDF summary ({result.percent}% · {result.tier.label}) and optionally
            book a review call.
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80">Work email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white focus:border-sa-primary focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-sa-muted/80">Company (optional)</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white focus:border-sa-primary focus:outline-none"
            placeholder="Organisation"
          />
        </div>
        {errorMessage ? (
          <p className="text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <button type="submit" disabled={status === "loading"} className="sa-btn-primary min-h-[48px] w-full">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            "Download report"
          )}
        </button>
      </form>
    );
  }

  if (phase === "results") {
    return (
      <div className="space-y-6">
        <div className="sa-card border-l-4 border-sa-primary p-6 md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">Your maturity score</p>
          <p className="mt-2 font-heading text-5xl font-black text-white">{result.percent}%</p>
          <p className="mt-1 font-heading text-lg font-bold text-sa-primary">{result.tier.label}</p>
          <p className="mt-4 text-sm leading-relaxed text-sa-muted/85">{result.tier.summary}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {result.domainScores.map((d) => (
            <div key={d.domainId} className="sa-card p-4">
              <p className="text-sm font-semibold text-white">{d.title}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-sa-primary">{d.percent}%</p>
            </div>
          ))}
        </div>

        <div className="sa-card p-6">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-white">Priority actions</p>
          <ul className="mt-4 space-y-2 text-sm text-sa-muted/85">
            {result.tier.recommendations.map((rec) => (
              <li key={rec} className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPhase("email")}
            className="sa-btn-primary min-h-[48px] px-6"
          >
            Email me the PDF report
          </button>
          <button
            type="button"
            onClick={() => {
              setPhase("questions");
              setDomainIndex(0);
            }}
            className="inline-flex min-h-[48px] items-center rounded-full border border-sa-border px-6 text-sm font-semibold text-white hover:border-sa-primary"
          >
            Retake assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sa-card p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
          Domain {domainIndex + 1} of {SECURITY_DOMAINS.length}
        </p>
        <p className="font-heading text-sm font-bold text-sa-primary">{domain.title}</p>
      </div>
      <p className="mb-6 text-sm text-sa-muted/80">{domain.description}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={domain.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-5"
        >
          {domain.questions.map((question) => (
            <fieldset key={question.id} className="rounded-xl border border-sa-border bg-sa-surface/40 p-4">
              <legend className="px-1 text-sm font-medium text-white">{question.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {SCORE_LABELS.map((opt) => {
                  const selected = answers[question.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswer(question.id, opt.value)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs font-semibold transition",
                        selected
                          ? "border-sa-primary bg-sa-primary/15 text-sa-primary"
                          : "border-sa-border text-sa-muted hover:border-sa-primary/50",
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between border-t border-sa-border pt-6">
        <button
          type="button"
          onClick={() => setDomainIndex((i) => Math.max(0, i - 1))}
          disabled={domainIndex === 0}
          className="inline-flex items-center gap-2 rounded-full border border-sa-border px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={goNextDomain}
          disabled={!domainComplete}
          className="sa-btn-primary min-h-[44px] px-6 text-sm disabled:opacity-50"
        >
          {domainIndex === SECURITY_DOMAINS.length - 1 ? "See results" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
