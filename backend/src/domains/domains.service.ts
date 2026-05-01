import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DomainsService {
  private readonly logger = new Logger(DomainsService.name);

  constructor(private readonly config: ConfigService) {}

  private getNamecheapConfig() {
    const apiUser = this.config.get<string>("NAMECHEAP_API_USER");
    const apiKey = this.config.get<string>("NAMECHEAP_API_KEY");
    const userName = this.config.get<string>("NAMECHEAP_USER_NAME") || apiUser;
    const clientIp = this.config.get<string>("NAMECHEAP_CLIENT_IP");
    const useSandbox = this.config.get<boolean>("NAMECHEAP_USE_SANDBOX") ?? true;

    if (!apiUser || !apiKey || !clientIp) return null;

    return { apiUser, apiKey, userName, clientIp, useSandbox };
  }

  private getBaseUrl(useSandbox: boolean) {
    return useSandbox
      ? "https://api.sandbox.namecheap.com/xml.response"
      : "https://api.namecheap.com/xml.response";
  }

  async checkDomains(domainList: string[]) {
    const cfg = this.getNamecheapConfig();
    if (!cfg) {
      return { ok: false, message: "Namecheap not configured" };
    }

    const params = new URLSearchParams({
      ApiUser: cfg.apiUser,
      ApiKey: cfg.apiKey,
      UserName: cfg.userName as string,
      ClientIp: cfg.clientIp,
      Command: "namecheap.domains.check",
      DomainList: domainList.join(","),
    });

    try {
      const res = await fetch(`${this.getBaseUrl(cfg.useSandbox)}?${params.toString()}`);
      const xml = await res.text();
      // Simple XML parsing for domain check results
      const results: any[] = [];
      const re = /<DomainCheckResult\b([^/>\n]+)\s*\/?>/gi;
      let m;
      while ((m = re.exec(xml)) !== null) {
        const attrs = m[1];
        const dm = /Domain="([^"]*)"/i.exec(attrs);
        const av = /Available="([^"]*)"/i.exec(attrs);
        if (dm?.[1] && av?.[1]) {
          results.push({
            domain: dm[1],
            available: av[1].toLowerCase() === "true",
          });
        }
      }
      return { ok: true, results };
    } catch (e) {
      this.logger.error("Namecheap check failed", e);
      return { ok: false, message: "Failed to check domains" };
    }
  }

  // Unified checkout logic
  async processCheckout(data: any) {
    this.logger.log(`Processing unified checkout for ${data.domainContact?.emailAddress || "unknown"}`);
    
    const results: any[] = [];
    const checkoutRef = "UC-" + Math.random().toString(36).slice(2, 9).toUpperCase();

    for (const item of data.items) {
      if (item.kind === "domain") {
        // Mock Namecheap registration
        results.push({
          kind: "domain",
          label: item.label,
          status: "success",
          orderId: "NC-D-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
          message: "Domain registered successfully via sandbox."
        });
      } else if (item.kind === "ssl") {
        results.push({
          kind: "ssl",
          label: item.label,
          status: "success",
          certificateId: "NC-S-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
          message: "SSL certificate provisioned."
        });
      } else {
        results.push({
          kind: item.kind,
          label: item.label,
          status: "success",
          message: "Service record created."
        });
      }
    }

    // In a real scenario, we'd save this to a 'Transaction' or 'Order' table
    this.logger.log(`Checkout ${checkoutRef} completed with ${results.length} items`);

    return { ok: true, checkoutRef, results };
  }
}
