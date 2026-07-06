"use client";

import { useMemo, useState } from "react";
import { publicApiFetch } from "@/lib/public-api";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";


type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
  currentStack: string;
  desiredPlatforms: Array<"ios" | "android" | "both">;
  needsAuth: boolean;
  needsPayments: boolean;
  needsPushNotifications: boolean;
  timelineBand: string;
  budgetBand: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  websiteUrl: "",
  currentStack: "",
  desiredPlatforms: ["both"],
  needsAuth: false,
  needsPayments: false,
  needsPushNotifications: false,
  timelineBand: "4-8 weeks",
  budgetBand: "GHS 15,000 - 30,000",
  notes: "",
};

export function WebsiteToAppQuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.trim().length > 4 &&
      form.websiteUrl.trim().length > 8 &&
      form.desiredPlatforms.length > 0
    );
  }, [form]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await publicApiFetch("contact/website-to-app", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ ok: false, message: json.error || "Could not send request." });
      } else {
        setStatus({
          ok: true,
          message: "Request received. We will review your website and send a quote shortly.",
        });
        setForm(initialState);
      }
    } catch {
      setStatus({ ok: false, message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status?.ok) {
    return (
      <div className="rounded-2xl border border-sa-primary/50 bg-sa-primary/10 p-6 text-sm text-white">
        <p className="text-base font-bold text-white">Quote request received</p>
        <p className="mt-2 text-sa-muted/80">{status.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Full name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your name"
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Email address</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@company.com"
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Phone (optional)</label>
          <input
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            placeholder="+233..."
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Company (optional)</label>
          <input
            value={form.company}
            onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
            placeholder="Company Name"
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Existing website URL</label>
        <input
          required
          type="url"
          value={form.websiteUrl}
          onChange={(e) => setForm((s) => ({ ...s, websiteUrl: e.target.value }))}
          placeholder="https://..."
          className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
        />
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Current stack</label>
        <input
          value={form.currentStack}
          onChange={(e) => setForm((s) => ({ ...s, currentStack: e.target.value }))}
          placeholder="WordPress, Shopify, custom, etc."
          className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Target Timeline</label>
          <select
            value={form.timelineBand}
            onChange={(e) => setForm((s) => ({ ...s, timelineBand: e.target.value }))}
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition [&>option]:bg-sa-surface [&>option]:text-white"
          >
            <option>2-4 weeks</option>
            <option>4-8 weeks</option>
            <option>2-3 months</option>
            <option>3+ months</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Budget Range</label>
          <select
            value={form.budgetBand}
            onChange={(e) => setForm((s) => ({ ...s, budgetBand: e.target.value }))}
            className="h-11 w-full rounded-xl border border-sa-border bg-sa-surface px-4 text-sm text-white outline-none focus:border-sa-primary transition [&>option]:bg-sa-surface [&>option]:text-white"
          >
            <option>Below GHS 15,000</option>
            <option>GHS 15,000 - 30,000</option>
            <option>GHS 30,000 - 60,000</option>
            <option>GHS 60,000+</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-sa-border bg-sa-bg/50 p-4">
        <p className="text-sm font-semibold text-white">Target platform</p>
        <p className="mt-0.5 text-xs text-sa-muted/60">Choose where the converted app should launch first.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["ios", "android", "both"] as const).map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => setForm((s) => ({ ...s, desiredPlatforms: [platform] }))}
              className={cn(
                "rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition",
                form.desiredPlatforms.includes(platform)
                  ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
                  : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50"
              )}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-2 block">App Features</label>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-sa-border bg-sa-surface p-3 transition hover:border-sa-primary/50">
            <input
              type="checkbox"
              checked={form.needsAuth}
              onChange={(e) => setForm((s) => ({ ...s, needsAuth: e.target.checked }))}
              className="h-4 w-4 rounded border-sa-border accent-sa-primary text-sa-primary"
            />
            <span className="text-sm text-sa-muted">User auth</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-sa-border bg-sa-surface p-3 transition hover:border-sa-primary/50">
            <input
              type="checkbox"
              checked={form.needsPayments}
              onChange={(e) => setForm((s) => ({ ...s, needsPayments: e.target.checked }))}
              className="h-4 w-4 rounded border-sa-border accent-sa-primary text-sa-primary"
            />
            <span className="text-sm text-sa-muted">Payments</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-sa-border bg-sa-surface p-3 transition hover:border-sa-primary/50">
            <input
              type="checkbox"
              checked={form.needsPushNotifications}
              onChange={(e) => setForm((s) => ({ ...s, needsPushNotifications: e.target.checked }))}
              className="h-4 w-4 rounded border-sa-border accent-sa-primary text-sa-primary"
            />
            <span className="text-sm text-sa-muted">Push alerts</span>
          </label>
        </div>
        <p className="mt-2 text-xs text-sa-muted/50">
          Select features you want included in the first app release.
        </p>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-sa-muted/40 mb-1.5 block">Additional notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          rows={5}
          placeholder="Share key flows and screens to convert (checkout, bookings, dashboard, etc.)"
          className="w-full resize-none rounded-xl border border-sa-border bg-sa-surface px-4 py-3 text-sm text-white outline-none focus:border-sa-primary transition"
        />
      </div>

      <button
        disabled={!canSubmit || isSubmitting}
        className="sa-btn-primary w-full min-h-[44px] justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Request conversion quote"
        )}
      </button>

      {status && !status.ok && (
        <p className="rounded-xl border border-rose-500/50 bg-rose-500/10 p-3 text-sm text-rose-400">
          {status.message}
        </p>
      )}
    </form>
  );
}
