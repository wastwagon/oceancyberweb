import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  CONTACT_LEAD_STATUS,
  CONTACT_SOURCE,
  HELP_CENTER_FEEDBACK_METADATA_VERSION,
  type HelpCenterFeedbackMetadata,
} from "@/lib/inbound-contact";
import { rateLimitPublicApi } from "@/lib/rate-limit";

const bodySchema = z.object({
  articleId: z.string().trim().min(1).max(120),
  helpful: z.boolean(),
  issue: z.string().trim().max(80).optional(),
  query: z.string().trim().max(120).optional(),
});

export async function POST(request: Request) {
  const limited = await rateLimitPublicApi(request, "help-center-feedback");
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid feedback payload" }, { status: 400 });
  }
  const { articleId, helpful, issue, query } = parsed.data;

  const metadata: HelpCenterFeedbackMetadata = {
    v: HELP_CENTER_FEEDBACK_METADATA_VERSION,
    articleId,
    helpful,
    issue: issue || null,
    query: query || null,
  };

  try {
    await prisma.contact.create({
      data: {
        name: "Help center visitor",
        email: "help-center-feedback@oceancyber.local",
        phone: null,
        source: CONTACT_SOURCE.helpCenterFeedback,
        status: CONTACT_LEAD_STATUS.new,
        message: `Help center feedback: article=${articleId} helpful=${helpful ? "yes" : "no"} issue=${issue || "-"} query=${query || "-"}`,
        metadata,
      },
    });
  } catch (err) {
    console.error("[api/help-center/feedback]", err);
    return NextResponse.json({ error: "Could not save feedback right now." }, { status: 500 });
  }

  return NextResponse.json({ ok: true as const });
}
