import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isSmtpOutboxConfigured, sendSmtpTo } from "@/lib/notify-smtp";
import {
  CONTACT_LEAD_STATUS,
  CONTACT_SOURCE,
  INTAKE_WIZARD_METADATA_VERSION,
  type IntakeWizardContactMetadata,
} from "@/lib/inbound-contact";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const intakeBodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(200).optional(),
  serviceNeeds: z.array(z.string().trim().min(1).max(120)).min(1).max(16),
  goals: z.string().trim().min(12).max(4000),
  budgetBand: z.string().trim().min(1).max(80),
  timelineBand: z.string().trim().min(1).max(80),
  hasExistingSite: z.boolean(),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
  meetingType: z.enum(["discovery_call", "proposal_walkthrough", "asynchronous_quote"]),
  preferredDate: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  const limited = rateLimitPublicApi(request, "intake-submit");
  if (limited) {
    return limited;
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = intakeBodySchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat()[0] ?? "Please check the form and try again.";
    return NextResponse.json({ error: msg, fields: first }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    company,
    serviceNeeds,
    goals,
    budgetBand,
    timelineBand,
    hasExistingSite,
    contactMethod,
    meetingType,
    preferredDate,
  } = parsed.data;

  const metadata: IntakeWizardContactMetadata = {
    v: INTAKE_WIZARD_METADATA_VERSION,
    company: company || null,
    serviceNeeds,
    goals,
    budgetBand,
    timelineBand,
    hasExistingSite,
    contactMethod,
    meetingType,
    preferredDate: preferredDate || null,
  };

  const message =
    `Interactive intake request\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "-"}\n` +
    `Company: ${company || "-"}\n` +
    `Service needs: ${serviceNeeds.join(", ")}\n` +
    `Budget: ${budgetBand}\n` +
    `Timeline: ${timelineBand}\n` +
    `Existing website/app: ${hasExistingSite ? "Yes" : "No"}\n` +
    `Preferred contact: ${contactMethod}\n` +
    `Next step: ${meetingType}\n` +
    `Preferred date: ${preferredDate || "-"}\n\n` +
    `Goals:\n${goals}`;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        source: CONTACT_SOURCE.intakeWizard,
        metadata,
        status: CONTACT_LEAD_STATUS.new,
      },
    });
  } catch (err) {
    console.error("[api/intake/submit]", err);
    return NextResponse.json(
      { error: "We could not save your intake right now. Please try again." },
      { status: 500 },
    );
  }

  const notifyTo = (
    process.env.INTAKE_NOTIFY_TO ||
    process.env.PROJECT_ESTIMATE_NOTIFY_TO ||
    "info@oceancyber.net"
  ).trim();
  if (notifyTo && isSmtpOutboxConfigured()) {
    const subject = `[Intake] ${name} · ${budgetBand} · ${timelineBand}`;
    await sendSmtpTo(notifyTo, subject, message);
  }

  return NextResponse.json({ ok: true as const });
}
