import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME, ocAccessCookieBase } from "@/lib/auth/oc-session";
import { verifyAccessJwt } from "@/lib/auth/verify-access-jwt";

const PRIVATE_PREFIXES = ["/dashboard", "/admin"];

function signinRedirect(request: NextRequest, pathWithSearch: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.searchParams.set("next", pathWithSearch);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivate = PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
  const nextWithSearch = `${path}${request.nextUrl.search}`;

  if (isPrivate) {
    const token = request.cookies.get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
    if (!token) {
      return signinRedirect(request, nextWithSearch);
    }
    try {
      await verifyAccessJwt(token);
    } catch {
      const res = signinRedirect(request, nextWithSearch);
      const b = ocAccessCookieBase();
      res.cookies.set({
        name: OC_ACCESS_COOKIE_NAME,
        value: "",
        path: b.path,
        httpOnly: b.httpOnly,
        sameSite: b.sameSite,
        secure: b.secure,
        maxAge: 0,
      });
      return res;
    }
  }

  const res = NextResponse.next();

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (isPrivate) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
