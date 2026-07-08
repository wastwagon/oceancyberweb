/** Calendly scheduling URL — set in Coolify / `.env` as `NEXT_PUBLIC_CALENDLY_URL`. */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim().replace(/\/$/, "") || "";

export function isCalendlyConfigured(): boolean {
  return CALENDLY_URL.startsWith("https://calendly.com/");
}
