import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";
import { decodeAccessJwt } from "@/lib/auth/verify-access-jwt";

/**
 * Lightweight session probe for UI (navbar, checkout shell). Does not return the JWT.
 */
export async function GET() {
  const token = cookies().get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const claims = await decodeAccessJwt(token);
    return NextResponse.json({ ok: true, isAdmin: claims.isAdmin === true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
