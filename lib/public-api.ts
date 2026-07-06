import { getApiBaseUrl } from "@/lib/api-config";

/**
 * Resolves a Nest public API path to a full URL.
 * Accepts either `/api/v1/contact` or shorthand `contact` / `/contact`.
 */
export function publicApiUrl(path: string): string {
  const trimmed = path.trim();
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (normalized.startsWith("/api/v1/")) {
    return `${getApiBaseUrl()}${normalized}`;
  }
  const resource = normalized.replace(/^\//, "");
  return `${getApiBaseUrl()}/api/v1/${resource}`;
}

/** POST/GET helper for unauthenticated Nest endpoints. */
export function publicApiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(publicApiUrl(path), init);
}
