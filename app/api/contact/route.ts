import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const contactBodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email required").max(320),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Message is required").max(10_000),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactBodySchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      Object.values(first).flat()[0] ?? "Please check the form and try again.";
    return NextResponse.json({ error: msg, fields: first }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;
  const phoneValue = phone && phone.length > 0 ? phone : null;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phone: phoneValue,
        message,
      },
    });
    return NextResponse.json({ ok: true as const });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json(
      {
        error:
          "We could not save your message right now. Please email info@oceancyber.net or use WhatsApp.",
      },
      { status: 500 }
    );
  }
}
