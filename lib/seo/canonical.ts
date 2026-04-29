import type { Metadata } from "next";

/** Shallow merge of base metadata with a canonical path (overrides `alternates.canonical` if present). */
export function withCanonical(
  base: Metadata,
  path: string,
): Metadata {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return {
    ...base,
    alternates: {
      ...base.alternates,
      canonical: pathname,
    },
  };
}

/** Login, checkout, and similar surfaces — canonical for consistency; do not index in search. */
export function privateSurfaceMetadata(path: string): Metadata {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return {
    alternates: { canonical: pathname },
    robots: { index: false, follow: false },
  };
}

/** Parent layout for authenticated app areas — noindex entire subtree without forcing one canonical for all child URLs. */
export function appShellNoIndexMetadata(): Metadata {
  return {
    robots: { index: false, follow: false },
  };
}
