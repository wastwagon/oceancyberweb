"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";
import { isCalendlyConfigured } from "@/lib/booking/calendly";

type PostSubmitBookingProps = {
  title?: string;
  description?: string;
  /** URL-encoded prefill for Calendly, e.g. name=Jane&email=jane@co.com */
  prefill?: string;
};

export function PostSubmitBooking({
  title = "Book your discovery call",
  description = "Pick a time that works for you. We will confirm agenda and attendees by email.",
  prefill,
}: PostSubmitBookingProps) {
  if (!isCalendlyConfigured()) {
    return (
      <div className="mt-6 rounded-xl border border-sa-border bg-sa-surface/60 p-5">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-sa-primary" aria-hidden />
          <div>
            <p className="font-heading text-sm font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-sa-muted/80">
              We will reach out shortly to confirm a meeting slot. Prefer WhatsApp?{" "}
              <a
                href="https://wa.me/233242565695"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sa-primary underline-offset-2 hover:underline"
              >
                Message us
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex text-sm font-semibold text-sa-primary underline-offset-2 hover:underline"
            >
              Contact page →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div>
        <p className="font-heading text-sm font-bold text-white">{title}</p>
        <p className="mt-1 text-sm text-sa-muted/80">{description}</p>
      </div>
      <CalendlyEmbed prefill={prefill} minHeight={620} />
    </div>
  );
}
