import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response } from "express";
import {
  CreateSiteProjectDto,
  UpdateSiteProjectDto,
} from "./dto/site-project.dto";
import {
  CreateSiteTestimonialDto,
  UpdateSiteTestimonialDto,
} from "./dto/site-testimonial.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "./admin.guard";
import { AdminService } from "./admin.service";

@Controller({ path: "admin", version: "1" })
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get("summary")
  summary() {
    return this.admin.getSummary();
  }

  @Get("users")
  users(@Query("take") take?: string) {
    return this.admin.listUsers(take ? Number(take) : 40);
  }

  @Get("transactions")
  transactions(@Query("take") take?: string) {
    return this.admin.listRecentTransactions(take ? Number(take) : 50);
  }

  @Get("renewals/issues")
  renewalIssues(@Query("take") take?: string) {
    return this.admin.listRenewalIssues(take ? Number(take) : 50);
  }

  @Get("contacts")
  contacts(
    @Query("take") take?: string,
    @Query("status") status?: string,
    @Query("source") source?: string,
    @Query("q") q?: string,
    @Query("dateRange") dateRange?: string,
    @Query("sort") sort?: string,
  ) {
    return this.admin.listContacts({
      take: take ? Number(take) : 50,
      status,
      source,
      q,
      dateRange,
      sort,
    });
  }

  @Get("contacts/export.csv")
  async contactsCsv(
    @Res() res: Response,
    @Query("take") take?: string,
    @Query("status") status?: string,
    @Query("source") source?: string,
    @Query("q") q?: string,
    @Query("dateRange") dateRange?: string,
    @Query("sort") sort?: string,
  ) {
    const csv = await this.admin.exportContactsCsv({
      take: take ? Number(take) : 1000,
      status,
      source,
      q,
      dateRange,
      sort,
    });
    const ts = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="oceancyber-leads-${ts}.csv"`,
    );
    res.send(csv);
  }

  @Get("contacts/preset-counts")
  contactPresetCounts(
    @Query("status") status?: string,
    @Query("source") source?: string,
    @Query("q") q?: string,
    @Query("dateRange") dateRange?: string,
  ) {
    return this.admin.getContactPresetCounts({
      status,
      source,
      q,
      dateRange,
    });
  }

  @Get("help-center/feedback-summary")
  helpCenterFeedbackSummary(@Query("dateRange") dateRange?: string) {
    return this.admin.getHelpCenterFeedbackSummary({ dateRange });
  }

  @Patch("contacts/:id")
  updateContact(@Param("id") id: string, @Body() body: UpdateContactDto) {
    if (body.status == null && body.notes === undefined) {
      throw new BadRequestException("Provide at least one of: status, notes");
    }
    return this.admin.updateContact(id, {
      status: body.status,
      notes: body.notes,
    });
  }

  /** Portfolio case studies shown on /portfolio (Prisma `Project`). */
  @Get("site-projects")
  listSiteProjects() {
    return this.admin.listSiteProjects();
  }

  @Post("site-projects")
  createSiteProject(@Body() body: CreateSiteProjectDto) {
    return this.admin.createSiteProject(body);
  }

  @Patch("site-projects/:id")
  updateSiteProject(
    @Param("id") id: string,
    @Body() body: UpdateSiteProjectDto,
  ) {
    return this.admin.updateSiteProject(id, body);
  }

  @Delete("site-projects/:id")
  deleteSiteProject(@Param("id") id: string) {
    return this.admin.deleteSiteProject(id);
  }

  /** Homepage testimonial quotes (Prisma `Testimonial`, `featured` drives homepage block). */
  @Get("site-testimonials")
  listSiteTestimonials() {
    return this.admin.listSiteTestimonials();
  }

  @Post("site-testimonials")
  createSiteTestimonial(@Body() body: CreateSiteTestimonialDto) {
    return this.admin.createSiteTestimonial(body);
  }

  @Patch("site-testimonials/:id")
  updateSiteTestimonial(
    @Param("id") id: string,
    @Body() body: UpdateSiteTestimonialDto,
  ) {
    return this.admin.updateSiteTestimonial(id, body);
  }

  @Delete("site-testimonials/:id")
  deleteSiteTestimonial(@Param("id") id: string) {
    return this.admin.deleteSiteTestimonial(id);
  }
}
