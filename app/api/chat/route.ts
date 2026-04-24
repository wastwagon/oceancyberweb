import { NextResponse } from "next/server";
import { z } from "zod";
import { getLocalChatReply } from "@/lib/chat-reply";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
});

const SYSTEM_PROMPT = `You are the site assistant for OceanCyber, an ICT company in Accra, Ghana. You help visitors with:
web development, mobile apps, e-commerce, and cybersecurity / delivery.
Rules:
- Replies under about 120 words unless the user asks for detail.
- Prefer suggesting next steps: /contact for human follow-up, /services to explore offerings, /portfolio or /case-studies for work samples.
- Use relative paths like /contact (not full URLs unless the user asks).
- Do not invent fixed prices or legal guarantees.
- If unsure, invite them to use the contact form or info@oceancyber.net.`;

async function fetchOpenAIReply(
  messages: z.infer<typeof messageSchema>[],
  apiKey: string
): Promise<string> {
  const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-14).map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 450,
      temperature: 0.55,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[api/chat] OpenAI HTTP", res.status, errText.slice(0, 500));
    throw new Error("openai_http_error");
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    console.error("[api/chat] OpenAI empty choices", JSON.stringify(data).slice(0, 400));
    throw new Error("openai_empty");
  }
  return text;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid messages", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { messages } = parsed.data;
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (apiKey) {
    try {
      const reply = await fetchOpenAIReply(messages, apiKey);
      return NextResponse.json({ reply, source: "openai" as const });
    } catch {
      const reply = getLocalChatReply(lastUser.content);
      return NextResponse.json({ reply, source: "local_fallback" as const });
    }
  }

  const reply = getLocalChatReply(lastUser.content);
  return NextResponse.json({ reply, source: "local" as const });
}
