/** HttpOnly JWT mirror on the Next.js origin — used by middleware and `/api/auth/*`. */

export const OC_ACCESS_COOKIE_NAME = "oc_access_token";

/** Align with Nest `JwtModule` (`expiresIn: "7d"`). */
export const OC_ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * `Secure` cookies are required for HTTPS deployments. For local HTTP (e.g. `http://localhost:3020`)
 * set `AUTH_COOKIE_INSECURE=true` when `NEXT_PUBLIC_SITE_URL` is https but the browser uses http, or rely
 * on `NEXT_PUBLIC_SITE_URL` starting with `http://` so Secure stays off.
 */
export function ocAccessCookieSecure(): boolean {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (process.env.AUTH_COOKIE_SECURE === "true") return true;
  if (process.env.AUTH_COOKIE_INSECURE === "true") return false;
  return site.startsWith("https://");
}

export function ocAccessCookieBase() {
  return {
    name: OC_ACCESS_COOKIE_NAME,
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: ocAccessCookieSecure(),
    maxAge: OC_ACCESS_COOKIE_MAX_AGE,
  };
}
