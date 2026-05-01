import { Controller, Get } from "@nestjs/common";
import { FxService } from "./fx.service";

@Controller("fx")
export class FxController {
  constructor(private readonly fxService: FxService) {}

  @Get("rates")
  async getRates() {
    return this.fxService.getRates();
  }
}
