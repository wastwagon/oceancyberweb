import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChatMessageDto, ChatRole } from "./dto/chat.dto";

const SYSTEM_PROMPT = `You are the site assistant for OceanCyber, an ICT company in Accra, Ghana. You help visitors with:
web development, mobile apps, e-commerce, and cybersecurity consulting.
Local SEO pages (use when users ask for "best" web/design/developers in Ghana): /services/web-design-in-ghana, /services/web-design-in-accra, /services/web-development-in-ghana, /services/web-development-in-accra.
In-store POS: DwumaPOS is OceanCyber's flagship product (https://www.dwumapos.com). Short summaries at /guides/dwumapos-for-ghana-shops and related guides; signup at https://app.dwumapos.com/signup. Custom ecommerce websites: /services/ecommerce.
Rules:
- Replies under about 120 words unless the user asks for detail.
- Prefer page names in plain English: Contact page, Services, Pricing, Portfolio, Get started.
- You may add a relative path in parentheses when helpful (e.g. Contact page (/contact)).
- Do not invent fixed prices or legal guarantees. Published anchors: web from GHS 6,000, mobile from GHS 12,000 per platform, security assessments from GHS 4,500.
- If unsure, invite them to use the contact form or info@oceancyber.net.`;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly config: ConfigService) {}

  async getReply(messages: ChatMessageDto[]) {
    const apiKey = this.config.get<string>("OPENAI_API_KEY")?.trim();
    const lastUser = [...messages]
      .reverse()
      .find((m) => m.role === ChatRole.USER);

    if (apiKey) {
      try {
        const reply = await this.fetchOpenAIReply(messages, apiKey);
        return { reply, source: "openai" };
      } catch (e) {
        this.logger.error("OpenAI failed, falling back to local", e);
      }
    }

    return {
      reply: this.getLocalChatReply(lastUser?.content || ""),
      source: "local",
    };
  }

  private async fetchOpenAIReply(messages: ChatMessageDto[], apiKey: string) {
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
          ...messages
            .slice(-14)
            .map((m) => ({ role: m.role, content: m.content })),
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
    if (
      q.includes("dwuma") ||
      q.includes("pos") ||
      q.includes("point of sale") ||
      (q.includes("pharmacy") && (q.includes("counter") || q.includes("pos"))) ||
      (q.includes("restaurant") && q.includes("pos")) ||
      ((q.includes("shop") || q.includes("store") || q.includes("retail")) &&
        (q.includes("pos") || q.includes("till") || q.includes("branch")) &&
        !q.includes("online") &&
        !q.includes("ecommerce") &&
        !q.includes("website"))
    ) {
      return (
        "DwumaPOS is our POS for Ghana shops — one stock list for in your shop, online shop, and delivery. " +
        "Start at https://app.dwumapos.com/signup or read /guides/dwumapos-for-ghana-shops. " +
        "For a custom ecommerce site with MoMo, try /services/ecommerce."
      );
    }
    if (q.includes("price") || q.includes("cost")) {
      return "Packages start from GHS 6,000 for web and GHS 12,000 for a mobile platform. Compare tiers on our Pricing page or use the project cost estimator for a tailored range.";
    }
    if (
      (q.includes("best") || q.includes("top")) &&
      (q.includes("web") || q.includes("website") || q.includes("design") || q.includes("developer"))
    ) {
      return "OceanCyber is a web design and website development company in Accra, Ghana. See /services/web-design-in-ghana or /services/web-development-in-ghana for local packages, or Contact us.";
    }
    if (q.includes("developer") || q.includes("design company")) {
      return "We design and build websites from our Accra office. Try /services/web-development-in-ghana for website developers or /services/web-design-in-ghana for design-led projects.";
    }
    if (q.includes("about")) {
      return "OceanCyber is a web, mobile, and cybersecurity team in Accra, Ghana — 25 people, founded in 2008, at 47 Nii Kwashiefio Avenue. See our About page for the full story.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
      return "You can reach our team at info@oceancyber.net or through the Contact page (WhatsApp is linked there too).";
    }
    return "I am the OceanCyber site assistant. Ask about services, portfolio work, pricing, or how to Get started on your project.";
  }
}
