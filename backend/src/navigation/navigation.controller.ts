import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { NavigationService } from "./navigation.service";
import { AdminGuard } from "../admin/admin.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateNavigationDto } from "./dto/update-navigation.dto";

@Controller("navigation")
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  async getConfig() {
    return this.navigationService.getConfig();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get("admin")
  async getAdminConfig() {
    return this.navigationService.getAdminConfig();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put("admin")
  async updateAdminConfig(@Body() body: UpdateNavigationDto) {
    return this.navigationService.updateAdminConfig(body);
  }
}
