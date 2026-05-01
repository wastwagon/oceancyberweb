import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MailService } from "../mail/mail.service";
import { ConfigService } from "@nestjs/config";
import { CreateCalculatorLeadDto } from "./dto/create-calculator-lead.dto";

// Replicated constants from frontend lib (future: move to @oceancyber/shared)
const HOURLY_RATE_GHS = 85;
const ESTIMATE_VARIANCE = 0.1;

const COMPLEXITY_OPTIONS = [
  { id: "simple", multiplier: 1 },
  { id: "medium", multiplier: 1.3 },
  { id: "complex", multiplier: 1.6 },
];

const PLATFORM_OPTIONS = [
  { id: "web", label: "Web application", baseHours: 0 },
  { id: "mobile", label: "Mobile app", baseHours: 32 },
  { id: "both", label: "Web + mobile", baseHours: 72 },
  { id: "static_api", label: "Marketing site + API", baseHours: 12 },
];

const DESIGN_OPTIONS = [
  { id: "template", label: "Template / UI kit", addHours: 0 },
  { id: "custom", label: "Custom UI", addHours: 36 },
  { id: "design_system", label: "Full design system", addHours: 64 },
];

const PROJECT_FEATURES = [
  { id: "auth_social", label: "Social login (OAuth)", hours: 30 },
  { id: "auth_email", label: "Email and password", hours: 16 },
  { id: "auth_mfa", label: "MFA (app or SMS)", hours: 28 },
  { id: "pay_stripe", label: "Stripe (cards)", hours: 50 },
  { id: "pay_paystack", label: "Paystack (MoMo, cards)", hours: 40 },
  { id: "subscription", label: "Subscriptions and billing", hours: 55 },
  { id: "structured-content", label: "Structured content layer", hours: 32 },
  { id: "blog", label: "Blog or help center", hours: 22 },
  { id: "i18n", label: "More than one language", hours: 40 },
  { id: "search", label: "Search and filters", hours: 24 },
  { id: "admin", label: "Admin back office", hours: 48 },
  { id: "api_public", label: "Public or partner API", hours: 40 },
  { id: "realtime", label: "Live updates", hours: 36 },
  { id: "email", label: "Email automation", hours: 20 },
  { id: "notif", label: "Push and in-app alerts", hours: 30 },
  { id: "file", label: "File storage and media", hours: 24 },
  { id: "maps", label: "Maps and location", hours: 20 },
  { id: "analytics", label: "Product analytics", hours: 16 },
  { id: "seo", label: "Technical SEO", hours: 20 },
  { id: "reporting", label: "Reports and exports", hours: 32 },
];

const TIMELINE_OPTIONS = [
  { value: "under-4w", label: "ASAP (under 4 weeks)", rushLabourMultiplier: 1.28 },
  { value: "1-3m", label: "1–3 months", rushLabourMultiplier: 1.0 },
  { value: "3-6m", label: "3–6 months", rushLabourMultiplier: 0.96 },
  { value: "6m-plus", label: "6+ months / flexible", rushLabourMultiplier: 0.92 },
];

@Injectable()
export class CalculatorService {
  private readonly logger = new Logger(CalculatorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async createLead(dto: CreateCalculatorLeadDto) {
    const pricing = this.computePricing(dto);

    const platform = PLATFORM_OPTIONS.find((p) => p.id === dto.platformId);
    const design = DESIGN_OPTIONS.find((d) => d.id === dto.designId);
    const complexity = COMPLEXITY_OPTIONS.find((c) => c.id === dto.complexityId);
    const timeline = TIMELINE_OPTIONS.find((t) => t.value === dto.timeline);

    const lineSummary = dto.featureIds.length
      ? `Features (${dto.featureIds.length}): ${dto.featureIds.join(", ")}`
      : "No optional features selected.";

    const metadata = {
      v: 1,
      event: dto.event || null,
      platformId: dto.platformId,
      designId: dto.designId,
      complexityId: dto.complexityId,
      timeline: dto.timeline,
      featureIds: dto.featureIds,
      rangeLowGhs: pricing.rangeLowGhs,
      rangeHighGhs: pricing.rangeHighGhs,
      totalMidGhs: pricing.totalMidGhs,
      totalHours: pricing.totalHours,
    };

    const message = `Project cost calculator — ${dto.event || "lead"}\n\n` +
      `Name: ${dto.name}\n` +
      `Email: ${dto.email}\n` +
      `Target timeline: ${timeline?.label || dto.timeline}\n` +
      `Platform: ${platform?.label || dto.platformId}\n` +
      `Design: ${design?.label || dto.designId}\n` +
      `Complexity: ${complexity?.id || dto.complexityId}\n` +
      `${lineSummary}\n` +
      `\nEstimate (GHS, indicative): ${Math.round(pricing.rangeLowGhs).toLocaleString("en-GH")} – ${Math.round(
        pricing.rangeHighGhs,
      ).toLocaleString("en-GH")} (mid ~ ${Math.round(pricing.totalMidGhs).toLocaleString("en-GH")})`;

    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: null,
        message,
        source: "project_calculator",
        metadata: metadata as any,
        status: "new",
      },
    });

    this.logger.log(`New calculator lead from ${dto.email}`);

    const adminEmail = this.config.get<string>("CONTACT_NOTIFICATION_EMAIL");
    if (adminEmail && this.mail.isEnabled()) {
      await this.mail.send(
        adminEmail,
        `[Project Calculator] ${dto.name} · GHS ${Math.round(pricing.totalMidGhs).toLocaleString()}`,
        message,
      );
    }

    return { ok: true, pricing };
  }

  private computePricing(dto: CreateCalculatorLeadDto) {
    const complexity = COMPLEXITY_OPTIONS.find((c) => c.id === dto.complexityId);
    const mult = complexity?.multiplier ?? 1;
    
    const timeline = TIMELINE_OPTIONS.find((t) => t.value === dto.timeline);
    const rush = timeline?.rushLabourMultiplier ?? 1;

    const platform = PLATFORM_OPTIONS.find((p) => p.id === dto.platformId);
    const design = DESIGN_OPTIONS.find((d) => d.id === dto.designId);

    const baseHours = (platform?.baseHours || 0) + (design?.addHours || 0);
    let featureHours = 0;
    
    for (const fId of dto.featureIds) {
      const f = PROJECT_FEATURES.find((feat) => feat.id === fId);
      if (f) featureHours += f.hours;
    }

    const totalHours = baseHours + featureHours;
    const totalMidGhs = totalHours * HOURLY_RATE_GHS * mult * rush;
    
    return {
      totalHours,
      totalMidGhs,
      rangeLowGhs: totalMidGhs * (1 - ESTIMATE_VARIANCE),
      rangeHighGhs: totalMidGhs * (1 + ESTIMATE_VARIANCE),
    };
  }
}
