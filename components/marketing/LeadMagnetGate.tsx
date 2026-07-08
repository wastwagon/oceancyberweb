"use client";

import { useState, type FormEvent } from "react";
import { Download, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { publicApiFetch } from "@/lib/public-api";
import { trackLeadConversion } from "@/lib/analytics/conversions";
import { downloadComplianceChecklistPdf } from "@/lib/lead-magnets/generate-compliance-checklist-pdf";
import { downloadMomoPlaybookPdf } from "@/lib/lead-magnets/generate-momo-playbook-pdf";
import {
  LEAD_MAGNET_PRESETS,
  type LeadMagnetId,
} from "@/lib/lead-magnets/presets";

type LeadMagnetGateProps = {
  magnetId?: LeadMagnetId;
  title?: string;
  description?: string;
  page?: string;
  className?: string;
};

function downloadMagnetPdf(magnetId: LeadMagnetId): void {
  if (magnetId === "compliance_checklist") {
    downloadComplianceChecklistPdf();
  } else {
    downloadMomoPlaybookPdf();
  }
}

export function LeadMagnetGate({
  magnetId = "momo_playbook",
  title,
  description,
  page = "lead_magnet",
  className = "",
}: LeadMagnetGateProps) {
  const preset = LEAD_MAGNET_PRESETS[magnetId];
  const resolvedTitle = title ?? preset.title;
  const resolvedDescription = description ?? preset.description;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await publicApiFetch("contact/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          page,
          source: `lead_magnet_${magnetId}`,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not verify your email. Try again.");
        return;
      }

      trackLeadConversion("newsletter_signup", `lead_magnet:${magnetId}`);
      downloadMagnetPdf(magnetId);
      setStatus("success");
      setMessage(preset.successMessage);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <div className={`sa-card relative overflow-hidden p-8 md:p-10 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(187,243,64,0.06),transparent_60%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sa-primary/30 bg-sa-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sa-primary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Free resource
          </div>
          <h3 className="font-heading text-xl font-bold text-white md:text-2xl">{resolvedTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-sa-muted/85">{resolvedDescription}</p>
        </div>

        {status === "success" ? (
          <div className="shrink-0 rounded-xl border border-sa-primary/40 bg-sa-primary/10 p-5 md:max-w-xs">
            <p className="text-sm font-semibold text-white">Download started</p>
            <p className="mt-2 text-sm text-sa-muted/80">{message}</p>
            <button
              type="button"
              onClick={() => downloadMagnetPdf(magnetId)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary hover:text-white"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full shrink-0 md:max-w-sm">
            <label htmlFor={`lead-magnet-${magnetId}`} className="sr-only">
              Work email
            </label>
            <input
              id={`lead-magnet-${magnetId}`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="you@company.com"
              autoComplete="email"
              className="min-h-[48px] w-full rounded-xl border border-sa-border bg-sa-bg/60 px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="sa-btn-primary mt-3 min-h-[48px] w-full disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Preparing PDF…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" aria-hidden />
                  Email me the PDF
                </>
              )}
            </button>
            <p
              className={`mt-3 text-center text-[10px] font-bold uppercase tracking-widest ${
                status === "error" ? "text-red-400" : "text-sa-muted/45"
              }`}
              role={status === "error" ? "alert" : undefined}
            >
              {message ?? "No spam · Unsubscribe anytime"}
            </p>
          </form>
        )}
      </div>
      {preset.footer ? (
        <p className="relative mt-4 text-center text-xs text-sa-muted/50 md:text-left">
          <Link href={preset.footer.href} className="text-sa-primary hover:underline">
            {preset.footer.label}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
