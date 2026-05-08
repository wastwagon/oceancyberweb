import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { OC_ACCESS_COOKIE_NAME } from "@/lib/auth/oc-session";
import { verifyAccessJwt } from "@/lib/auth/verify-access-jwt";
import { nestInternalBaseUrl } from "@/lib/server/nest-internal-base";

function upstreamUrl(request: NextRequest, slug: string[]) {
  const qs = request.nextUrl.searchParams.toString();
  return `${nestInternalBaseUrl()}/api/${slug.join("/")}${qs ? `?${qs}` : ""}`;
}

async function proxy(request: NextRequest, slug: string[] | undefined) {
  const segments = slug?.length ? slug : [];
  if (segments[0] !== "v1") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const token = cookies().get(OC_ACCESS_COOKIE_NAME)?.value?.trim();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyAccessJwt(token);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const method = request.method;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    headers["X-Forwarded-For"] = xff;
  }

  let body: ArrayBuffer | undefined;
  if (method !== "GET" && method !== "HEAD") {
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    const buf = await request.arrayBuffer();
    if (buf.byteLength > 0) {
      body = buf;
    }
  }

  const upstream = await fetch(upstreamUrl(request, segments), {
    method,
    headers,
    body: body && method !== "GET" && method !== "HEAD" ? body : undefined,
  });

  const out = new NextResponse(await upstream.arrayBuffer(), { status: upstream.status });
  const ct = upstream.headers.get("content-type");
  if (ct) {
    out.headers.set("Content-Type", ct);
  }
  const cd = upstream.headers.get("content-disposition");
  if (cd) {
    out.headers.set("Content-Disposition", cd);
  }
  return out;
}

export async function GET(request: NextRequest, ctx: { params: { slug: string[] } }) {
  return proxy(request, ctx.params.slug);
}

export async function POST(request: NextRequest, ctx: { params: { slug: string[] } }) {
  return proxy(request, ctx.params.slug);
}

export async function PUT(request: NextRequest, ctx: { params: { slug: string[] } }) {
  return proxy(request, ctx.params.slug);
}

export async function PATCH(request: NextRequest, ctx: { params: { slug: string[] } }) {
  return proxy(request, ctx.params.slug);
}

export async function DELETE(request: NextRequest, ctx: { params: { slug: string[] } }) {
  return proxy(request, ctx.params.slug);
}
