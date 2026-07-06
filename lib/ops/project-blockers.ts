export type ProjectActivityLike = {
  note?: string | null;
  metadata?: { category?: string };
  createdAt: string;
};

/** True when the latest unresolved blocker activity is still open. */
export function projectHasOpenBlocker(
  activities: ProjectActivityLike[] | undefined,
): boolean {
  if (!activities || activities.length === 0) return false;
  const sorted = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  for (const activity of sorted) {
    const note = (activity.note || "").toLowerCase();
    if (note.startsWith("blocker resolved:")) return false;
    const category = activity.metadata?.category || "general";
    if (category === "blocker") return true;
  }
  return false;
}
