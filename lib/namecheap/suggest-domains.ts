const DEFAULT_TLDS = [
  "com",
  "net",
  "org",
  "io",
  "co",
  "dev",
  "app",
  "tech",
  "online",
  "site",
] as const;

/** Allowlist SLD: letters, numbers, hyphen; max 63 per label. */
export function normalizeSearchInput(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;

  let s = trimmed.replace(/^https?:\/\//, "");
  s = s.split("/")[0] ?? s;
  s = s.split(":")[0] ?? s;

  if (s.includes(".")) {
    const labels = s.split(".").filter(Boolean);
    if (labels.length < 2) return null;
    const full = labels.join(".");
    if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(full)) {
      return null;
    }
    return full;
  }

  const slug = s.replace(/[^a-z0-9-]/g, "");
  if (slug.length < 1 || slug.length > 63) return null;
  return slug;
}

/**
 * If input is a bare keyword, returns candidate FQDNs with popular TLDs.
 * If input already looks like a domain, returns that single FQDN.
 */
export function expandDomainCandidates(
  normalized: string,
  tlds: readonly string[] = DEFAULT_TLDS,
): string[] {
  if (normalized.includes(".")) {
    return [normalized];
  }
  return tlds.map((tld) => `${normalized}.${tld}`);
}
