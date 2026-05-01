import { Injectable, Logger } from "@nestjs/common";
import { ContactSource } from "@oceancyber/shared";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { CreateIntakeDto } from "./dto/create-intake.dto";
import { CreateProposalRequestDto } from "./dto/create-proposal-request.dto";
import { CreateWebsiteToAppQuoteDto } from "./dto/create-website-to-app-quote.dto";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { MailService } from "../mail/mail.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateContactDto) {
    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        message: dto.message,
        source: dto.source || ContactSource.WEB_CONTACT_FORM,
      },
    });

    this.logger.log(`New contact submission from ${dto.email}`);

    // Send notification email to admin if configured
    const adminEmail = this.config.get<string>("CONTACT_NOTIFICATION_EMAIL");
    if (adminEmail && this.mail.isEnabled()) {
      await this.mail.send(
        adminEmail,
        `New Contact Form: ${dto.name}`,
        `Name: ${dto.name}\nEmail: ${dto.email}\nPhone: ${dto.phone || "N/A"}\nSource: ${dto.source || "N/A"}\n\nMessage:\n${dto.message}`,
      );
    }

    return { ok: true };
  }

  async createIntake(dto: CreateIntakeDto) {
    const metadata = {
      v: 1,
      company: dto.company || null,
      serviceNeeds: dto.serviceNeeds,
      goals: dto.goals,
      budgetBand: dto.budgetBand,
      timelineBand: dto.timelineBand,
      hasExistingSite: dto.hasExistingSite,
      contactMethod: dto.contactMethod,
      meetingType: dto.meetingType,
      preferredDate: dto.preferredDate || null,
    };

    const message =
      `Interactive intake request\n\n` +
      `Name: ${dto.name}\n` +
      `Email: ${dto.email}\n` +
      `Phone: ${dto.phone || "-"}\n` +
      `Company: ${dto.company || "-"}\n` +
      `Service needs: ${dto.serviceNeeds.join(", ")}\n` +
      `Budget: ${dto.budgetBand}\n` +
      `Timeline: ${dto.timelineBand}\n` +
      `Existing website/app: ${dto.hasExistingSite ? "Yes" : "No"}\n` +
      `Preferred contact: ${dto.contactMethod}\n` +
      `Next step: ${dto.meetingType}\n` +
      `Preferred date: ${dto.preferredDate || "-"}\n\n` +
      `Goals:\n${dto.goals}`;

    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        message,
        source: ContactSource.INTAKE_WIZARD,
        metadata: metadata as import("@prisma/client").Prisma.InputJsonValue,
        status: "new",
      },
    });

    this.logger.log(`New intake submission from ${dto.email}`);

    const adminEmail =
      this.config.get<string>("INTAKE_NOTIFICATION_EMAIL") ||
      this.config.get<string>("CONTACT_NOTIFICATION_EMAIL");
    if (adminEmail && this.mail.isEnabled()) {
      await this.mail.send(
        adminEmail,
        `[Intake] ${dto.name} · ${dto.budgetBand} · ${dto.timelineBand}`,
        message,
      );
    }

    return { ok: true };
  }

  async createProposalRequest(dto: CreateProposalRequestDto) {
    const metadata = {
      v: 1,
      company: dto.company || null,
      projectType: dto.projectType,
      currentSituation: dto.currentSituation,
      requiredScope: dto.requiredScope,
      budgetBand: dto.budgetBand,
      timelineBand: dto.timelineBand,
      decisionDeadline: dto.decisionDeadline || null,
      needsNda: dto.needsNda,
      wantsProposalWalkthrough: dto.wantsProposalWalkthrough,
    };

    const message =
      `Formal proposal request\n\n` +
      `Name: ${dto.name}\n` +
      `Email: ${dto.email}\n` +
      `Phone: ${dto.phone || "-"}\n` +
      `Company: ${dto.company || "-"}\n` +
      `Project type: ${dto.projectType}\n` +
      `Budget: ${dto.budgetBand}\n` +
      `Timeline: ${dto.timelineBand}\n` +
      `Decision deadline: ${dto.decisionDeadline || "-"}\n` +
      `Needs NDA: ${dto.needsNda ? "Yes" : "No"}\n` +
      `Walkthrough requested: ${dto.wantsProposalWalkthrough ? "Yes" : "No"}\n\n` +
      `Current situation:\n${dto.currentSituation}\n\n` +
      `Required scope: ${dto.requiredScope.join(", ")}`;

    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        message,
        source: ContactSource.PROPOSAL_REQUEST,
        metadata: metadata as import("@prisma/client").Prisma.InputJsonValue,
        status: "new",
      },
    });

    this.logger.log(`New proposal request from ${dto.email}`);

    const adminEmail = this.config.get<string>("CONTACT_NOTIFICATION_EMAIL");
    if (adminEmail && this.mail.isEnabled()) {
      await this.mail.send(
        adminEmail,
        `[Proposal] ${dto.name} · ${dto.projectType} · ${dto.budgetBand}`,
        message,
      );
    }

    return { ok: true };
  }

  async createWebsiteToAppQuote(dto: CreateWebsiteToAppQuoteDto) {
    const metadata = {
      v: 1,
      websiteUrl: dto.websiteUrl,
      currentStack: dto.currentStack || null,
      desiredPlatforms: dto.desiredPlatforms,
      needsAuth: dto.needsAuth || false,
      needsPayments: dto.needsPayments || false,
      needsPushNotifications: dto.needsPushNotifications || false,
      timelineBand: dto.timelineBand,
      budgetBand: dto.budgetBand,
      notes: dto.notes || null,
    };

    const message =
      `Website to mobile app conversion quote\n\n` +
      `Name: ${dto.name}\n` +
      `Email: ${dto.email}\n` +
      `Phone: ${dto.phone || "-"}\n` +
      `Company: ${dto.company || "-"}\n` +
      `Website: ${dto.websiteUrl}\n` +
      `Current stack: ${dto.currentStack || "-"}\n` +
      `Target platforms: ${dto.desiredPlatforms.join(", ")}\n` +
      `Needs auth: ${dto.needsAuth ? "Yes" : "No"}\n` +
      `Needs payments: ${dto.needsPayments ? "Yes" : "No"}\n` +
      `Needs push: ${dto.needsPushNotifications ? "Yes" : "No"}\n` +
      `Timeline: ${dto.timelineBand}\n` +
      `Budget: ${dto.budgetBand}\n\n` +
      `Notes:\n${dto.notes || "-"}`;

    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        message,
        source: ContactSource.WEBSITE_TO_APP_QUOTE,
        metadata: metadata as import("@prisma/client").Prisma.InputJsonValue,
        status: "new",
      },
    });

    this.logger.log(`New website-to-app quote request from ${dto.email}`);

    const adminEmail = this.config.get<string>("CONTACT_NOTIFICATION_EMAIL");
    if (adminEmail && this.mail.isEnabled()) {
      await this.mail.send(
        adminEmail,
        `[Website→App Quote] ${dto.name} · ${dto.timelineBand}`,
        message,
      );
    }

    return { ok: true };
  }

  async createFeedback(dto: CreateFeedbackDto) {
    const metadata = {
      v: 1,
      articleId: dto.articleId,
      helpful: dto.helpful,
      issue: dto.issue || null,
      query: dto.query || null,
    };

    const message = `Help center feedback: article=${dto.articleId} helpful=${
      dto.helpful ? "yes" : "no"
    } issue=${dto.issue || "-"} query=${dto.query || "-"}`;

    await this.prisma.contact.create({
      data: {
        name: "Help center visitor",
        email: "help-center-feedback@oceancyber.local",
        phone: null,
        message,
        source: ContactSource.HELP_CENTER_FEEDBACK,
        metadata: metadata as import("@prisma/client").Prisma.InputJsonValue,
        status: "new",
      },
    });

    this.logger.log(`New help center feedback for article ${dto.articleId}`);

    return { ok: true };
  }
}
