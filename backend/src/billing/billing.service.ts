import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Prisma } from "@prisma/client";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";

type SafeUser = { id: string; email: string };

const PAYSTACK_BASE = "https://api.paystack.co";

function hoursAgo(d: Date, hours: number) {
  const x = new Date(d);
  x.setHours(x.getHours() - hours);
  return x;
}

function escHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly planPresets: Record<
    string,
    {
      name: string;
      description: string;
      interval: "monthly" | "yearly";
      amountMinor: bigint;
    }
  > = {
    "hosting-basic-monthly": {
      name: "Hosting Basic (Monthly)",
      description: "Starter hosting renewal plan",
      interval: "monthly",
      amountMinor: 9900n,
    },
    "hosting-launch-monthly": {
      name: "Hosting Launch (Monthly)",
      description: "Launch hosting package renewal",
      interval: "monthly",
      amountMinor: 7900n,
    },
    "hosting-grow-monthly": {
      name: "Hosting Grow (Monthly)",
      description: "Grow hosting package renewal",
      interval: "monthly",
      amountMinor: 14900n,
    },
    "hosting-scale-monthly": {
      name: "Hosting Scale (Monthly)",
      description: "Scale hosting package renewal",
      interval: "monthly",
      amountMinor: 32900n,
    },
    "hosting-launch-yearly": {
      name: "Hosting Launch (Yearly)",
      description: "Launch hosting package annual renewal",
      interval: "yearly",
      amountMinor: 70800n,
    },
    "hosting-grow-yearly": {
      name: "Hosting Grow (Yearly)",
      description: "Grow hosting package annual renewal",
      interval: "yearly",
      amountMinor: 127200n,
    },
    "hosting-scale-yearly": {
      name: "Hosting Scale (Yearly)",
      description: "Scale hosting package annual renewal",
      interval: "yearly",
      amountMinor: 238800n,
    },
    "domain-standard-yearly": {
      name: "Domain Renewal (Yearly)",
      description: "Standard yearly domain renewal",
      interval: "yearly",
      amountMinor: 12000n,
    },
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  verifyPaystackSignature(
    rawBody: Buffer,
    signature: string | undefined,
  ): void {
    const skip =
      this.config.get<string>("PAYSTACK_WEBHOOK_SKIP_VERIFY") === "true" ||
      this.config.get<string>("NODE_ENV") === "test";
    if (skip) {
      this.logger.warn(
        "Paystack webhook signature verification skipped (dev/test only)",
      );
      return;
    }
    const secret = this.config.get<string>("PAYSTACK_SECRET_KEY");
    if (!secret)
      throw new InternalServerErrorException(
        "PAYSTACK_SECRET_KEY is not configured",
      );
    if (!signature)
      throw new UnauthorizedException("Missing Paystack signature");

    const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException("Invalid Paystack signature");
    }
  }

  async getWallet(user: SafeUser) {
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { walletBalanceMinor: true, walletCurrency: true },
    });
    if (!dbUser) throw new NotFoundException("User not found");
    return {
      balanceMinor: dbUser.walletBalanceMinor.toString(),
      currency: dbUser.walletCurrency,
      balanceDisplay: Number(dbUser.walletBalanceMinor) / 100,
    };
  }

  async listLedger(user: SafeUser, limit = 50) {
    const rows = await this.prisma.walletLedger.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: Math.min(Math.max(limit, 1), 200),
    });
    return rows.map((row) => ({
      ...row,
      amountMinor: row.amountMinor.toString(),
    }));
  }

  async listTransactions(user: SafeUser, limit = 20) {
    const rows = await this.prisma.paymentTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: Math.min(Math.max(limit, 1), 100),
    });
    return rows.map((row) => ({
      ...row,
      amountMinor: row.amountMinor.toString(),
    }));
  }

  async listClientRequests(user: SafeUser, limit = 50) {
    const rows = await this.prisma.contact.findMany({
      where: { email: user.email },
      orderBy: { createdAt: "desc" },
      take: Math.min(Math.max(limit, 1), 200),
      select: {
        id: true,
        source: true,
        status: true,
        message: true,
        metadata: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return rows;
  }

  async getTransactionReceipt(user: SafeUser, transactionId: string) {
    const tx = await this.prisma.paymentTransaction.findFirst({
      where: { id: transactionId, userId: user.id },
    });
    if (!tx) throw new NotFoundException("Transaction not found");
    if (tx.status !== "success") {
      throw new BadRequestException(
        "Receipt is only available for successful transactions",
      );
    }
    const m = (tx.metadata as Record<string, unknown> | null) ?? {};
    const productLine =
      tx.type === "product_checkout"
        ? String(m.renewalPlanName || m.planCode || "Service")
        : null;
    const amount = (Number(tx.amountMinor) / 100).toFixed(2);
    const lines = [
      "Ocean Cyber — transaction receipt",
      "--------------------------------",
      `Transaction ID: ${tx.id}`,
      `Type: ${tx.type}`,
      ...(productLine ? [`Item: ${productLine}`] : []),
      `Status: ${tx.status}`,
      `Amount: ${tx.currency} ${amount}`,
      `Provider reference: ${tx.providerReference}`,
      `Recorded: ${tx.createdAt.toISOString()}`,
      "",
      "Thank you for your business.",
    ];
    return lines.join("\n");
  }

  async getTransactionHtmlInvoice(user: SafeUser, transactionId: string) {
    const tx = await this.prisma.paymentTransaction.findFirst({
      where: { id: transactionId, userId: user.id },
    });
    if (!tx) throw new NotFoundException("Transaction not found");
    if (tx.status !== "success") {
      throw new BadRequestException(
        "Invoice is only available for successful transactions",
      );
    }
    const m = (tx.metadata as Record<string, unknown> | null) ?? {};
    const lineLabel = escHtml(
      tx.type === "product_checkout"
        ? String(m.renewalPlanName || m.planCode || "Service")
        : tx.type === "wallet_topup"
          ? "Wallet top-up"
          : tx.type === "renewal"
            ? `Renewal (${String(m.planCode || "plan")})`
            : String(tx.type),
    );
    const amount = (Number(tx.amountMinor) / 100).toFixed(2);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Invoice ${escHtml(tx.id)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; color: #0f172a; }
    h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
    th, td { text-align: left; padding: 0.5rem 0.25rem; border-bottom: 1px solid #e2e8f0; }
    .muted { color: #64748b; font-size: 0.875rem; }
    .total { font-weight: 700; font-size: 1.1rem; }
  </style>
</head>
<body>
  <p class="muted">Ocean Cyber</p>
  <h1>Payment confirmation</h1>
  <p class="muted">This document is a payment record for your records. Ghana cedi (GHS) amounts.</p>
  <table>
    <tr><th>Description</th><td>${lineLabel}</td></tr>
    <tr><th>Transaction</th><td class="muted">${escHtml(tx.id)}</td></tr>
    <tr><th>Date</th><td>${escHtml(tx.createdAt.toISOString())}</td></tr>
    <tr><th>Provider ref.</th><td class="muted">${escHtml(tx.providerReference)}</td></tr>
    <tr class="total"><th>Total</th><td>${escHtml(tx.currency)} ${escHtml(amount)}</td></tr>
  </table>
</body>
</html>
`;
  }

  async listRenewals(user: SafeUser) {
    const rows = await this.prisma.userRenewal.findMany({
      where: { userId: user.id },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((row) => ({
      ...row,
      plan: {
        ...row.plan,
        amountMinor: row.plan.amountMinor.toString(),
      },
    }));
  }

  async listRenewalPlans() {
    const dbPlans = await this.prisma.renewalPlan.findMany({
      where: { isActive: true },
      orderBy: [{ interval: "asc" }, { amountMinor: "asc" }],
      select: {
        code: true,
        name: true,
        description: true,
        interval: true,
        amountMinor: true,
        currency: true,
      },
    });
    if (dbPlans.length > 0) {
      return dbPlans.map((p) => ({
        ...p,
        amountMinor: p.amountMinor.toString(),
      }));
    }

    return Object.entries(this.planPresets).map(([code, preset]) => ({
      code,
      name: preset.name,
      description: preset.description,
      interval: preset.interval,
      amountMinor: preset.amountMinor.toString(),
      currency: "GHS",
    }));
  }

  private async createRenewalWithTx(
    db: Prisma.TransactionClient,
    userId: string,
    input: {
      planCode: string;
      autoRenewUsingWallet?: boolean;
      externalRef?: string;
    },
  ) {
    let plan = await db.renewalPlan.findUnique({
      where: { code: input.planCode },
    });
    const preset = this.planPresets[input.planCode];
    if (!plan && preset) {
      plan = await db.renewalPlan.create({
        data: {
          code: input.planCode,
          name: preset.name,
          description: preset.description,
          interval: preset.interval,
          amountMinor: preset.amountMinor,
          currency: "GHS",
        },
      });
    }
    if (!plan || !plan.isActive)
      throw new BadRequestException("Invalid or inactive plan");

    const nextRenewalAt = new Date();
    if (plan.interval === "monthly") {
      nextRenewalAt.setMonth(nextRenewalAt.getMonth() + 1);
    } else if (plan.interval === "yearly") {
      nextRenewalAt.setFullYear(nextRenewalAt.getFullYear() + 1);
    } else {
      nextRenewalAt.setDate(nextRenewalAt.getDate() + 30);
    }

    const created = await db.userRenewal.create({
      data: {
        userId,
        planId: plan.id,
        nextRenewalAt,
        autoRenewUsingWallet: input.autoRenewUsingWallet ?? true,
        externalRef: input.externalRef?.trim() || null,
        metadata: input.externalRef
          ? { source: "linked_order", externalRef: input.externalRef }
          : undefined,
      },
      include: { plan: true },
    });
    return {
      ...created,
      plan: {
        ...created.plan,
        amountMinor: created.plan.amountMinor.toString(),
      },
    };
  }

  async createRenewal(
    user: SafeUser,
    input: {
      planCode: string;
      autoRenewUsingWallet?: boolean;
      externalRef?: string;
    },
  ) {
    return this.createRenewalWithTx(
      this.prisma as unknown as Prisma.TransactionClient,
      user.id,
      input,
    );
  }

  async pauseRenewal(user: SafeUser, renewalId: string) {
    const renewal = await this.prisma.userRenewal.findFirst({
      where: { id: renewalId, userId: user.id },
    });
    if (!renewal) throw new NotFoundException("Renewal not found");
    if (renewal.status === "cancelled")
      throw new BadRequestException("Renewal is cancelled");
    return this.prisma.userRenewal.update({
      where: { id: renewalId },
      data: { status: "paused", pausedAt: new Date() },
      include: { plan: true },
    });
  }

  async resumeRenewal(user: SafeUser, renewalId: string) {
    const renewal = await this.prisma.userRenewal.findFirst({
      where: { id: renewalId, userId: user.id },
    });
    if (!renewal) throw new NotFoundException("Renewal not found");
    if (renewal.status === "cancelled")
      throw new BadRequestException("Renewal is cancelled");
    const now = new Date();
    const backToPastDue = renewal.graceEndsAt && renewal.graceEndsAt > now;
    return this.prisma.userRenewal.update({
      where: { id: renewalId },
      data: { status: backToPastDue ? "past_due" : "active", pausedAt: null },
      include: { plan: true },
    });
  }

  async cancelRenewal(user: SafeUser, renewalId: string) {
    const renewal = await this.prisma.userRenewal.findFirst({
      where: { id: renewalId, userId: user.id },
    });
    if (!renewal) throw new NotFoundException("Renewal not found");
    return this.prisma.userRenewal.update({
      where: { id: renewalId },
      data: {
        status: "cancelled",
        cancelledAt: new Date(),
        autoRenewUsingWallet: false,
        pausedAt: null,
      },
      include: { plan: true },
    });
  }

  async initializeTopup(user: SafeUser, amountGhs: number) {
    const amountMinor = BigInt(Math.round(amountGhs * 100));
    if (amountMinor <= 0n)
      throw new BadRequestException("Amount must be at least 1 GHS");

    const paystackSecret = this.config.get<string>("PAYSTACK_SECRET_KEY");
    const frontendBase =
      this.config.get<string>("NEXT_PUBLIC_SITE_URL") ||
      "http://localhost:3020";
    if (!paystackSecret) {
      throw new BadRequestException("PAYSTACK_SECRET_KEY is not configured");
    }

    const reference = `WLT-${user.id.slice(0, 8)}-${Date.now()}`;
    const callbackUrl = `${frontendBase.replace(/\/$/, "")}/dashboard/wallet?reference=${reference}`;

    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: Number(amountMinor),
        currency: "GHS",
        reference,
        callback_url: callbackUrl,
        metadata: { kind: "wallet_topup", userId: user.id },
      }),
    });

    const data = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };
    if (!res.ok || !data.status || !data.data?.authorization_url) {
      throw new InternalServerErrorException(
        data.message || "Could not initialize payment",
      );
    }

    await this.prisma.paymentTransaction.create({
      data: {
        userId: user.id,
        type: "wallet_topup",
        status: "pending",
        amountMinor,
        currency: "GHS",
        provider: "paystack",
        providerReference: data.data.reference,
        metadata: { callbackUrl },
      },
    });

    return {
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      amountMinor: amountMinor.toString(),
    };
  }

  /**
   * Paystack checkout for a catalog plan (hosting/domain) — on webhook success, creates the linked `UserRenewal`.
   */
  async initializeProductCheckout(
    user: SafeUser,
    input: { planCode: string; externalRef?: string },
  ) {
    let plan = await this.prisma.renewalPlan.findUnique({
      where: { code: input.planCode },
    });
    const preset = this.planPresets[input.planCode];
    if (!plan && preset) {
      plan = await this.prisma.renewalPlan.create({
        data: {
          code: input.planCode,
          name: preset.name,
          description: preset.description,
          interval: preset.interval,
          amountMinor: preset.amountMinor,
          currency: "GHS",
        },
      });
    }
    if (!plan || !plan.isActive)
      throw new BadRequestException("Invalid or inactive plan");

    const amountMinor = plan.amountMinor;
    if (amountMinor <= 0n) throw new BadRequestException("Invalid plan amount");

    const paystackSecret = this.config.get<string>("PAYSTACK_SECRET_KEY");
    const frontendBase =
      this.config.get<string>("NEXT_PUBLIC_SITE_URL") ||
      "http://localhost:3020";
    if (!paystackSecret) {
      throw new BadRequestException("PAYSTACK_SECRET_KEY is not configured");
    }

    const reference = `PAY-${user.id.slice(0, 8)}-${Date.now()}`;
    const returnQs = new URLSearchParams();
    returnQs.set("plan", input.planCode);
    if (input.externalRef?.trim())
      returnQs.set("ref", input.externalRef.trim());
    returnQs.set("paid", "1");
    const callbackUrl = `${frontendBase.replace(/\/$/, "")}/checkout/renewal?${returnQs.toString()}`;

    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: Number(amountMinor),
        currency: "GHS",
        reference,
        callback_url: callbackUrl,
        metadata: {
          kind: "product_checkout",
          userId: user.id,
          planCode: input.planCode,
        },
      }),
    });

    const data = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };
    if (!res.ok || !data.status || !data.data?.authorization_url) {
      throw new InternalServerErrorException(
        data.message || "Could not initialize payment",
      );
    }

    await this.prisma.paymentTransaction.create({
      data: {
        userId: user.id,
        type: "product_checkout",
        status: "pending",
        amountMinor,
        currency: "GHS",
        provider: "paystack",
        providerReference: data.data.reference,
        metadata: {
          planCode: input.planCode,
          externalRef: input.externalRef?.trim() || null,
          callbackUrl,
        },
      },
    });

    return {
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      amountMinor: amountMinor.toString(),
    };
  }

  async getPaymentStatusByProviderReference(
    user: SafeUser,
    providerReference: string,
  ) {
    const row = await this.prisma.paymentTransaction.findFirst({
      where: { userId: user.id, providerReference },
    });
    if (!row) {
      return { found: false as const };
    }
    const m = (row.metadata as Record<string, unknown> | null) ?? {};
    return {
      found: true as const,
      status: row.status,
      type: row.type,
      amountMinor: row.amountMinor.toString(),
      renewalId: m.renewalId != null ? String(m.renewalId) : null,
    };
  }

  async handlePaystackWebhook(payload: unknown) {
    const event = (payload as { event?: string } | null)?.event;
    const tx = (payload as { data?: Record<string, unknown> } | null)?.data;
    if (event !== "charge.success" || !tx?.reference) {
      return { ok: true, ignored: true };
    }

    const reference = String(tx.reference);
    const dbTx = await this.prisma.paymentTransaction.findUnique({
      where: { providerReference: reference },
    });
    if (!dbTx) return { ok: true, ignored: true };
    if (dbTx.status === "success") return { ok: true, duplicate: true };

    const reportedMinor = BigInt(Math.round(Number(tx.amount ?? 0)));
    if (reportedMinor > 0n && reportedMinor !== dbTx.amountMinor) {
      this.logger.warn(
        `Paystack amount mismatch for ${reference}: expected ${dbTx.amountMinor}, got ${reportedMinor}`,
      );
      throw new BadRequestException("Amount mismatch");
    }

    const meta = tx.metadata;
    const flatMeta =
      meta && typeof meta === "object" ? (meta as Record<string, unknown>) : {};
    const userIdFromProvider = flatMeta.userId as string | undefined;
    if (userIdFromProvider && userIdFromProvider !== dbTx.userId) {
      throw new BadRequestException("User mismatch");
    }

    await this.prisma.$transaction(async (prisma) => {
      const locked = await prisma.paymentTransaction.findUnique({
        where: { id: dbTx.id },
      });
      if (!locked || locked.status === "success") return;

      const oldMeta = (locked.metadata as Record<string, unknown> | null) ?? {};
      if (locked.type === "product_checkout" && oldMeta.renewalId) {
        return;
      }

      const baseMeta: Record<string, unknown> = {
        ...oldMeta,
        paystackStatus: tx.status == null ? null : String(tx.status),
        paidAt: tx.paid_at == null ? null : String(tx.paid_at),
        idempotency: `webhook:${reference}`,
      };

      if (locked.type === "wallet_topup") {
        await prisma.paymentTransaction.update({
          where: { id: locked.id },
          data: {
            status: "success",
            metadata: baseMeta as Prisma.InputJsonValue,
          },
        });
        await prisma.user.update({
          where: { id: locked.userId },
          data: { walletBalanceMinor: { increment: locked.amountMinor } },
        });
        await prisma.walletLedger.create({
          data: {
            userId: locked.userId,
            type: "credit",
            amountMinor: locked.amountMinor,
            currency: locked.currency,
            reference,
            description: "Wallet top-up via Paystack",
          },
        });
        return;
      }

      if (locked.type === "product_checkout") {
        const planCode = String(oldMeta.planCode ?? "");
        if (!planCode) {
          throw new BadRequestException("Missing planCode on product checkout");
        }
        const extFromMeta = oldMeta.externalRef;
        const ext =
          extFromMeta == null || extFromMeta === ""
            ? undefined
            : String(extFromMeta);

        const created = await this.createRenewalWithTx(prisma, locked.userId, {
          planCode,
          autoRenewUsingWallet: true,
          externalRef: ext,
        });

        baseMeta.renewalId = created.id;
        baseMeta.renewalPlanName = created.plan.name;
        await prisma.paymentTransaction.update({
          where: { id: locked.id },
          data: {
            status: "success",
            metadata: baseMeta as Prisma.InputJsonValue,
          },
        });
        return;
      }

      if (locked.type === "project_invoice") {
        const invoiceId = String(oldMeta.invoiceId ?? "");
        const projectId = String(oldMeta.projectId ?? "");
        if (!invoiceId || !projectId) {
          throw new BadRequestException("Missing project invoice metadata");
        }

        const invoice = await prisma.projectInvoice.findFirst({
          where: {
            id: invoiceId,
            projectId,
            project: { userId: locked.userId },
          },
          include: { milestone: true },
        });
        if (!invoice) {
          throw new BadRequestException("Linked project invoice not found");
        }

        const now = new Date();
        baseMeta.projectId = projectId;
        baseMeta.invoiceId = invoiceId;
        await prisma.paymentTransaction.update({
          where: { id: locked.id },
          data: {
            status: "success",
            metadata: baseMeta as Prisma.InputJsonValue,
          },
        });
        await prisma.projectInvoice.update({
          where: { id: invoice.id },
          data: {
            status: "paid",
            paidAt: now,
            paymentTransactionId: locked.id,
          },
        });

        if (invoice.milestoneId) {
          await prisma.projectMilestone.update({
            where: { id: invoice.milestoneId },
            data: { status: "paid", paidAt: now },
          });
          const nextMilestone = await prisma.projectMilestone.findFirst({
            where: {
              projectId,
              orderIndex: { gt: invoice.milestone?.orderIndex ?? 0 },
              status: "locked",
            },
            orderBy: { orderIndex: "asc" },
          });
          if (nextMilestone) {
            await prisma.projectMilestone.update({
              where: { id: nextMilestone.id },
              data: { status: "unlocked", unlockedAt: now },
            });
            await prisma.projectInvoice.updateMany({
              where: { milestoneId: nextMilestone.id, status: "draft" },
              data: { status: "issued", issuedAt: now },
            });
          }
        }
        await prisma.projectActivity.create({
          data: {
            projectId,
            actorType: "system",
            actorId: locked.userId,
            action: "invoice_paid",
            note: `Invoice ${invoice.invoiceNumber} marked paid via Paystack.`,
            metadata: { paymentTransactionId: locked.id },
          },
        });
        return;
      }

      await prisma.paymentTransaction.update({
        where: { id: locked.id },
        data: {
          status: "success",
          metadata: baseMeta as Prisma.InputJsonValue,
        },
      });
    });

    void this.notifyPostPaystackSuccess(dbTx.id).catch((e) => {
      this.logger.error(
        `notifyPostPaystackSuccess: ${e instanceof Error ? e.message : String(e)}`,
      );
    });

    return { ok: true };
  }

  private async notifyPostPaystackSuccess(paymentId: string) {
    if (!this.mail.isEnabled()) return;
    const row = await this.prisma.paymentTransaction.findUnique({
      where: { id: paymentId },
      include: { user: { select: { email: true } } },
    });
    if (!row || row.status !== "success") return;
    const m = (row.metadata as Record<string, unknown> | null) ?? {};
    const amount = (Number(row.amountMinor) / 100).toFixed(2);
    if (row.type === "wallet_topup") {
      await this.mail.send(
        row.user.email,
        "Wallet top-up successful",
        `We received GHS ${amount} into your wallet. Reference: ${row.providerReference}. Thank you for choosing Ocean Cyber.`,
      );
    } else if (row.type === "product_checkout") {
      const item = String(m.renewalPlanName || m.planCode || "Your plan");
      await this.mail.send(
        row.user.email,
        "Subscription payment received",
        `Your payment of GHS ${amount} for ${item} was successful. Reference: ${row.providerReference}. You can manage renewals in your dashboard.`,
      );
    } else if (row.type === "project_invoice") {
      const invoiceNumber = String(m.invoiceNumber || "project invoice");
      await this.mail.send(
        row.user.email,
        "Project milestone payment received",
        `Your payment of GHS ${amount} for ${invoiceNumber} was successful. Reference: ${row.providerReference}. Check your dashboard for updated milestone status.`,
      );
    }
  }

  private async notifyWalletRenewalCharged(renewalId: string, userId: string) {
    if (!this.mail.isEnabled()) return;
    const [user, ren] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      }),
      this.prisma.userRenewal.findUnique({
        where: { id: renewalId },
        include: { plan: true },
      }),
    ]);
    if (!user?.email || !ren) return;
    const amount = (Number(ren.plan.amountMinor) / 100).toFixed(2);
    await this.mail.send(
      user.email,
      "Subscription renewed from wallet",
      `GHS ${amount} was debited from your wallet for ${ren.plan.name}. Next renewal: ${ren.nextRenewalAt.toISOString()}.`,
    );
  }

  private computeNextRenewalDate(from: Date, interval: string) {
    const next = new Date(from);
    if (interval === "monthly") next.setMonth(next.getMonth() + 1);
    else if (interval === "yearly") next.setFullYear(next.getFullYear() + 1);
    else next.setDate(next.getDate() + 30);
    return next;
  }

  /**
   * Core wallet charge used by user action and cron. Enforces cron cooldown unless forceRetry.
   */
  async attemptWalletChargeRenewal(
    renewalId: string,
    opts: { forceRetry?: boolean; triggeredBy: "user" | "cron" } = {
      triggeredBy: "cron",
    },
  ) {
    const now = new Date();
    const renewal = await this.prisma.userRenewal.findUnique({
      where: { id: renewalId },
      include: { plan: true, user: true },
    });
    if (!renewal) return { ok: false as const, code: "not_found" as const };
    if (renewal.cancelledAt)
      return { ok: false as const, code: "cancelled" as const };
    if (renewal.status === "paused" || renewal.pausedAt) {
      return { ok: false as const, code: "paused" as const };
    }

    if (renewal.status === "suspended") {
      return { ok: false as const, code: "suspended" as const };
    }

    if (renewal.status !== "active" && renewal.status !== "past_due") {
      return { ok: false as const, code: "invalid_status" as const };
    }

    if (
      renewal.status === "past_due" &&
      renewal.graceEndsAt &&
      renewal.graceEndsAt.getTime() < now.getTime()
    ) {
      await this.prisma.userRenewal.update({
        where: { id: renewalId },
        data: { status: "suspended" },
      });
      return { ok: false as const, code: "grace_expired" as const };
    }

    if (
      opts.triggeredBy === "cron" &&
      !opts.forceRetry &&
      renewal.lastChargeAttemptAt &&
      renewal.status === "past_due"
    ) {
      if (renewal.lastChargeAttemptAt > hoursAgo(now, 6)) {
        return { ok: false as const, code: "retry_later" as const };
      }
    }

    const amountMinor = renewal.plan.amountMinor;

    await this.prisma.userRenewal.update({
      where: { id: renewalId },
      data: { lastChargeAttemptAt: now },
    });

    if (renewal.user.walletBalanceMinor < amountMinor) {
      const graceDays = renewal.plan.gracePeriodDays;
      const graceEnds = new Date(now);
      graceEnds.setDate(graceEnds.getDate() + graceDays);
      await this.prisma.userRenewal.update({
        where: { id: renewalId },
        data: {
          status: "past_due",
          graceEndsAt: renewal.graceEndsAt ?? graceEnds,
          consecutiveFailures: { increment: 1 },
        },
      });
      return { ok: false as const, code: "insufficient_balance" as const };
    }

    const nextRenewalAt = this.computeNextRenewalDate(
      renewal.nextRenewalAt,
      renewal.plan.interval,
    );

    await this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: renewal.userId },
        data: { walletBalanceMinor: { decrement: amountMinor } },
      });
      await prisma.walletLedger.create({
        data: {
          userId: renewal.userId,
          type: "debit",
          amountMinor,
          currency: renewal.plan.currency,
          reference: `REN-${renewal.id}-${Date.now()}`,
          description: `Renewal charge for ${renewal.plan.name}`,
        },
      });
      await prisma.paymentTransaction.create({
        data: {
          userId: renewal.userId,
          type: "renewal",
          status: "success",
          amountMinor,
          currency: renewal.plan.currency,
          provider: "wallet",
          providerReference: `wallet-${renewal.id}-${Date.now()}`,
          metadata: { renewalId: renewal.id, planCode: renewal.plan.code },
        },
      });
      await prisma.userRenewal.update({
        where: { id: renewal.id },
        data: {
          nextRenewalAt,
          status: "active",
          graceEndsAt: null,
          consecutiveFailures: 0,
        },
      });
    });

    return {
      ok: true as const,
      renewalId,
      nextRenewalAt,
      userId: renewal.userId,
    };
  }

  async chargeRenewalFromWallet(user: SafeUser, renewalId: string) {
    const renewal = await this.prisma.userRenewal.findFirst({
      where: { id: renewalId, userId: user.id },
    });
    if (!renewal) throw new NotFoundException("Renewal not found");
    const result = await this.attemptWalletChargeRenewal(renewalId, {
      forceRetry: true,
      triggeredBy: "user",
    });
    if (!result.ok) {
      const msg: Record<string, string> = {
        insufficient_balance: "Insufficient wallet balance",
        paused: "Renewal is paused",
        cancelled: "Renewal is cancelled",
        suspended: "Renewal is suspended after grace period — contact support",
        grace_expired: "Grace period expired",
        invalid_status: "Renewal cannot be charged in its current state",
        not_found: "Renewal not found",
        retry_later: "Please try again later",
      };
      throw new BadRequestException(
        msg[result.code] || "Could not charge renewal",
      );
    }
    void this.notifyWalletRenewalCharged(result.renewalId, result.userId).catch(
      (e) => {
        this.logger.error(
          `notifyWalletRenewalCharged: ${e instanceof Error ? e.message : String(e)}`,
        );
      },
    );
    return result;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async processDueRenewals() {
    const now = new Date();
    await this.prisma.userRenewal.updateMany({
      where: {
        status: "past_due",
        graceEndsAt: { lt: now },
      },
      data: { status: "suspended" },
    });

    const due = await this.prisma.userRenewal.findMany({
      where: {
        autoRenewUsingWallet: true,
        pausedAt: null,
        cancelledAt: null,
        status: { in: ["active", "past_due"] },
        OR: [
          {
            status: "active",
            nextRenewalAt: { lte: now },
          },
          {
            status: "past_due",
            graceEndsAt: { gte: now },
          },
        ],
      },
      select: { id: true },
      take: 50,
    });

    for (const row of due) {
      try {
        const r = await this.attemptWalletChargeRenewal(row.id, {
          triggeredBy: "cron",
        });
        if (r.ok) {
          this.logger.log(`Auto-charged renewal ${row.id}`);
          void this.notifyWalletRenewalCharged(r.renewalId, r.userId).catch(
            (e) => {
              this.logger.error(
                `notify after cron: ${e instanceof Error ? e.message : String(e)}`,
              );
            },
          );
        }
      } catch (e) {
        this.logger.error(
          `Auto-charge failed for ${row.id}`,
          e instanceof Error ? e.stack : e,
        );
      }
    }
  }

  async getDashboard(user: SafeUser) {
    const [wallet, renewals, recentTx, ledgerPreview] = await Promise.all([
      this.getWallet(user),
      this.listRenewals(user),
      this.listTransactions(user, 8),
      this.listLedger(user, 5),
    ]);

    return {
      wallet,
      renewals,
      recentTransactions: recentTx,
      recentLedger: ledgerPreview,
    };
  }
}
