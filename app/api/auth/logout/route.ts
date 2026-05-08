import { NextResponse } from "next/server";
import { ocAccessCookieBase, OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";

export async function POST() {
  const base = ocAccessCookieBase();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: OC_ACCESS_COOKIE_NAME,
    value: "",
    path: base.path,
    httpOnly: base.httpOnly,
    sameSite: base.sameSite,
    secure: base.secure,
    maxAge: 0,
  });
  return res;
}
