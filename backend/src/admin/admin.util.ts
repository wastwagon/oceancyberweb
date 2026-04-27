export function isAdminForUser(
  u: { email: string; role?: string | null } | null | undefined,
  adminEmailsCsv: string,
): boolean {
  if (!u?.email) return false;
  if (u.role === "admin") return true;
  const set = new Set(
    (adminEmailsCsv || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
  return set.has(String(u.email).toLowerCase());
}
