import { revalidatePath, revalidateTag } from "next/cache";

/** Bust ISR after JSON-backed marketing content saves from admin API routes. */
export function revalidateMarketingContent(
  kind: "team" | "insights" | "help-center" | "client-logos",
  slugPaths: string[] = [],
) {
  if (kind === "client-logos") {
    revalidateTag("client-logos");
    revalidatePath("/");
    return;
  }
  if (kind === "team") {
    revalidateTag("team");
    revalidatePath("/team");
    return;
  }
  if (kind === "insights") {
    revalidateTag("insights");
    revalidatePath("/insights");
    for (const slug of slugPaths) {
      const trimmed = slug.trim();
      if (trimmed) revalidatePath(`/insights/${trimmed}`);
    }
    return;
  }
  revalidateTag("help-center");
  revalidatePath("/help-center");
}
