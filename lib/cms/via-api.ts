/**
 * Read CMS content through the Nest BFF (`/api/v1/cms/...`) so the browser never
 * needs a Directus static token. Requires Directus running and `CMS_BASE_URL` on the API.
 */
import { getApiBaseUrl } from "../api-config";

export async function fetchCmsItemsViaApi(
  collection: string,
  query?: string,
): Promise<unknown> {
  const api = getApiBaseUrl();
  const q = query
    ? query.startsWith("?")
      ? query
      : `?${query}`
    : "";
  const res = await fetch(`${api}/api/v1/cms/items/${collection}${q}`, {
    ...(typeof window === "undefined" ? { next: { revalidate: 60 } } : {}),
  });
  if (!res.ok) {
    throw new Error(`CMS proxy ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchCmsItemViaApi(
  collection: string,
  id: string,
): Promise<unknown> {
  const api = getApiBaseUrl();
  const res = await fetch(`${api}/api/v1/cms/items/${collection}/${id}`, {
    ...(typeof window === "undefined" ? { next: { revalidate: 60 } } : {}),
  });
  if (!res.ok) {
    throw new Error(`CMS proxy ${res.status}: ${res.statusText}`);
  }
  return res.json();
}
