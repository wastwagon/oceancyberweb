import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { BillingService } from "./billing.service";
import { CreateRenewalDto, ProductPayInitDto, TopupInitDto } from "./dto";

type RequestWithUser = Request & { user: { id: string; email: string } };

@Controller({ path: "billing", version: "1" })
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @UseGuards(JwtAuthGuard)
  @Get("wallet")
  wallet(@Req() req: RequestWithUser) {
    return this.billing.getWallet(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("wallet/ledger")
  ledger(@Req() req: RequestWithUser) {
    return this.billing.listLedger(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("transactions")
  transactions(@Req() req: RequestWithUser) {
    return this.billing.listTransactions(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("requests")
  requests(@Req() req: RequestWithUser, @Query("take") takeRaw?: string) {
    const take = Number(takeRaw ?? 50);
    return this.billing.listClientRequests(
      req.user,
      Number.isFinite(take) ? take : 50,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("transactions/:id/receipt")
  async receipt(@Req() req: RequestWithUser, @Param("id") id: string) {
    const text = await this.billing.getTransactionReceipt(req.user, id);
    return new StreamableFile(Buffer.from(text, "utf8"), {
      type: "text/plain; charset=utf-8",
      disposition: `attachment; filename="ocean-cyber-receipt-${id}.txt"`,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("transactions/:id/invoice")
  async invoice(@Req() req: RequestWithUser, @Param("id") id: string) {
    const html = await this.billing.getTransactionHtmlInvoice(req.user, id);
    return new StreamableFile(Buffer.from(html, "utf8"), {
      type: "text/html; charset=utf-8",
      disposition: "inline; filename=invoice.html",
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("renewals")
  renewals(@Req() req: RequestWithUser) {
    return this.billing.listRenewals(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("renewal-plans")
  renewalPlans() {
    return this.billing.listRenewalPlans();
  }

  @UseGuards(JwtAuthGuard)
  @Post("wallet/topup/initialize")
  initializeTopup(@Req() req: RequestWithUser, @Body() dto: TopupInitDto) {
    return this.billing.initializeTopup(req.user, dto.amountGhs);
  }

  @UseGuards(JwtAuthGuard)
  @Post("checkout/pay/initialize")
  productCheckout(@Req() req: RequestWithUser, @Body() dto: ProductPayInitDto) {
    return this.billing.initializeProductCheckout(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("payment/status")
  paymentStatus(
    @Req() req: RequestWithUser,
    @Query("reference") reference: string | undefined,
  ) {
    if (!reference?.trim()) {
      throw new BadRequestException("query parameter 'reference' is required");
    }
    return this.billing.getPaymentStatusByProviderReference(
      req.user,
      reference.trim(),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("renewals")
  createRenewal(@Req() req: RequestWithUser, @Body() dto: CreateRenewalDto) {
    return this.billing.createRenewal(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("renewals/:id/charge")
  chargeRenewal(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.billing.chargeRenewalFromWallet(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("renewals/:id/pause")
  pauseRenewal(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.billing.pauseRenewal(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("renewals/:id/resume")
  resumeRenewal(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.billing.resumeRenewal(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("renewals/:id/cancel")
  cancelRenewal(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.billing.cancelRenewal(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("dashboard")
  dashboard(@Req() req: RequestWithUser) {
    return this.billing.getDashboard(req.user);
  }

  @Post("paystack/webhook")
  @SkipThrottle()
  paystackWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers("x-paystack-signature") signature: string | undefined,
  ) {
    const raw = req.rawBody;
    if (!raw || !Buffer.isBuffer(raw)) {
      throw new BadRequestException(
        "Missing raw body for webhook verification",
      );
    }
    this.billing.verifyPaystackSignature(raw, signature);
    let payload: unknown;
    try {
      payload = JSON.parse(raw.toString("utf8")) as unknown;
    } catch {
      throw new BadRequestException("Invalid JSON payload");
    }
    return this.billing.handlePaystackWebhook(payload);
  }
}
