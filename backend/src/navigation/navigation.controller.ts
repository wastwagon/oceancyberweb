import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { NavigationService } from "./navigation.service";
import { AdminGuard } from "../admin/admin.guard";

@Controller("navigation")
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  async getConfig() {
    return this.navigationService.getConfig();
  }

  @UseGuards(AdminGuard)
  @Get("admin")
  async getAdminConfig() {
    return this.navigationService.getAdminConfig();
  }

  @UseGuards(AdminGuard)
  @Put("admin")
  async updateAdminConfig(@Body() body: any) {
    return this.navigationService.updateAdminConfig(body);
  }
}
