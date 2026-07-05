import { NextResponse } from "next/server";
import { ocAccessCookieBase } from "@/lib/auth/oc-session";
import { nestInternalBaseUrl } from "@/lib/server/nest-internal-base";

type NestAuthSuccess = {
  access_token: string;
  user?: { id: string; email: string; role: string; isAdmin?: boolean };
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const upstream = await fetch(`${nestInternalBaseUrl()}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await upstream.json().catch(() => ({}))) as NestAuthSuccess & {
    message?: string;
    statusCode?: number;
  };

  if (!upstream.ok) {
    const msg = typeof data.message === "string" ? data.message : "Login failed";
    return NextResponse.json({ message: msg }, { status: upstream.status });
  }

  const token = typeof data.access_token === "string" ? data.access_token.trim() : "";
  if (!token) {
    return NextResponse.json({ message: "Missing access token from API" }, { status: 502 });
  }

  const base = ocAccessCookieBase();
  // Do not return JWT to JS — cookie + proxy carry auth.
  const res = NextResponse.json({
    user: data.user,
  });
  res.cookies.set({
    name: base.name,
    value: token,
    path: base.path,
    httpOnly: base.httpOnly,
    sameSite: base.sameSite,
    secure: base.secure,
    maxAge: base.maxAge,
  });
  return res;
}
