import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Simple in-memory rate limit (per running Node process). For multi-instance
 * deploys, use Redis or an edge limiter for shared state.
 */
export function rateLimitPublicApi(
  request: Request,
  routeKey: string,
): NextResponse | null {
  const max = Number(process.env.PUBLIC_RATE_LIMIT_MAX ?? 30);
  const windowMs = Number(process.env.PUBLIC_RATE_LIMIT_WINDOW_MS ?? 60_000);
  if (!Number.isFinite(max) || max < 1 || !Number.isFinite(windowMs) || windowMs < 1) {
    return null;
  }

  const ip = getClientIp(request);
  const id = `${routeKey}:${ip}`;
  const now = Date.now();
  let b = buckets.get(id);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(id, b);
  }
  b.count += 1;
  if (b.count > max) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }
  return null;
}
