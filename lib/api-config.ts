/**
 * Base URL for the NestJS API.
 * - Browser: `NEXT_PUBLIC_API_URL` (e.g. http://localhost:4100)
 * - Server (Docker): `API_INTERNAL_URL` (e.g. http://backend:4000) so SSR reaches the `backend` container
 */
export function getApiBaseUrl(): string {
  const raw =
    typeof window === "undefined"
      ? process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL;
  return (raw || "http://localhost:4100").replace(/\/$/, "");
}
