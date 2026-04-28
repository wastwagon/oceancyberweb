import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side cache bust after admin edits (Nest calls with REVALIDATE_SECRET).
 * Invalidates `unstable_cache` tags used by portfolio/testimonial loaders + page ISR.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation not configured (set REVALIDATE_SECRET)" }, { status: 503 });
  }

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  const headerSecret = req.headers.get("x-revalidate-secret")?.trim();
  if (bearer !== secret && headerSecret !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    tags?: unknown;
    paths?: unknown;
  };

  const tags =
    Array.isArray(body.tags) && body.tags.every((t) => typeof t === "string")
      ? (body.tags as string[])
      : ["portfolio", "testimonials"];

  const paths =
    Array.isArray(body.paths) && body.paths.every((p) => typeof p === "string")
      ? (body.paths as string[])
      : ["/", "/portfolio"];

  for (const t of tags) {
    revalidateTag(t);
  }
  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, tags, paths });
}
