/**
 * Headless CMS (Directus) - URLs for server and browser.
 * Set in `.env` / Docker Compose when using `docker compose --profile cms up`.
 */
export function getCmsPublicUrl(): string {
  return (process.env.NEXT_PUBLIC_CMS_URL || "").replace(/\/$/, "");
}

export function getCmsServerUrl(): string {
  return (
    process.env.CMS_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_CMS_URL ||
    ""
  ).replace(/\/$/, "");
}

export function isCmsConfigured(): boolean {
  return Boolean(getCmsPublicUrl());
}
