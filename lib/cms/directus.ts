/**
 * Directus REST helpers. Requires `NEXT_PUBLIC_CMS_URL` and optional `CMS_STATIC_TOKEN`
 * for authenticated requests (create a static token in Directus Admin → Settings → Access Tokens).
 */

import { getCmsPublicUrl, getCmsServerUrl } from "./config";

type DirectusResponse<T> = { data: T };

function baseUrl(): string {
  if (typeof window === "undefined") {
    return getCmsServerUrl() || getCmsPublicUrl();
  }
  return getCmsPublicUrl();
}

function authHeaders(): HeadersInit {
  const token = process.env.CMS_STATIC_TOKEN;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/** Fetch public items from a collection (respects Directus permissions). */
export async function fetchDirectusItems<T = Record<string, unknown>>(
  collection: string,
  query?: string,
): Promise<T[]> {
  const root = baseUrl();
  if (!root) {
    throw new Error("CMS URL not configured (NEXT_PUBLIC_CMS_URL)");
  }
  const q = query ? `?${query}` : "";
  const res = await fetch(`${root}/items/${collection}${q}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    ...(typeof window === "undefined" ? { next: { revalidate: 60 } } : {}),
  });
  if (!res.ok) {
    throw new Error(`Directus ${collection}: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as DirectusResponse<T[]>;
  return json.data ?? [];
}

/** Single item by id */
export async function fetchDirectusItem<T = Record<string, unknown>>(
  collection: string,
  id: string,
): Promise<T | null> {
  const root = baseUrl();
  if (!root) return null;
  const res = await fetch(`${root}/items/${collection}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    ...(typeof window === "undefined" ? { next: { revalidate: 60 } } : {}),
  });
  if (!res.ok) return null;
  const json = (await res.json()) as DirectusResponse<T>;
  return json.data ?? null;
}
