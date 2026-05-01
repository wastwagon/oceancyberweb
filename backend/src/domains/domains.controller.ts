import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DomainsService } from "./domains.service";
import { CheckoutRequestDto, DomainCheckResult, CheckoutResult } from "./dto/checkout.dto";

@Controller("domains")
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Get("check")
  async check(@Query("domains") domains: string) {
    const list = domains
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    return this.domainsService.checkDomains(list);
  }

  @Post("check")
  async checkPost(@Body() body: { query: string }) {
    const list = body.query
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    const result = await this.domainsService.checkDomains(list);
    return { ...result, checked: result.results }; // align with frontend expectation
  }

  @Post("checkout")
  async checkout(@Body() data: CheckoutRequestDto) {
    return this.domainsService.processCheckout(data);
  }
}
