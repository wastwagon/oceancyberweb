import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CheckoutRequestDto, DomainCheckResult, CheckoutResult, DomainContactDto } from "./dto/checkout.dto";

@Injectable()
export class DomainsService {
  private readonly logger = new Logger(DomainsService.name);

  constructor(private readonly config: ConfigService) {}

  private getNamecheapConfig() {
    const apiUser = this.config.get<string>("NAMECHEAP_API_USER");
    const apiKey = this.config.get<string>("NAMECHEAP_API_KEY");
    const userName = this.config.get<string>("NAMECHEAP_USER_NAME") || apiUser;
    const clientIp = this.config.get<string>("NAMECHEAP_CLIENT_IP");
    const useSandbox =
      this.config.get<boolean>("NAMECHEAP_USE_SANDBOX") ?? true;

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
      const res = await fetch(
        `${this.getBaseUrl(cfg.useSandbox)}?${params.toString()}`,
      );
      const xml = await res.text();
      // Simple XML parsing for domain check results
      const results: DomainCheckResult[] = [];
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
  async processCheckout(data: CheckoutRequestDto) {
    this.logger.log(
      `Processing unified checkout for ${data.domainContact?.emailAddress || "unknown"}`,
    );

    const cfg = this.getNamecheapConfig();
    const results: CheckoutResult[] = [];
    const checkoutRef =
      "UC-" + Math.random().toString(36).slice(2, 9).toUpperCase();

    for (const item of data.items) {
      if (item.kind === "domain") {
        if (cfg && data.domainContact) {
          const res = await this.registerDomain(item.label, data.domainContact, cfg);
          results.push({
            kind: "domain",
            label: item.label,
            status: res.ok ? "success" : "failed",
            orderId: res.orderId,
            message: res.message || (res.ok ? "Domain registered successfully." : "Registration failed."),
          });
        } else {
          // Fallback to mock if not configured
          results.push({
            kind: "domain",
            label: item.label,
            status: "success",
            orderId: "MOCK-D-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
            message: "Domain registered successfully (MOCK).",
          });
        }
      } else if (item.kind === "ssl") {
        if (cfg) {
          const res = await this.createSsl(item.label, cfg);
          results.push({
            kind: "ssl",
            label: item.label,
            status: res.ok ? "success" : "failed",
            certificateId: res.certificateId,
            message: res.message || (res.ok ? "SSL provisioned." : "SSL provisioning failed."),
          });
        } else {
          results.push({
            kind: "ssl",
            label: item.label,
            status: "success",
            certificateId: "MOCK-S-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
            message: "SSL certificate provisioned (MOCK).",
          });
        }
      } else {
        results.push({
          kind: item.kind,
          label: item.label,
          status: "success",
          message: "Service record created.",
        });
      }
    }

    this.logger.log(
      `Checkout ${checkoutRef} completed with ${results.length} items`,
    );

    return { ok: true, checkoutRef, results };
  }

  private async registerDomain(domain: string, contact: DomainContactDto, cfg: any) {
    const params = new URLSearchParams({
      ApiUser: cfg.apiUser,
      ApiKey: cfg.apiKey,
      UserName: cfg.userName,
      ClientIp: cfg.clientIp,
      Command: "namecheap.domains.create",
      DomainName: domain,
      Years: "1",
    });

    // Add contact details for all 4 roles
    const roles = ["Registrant", "Admin", "Tech", "AuxBilling"];
    for (const role of roles) {
      params.append(`${role}FirstName`, contact.firstName);
      params.append(`${role}LastName`, contact.lastName);
      params.append(`${role}Address1`, contact.address1);
      params.append(`${role}City`, contact.city);
      params.append(`${role}StateProvince`, contact.stateProvince);
      params.append(`${role}PostalCode`, contact.postalCode);
      params.append(`${role}Country`, contact.country);
      params.append(`${role}Phone`, contact.phone);
      params.append(`${role}EmailAddress`, contact.emailAddress);
      if (contact.organizationName) {
        params.append(`${role}OrganizationName`, contact.organizationName);
      }
    }

    try {
      const res = await fetch(`${this.getBaseUrl(cfg.useSandbox)}?${params.toString()}`);
      const xml = await res.text();
      
      const successMatch = /IsSuccess="true"/i.test(xml);
      if (successMatch) {
        const orderIdMatch = /OrderID="([^"]*)"/i.exec(xml);
        return { ok: true, orderId: orderIdMatch?.[1] };
      } else {
        const errorMatch = /<Error\b[^>]*>([^<]*)<\/Error>/i.exec(xml);
        return { ok: false, message: errorMatch?.[1] || "Namecheap API error" };
      }
    } catch (e) {
      this.logger.error(`Registration failed for ${domain}`, e);
      return { ok: false, message: "Network error during registration" };
    }
  }

  private async createSsl(domain: string, cfg: any) {
    // Basic PositiveSSL creation
    const params = new URLSearchParams({
      ApiUser: cfg.apiUser,
      ApiKey: cfg.apiKey,
      UserName: cfg.userName,
      ClientIp: cfg.clientIp,
      Command: "namecheap.ssl.create",
      Type: "PositiveSSL",
      Years: "1",
    });

    try {
      const res = await fetch(`${this.getBaseUrl(cfg.useSandbox)}?${params.toString()}`);
      const xml = await res.text();
      
      const successMatch = /IsSuccess="true"/i.test(xml);
      if (successMatch) {
        const certIdMatch = /CertificateID="([^"]*)"/i.exec(xml);
        return { ok: true, certificateId: certIdMatch?.[1] };
      } else {
        const errorMatch = /<Error\b[^>]*>([^<]*)<\/Error>/i.exec(xml);
        return { ok: false, message: errorMatch?.[1] || "Namecheap API error" };
      }
    } catch (e) {
      this.logger.error(`SSL creation failed for ${domain}`, e);
      return { ok: false, message: "Network error during SSL creation" };
    }
  }
}
