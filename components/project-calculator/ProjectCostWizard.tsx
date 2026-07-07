"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Calculator, Check, ChevronLeft, ChevronRight, FileDown, Loader2, Printer } from "lucide-react";
import {
  COMPLEXITY_OPTIONS,
  DESIGN_OPTIONS,
  PLATFORM_OPTIONS,
  PROFORMA_COMPANY,
  PROFORMA_DISCLAIMER,
  PROJECT_FEATURES,
  TIMELINE_OPTIONS,
} from "@/lib/project-calculator/config";
import { computeProjectPricing, formatGhs, type PricingResult } from "@/lib/project-calculator/pricing";
import { downloadProformaPdf } from "@/lib/project-calculator/generate-proforma-pdf";
import type { ComplexityId, DesignId, PlatformId } from "@/lib/project-calculator/config";
import { cn } from "@/lib/utils";
import { publicApiFetch } from "@/lib/public-api";


const leadSchema = z.object({
  name: z.string().min(2, "Enter at least 2 characters"),
  email: z.string().email("Valid email required"),
  timeline: z.string().min(1, "Choose a timeline"),
});

const STEPS = ["Platform", "Design", "Features", "Summary"] as const;

const CATEGORY_LABEL: Record<string, string> = {
  auth: "Sign-in and accounts",
  commerce: "Payments and billing",
  content: "Content and languages",
  data: "Data and back office",
  comms: "Email and live updates",
  platform: "Site, apps, and integrations",
  growth: "Local and marketing add-ons",
};

function getCategoryOrder(cat: string): number {
  const o = ["auth", "commerce", "content", "data", "comms", "platform", "growth"].indexOf(cat);
  return o === -1 ? 99 : o;
}

export function ProjectCostWizard() {
  const [step, setStep] = useState(0);
  const [platformId, setPlatformId] = useState<PlatformId>("web");
  const [designId, setDesignId] = useState<DesignId>("template");
  const [featureIds, setFeatureIds] = useState<Set<string>>(() => new Set());
  const [complexityId, setComplexityId] = useState<ComplexityId>("medium");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("");

  const [leadTouched, setLeadTouched] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [leadSaveWarning, setLeadSaveWarning] = useState<string | null>(null);

  const leadParsed = useMemo(
    () => leadSchema.safeParse({ name: name.trim(), email: email.trim(), timeline }),
    [name, email, timeline],
  );
  const isLeadValid = leadParsed.success;

  const pricing: PricingResult = useMemo(
    () => computeProjectPricing(platformId, designId, featureIds, complexityId, { timelineId: timeline || null }),
    [platformId, designId, featureIds, complexityId, timeline],
  );

  /** Lets ⌘P / Ctrl+P use the same print stylesheet as “Print summary” while on the unlocked summary step. */
  useEffect(() => {
    if (step !== 3 || !isLeadValid) return;
    const onBeforePrint = () => document.documentElement.classList.add("app-print-estimator");
    const onAfterPrint = () => document.documentElement.classList.remove("app-print-estimator");
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      document.documentElement.classList.remove("app-print-estimator");
    };
  }, [step, isLeadValid]);

  useEffect(() => {
    setExportError(null);
    setLeadSaveWarning(null);
  }, [name, email, timeline]);

  const platformLabel = PLATFORM_OPTIONS.find((p) => p.id === platformId)?.label ?? "";
  const designLabel = DESIGN_OPTIONS.find((d) => d.id === designId)?.label ?? "";
  const complexityLabel = COMPLEXITY_OPTIONS.find((c) => c.id === complexityId)?.label ?? "";

  const grouped = useMemo(() => {
    const m = new Map<string, typeof PROJECT_FEATURES>();
    for (const f of PROJECT_FEATURES) {
      const a = m.get(f.category) ?? [];
      a.push(f);
      m.set(f.category, a);
    }
    return m;
  }, []);

  const toggleFeature = (id: string) => {
    setFeatureIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));

  const postLeadToServer = async (event: "proforma_download" | "print_summary") => {
    const res = await publicApiFetch("calculator/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        timeline,
        platformId,
        designId,
        complexityId,
        featureIds: Array.from(featureIds),
        event,
      }),
    });
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string | unknown };
      const msg =
        typeof err.error === "string"
          ? err.error
          : "We could not save this estimate. Check your details or try again.";
      throw new Error(msg);
    }
  };

  const handleDownloadPdf = async () => {
    if (!isLeadValid) {
      setLeadTouched(true);
      return;
    }
    setExportError(null);
    setLeadSaveWarning(null);
    setPdfLoading(true);
    let leadSaved = true;
    try {
      const timelineLabel = TIMELINE_OPTIONS.find((t) => t.value === timeline);
      const rushNote = `${timelineLabel?.label ?? ""} (×${pricing.rushLabourMultiplier} on labour for timeline)`;
      try {
        await postLeadToServer("proforma_download");
      } catch (e) {
        console.warn(e);
        leadSaved = false;
      }
      await downloadProformaPdf({
        pricing,
        lineItems: pricing.lineItems,
        clientName: name.trim(),
        clientEmail: email.trim(),
        projectTimeline: timelineLabel?.label ?? timeline,
        platformLabel,
        designLabel,
        complexityLabel,
        rushNote,
      });
      if (!leadSaved) {
        setLeadSaveWarning(
          "PDF downloaded, but we could not save your details to our server. Check your connection or try again later.",
        );
      }
    } catch (e) {
      console.error(e);
      setExportError(
        e instanceof Error ? e.message : "Could not download the PDF. Check your connection and try again.",
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handlePrint = async () => {
    if (!isLeadValid) {
      setLeadTouched(true);
      return;
    }
    setExportError(null);
    setLeadSaveWarning(null);
    setPrintLoading(true);
    let leadSaved = true;
    try {
      try {
        await postLeadToServer("print_summary");
      } catch (e) {
        console.warn(e);
        leadSaved = false;
      }
      window.print();
      if (!leadSaved) {
        setLeadSaveWarning(
          "We could not save this estimate online. Your printout is still available — try again when you are back online.",
        );
      }
    } finally {
      setPrintLoading(false);
    }
  };

  return (
    <div
      id="estimator-print-root"
      className="sa-card p-6 pb-[calc(var(--sa-mobile-tab-bar)+5rem)] print:rounded-lg print:pb-0 print:shadow-none md:pb-32"
    >
      {/* Progress */}
      <div className="print:hidden mb-8 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex h-8 min-w-[2rem] items-center justify-center rounded-full text-xs font-bold transition sm:h-9 sm:min-w-[2.25rem] sm:text-sm",
                i === step
                  ? "bg-sa-primary text-sa-bg"
                  : i < step
                    ? "bg-sa-primary/20 text-sa-primary"
                    : "bg-sa-surface border border-sa-border text-sa-muted/50",
              )}
              disabled={i > step}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </button>
            <span
              className={cn(
                "ml-1.5 hidden text-xs font-medium uppercase tracking-widest sm:ml-2 sm:inline",
                i === step ? "text-sa-primary" : "text-sa-muted/50",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="mx-0.5 text-sa-border sm:mx-1">/</span>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">What are we building?</h2>
            <p className="text-sm text-sa-muted/80">Pick the primary delivery surface. Hours include typical integration work.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLATFORM_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatformId(p.id)}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition",
                    platformId === p.id
                      ? "border-sa-primary bg-sa-primary/10 shadow-sm"
                      : "border-sa-border bg-sa-surface hover:border-sa-primary/50",
                  )}
                >
                  <p className="font-bold text-white">{p.label}</p>
                  <p className="mt-1 text-sm text-sa-muted/80">{p.description}</p>
                  {p.baseHours > 0 && (
                    <p className="mt-2 text-xs font-semibold text-sa-primary">+{p.baseHours}h base</p>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">Design depth</h2>
            <p className="text-sm text-sa-muted/80">More custom UI and systems work increases build hours (transparent add-ons).</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {DESIGN_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesignId(d.id)}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition",
                    designId === d.id
                      ? "border-sa-primary bg-sa-primary/10 shadow-sm"
                      : "border-sa-border bg-sa-surface hover:border-sa-primary/50",
                  )}
                >
                  <p className="font-bold text-white">{d.label}</p>
                  <p className="mt-1 text-sm text-sa-muted/80">{d.description}</p>
                  {d.addHours > 0 && <p className="mt-2 text-xs font-semibold text-sa-primary">+{d.addHours}h</p>}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">Features and extra work</h2>
            <p className="text-sm text-sa-muted/80">
              Turn on only what you need. Each item adds estimated hours, which changes your price. For example, you
              can add &ldquo;create their Google Business Profile&rdquo; under Local and marketing add-ons.
            </p>

            <div className="max-w-md">
              <label htmlFor="complexity" className="text-sm font-medium text-sa-muted/80 ml-1">
                Project complexity
              </label>
              <select
                id="complexity"
                value={complexityId}
                onChange={(e) => setComplexityId(e.target.value as ComplexityId)}
                className="mt-1.5 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm font-medium text-white focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary [&>option]:bg-sa-surface [&>option]:text-white"
              >
                {COMPLEXITY_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} ({c.multiplier}× on labour)
                  </option>
                ))}
              </select>
            </div>

            {Array.from(grouped.entries())
              .sort((a, b) => getCategoryOrder(a[0]) - getCategoryOrder(b[0]))
              .map(([cat, feats]) => (
                <div key={cat}>
                  <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted/50 ml-1">
                    {CATEGORY_LABEL[cat] ?? cat}
                  </h3>
                  <div className="space-y-2">
                    {feats.map((f) => {
                      const on = featureIds.has(f.id);
                      return (
                        <label
                          key={f.id}
                          className={cn(
                            "flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition sm:p-4",
                            on ? "border-sa-primary bg-sa-primary/10" : "border-sa-border bg-sa-surface hover:border-sa-primary/50",
                          )}
                        >
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-sa-border accent-sa-primary text-sa-primary"
                            checked={on}
                            onChange={() => toggleFeature(f.id)}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="font-semibold text-white">{f.label}</span>
                            <span className="ml-2 text-sm font-bold text-sa-primary">+{f.hours}h</span>
                            <span className="mt-0.5 block text-sm text-sa-muted/80">{f.description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-lg font-bold text-white sm:text-xl">Your estimate &amp; proforma</h2>
            <p className="text-sm text-sa-muted/80">
              Share your contact details to unlock the itemized breakdown, print a one-page summary, and download a
              branded proforma.{" "}
              <span className="font-medium text-white">All figures are in GHS; Paystack (cards, MoMo) is available for deposits when you contract with us.</span>{" "}
              <span className="text-sa-muted/50">Indicative only, not a binding quote.</span>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-medium text-sa-muted/80 ml-1">
                  Name
                </label>
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setLeadTouched(true)}
                  className="mt-1.5 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-medium text-sa-muted/80 ml-1">
                  Work email
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setLeadTouched(true)}
                  className="mt-1.5 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="max-w-md">
              <label htmlFor="c-timeline" className="text-sm font-medium text-sa-muted/80 ml-1">
                Target timeline
              </label>
              <select
                id="c-timeline"
                value={timeline}
                onChange={(e) => {
                  setTimeline(e.target.value);
                  setLeadTouched(true);
                }}
                className="mt-1.5 w-full rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white focus:border-sa-primary focus:outline-none focus:ring-1 focus:ring-sa-primary [&>option]:bg-sa-surface [&>option]:text-white"
              >
                <option value="">Select…</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.rushLabourMultiplier === 1
                      ? t.label
                      : t.rushLabourMultiplier > 1
                        ? `${t.label} (rush ≈ +${Math.round((t.rushLabourMultiplier - 1) * 100)}% on labour)`
                        : `${t.label} (≈ ${Math.round((1 - t.rushLabourMultiplier) * 100)}% off labour, flexible start)`}
                  </option>
                ))}
              </select>
              <p className="mt-2 ml-1 text-[11px] text-sa-muted/60">
                Timeline applies a <span className="font-medium text-sa-muted/90">rush or flexibility factor</span> to
                labour, after complexity, matching common agency calculators.
              </p>
            </div>

            {leadTouched && !leadParsed.success && (
              <p className="text-sm text-red-400 border border-red-500/50 bg-red-500/10 px-4 py-3 rounded-xl">
                {leadParsed.error.issues.map((e) => e.message).join(" · ")}
              </p>
            )}

            {exportError && (
              <p
                role="alert"
                aria-live="assertive"
                className="text-sm text-red-400 border border-red-500/50 bg-red-500/10 px-4 py-3 rounded-xl print:hidden"
              >
                {exportError}
              </p>
            )}

            {leadSaveWarning && (
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-amber-200 border border-amber-500/40 bg-amber-500/10 px-4 py-3 rounded-xl print:hidden"
              >
                {leadSaveWarning}
              </p>
            )}

            {isLeadValid && (
              <>
                <div className="hidden print:block mb-4 border-b border-neutral-400 pb-4 text-black">
                  <p className="font-heading text-base font-bold tracking-tight">{PROFORMA_COMPANY.name}</p>
                  <p className="mt-0.5 text-[11px] text-neutral-600">
                    {PROFORMA_COMPANY.email} · {PROFORMA_COMPANY.phone}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-neutral-800">
                    Project investment estimate
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-600" suppressHydrationWarning>
                    Indicative only — not a binding quote · Printed{" "}
                    {new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div
                  id="estimator-line-items"
                  className="overflow-hidden rounded-2xl border border-sa-border bg-sa-surface print:border-neutral-400 print:bg-white"
                >
                  <table className="w-full text-left text-sm print:text-black">
                    <thead className="bg-black/40 text-sa-muted/80 border-b border-sa-border print:bg-neutral-200 print:text-black print:border-neutral-400">
                      <tr>
                        <th className="px-4 py-3 font-bold">Item</th>
                        <th className="w-20 px-2 py-3 text-center font-bold">Hrs</th>
                        <th className="w-28 px-4 py-3 text-right font-bold">GHS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sa-border print:divide-neutral-300">
                      {pricing.lineItems.map((row) => (
                        <tr key={row.id}>
                          <td className="px-4 py-3 text-white print:text-black">{row.label}</td>
                          <td className="px-2 py-3 text-center text-sa-muted/80 print:text-black">{row.hours}</td>
                          <td className="px-4 py-3 text-right font-medium text-white print:text-black">
                            {formatGhs(row.amountGhs)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="hidden print:block mt-4 space-y-1 border-t border-neutral-400 pt-3 text-sm text-black">
                  <p className="text-right font-semibold">Mid estimate: {formatGhs(pricing.totalMidGhs)}</p>
                  <p className="text-right text-xs text-neutral-800">
                    Range (±10%): {formatGhs(pricing.rangeLowGhs)} – {formatGhs(pricing.rangeHighGhs)}
                  </p>
                  <p className="text-right text-[10px] text-neutral-600">
                    {pricing.totalHours}h total · nominal {formatGhs(pricing.hourlyRateGhs)}/h · ×
                    {pricing.complexityMultiplier} complexity · ×{pricing.rushLabourMultiplier} timeline
                  </p>
                </div>

                <p className="hidden print:block mt-4 text-[9px] leading-relaxed text-neutral-700">
                  {PROFORMA_DISCLAIMER}
                </p>

                <p className="text-[11px] text-sa-muted/60 ml-1 print:hidden">
                  Tip: add contingency for content, sign-off, and post-launch work in a formal SOW.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center print:hidden">
                  <button
                    type="button"
                    disabled={printLoading}
                    onClick={() => void handlePrint()}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-sa-border bg-transparent py-3 text-sm font-bold text-white transition hover:border-sa-primary disabled:opacity-50 sm:min-w-[10rem] sm:max-w-xs"
                  >
                    {printLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
                    Print summary
                  </button>
                  <button
                    type="button"
                    disabled={pdfLoading}
                    onClick={() => void handleDownloadPdf()}
                    className="sa-btn-primary flex-1 min-h-[48px] justify-center sm:min-w-[12rem] sm:max-w-xs"
                  >
                    {pdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
                    Download proforma (PDF)
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="print:hidden mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-sa-border pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex min-h-[44px] items-center gap-1 rounded-xl border border-sa-border px-5 py-2.5 text-sm font-semibold text-white transition hover:border-sa-primary disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        {step < 3 && (
          <button
            type="button"
            onClick={goNext}
            className="sa-btn-primary min-h-[44px] px-6"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>

      <RunningTotal step={step} pricing={pricing} featureCount={featureIds.size} onSummaryStep={step === 3} leadReady={isLeadValid} />
    </div>
  );
}

function RunningTotal({
  step,
  pricing,
  featureCount,
  onSummaryStep,
  leadReady,
}: {
  step: number;
  pricing: PricingResult;
  featureCount: number;
  onSummaryStep: boolean;
  leadReady: boolean;
}) {
  return (
    <div
      className="sa-ios-material print:hidden fixed bottom-[var(--sa-mobile-tab-bar)] left-0 right-0 z-[130] px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] sm:px-6 md:bottom-0 md:z-40 md:py-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2 text-sa-muted/80">
          <Calculator className="h-4 w-4 shrink-0 text-sa-primary" />
          <span className="text-sm font-bold text-white">Running total</span>
          <span className="text-xs text-sa-muted/60">
            {step < 3 ? `Step ${step + 1}/4` : "Summary"} · {featureCount} feature{featureCount === 1 ? "" : "s"}
          </span>
        </div>
        <div className="text-right sm:text-left">
          {onSummaryStep && !leadReady && (
            <p className="mb-1.5 text-[11px] text-sa-primary sm:max-w-sm sm:ml-auto sm:text-right">
              Add your name, email, and timeline to unlock the line item table and proforma download.
            </p>
          )}
          <div>
            <p className="text-sm font-bold text-white sm:text-right">
              Range: {formatGhs(pricing.rangeLowGhs)} – {formatGhs(pricing.rangeHighGhs)}
              <span className="ml-1.5 font-normal text-sa-muted/60">(mid {formatGhs(pricing.totalMidGhs)})</span>
            </p>
            <p className="text-[11px] text-sa-muted/60 sm:text-right mt-1">
              {pricing.totalHours}h total · {formatGhs(pricing.hourlyRateGhs)}/h ×{pricing.complexityMultiplier} complex · ×
              {pricing.rushLabourMultiplier} timeline · ±10% band
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
