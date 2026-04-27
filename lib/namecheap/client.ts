import { getNamecheapConfig, namecheapBaseUrl } from "./config";

export type DomainCheckRow = {
  domain: string;
  available: boolean;
};

function parseDomainCheckResults(xml: string): DomainCheckRow[] {
  const out: DomainCheckRow[] = [];
  const re = /<DomainCheckResult\b([^/>\n]+)\s*\/?>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const attrs = m[1];
    const dm = /Domain="([^"]*)"/i.exec(attrs);
    const av = /Available="([^"]*)"/i.exec(attrs);
    if (dm?.[1] && av?.[1]) {
      out.push({
        domain: dm[1],
        available: av[1].toLowerCase() === "true",
      });
    }
  }
  return out;
}

function parseApiStatus(xml: string): { ok: boolean; errors: string[] } {
  const statusMatch = /Status="([^"]*)"/i.exec(xml);
  const status = statusMatch?.[1]?.toUpperCase() ?? "";
  const errors: string[] = [];
  const errRe = /<Error[^>]*>([^<]*)<\/Error>/gi;
  let em: RegExpExecArray | null;
  while ((em = errRe.exec(xml)) !== null) {
    errors.push(em[1].trim());
  }
  return { ok: status === "OK", errors };
}

export async function namecheapDomainsCheck(
  domainList: string[],
): Promise<{ ok: true; results: DomainCheckRow[] } | { ok: false; message: string }> {
  const cfg = getNamecheapConfig();
  if (!cfg) {
    return {
      ok: false,
      message:
        "Namecheap is not configured. Set NAMECHEAP_API_USER, NAMECHEAP_API_KEY, and NAMECHEAP_CLIENT_IP on the server.",
    };
  }

  const list = domainList.map((d) => d.trim().toLowerCase()).filter(Boolean);
  if (list.length === 0) {
    return { ok: false, message: "No domains to check." };
  }
  if (list.length > 50) {
    return { ok: false, message: "Maximum 50 domains per request." };
  }

  const params = new URLSearchParams({
    ApiUser: cfg.apiUser,
    ApiKey: cfg.apiKey,
    UserName: cfg.userName,
    ClientIp: cfg.clientIp,
    Command: "namecheap.domains.check",
    DomainList: list.join(","),
  });

  const url = `${namecheapBaseUrl(cfg.useSandbox)}?${params.toString()}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/xml,text/xml" },
      next: { revalidate: 0 },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Network error";
    return { ok: false, message: `Namecheap request failed: ${msg}` };
  }

  const xml = await res.text();
  const { ok, errors } = parseApiStatus(xml);

  if (!ok) {
    const detail = errors.length ? errors.join(" — ") : xml.slice(0, 400);
    return {
      ok: false,
      message: detail || "Namecheap returned an error.",
    };
  }

  const results = parseDomainCheckResults(xml);
  if (results.length === 0) {
    return {
      ok: false,
      message: "Unexpected response from Namecheap (no domain rows).",
    };
  }

  return { ok: true, results };
}
