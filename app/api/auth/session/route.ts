import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";
import { verifyAccessJwt } from "@/lib/auth/verify-access-jwt";

/**
 * Lightweight session probe for UI (navbar, checkout shell). Does not return the JWT.
 */
export async function GET() {
  const token = cookies().get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    await verifyAccessJwt(token);
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
