import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyPaystackWebhookSignature } from "./paystack";

describe("verifyPaystackWebhookSignature", () => {
  const secret = "sk_test_paystack_secret";
  const body = Buffer.from(JSON.stringify({ event: "charge.success" }), "utf8");

  function sign(payload: Buffer): string {
    return createHmac("sha512", secret).update(payload).digest("hex");
  }

  it("accepts a valid signature", () => {
    expect(verifyPaystackWebhookSignature(body, sign(body), secret)).toBe(true);
  });

  it("rejects a tampered payload", () => {
    const sig = sign(body);
    const tampered = Buffer.from(body.toString() + "x", "utf8");
    expect(verifyPaystackWebhookSignature(tampered, sig, secret)).toBe(false);
  });

  it("rejects missing signature", () => {
    expect(verifyPaystackWebhookSignature(body, undefined, secret)).toBe(false);
  });

  it("rejects wrong secret", () => {
    expect(verifyPaystackWebhookSignature(body, sign(body), "other-secret")).toBe(
      false,
    );
  });
});
