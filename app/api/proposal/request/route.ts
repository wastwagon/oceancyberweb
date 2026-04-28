import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isSmtpOutboxConfigured, sendSmtpTo } from "@/lib/notify-smtp";
import {
  CONTACT_LEAD_STATUS,
  CONTACT_SOURCE,
  PROPOSAL_REQUEST_METADATA_VERSION,
  type ProposalRequestContactMetadata,
} from "@/lib/inbound-contact";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(200).optional(),
  projectType: z.enum(["website", "mobile_app", "ecommerce", "security", "support", "other"]),
  currentSituation: z.string().trim().min(20).max(6000),
  requiredScope: z.array(z.string().trim().min(1).max(120)).min(1).max(20),
  budgetBand: z.string().trim().min(1).max(80),
  timelineBand: z.string().trim().min(1).max(80),
  decisionDeadline: z.string().trim().max(40).optional(),
  needsNda: z.boolean(),
  wantsProposalWalkthrough: z.boolean(),
});

export async function POST(request: Request) {
  const limited = await rateLimitPublicApi(request, "proposal-request");
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat()[0] ?? "Please check the form and try again.";
    return NextResponse.json({ error: msg, fields: first }, { status: 400 });
  }

  const data = parsed.data;
  const metadata: ProposalRequestContactMetadata = {
    v: PROPOSAL_REQUEST_METADATA_VERSION,
    company: data.company || null,
    projectType: data.projectType,
    currentSituation: data.currentSituation,
    requiredScope: data.requiredScope,
    budgetBand: data.budgetBand,
    timelineBand: data.timelineBand,
    decisionDeadline: data.decisionDeadline || null,
    needsNda: data.needsNda,
    wantsProposalWalkthrough: data.wantsProposalWalkthrough,
  };

  const message =
    `Formal proposal request\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone || "-"}\n` +
    `Company: ${data.company || "-"}\n` +
    `Project type: ${data.projectType}\n` +
    `Budget: ${data.budgetBand}\n` +
    `Timeline: ${data.timelineBand}\n` +
    `Decision deadline: ${data.decisionDeadline || "-"}\n` +
    `Needs NDA: ${data.needsNda ? "Yes" : "No"}\n` +
    `Wants walkthrough: ${data.wantsProposalWalkthrough ? "Yes" : "No"}\n` +
    `Proposal should include: ${data.requiredScope.join(", ")}\n\n` +
    `Current situation:\n${data.currentSituation}`;

  try {
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message,
        source: CONTACT_SOURCE.proposalRequest,
        metadata,
        status: CONTACT_LEAD_STATUS.new,
      },
    });
  } catch (err) {
    console.error("[api/proposal/request]", err);
    return NextResponse.json({ error: "We could not save this request right now." }, { status: 500 });
  }

  const notifyTo = (
    process.env.PROPOSAL_NOTIFY_TO ||
    process.env.INTAKE_NOTIFY_TO ||
    process.env.PROJECT_ESTIMATE_NOTIFY_TO ||
    "info@oceancyber.net"
  ).trim();
  if (notifyTo && isSmtpOutboxConfigured()) {
    await sendSmtpTo(notifyTo, `[Proposal] ${data.name} · ${data.projectType} · ${data.budgetBand}`, message);
  }

  return NextResponse.json({ ok: true as const });
}
