/**
 * Namecheap API — server-only configuration.
 * @see https://www.namecheap.com/support/api/intro/
 *
 * Never use NEXT_PUBLIC_* for credentials. Whitelist your server's public IPv4
 * in Namecheap → Profile → Tools → API Access (required for every call).
 */

export type NamecheapConfig = {
  apiUser: string;
  apiKey: string;
  userName: string;
  clientIp: string;
  useSandbox: boolean;
};

export function getNamecheapConfig(): NamecheapConfig | null {
  const apiUser = process.env.NAMECHEAP_API_USER?.trim();
  const apiKey = process.env.NAMECHEAP_API_KEY?.trim();
  const userName =
    process.env.NAMECHEAP_USERNAME?.trim() || apiUser || "";
  const clientIp = process.env.NAMECHEAP_CLIENT_IP?.trim();

  if (!apiUser || !apiKey || !clientIp) {
    return null;
  }

  const useSandbox =
    process.env.NAMECHEAP_USE_SANDBOX === "1" ||
    process.env.NAMECHEAP_USE_SANDBOX === "true";

  return {
    apiUser,
    apiKey,
    userName,
    clientIp,
    useSandbox,
  };
}

export function namecheapBaseUrl(useSandbox: boolean): string {
  return useSandbox
    ? "https://api.sandbox.namecheap.com/xml.response"
    : "https://api.namecheap.com/xml.response";
}
