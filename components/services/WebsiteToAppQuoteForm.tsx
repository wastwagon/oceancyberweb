"use client";

import { useMemo, useState } from "react";

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
      const res = await fetch("/api/services/website-to-app-quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as { error?: string };
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

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Full name"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          placeholder="Email address"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          placeholder="Phone (optional)"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        />
        <input
          value={form.company}
          onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
          placeholder="Company (optional)"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        />
      </div>

      <input
        required
        type="url"
        value={form.websiteUrl}
        onChange={(e) => setForm((s) => ({ ...s, websiteUrl: e.target.value }))}
        placeholder="Existing website URL (https://...)"
        className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
      />

      <input
        value={form.currentStack}
        onChange={(e) => setForm((s) => ({ ...s, currentStack: e.target.value }))}
        placeholder="Current stack (WordPress, Shopify, custom, etc.)"
        className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={form.timelineBand}
          onChange={(e) => setForm((s) => ({ ...s, timelineBand: e.target.value }))}
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        >
          <option>2-4 weeks</option>
          <option>4-8 weeks</option>
          <option>2-3 months</option>
          <option>3+ months</option>
        </select>
        <select
          value={form.budgetBand}
          onChange={(e) => setForm((s) => ({ ...s, budgetBand: e.target.value }))}
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none ring-ocean-500 focus:ring-2"
        >
          <option>Below GHS 15,000</option>
          <option>GHS 15,000 - 30,000</option>
          <option>GHS 30,000 - 60,000</option>
          <option>GHS 60,000+</option>
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Target platform</p>
        <p className="mt-0.5 text-xs text-slate-500">Choose where the converted app should launch first.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["ios", "android", "both"] as const).map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => setForm((s) => ({ ...s, desiredPlatforms: [platform] }))}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                form.desiredPlatforms.includes(platform)
                  ? "border-ocean-600 bg-ocean-600 text-white"
                  : "border-slate-300 bg-white text-slate-700"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.needsAuth}
            onChange={(e) => setForm((s) => ({ ...s, needsAuth: e.target.checked }))}
          />
          Login/Auth
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.needsPayments}
            onChange={(e) => setForm((s) => ({ ...s, needsPayments: e.target.checked }))}
          />
          Payments
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.needsPushNotifications}
            onChange={(e) => setForm((s) => ({ ...s, needsPushNotifications: e.target.checked }))}
          />
          Push alerts
        </label>
      </div>
      <p className="-mt-1 text-xs text-slate-500">
        Select features you want included in the first app release.
      </p>

      <textarea
        value={form.notes}
        onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
        rows={5}
        placeholder="Share key flows and screens to convert (checkout, bookings, dashboard, etc.)"
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-ocean-500 focus:ring-2"
      />

      <button
        disabled={!canSubmit || isSubmitting}
        className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-5 text-sm font-bold text-white shadow-sm shadow-ocean-600/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Request conversion quote"}
      </button>

      {status ? (
        <p className={`text-sm ${status.ok ? "text-emerald-700" : "text-rose-700"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
