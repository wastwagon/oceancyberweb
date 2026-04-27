"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Calculator, Check, ChevronLeft, ChevronRight, FileDown, Loader2, Printer } from "lucide-react";
import {
  COMPLEXITY_OPTIONS,
  DESIGN_OPTIONS,
  PLATFORM_OPTIONS,
  PROJECT_FEATURES,
  TIMELINE_OPTIONS,
} from "@/lib/project-calculator/config";
import { computeProjectPricing, formatGhs, type PricingResult } from "@/lib/project-calculator/pricing";
import { downloadProformaPdf } from "@/lib/project-calculator/generate-proforma-pdf";
import type { ComplexityId, DesignId, PlatformId } from "@/lib/project-calculator/config";
import { cn } from "@/lib/utils";

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

  const leadParsed = useMemo(
    () => leadSchema.safeParse({ name: name.trim(), email: email.trim(), timeline }),
    [name, email, timeline],
  );
  const isLeadValid = leadParsed.success;

  const pricing: PricingResult = useMemo(
    () => computeProjectPricing(platformId, designId, featureIds, complexityId, { timelineId: timeline || null }),
    [platformId, designId, featureIds, complexityId, timeline],
  );

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
    const res = await fetch("/api/project-calculator/lead", {
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
    setPdfLoading(true);
    try {
      const timelineLabel = TIMELINE_OPTIONS.find((t) => t.value === timeline);
      const rushNote = `${timelineLabel?.label ?? ""} (×${pricing.rushLabourMultiplier} on labour for timeline)`;
      await postLeadToServer("proforma_download");
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
    } catch (e) {
      console.error(e);
    } finally {
      setPdfLoading(false);
    }
  };

  const handlePrint = async () => {
    if (!isLeadValid) {
      setLeadTouched(true);
      return;
    }
    setPrintLoading(true);
    try {
      await postLeadToServer("print_summary");
      window.print();
    } catch (e) {
      console.error(e);
    } finally {
      setPrintLoading(false);
    }
  };

  return (
    <div className="pb-32 print:pb-0">
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
                  ? "bg-ocean-600 text-white"
                  : i < step
                    ? "bg-ocean-100 text-ocean-800"
                    : "bg-slate-200 text-slate-500",
              )}
              disabled={i > step}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </button>
            <span
              className={cn(
                "ml-1.5 hidden text-xs font-medium sm:ml-2 sm:inline",
                i === step ? "text-ocean-800" : "text-slate-500",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="mx-0.5 text-slate-300 sm:mx-1">/</span>}
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
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">What are we building?</h2>
            <p className="text-sm text-slate-600">Pick the primary delivery surface. Hours include typical integration work.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLATFORM_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatformId(p.id)}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition",
                    platformId === p.id
                      ? "border-ocean-500 bg-ocean-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <p className="font-bold text-slate-900">{p.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                  {p.baseHours > 0 && (
                    <p className="mt-2 text-xs font-semibold text-ocean-700">+{p.baseHours}h base</p>
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
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Design depth</h2>
            <p className="text-sm text-slate-600">More custom UI and systems work increases build hours (transparent add-ons).</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {DESIGN_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesignId(d.id)}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-left transition",
                    designId === d.id
                      ? "border-ocean-500 bg-ocean-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <p className="font-bold text-slate-900">{d.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{d.description}</p>
                  {d.addHours > 0 && <p className="mt-2 text-xs font-semibold text-ocean-700">+{d.addHours}h</p>}
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
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Features and extra work</h2>
            <p className="text-sm text-slate-600">
              Turn on only what you need. Each item adds estimated hours, which changes your price. For example, you
              can add &ldquo;create their Google Business Profile&rdquo; under Local and marketing add-ons.
            </p>

            <div className="max-w-md">
              <label htmlFor="complexity" className="text-sm font-semibold text-slate-800">
                Project complexity
              </label>
              <select
                id="complexity"
                value={complexityId}
                onChange={(e) => setComplexityId(e.target.value as ComplexityId)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-200"
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
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
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
                            on ? "border-ocean-400 bg-ocean-50/50" : "border-slate-200 bg-white hover:border-slate-300",
                          )}
                        >
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-ocean-600 focus:ring-ocean-500"
                            checked={on}
                            onChange={() => toggleFeature(f.id)}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="font-semibold text-slate-900">{f.label}</span>
                            <span className="ml-2 text-sm font-bold text-ocean-700">+{f.hours}h</span>
                            <span className="mt-0.5 block text-sm text-slate-600">{f.description}</span>
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
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Your estimate &amp; proforma</h2>
            <p className="text-sm text-slate-600">
              Share your contact details to unlock the itemized breakdown, print a one-page summary, and download a
              branded proforma.{" "}
              <span className="font-medium text-slate-800">All figures are in GHS; Paystack (cards, MoMo) is available for deposits when you contract with us.</span>{" "}
              <span className="text-slate-500">Indicative only, not a binding quote.</span>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-semibold text-slate-800">
                  Name
                </label>
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setLeadTouched(true)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-semibold text-slate-800">
                  Work email
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setLeadTouched(true)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="max-w-md">
              <label htmlFor="c-timeline" className="text-sm font-semibold text-slate-800">
                Target timeline
              </label>
              <select
                id="c-timeline"
                value={timeline}
                onChange={(e) => {
                  setTimeline(e.target.value);
                  setLeadTouched(true);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
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
              <p className="mt-1.5 text-xs text-slate-500">
                Timeline applies a <span className="font-medium text-slate-700">rush or flexibility factor</span> to
                labour, after complexity, matching common agency calculators.
              </p>
            </div>

            {leadTouched && !leadParsed.success && (
              <p className="text-sm text-red-600">
                {leadParsed.error.issues.map((e) => e.message).join(" · ")}
              </p>
            )}

            {isLeadValid && (
              <>
                <div id="estimator-line-items" className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-bold">Item</th>
                        <th className="w-20 px-2 py-2 text-center font-bold">Hrs</th>
                        <th className="w-28 px-2 py-2 text-right font-bold">GHS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricing.lineItems.map((row) => (
                        <tr key={row.id} className="border-t border-slate-100">
                          <td className="px-4 py-2.5 text-slate-800">{row.label}</td>
                          <td className="px-2 text-center text-slate-600">{row.hours}</td>
                          <td className="px-2 text-right font-medium text-slate-900">{formatGhs(row.amountGhs)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 print:hidden">
                  Tip: add contingency for content, sign-off, and post-launch work in a formal SOW.
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center print:hidden">
                  <button
                    type="button"
                    disabled={printLoading}
                    onClick={() => void handlePrint()}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-bold text-slate-800 transition hover:border-ocean-300 hover:bg-slate-50 disabled:opacity-60 sm:min-w-[10rem] sm:max-w-xs"
                  >
                    {printLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
                    Print summary
                  </button>
                  <button
                    type="button"
                    disabled={pdfLoading}
                    onClick={() => void handleDownloadPdf()}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-ocean-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ocean-700 disabled:opacity-60 sm:min-w-[12rem] sm:max-w-xs"
                  >
                    {pdfLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    Download proforma (PDF)
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="print:hidden mt-10 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="inline-flex min-h-[44px] items-center gap-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        {step < 3 && (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-ocean-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ocean-700"
          >
            Next
            <ChevronRight className="h-4 w-4" />
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
      className="print:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2 text-slate-700">
          <Calculator className="h-4 w-4 shrink-0 text-ocean-600" />
          <span className="text-sm font-bold">Running total</span>
          <span className="text-xs text-slate-500">
            {step < 3 ? `Step ${step + 1}/4` : "Summary"} · {featureCount} feature{featureCount === 1 ? "" : "s"}
          </span>
        </div>
        <div className="text-right sm:text-left">
          {onSummaryStep && !leadReady && (
            <p className="mb-1 text-[11px] text-amber-800 sm:max-w-sm sm:ml-auto sm:text-right">
              Add your name, email, and timeline to unlock the line item table and proforma download.
            </p>
          )}
          <div>
            <p className="text-sm font-bold text-slate-900 sm:text-right">
              Range: {formatGhs(pricing.rangeLowGhs)} – {formatGhs(pricing.rangeHighGhs)}
              <span className="ml-1.5 font-normal text-slate-500">(mid {formatGhs(pricing.totalMidGhs)})</span>
            </p>
            <p className="text-[11px] text-slate-500 sm:text-right">
              {pricing.totalHours}h total · {formatGhs(pricing.hourlyRateGhs)}/h ×{pricing.complexityMultiplier} complex · ×
              {pricing.rushLabourMultiplier} timeline · ±10% band
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
