/** External OceanCyber POS SaaS app (separate project — not this marketing repo). */
export const POS_APP_URL =
  process.env.NEXT_PUBLIC_POS_APP_URL?.trim().replace(/\/$/, "") ||
  "https://app.pos.oceancyber.net";

export function posSignupUrl(options?: {
  plan?: "starter" | "growth" | "multibranch";
  utmSource?: string;
  utmCampaign?: string;
}): string {
  const url = new URL("/signup", POS_APP_URL);
  if (options?.plan) url.searchParams.set("plan", options.plan);
  url.searchParams.set("utm_source", options?.utmSource ?? "oceancyber_website");
  if (options?.utmCampaign) url.searchParams.set("utm_campaign", options.utmCampaign);
  return url.toString();
}

export function posSigninUrl(): string {
  return `${POS_APP_URL}/signin`;
}
