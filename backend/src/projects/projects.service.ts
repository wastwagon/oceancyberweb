import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

type SafeUser = { id: string; email: string };

const PAYSTACK_BASE = "https://api.paystack.co";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private milestoneLabel(code: "kickoff" | "build" | "launch") {
    if (code === "kickoff") return "Kickoff deposit";
    if (code === "build") return "Build phase";
    return "Launch handover";
  }

  async listMyProjects(user: SafeUser) {
    const rows = await this.prisma.clientProject.findMany({
      where: { userId: user.id },
      include: {
        milestones: { orderBy: { orderIndex: "asc" } },
        invoices: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((row) => ({
      ...row,
      totalAmountMinor: row.totalAmountMinor.toString(),
      milestones: row.milestones.map((m) => ({
        ...m,
        amountMinor: m.amountMinor.toString(),
      })),
      invoices: row.invoices.map((i) => ({
        ...i,
        amountMinor: i.amountMinor.toString(),
      })),
    }));
  }

  async listAdminProjects() {
    const rows = await this.prisma.clientProject.findMany({
      include: {
        user: { select: { id: true, email: true, fullName: true } },
        milestones: { orderBy: { orderIndex: "asc" } },
        invoices: { orderBy: { createdAt: "asc" } },
        activities: { orderBy: { createdAt: "desc" }, take: 8 },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return rows.map((row) => ({
      ...row,
      totalAmountMinor: row.totalAmountMinor.toString(),
      milestones: row.milestones.map((m) => ({
        ...m,
        amountMinor: m.amountMinor.toString(),
      })),
      invoices: row.invoices.map((i) => ({
        ...i,
        amountMinor: i.amountMinor.toString(),
      })),
    }));
  }

  async createClientProject(input: {
    userEmail: string;
    title: string;
    description?: string;
    totalAmountGhs: number;
    kickoffPercent?: number;
    buildPercent?: number;
    launchPercent?: number;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.userEmail.toLowerCase().trim() },
      select: { id: true, email: true },
    });
    if (!user) {
      throw new NotFoundException(
        "No user account found for that email. Ask client to sign up first.",
      );
    }

    const kickoffPercent = input.kickoffPercent ?? 30;
    const buildPercent = input.buildPercent ?? 30;
    const launchPercent = input.launchPercent ?? 40;
    if (kickoffPercent + buildPercent + launchPercent !== 100) {
      throw new BadRequestException(
        "Milestone percentages must add up to 100.",
      );
    }

    const totalMinor = BigInt(Math.round(input.totalAmountGhs * 100));
    if (totalMinor <= 0n) {
      throw new BadRequestException("Project total must be greater than zero.");
    }

    const kickoffMinor = (totalMinor * BigInt(kickoffPercent)) / 100n;
    const buildMinor = (totalMinor * BigInt(buildPercent)) / 100n;
    const launchMinor = totalMinor - kickoffMinor - buildMinor;

    const project = await this.prisma.$transaction(async (db) => {
      const created = await db.clientProject.create({
        data: {
          userId: user.id,
          title: input.title.trim(),
          description: input.description?.trim() || null,
          totalAmountMinor: totalMinor,
          status: "planning",
          currency: "GHS",
        },
      });

      const kickoffMilestone = await db.projectMilestone.create({
        data: {
          projectId: created.id,
          code: "kickoff",
          title: this.milestoneLabel("kickoff"),
          orderIndex: 1,
          percentage: kickoffPercent,
          amountMinor: kickoffMinor,
          status: "unlocked",
          unlockedAt: new Date(),
        },
      });
      const buildMilestone = await db.projectMilestone.create({
        data: {
          projectId: created.id,
          code: "build",
          title: this.milestoneLabel("build"),
          orderIndex: 2,
          percentage: buildPercent,
          amountMinor: buildMinor,
          status: "locked",
        },
      });
      const launchMilestone = await db.projectMilestone.create({
        data: {
          projectId: created.id,
          code: "launch",
          title: this.milestoneLabel("launch"),
          orderIndex: 3,
          percentage: launchPercent,
          amountMinor: launchMinor,
          status: "locked",
        },
      });

      const serial = Date.now();
      await db.projectInvoice.create({
        data: {
          projectId: created.id,
          milestoneId: kickoffMilestone.id,
          invoiceNumber: `INV-${created.id.slice(0, 8).toUpperCase()}-${serial}-1`,
          title: `${created.title} — Kickoff (${kickoffPercent}%)`,
          amountMinor: kickoffMinor,
          currency: "GHS",
          status: "issued",
          issuedAt: new Date(),
        },
      });
      await db.projectInvoice.create({
        data: {
          projectId: created.id,
          milestoneId: buildMilestone.id,
          invoiceNumber: `INV-${created.id.slice(0, 8).toUpperCase()}-${serial}-2`,
          title: `${created.title} — Build (${buildPercent}%)`,
          amountMinor: buildMinor,
          currency: "GHS",
          status: "draft",
        },
      });
      await db.projectInvoice.create({
        data: {
          projectId: created.id,
          milestoneId: launchMilestone.id,
          invoiceNumber: `INV-${created.id.slice(0, 8).toUpperCase()}-${serial}-3`,
          title: `${created.title} — Launch (${launchPercent}%)`,
          amountMinor: launchMinor,
          currency: "GHS",
          status: "draft",
        },
      });

      await db.projectActivity.create({
        data: {
          projectId: created.id,
          actorType: "admin",
          action: "project_created",
          note: "Project and milestone invoices created (30/30/40 style).",
        },
      });

      return created;
    });

    return project;
  }

  async updateProjectStatus(projectId: string, status: string, note?: string) {
    const updated = await this.prisma.clientProject.update({
      where: { id: projectId },
      data: { status },
    });
    await this.prisma.projectActivity.create({
      data: {
        projectId,
        actorType: "admin",
        action: "status_updated",
        note: note?.trim() || `Project status changed to ${status}.`,
      },
    });
    return updated;
  }

  async unlockMilestone(projectId: string, milestoneId: string, note?: string) {
    const milestone = await this.prisma.projectMilestone.findFirst({
      where: { id: milestoneId, projectId },
    });
    if (!milestone) throw new NotFoundException("Milestone not found.");
    if (milestone.status !== "locked") return milestone;

    const now = new Date();
    const updated = await this.prisma.$transaction(async (db) => {
      const unlocked = await db.projectMilestone.update({
        where: { id: milestoneId },
        data: { status: "unlocked", unlockedAt: now },
      });
      await db.projectInvoice.updateMany({
        where: { milestoneId, status: "draft" },
        data: { status: "issued", issuedAt: now },
      });
      await db.projectActivity.create({
        data: {
          projectId,
          actorType: "admin",
          action: "milestone_unlocked",
          note: note?.trim() || `Unlocked ${milestone.title}.`,
        },
      });
      return unlocked;
    });
    return updated;
  }

  async addProjectActivity(
    projectId: string,
    input: { actorId?: string; note: string },
  ) {
    const project = await this.prisma.clientProject.findUnique({
      where: { id: projectId },
      select: { id: true },
    });
    if (!project) throw new NotFoundException("Project not found.");
    const note = input.note.trim();
    if (!note) throw new BadRequestException("Activity note is required.");

    return this.prisma.projectActivity.create({
      data: {
        projectId,
        actorType: "admin",
        actorId: input.actorId || null,
        action: "manual_note",
        note,
        metadata: {
          category: "general",
        } as import("@prisma/client").Prisma.InputJsonValue,
      },
    });
  }

  async addProjectActivityWithCategory(
    projectId: string,
    input: { actorId?: string; note: string; category: string },
  ) {
    const project = await this.prisma.clientProject.findUnique({
      where: { id: projectId },
      select: { id: true },
    });
    if (!project) throw new NotFoundException("Project not found.");
    const note = input.note.trim();
    if (!note) throw new BadRequestException("Activity note is required.");
    const allowed = new Set([
      "general",
      "client_feedback",
      "dev_update",
      "blocker",
      "approval",
    ]);
    const category = input.category.trim();
    if (!allowed.has(category)) {
      throw new BadRequestException("Invalid activity category.");
    }

    return this.prisma.projectActivity.create({
      data: {
        projectId,
        actorType: "admin",
        actorId: input.actorId || null,
        action: "manual_note",
        note,
        metadata: {
          category,
        } as import("@prisma/client").Prisma.InputJsonValue,
      },
    });
  }

  async initializeInvoicePayment(
    user: SafeUser,
    projectId: string,
    invoiceId: string,
  ) {
    const invoice = await this.prisma.projectInvoice.findFirst({
      where: { id: invoiceId, projectId, project: { userId: user.id } },
      include: { project: true, milestone: true },
    });
    if (!invoice) throw new NotFoundException("Invoice not found.");
    if (invoice.status !== "issued") {
      throw new BadRequestException("Only issued invoices can be paid.");
    }
    if (invoice.paystackReference) {
      const existing = await this.prisma.paymentTransaction.findUnique({
        where: { providerReference: invoice.paystackReference },
      });
      if (existing && existing.status === "pending") {
        throw new BadRequestException(
          "This invoice already has a pending payment link.",
        );
      }
    }

    const paystackSecret = this.config.get<string>("PAYSTACK_SECRET_KEY");
    const frontendBase =
      this.config.get<string>("NEXT_PUBLIC_SITE_URL") ||
      "http://localhost:3020";
    if (!paystackSecret) {
      throw new BadRequestException("PAYSTACK_SECRET_KEY is not configured");
    }

    const reference = `PRJ-${projectId.slice(0, 8)}-${Date.now()}`;
    const callbackUrl = `${frontendBase.replace(
      /\/$/,
      "",
    )}/dashboard/projects?project=${encodeURIComponent(projectId)}&invoice=${encodeURIComponent(
      invoiceId,
    )}&paid=1`;
    const metadata = {
      kind: "project_invoice",
      userId: user.id,
      projectId,
      invoiceId,
      milestoneId: invoice.milestoneId,
    };

    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: Number(invoice.amountMinor),
        currency: invoice.currency,
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
    });
    const data = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };
    if (!res.ok || !data.status || !data.data?.authorization_url) {
      throw new InternalServerErrorException(
        data.message || "Could not initialize project invoice payment",
      );
    }

    await this.prisma.$transaction(async (db) => {
      await db.paymentTransaction.create({
        data: {
          userId: user.id,
          type: "project_invoice",
          status: "pending",
          amountMinor: invoice.amountMinor,
          currency: invoice.currency,
          provider: "paystack",
          providerReference: data.data!.reference,
          metadata: {
            ...metadata,
            projectTitle: invoice.project.title,
            invoiceNumber: invoice.invoiceNumber,
            callbackUrl,
          } as import("@prisma/client").Prisma.InputJsonValue,
        },
      });
      await db.projectInvoice.update({
        where: { id: invoice.id },
        data: { paystackReference: data.data!.reference },
      });
      await db.projectActivity.create({
        data: {
          projectId,
          actorType: "user",
          actorId: user.id,
          action: "invoice_payment_initialized",
          note: `Initialized payment for invoice ${invoice.invoiceNumber}.`,
        },
      });
    });

    return {
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      amountMinor: invoice.amountMinor.toString(),
    };
  }
}
