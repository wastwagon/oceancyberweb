import { describe, expect, it } from "vitest";
import { getLocalChatReply } from "@/lib/chat-reply";

describe("getLocalChatReply POS routing", () => {
  it("routes pharmacy counter questions to DwumaPOS", () => {
    const reply = getLocalChatReply("We need pharmacy POS for two branches");
    expect(reply).toMatch(/dwumapos\.com|app\.dwumapos\.com/);
  });

  it("does not hijack online shop requests", () => {
    const reply = getLocalChatReply("We need an online shop ecommerce website");
    expect(reply).not.toMatch(/dwumapos-for-ghana-shops/);
  });
});

describe("getLocalChatReply agency positioning", () => {
  it("answers boutique or studio questions with agency identity", () => {
    const reply = getLocalChatReply("Are you a design studio?");
    expect(reply.toLowerCase()).toContain("website and mobile application development agency");
    expect(reply.toLowerCase()).not.toMatch(/\bdesign studio\b/);
    expect(reply.toLowerCase()).toContain("development agency");
  });
});
