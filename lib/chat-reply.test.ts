import { describe, expect, it } from "vitest";
import { getLocalChatReply } from "@/lib/chat-reply";

describe("getLocalChatReply POS routing", () => {
  it("routes pharmacy counter questions to Dwuma guides", () => {
    const reply = getLocalChatReply("We need pharmacy POS for two branches");
    expect(reply).toMatch(/dwumapos-pharmacy-pos-ghana/);
  });

  it("does not hijack online shop requests", () => {
    const reply = getLocalChatReply("We need an online shop ecommerce website");
    expect(reply).not.toMatch(/dwumapos-for-ghana-shops/);
  });
});
