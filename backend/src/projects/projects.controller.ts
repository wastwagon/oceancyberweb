import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../admin/admin.guard";
import { CreateClientProjectDto } from "./dto/create-client-project.dto";
import { UpdateClientProjectStatusDto } from "./dto/update-client-project-status.dto";
import { ProjectsService } from "./projects.service";

type RequestWithUser = Request & {
  user: { id: string; email: string; role: string };
};

@Controller({ path: "projects", version: "1" })
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  listMyProjects(@Req() req: RequestWithUser) {
    return this.projects.listMyProjects(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":projectId/invoices/:invoiceId/pay/initialize")
  initializeInvoicePayment(
    @Req() req: RequestWithUser,
    @Param("projectId") projectId: string,
    @Param("invoiceId") invoiceId: string,
  ) {
    return this.projects.initializeInvoicePayment(
      req.user,
      projectId,
      invoiceId,
    );
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get("admin")
  listAdminProjects() {
    return this.projects.listAdminProjects();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post("admin/create")
  createProject(@Body() body: CreateClientProjectDto) {
    return this.projects.createClientProject(body);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch("admin/:projectId/status")
  updateProjectStatus(
    @Param("projectId") projectId: string,
    @Body() body: UpdateClientProjectStatusDto,
  ) {
    return this.projects.updateProjectStatus(projectId, body.status, body.note);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post("admin/:projectId/milestones/:milestoneId/unlock")
  unlockMilestone(
    @Param("projectId") projectId: string,
    @Param("milestoneId") milestoneId: string,
    @Body() body: { note?: string },
  ) {
    return this.projects.unlockMilestone(projectId, milestoneId, body?.note);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post("admin/:projectId/activity")
  addActivity(
    @Req() req: RequestWithUser,
    @Param("projectId") projectId: string,
    @Body() body: { note?: string; category?: string },
  ) {
    return this.projects.addProjectActivityWithCategory(projectId, {
      actorId: req.user.id,
      note: body?.note || "",
      category: body?.category || "general",
    });
  }
}
