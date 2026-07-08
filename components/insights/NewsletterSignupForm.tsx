"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { publicApiFetch } from "@/lib/public-api";
import { trackLeadConversion } from "@/lib/analytics/conversions";

type NewsletterSignupFormProps = {
  page?: string;
  className?: string;
};

export function NewsletterSignupForm({
  page = "insights",
  className = "",
}: NewsletterSignupFormProps) {
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
          source: "newsletter_signup",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        alreadySubscribed?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      trackLeadConversion("newsletter_signup", page);
      setStatus("success");
      setMessage(
        data.alreadySubscribed
          ? "You are already on the list. We will be in touch when the next edition ships."
          : "You are on the list. Expect thoughtful notes — not spam.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <div className={className}>
      <form
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
        onSubmit={handleSubmit}
      >
        <label htmlFor="insights-email" className="sr-only">
          Email
        </label>
        <input
          id="insights-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          placeholder="you@company.com"
          autoComplete="email"
          className="min-h-[48px] flex-1 rounded-xl border border-sa-border bg-sa-bg/60 px-4 py-3 text-sm text-white placeholder:text-sa-muted/50 focus:border-sa-primary focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="sa-btn-primary min-h-[48px] shrink-0 disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Joining…
            </>
          ) : status === "success" ? (
            "Subscribed"
          ) : (
            "Notify me"
          )}
        </button>
      </form>
      <p
        className={`mt-4 text-center text-[10px] font-bold uppercase tracking-widest ${
          status === "error" ? "text-red-400" : status === "success" ? "text-sa-primary" : "text-sa-muted/40"
        }`}
        role={status === "error" ? "alert" : status === "success" ? "status" : undefined}
      >
        {message ?? "No spam. Unsubscribe anytime."}
      </p>
    </div>
  );
}
