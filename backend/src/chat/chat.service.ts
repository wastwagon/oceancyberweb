import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const SYSTEM_PROMPT = `You are the site assistant for OceanCyber, an ICT company in Accra, Ghana. You help visitors with:
web development, mobile apps, e-commerce, and cybersecurity / delivery.
Rules:
- Replies under about 120 words unless the user asks for detail.
- Prefer suggesting next steps: /contact for human follow-up, /services to explore offerings, /portfolio or /case-studies for work samples.
- Use relative paths like /contact (not full URLs unless the user asks).
- Do not invent fixed prices or legal guarantees.
- If unsure, invite them to use the contact form or info@oceancyber.net.`;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly config: ConfigService) {}

  async getReply(messages: any[]) {
    const apiKey = this.config.get<string>("OPENAI_API_KEY")?.trim();
    const lastUser = [...messages].reverse().find((m) => m.role === "user");

    if (apiKey) {
      try {
        const reply = await this.fetchOpenAIReply(messages, apiKey);
        return { reply, source: "openai" };
      } catch (e) {
        this.logger.error("OpenAI failed, falling back to local", e);
      }
    }

    return { reply: this.getLocalChatReply(lastUser?.content || ""), source: "local" };
  }

  private async fetchOpenAIReply(messages: any[], apiKey: string) {
    const model = this.config.get<string>("OPENAI_CHAT_MODEL") ?? "gpt-4o-mini";
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

    if (!res.ok) throw new Error("OpenAI API error");
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim();
  }

  private getLocalChatReply(query: string): string {
    const q = query.toLowerCase();
    if (q.includes("price") || q.includes("cost")) {
      return "For a detailed price range based on your needs, try our project cost calculator at /tools/project-cost.";
    }
    if (q.includes("about")) {
      return "OceanCyber is an Accra-based digital partner specializing in high-performance web and mobile delivery. Learn more at /about.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
      return "You can reach our team at info@oceancyber.net or by using the contact form at /contact.";
    }
    return "I'm the OceanCyber site assistant. You can ask me about our services, portfolio, or how to get started with your digital project.";
  }
}
