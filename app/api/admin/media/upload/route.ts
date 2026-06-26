import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";
import { decodeAccessJwt } from "@/lib/auth/verify-access-jwt";
import {
  savePublicImage,
  sanitizeClientKey,
  sanitizeUploadFolder,
  setClientLogoOverride,
} from "@/lib/admin/media-upload-server";

export const runtime = "nodejs";

async function requireAdmin() {
  const token = cookies().get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
  if (!token) return null;
  try {
    const claims = await decodeAccessJwt(token);
    if (!claims.isAdmin) return null;
    return claims;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const folder = sanitizeUploadFolder(
      (formData.get("folder") as string | null) ?? "uploads",
    );
    const clientKey = (formData.get("clientKey") as string | null)?.trim();

    const url = await savePublicImage(file, folder);

    if (clientKey && folder === "clients") {
      await setClientLogoOverride(sanitizeClientKey(clientKey), url);
    }

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
