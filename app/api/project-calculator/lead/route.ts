import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendSmtpTo, isSmtpOutboxConfigured } from "@/lib/notify-smtp";
import { computeProjectPricing } from "@/lib/project-calculator/pricing";
import {
  COMPLEXITY_OPTIONS,
  DESIGN_OPTIONS,
  PLATFORM_OPTIONS,
  PROJECT_FEATURE_ID_SET,
  TIMELINE_OPTIONS,
  PROFORMA_COMPANY,
  type ComplexityId,
  type DesignId,
  type PlatformId,
} from "@/lib/project-calculator/config";
import {
  CONTACT_LEAD_STATUS,
  CONTACT_SOURCE,
  PROJECT_CALCULATOR_METADATA_VERSION,
  type ProjectCalculatorContactMetadata,
} from "@/lib/inbound-contact";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const leadBody = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  timeline: z.string().min(1),
  platformId: z.string(),
  designId: z.string(),
  complexityId: z.string(),
  featureIds: z.array(z.string()).max(80),
  event: z.enum(["proforma_download", "print_summary"]).optional(),
});

export async function POST(request: Request) {
  const limited = rateLimitPublicApi(request, "project-calculator");
  if (limited) {
    return limited;
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, timeline, platformId, designId, complexityId, featureIds, event } = parsed.data;

  if (
    !PLATFORM_OPTIONS.some((p) => p.id === platformId) ||
    !DESIGN_OPTIONS.some((d) => d.id === designId) ||
    !COMPLEXITY_OPTIONS.some((c) => c.id === complexityId)
  ) {
    return NextResponse.json({ error: "Invalid option ids" }, { status: 400 });
  }
  if (!TIMELINE_OPTIONS.some((t) => t.value === timeline)) {
    return NextResponse.json({ error: "Invalid timeline" }, { status: 400 });
  }

  for (const id of featureIds) {
    if (!PROJECT_FEATURE_ID_SET.has(id)) {
      return NextResponse.json(
        { error: "One or more feature ids are not valid. Refresh the page and try again." },
        { status: 400 },
      );
    }
  }

  const pricing = computeProjectPricing(
    platformId as PlatformId,
    designId as DesignId,
    new Set(featureIds),
    complexityId as ComplexityId,
    { timelineId: timeline },
  );

  const pLabel = PLATFORM_OPTIONS.find((p) => p.id === platformId)!.label;
  const dLabel = DESIGN_OPTIONS.find((d) => d.id === designId)!.label;
  const cLabel = COMPLEXITY_OPTIONS.find((c) => c.id === complexityId)!.label;
  const tLabel = TIMELINE_OPTIONS.find((t) => t.value === timeline)!.label;

  const lineSummary = featureIds.length
    ? `Features (${featureIds.length}): ${featureIds.join(", ")}`
    : "No optional features selected (platform + design only).";

  const metadata: ProjectCalculatorContactMetadata = {
    v: PROJECT_CALCULATOR_METADATA_VERSION,
    event: event ?? null,
    platformId,
    designId,
    complexityId,
    timeline,
    featureIds: [...featureIds],
    rangeLowGhs: pricing.rangeLowGhs,
    rangeHighGhs: pricing.rangeHighGhs,
    totalMidGhs: pricing.totalMidGhs,
    totalHours: pricing.totalHours,
  };

  const message = `Project cost calculator — ${event ?? "lead"}\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Target timeline: ${tLabel} (×${pricing.rushLabourMultiplier} labour on timeline)\n` +
    `Platform: ${pLabel}\n` +
    `Design: ${dLabel}\n` +
    `Complexity: ${cLabel} (×${pricing.complexityMultiplier})\n` +
    `${lineSummary}\n` +
    `\nEstimate (GHS, indicative): ${Math.round(pricing.rangeLowGhs).toLocaleString("en-GH")} – ${Math.round(
      pricing.rangeHighGhs,
    ).toLocaleString("en-GH")} (mid ~ ${Math.round(pricing.totalMidGhs).toLocaleString("en-GH")})`;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phone: null,
        message,
        source: CONTACT_SOURCE.projectCalculator,
        metadata,
        status: CONTACT_LEAD_STATUS.new,
      },
    });
  } catch (e) {
    console.error("[api/project-calculator/lead] prisma", e);
    return NextResponse.json(
      { error: "We could not save this lead. Please try again or email us directly." },
      { status: 500 },
    );
  }

  const notifyTo = (process.env.PROJECT_ESTIMATE_NOTIFY_TO || PROFORMA_COMPANY.email).trim();
  if (isSmtpOutboxConfigured() && notifyTo) {
    const subj = `[Project calculator] ${name} · ${tLabel} · GHS ${Math.round(pricing.totalMidGhs)} (mid)`;
    await sendSmtpTo(notifyTo, subj, message);
  }

  return NextResponse.json({ ok: true as const, saved: true, emailed: isSmtpOutboxConfigured() });
}
