import { createHmac, timingSafeEqual } from "crypto";

/** Verifies Paystack `x-paystack-signature` (HMAC SHA-512 hex). */
export function verifyPaystackWebhookSignature(
  rawBody: Buffer,
  signature: string | undefined,
  secret: string,
): boolean {
  if (!signature?.trim() || !secret.trim()) return false;
  const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature.trim(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
