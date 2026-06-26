import { clientLogos } from "@/lib/startup-agency/content";

export type ClientLogoEntry = (typeof clientLogos)[number] & {
  clientKey: string;
  logoUrl: string;
};

/** Stable key for uploads / overrides (matches SVG filenames). */
export function clientLogoKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildClientLogoEntries(
  overrides: Record<string, string> = {},
): ClientLogoEntry[] {
  return clientLogos.map((client) => {
    const clientKey = clientLogoKey(client.name);
    return {
      ...client,
      clientKey,
      logoUrl: overrides[clientKey] ?? client.logo,
    };
  });
}

export const CLIENT_LOGO_KEYS = clientLogos.map((c) => ({
  name: c.name,
  key: clientLogoKey(c.name),
}));
