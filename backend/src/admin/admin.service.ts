import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private buildContactWhere(filters: {
    status?: string;
    source?: string;
    q?: string;
    dateRange?: string;
  }): Prisma.ContactWhereInput {
    const where: Prisma.ContactWhereInput = {};
    if (filters.status && filters.status !== "all") {
      where.status = filters.status;
    }
    if (filters.source && filters.source !== "all") {
      where.source = filters.source;
    }
    const q = filters.q?.trim();
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }
    const now = Date.now();
    if (filters.dateRange === "7d") {
      where.createdAt = { gte: new Date(now - 7 * 24 * 60 * 60 * 1000) };
    } else if (filters.dateRange === "30d") {
      where.createdAt = { gte: new Date(now - 30 * 24 * 60 * 60 * 1000) };
    }
    return where;
  }

  async getSummary() {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [userCount, renewalGroups, pastDue, suspended, tx24h, pendingTx, contacts7d, contactsProjectCalc7d] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.userRenewal.groupBy({
          by: ["status"],
          _count: { _all: true },
        }),
        this.prisma.userRenewal.count({ where: { status: "past_due" } }),
        this.prisma.userRenewal.count({ where: { status: "suspended" } }),
        this.prisma.paymentTransaction.count({ where: { createdAt: { gte: dayAgo } } }),
        this.prisma.paymentTransaction.count({ where: { status: "pending" } }),
        this.prisma.contact.count({ where: { createdAt: { gte: weekAgo } } }),
        this.prisma.contact.count({
          // must match `CONTACT_SOURCE.projectCalculator` in Next (lib/inbound-contact.ts)
          where: { source: "project_calculator", createdAt: { gte: weekAgo } },
        }),
      ]);
    return {
      userCount,
      renewalsByStatus: Object.fromEntries(
        renewalGroups.map((g) => [g.status, g._count._all]),
      ) as Record<string, number>,
      pastDueCount: pastDue,
      suspendedCount: suspended,
      transactions24h: tx24h,
      pendingPayments: pendingTx,
      /** Contact rows created in the last 7 days (contact form + project calculator, etc.) */
      contacts7d,
      /** Project cost calculator leads in the last 7 days */
      projectCalculatorLeads7d: contactsProjectCalc7d,
    };
  }

  async listUsers(take: number) {
    const t = Math.min(Math.max(take, 1), 100);
    const rows = await this.prisma.user.findMany({
      take: t,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        role: true,
        fullName: true,
        createdAt: true,
        walletBalanceMinor: true,
        walletCurrency: true,
      },
    });
    return rows.map((r) => ({
      ...r,
      walletBalanceMinor: r.walletBalanceMinor.toString(),
    }));
  }

  async listRecentTransactions(take: number) {
    const t = Math.min(Math.max(take, 1), 100);
    const rows = await this.prisma.paymentTransaction.findMany({
      take: t,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true } } },
    });
    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      userEmail: r.user.email,
      type: r.type,
      status: r.status,
      amountMinor: r.amountMinor.toString(),
      currency: r.currency,
      provider: r.provider,
      providerReference: r.providerReference,
      createdAt: r.createdAt,
    }));
  }

  async listRenewalIssues(take: number) {
    const t = Math.min(Math.max(take, 1), 100);
    const rows = await this.prisma.userRenewal.findMany({
      where: { status: { in: ["past_due", "suspended"] } },
      take: t,
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { email: true, id: true } },
        plan: { select: { name: true, code: true, amountMinor: true } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      status: r.status,
      nextRenewalAt: r.nextRenewalAt,
      graceEndsAt: r.graceEndsAt,
      userEmail: r.user.email,
      userId: r.user.id,
      planName: r.plan.name,
      planCode: r.plan.code,
      amountMinor: r.plan.amountMinor.toString(),
      autoRenew: r.autoRenewUsingWallet,
    }));
  }

  /** Public-site inbound messages and calculator leads (PostgreSQL `Contact` table, written by Next.js). */
  async listContacts(filters: {
    take: number;
    status?: string;
    source?: string;
    q?: string;
    dateRange?: string;
    sort?: string;
  }) {
    const t = Math.min(Math.max(filters.take, 1), 100);
    const where = this.buildContactWhere(filters);
    const orderBy =
      filters.sort === "created_asc"
        ? { createdAt: "asc" as const }
        : filters.sort === "status"
          ? [{ status: "asc" as const }, { createdAt: "desc" as const }]
          : filters.sort === "source"
            ? [{ source: "asc" as const }, { createdAt: "desc" as const }]
            : { createdAt: "desc" as const };
    const rows = await this.prisma.contact.findMany({
      take: t,
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        source: true,
        message: true,
        metadata: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return rows;
  }

  async exportContactsCsv(filters: {
    take: number;
    status?: string;
    source?: string;
    q?: string;
    dateRange?: string;
    sort?: string;
  }) {
    const t = Math.min(Math.max(filters.take, 1), 5000);
    const where = this.buildContactWhere(filters);
    const orderBy =
      filters.sort === "created_asc"
        ? { createdAt: "asc" as const }
        : filters.sort === "status"
          ? [{ status: "asc" as const }, { createdAt: "desc" as const }]
          : filters.sort === "source"
            ? [{ source: "asc" as const }, { createdAt: "desc" as const }]
            : { createdAt: "desc" as const };
    const rows = await this.prisma.contact.findMany({
      take: t,
      where,
      orderBy,
      select: {
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
        phone: true,
        source: true,
        status: true,
        notes: true,
        message: true,
      },
    });
    const quote = (v: unknown) => {
      const s = String(v ?? "");
      return `"${s.replace(/"/g, '""')}"`;
    };
    const header = [
      "createdAt",
      "updatedAt",
      "name",
      "email",
      "phone",
      "source",
      "status",
      "notes",
      "message",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.createdAt.toISOString(),
          r.updatedAt.toISOString(),
          r.name,
          r.email,
          r.phone ?? "",
          r.source ?? "",
          r.status ?? "new",
          r.notes ?? "",
          r.message,
        ]
          .map(quote)
          .join(","),
      );
    }
    return lines.join("\n");
  }

  async getContactPresetCounts(filters: {
    status?: string;
    source?: string;
    q?: string;
    dateRange?: string;
  }) {
    const base = this.buildContactWhere(filters);
    const [all, newOnly, projectCalc, chat] = await Promise.all([
      this.prisma.contact.count({ where: { ...base } }),
      this.prisma.contact.count({ where: { ...base, status: "new" } }),
      this.prisma.contact.count({ where: { ...base, source: "project_calculator" } }),
      this.prisma.contact.count({ where: { ...base, source: "chat" } }),
    ]);
    return {
      all,
      newOnly,
      projectCalculator: projectCalc,
      chat,
    };
  }

  async getHelpCenterFeedbackSummary(filters?: { dateRange?: string }) {
    const now = Date.now();
    const createdAt =
      filters?.dateRange === "7d"
        ? { gte: new Date(now - 7 * 24 * 60 * 60 * 1000) }
        : filters?.dateRange === "30d"
          ? { gte: new Date(now - 30 * 24 * 60 * 60 * 1000) }
          : undefined;

    const rows = await this.prisma.contact.findMany({
      where: {
        source: "help_center_feedback",
        ...(createdAt ? { createdAt } : {}),
      },
      select: {
        metadata: true,
      },
      take: 5000,
      orderBy: { createdAt: "desc" },
    });

    const byArticle = new Map<string, { articleId: string; yes: number; no: number }>();
    for (const row of rows) {
      const m = row.metadata;
      if (!m || typeof m !== "object") continue;
      const obj = m as { articleId?: unknown; helpful?: unknown };
      const articleId = typeof obj.articleId === "string" && obj.articleId.trim() ? obj.articleId.trim() : "unknown";
      const helpful = obj.helpful === true;
      const agg = byArticle.get(articleId) ?? { articleId, yes: 0, no: 0 };
      if (helpful) agg.yes += 1;
      else agg.no += 1;
      byArticle.set(articleId, agg);
    }

    const articles = [...byArticle.values()]
      .map((a) => {
        const total = a.yes + a.no;
        const helpfulRate = total > 0 ? Math.round((a.yes / total) * 100) : 0;
        return { ...a, total, helpfulRate };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return {
      totalFeedback: rows.length,
      articles,
    };
  }

  async updateContact(
    id: string,
    data: { status?: string; notes?: string },
  ) {
    const patch: { status?: string; notes?: string } = {};
    if (data.status != null) {
      patch.status = data.status;
    }
    if (data.notes !== undefined) {
      patch.notes = data.notes;
    }
    return this.prisma.contact.update({
      where: { id },
      data: patch,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        source: true,
        message: true,
        metadata: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
