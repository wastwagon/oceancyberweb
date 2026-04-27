/**
 * Paystack (GHS) — use when you wire transactions (initialize, webhooks).
 * Set keys in .env; never expose the secret to the client.
 */
export function getPaystackPublicKey(): string | undefined {
  return process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY?.trim() || undefined;
}

export function isPaystackConfiguredForClient(): boolean {
  return Boolean(getPaystackPublicKey());
}
