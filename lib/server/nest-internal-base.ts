/** Server-only base URL for calling Nest from Next route handlers / RSC. */
export function nestInternalBaseUrl(): string {
  const raw =
    process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4100";
  return raw.replace(/\/$/, "");
}
