import { getNamecheapConfig, namecheapBaseUrl } from "./config";

export type DomainCheckRow = {
  domain: string;
  available: boolean;
};

export type NamecheapAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  phone: string;
  emailAddress: string;
  organizationName?: string;
};

export type DomainCreateInput = {
  domainName: string;
  years: number;
  registrant: NamecheapAddress;
  tech?: NamecheapAddress;
  admin?: NamecheapAddress;
  auxBilling?: NamecheapAddress;
  nameservers?: string[];
  addFreeWhoisguard?: boolean;
  wgEnabled?: boolean;
};

export type DomainCreateResult = {
  domain: string;
  registered: boolean;
  chargedAmount?: string;
  orderId?: string;
  transactionId?: string;
};

export type SslCreateInput = {
  years: 1 | 2 | 3 | 4 | 5;
  type: string;
  sansToAdd?: number;
  promotionCode?: string;
};

export type SslCreateResult = {
  isSuccess: boolean;
  sslType: string;
  years: number;
  certificateId?: string;
  orderId?: string;
  transactionId?: string;
  chargedAmount?: string;
  status?: string;
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

function extractAttr(xml: string, tag: string, attr: string): string | undefined {
  const re = new RegExp(`<${tag}\\b[^>]*\\s${attr}="([^"]*)"`, "i");
  const m = re.exec(xml);
  return m?.[1];
}

function normalizeNamecheapPhone(phone: string): string {
  const raw = phone.trim();
  if (!raw) return raw;

  if (raw.startsWith("+") && raw.includes(".")) {
    return raw;
  }

  const compact = raw.replace(/[^\d+]/g, "");
  if (!compact.startsWith("+")) {
    return raw;
  }

  const digits = compact.slice(1);
  if (digits.length < 7) {
    return raw;
  }

  // Namecheap expects +<country code>.<number>; default split uses 1-3 digit country codes.
  const ccLength = digits.length > 11 ? 3 : digits.length > 10 ? 2 : 1;
  const countryCode = digits.slice(0, ccLength);
  const localNumber = digits.slice(ccLength);
  if (!localNumber) {
    return raw;
  }

  return `+${countryCode}.${localNumber}`;
}

function addContactParams(prefix: string, contact: NamecheapAddress): URLSearchParams {
  const p = new URLSearchParams();
  p.set(`${prefix}FirstName`, contact.firstName);
  p.set(`${prefix}LastName`, contact.lastName);
  p.set(`${prefix}Address1`, contact.address1);
  p.set(`${prefix}City`, contact.city);
  p.set(`${prefix}StateProvince`, contact.stateProvince);
  p.set(`${prefix}PostalCode`, contact.postalCode);
  p.set(`${prefix}Country`, contact.country);
  p.set(`${prefix}Phone`, normalizeNamecheapPhone(contact.phone));
  p.set(`${prefix}EmailAddress`, contact.emailAddress);
  p.set(`${prefix}OrganizationName`, contact.organizationName || "");
  return p;
}

async function callNamecheap(
  command: string,
  extra: URLSearchParams,
): Promise<{ ok: true; xml: string } | { ok: false; message: string }> {
  const cfg = getNamecheapConfig();
  if (!cfg) {
    return {
      ok: false,
      message:
        "Namecheap is not configured. Set NAMECHEAP_API_USER, NAMECHEAP_API_KEY, and NAMECHEAP_CLIENT_IP.",
    };
  }

  const params = new URLSearchParams({
    ApiUser: cfg.apiUser,
    ApiKey: cfg.apiKey,
    UserName: cfg.userName,
    ClientIp: cfg.clientIp,
    Command: command,
  });
  extra.forEach((v, k) => params.set(k, v));

  const url = `${namecheapBaseUrl(cfg.useSandbox)}?${params.toString()}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/xml,text/xml" },
      next: { revalidate: 0 },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Network error";
    return { ok: false, message: `Namecheap request failed: ${msg}` };
  }

  const xml = await res.text();
  const status = parseApiStatus(xml);
  if (!status.ok) {
    const detail = status.errors.length ? status.errors.join(" — ") : xml.slice(0, 500);
    return { ok: false, message: detail || "Namecheap returned an error." };
  }
  return { ok: true, xml };
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

export async function namecheapDomainsCreate(
  input: DomainCreateInput,
): Promise<{ ok: true; result: DomainCreateResult } | { ok: false; message: string }> {
  const contacts = {
    registrant: input.registrant,
    tech: input.tech || input.registrant,
    admin: input.admin || input.registrant,
    auxBilling: input.auxBilling || input.registrant,
  };

  const extra = new URLSearchParams({
    DomainName: input.domainName.trim().toLowerCase(),
    Years: String(input.years),
    AddFreeWhoisguard: input.addFreeWhoisguard ? "yes" : "no",
    WGEnabled: input.wgEnabled ? "yes" : "no",
  });

  if (input.nameservers?.length) {
    extra.set("Nameservers", input.nameservers.join(","));
  }

  addContactParams("Registrant", contacts.registrant).forEach((v, k) =>
    extra.set(k, v),
  );
  addContactParams("Tech", contacts.tech).forEach((v, k) => extra.set(k, v));
  addContactParams("Admin", contacts.admin).forEach((v, k) => extra.set(k, v));
  addContactParams("AuxBilling", contacts.auxBilling).forEach((v, k) =>
    extra.set(k, v),
  );

  const response = await callNamecheap("namecheap.domains.create", extra);
  if (!response.ok) return response;

  return {
    ok: true,
    result: {
      domain: extractAttr(response.xml, "DomainCreateResult", "Domain") || input.domainName,
      registered:
        (extractAttr(response.xml, "DomainCreateResult", "Registered") || "").toLowerCase() ===
        "true",
      chargedAmount: extractAttr(response.xml, "DomainCreateResult", "ChargedAmount"),
      orderId: extractAttr(response.xml, "DomainCreateResult", "OrderID"),
      transactionId: extractAttr(response.xml, "DomainCreateResult", "TransactionID"),
    },
  };
}

export async function namecheapSslCreate(
  input: SslCreateInput,
): Promise<{ ok: true; result: SslCreateResult } | { ok: false; message: string }> {
  const extra = new URLSearchParams({
    Years: String(input.years),
    Type: input.type,
  });
  if (typeof input.sansToAdd === "number") {
    extra.set("SANStoAdd", String(input.sansToAdd));
  }
  if (input.promotionCode) {
    extra.set("PromotionCode", input.promotionCode);
  }

  const response = await callNamecheap("namecheap.ssl.create", extra);
  if (!response.ok) return response;

  const years = Number(extractAttr(response.xml, "SSLCreateResult", "Years") || input.years);

  return {
    ok: true,
    result: {
      isSuccess:
        (extractAttr(response.xml, "SSLCreateResult", "IsSuccess") || "").toLowerCase() ===
        "true",
      sslType: extractAttr(response.xml, "SSLCreateResult", "SSLType") || input.type,
      years: Number.isFinite(years) ? years : input.years,
      certificateId: extractAttr(response.xml, "SSLCreateResult", "CertificateID"),
      orderId: extractAttr(response.xml, "SSLCreateResult", "OrderID"),
      transactionId: extractAttr(response.xml, "SSLCreateResult", "TransactionID"),
      chargedAmount: extractAttr(response.xml, "SSLCreateResult", "ChargedAmount"),
      status: extractAttr(response.xml, "SSLCreateResult", "Status"),
    },
  };
}
