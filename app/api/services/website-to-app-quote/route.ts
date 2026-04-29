import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isSmtpOutboxConfigured, sendSmtpTo } from "@/lib/notify-smtp";
import {
  CONTACT_LEAD_STATUS,
  CONTACT_SOURCE,
  WEBSITE_TO_APP_QUOTE_METADATA_VERSION,
  type WebsiteToAppQuoteMetadata,
} from "@/lib/inbound-contact";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(200).optional(),
  websiteUrl: z.string().trim().url().max(600),
  currentStack: z.string().trim().max(120).optional(),
  desiredPlatforms: z.array(z.enum(["ios", "android", "both"])).min(1).max(2),
  needsAuth: z.boolean().default(false),
  needsPayments: z.boolean().default(false),
  needsPushNotifications: z.boolean().default(false),
  timelineBand: z.string().trim().min(1).max(80),
  budgetBand: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
  const limited = await rateLimitPublicApi(request, "website-to-app-quote");
  if (limited) return limited;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat()[0] ?? "Please check the form and try again.";
    return NextResponse.json({ error: msg, fields: first }, { status: 400 });
  }

  const data = parsed.data;
  const metadata: WebsiteToAppQuoteMetadata = {
    v: WEBSITE_TO_APP_QUOTE_METADATA_VERSION,
    websiteUrl: data.websiteUrl,
    currentStack: data.currentStack || null,
    desiredPlatforms: data.desiredPlatforms,
    needsAuth: data.needsAuth,
    needsPayments: data.needsPayments,
    needsPushNotifications: data.needsPushNotifications,
    timelineBand: data.timelineBand,
    budgetBand: data.budgetBand,
    notes: data.notes || null,
  };

  const message =
    `Website to mobile app conversion quote\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "-"}\n` +
    `Company: ${data.company || "-"}\n` +
    `Website: ${data.websiteUrl}\n` +
    `Current stack: ${data.currentStack || "-"}\n` +
    `Target platforms: ${data.desiredPlatforms.join(", ")}\n` +
    `Needs auth: ${data.needsAuth ? "Yes" : "No"}\n` +
    `Needs payments: ${data.needsPayments ? "Yes" : "No"}\n` +
    `Needs push: ${data.needsPushNotifications ? "Yes" : "No"}\n` +
    `Timeline: ${data.timelineBand}\n` +
    `Budget: ${data.budgetBand}\n\n` +
    `Notes:\n${data.notes || "-"}`;

  try {
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message,
        source: CONTACT_SOURCE.websiteToAppQuote,
        metadata,
        status: CONTACT_LEAD_STATUS.new,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "We could not save your request right now. Please try again." },
      { status: 500 },
    );
  }

  const notifyTo = (process.env.PROJECT_ESTIMATE_NOTIFY_TO || "info@oceancyber.net").trim();
  if (notifyTo && isSmtpOutboxConfigured()) {
    await sendSmtpTo(
      notifyTo,
      `[Website→App Quote] ${data.name} · ${data.timelineBand}`,
      message,
    );
  }

  return NextResponse.json({ ok: true as const });
}
