import { NextResponse } from "next/server";
import { createClient } from "redis";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
type RateLimitRedisClient = ReturnType<typeof createClient>;
let redisClientPromise: Promise<RateLimitRedisClient | null> | null = null;

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

async function getRedisClient(): Promise<RateLimitRedisClient | null> {
  const redisUrl = process.env.REDIS_URL?.trim();
  if (!redisUrl) {
    return null;
  }

  if (!redisClientPromise) {
    redisClientPromise = (async () => {
      try {
        const client = createClient({ url: redisUrl });
        client.on("error", () => {
          /* silent fallback to memory limiter */
        });
        await client.connect();
        return client;
      } catch {
        return null;
      }
    })();
  }

  return redisClientPromise;
}

function tooManyRequestsResponse(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please wait a minute and try again." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    },
  );
}

async function rateLimitWithRedis(
  id: string,
  max: number,
  windowMs: number,
): Promise<NextResponse | null> {
  const client = await getRedisClient();
  if (!client) {
    return null;
  }

  try {
    const count = await client.incr(id);
    if (count === 1) {
      await client.pExpire(id, windowMs);
    }
    if (count > max) {
      const ttlMs = await client.pTTL(id);
      const retryAfterSeconds = Math.max(1, Math.ceil(Math.max(ttlMs, 1000) / 1000));
      return tooManyRequestsResponse(retryAfterSeconds);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Simple in-memory rate limit (per running Node process). For multi-instance
 * deploys, use Redis or an edge limiter for shared state.
 */
export async function rateLimitPublicApi(
  request: Request,
  routeKey: string,
): Promise<NextResponse | null> {
  const max = Number(process.env.PUBLIC_RATE_LIMIT_MAX ?? 30);
  const windowMs = Number(process.env.PUBLIC_RATE_LIMIT_WINDOW_MS ?? 60_000);
  if (!Number.isFinite(max) || max < 1 || !Number.isFinite(windowMs) || windowMs < 1) {
    return null;
  }

  const ip = getClientIp(request);
  const id = `${routeKey}:${ip}`;
  const now = Date.now();

  const redisLimited = await rateLimitWithRedis(id, max, windowMs);
  if (redisLimited) {
    return redisLimited;
  }

  let b = buckets.get(id);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(id, b);
  }
  b.count += 1;
  if (b.count > max) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((b.resetAt - now) / 1000),
    );
    return tooManyRequestsResponse(retryAfterSeconds);
  }
  return null;
}
