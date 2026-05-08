import { describe, expect, it } from "vitest";
import { cn, formatPhoneNumber, formatWhatsAppLink } from "./utils";

describe("cn", () => {
  it("merges tailwind classes without duplicates", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});

describe("formatPhoneNumber", () => {
  it("prefixes Ghana 0-leading numbers", () => {
    expect(formatPhoneNumber("0241234567")).toBe("+233241234567");
  });

  it("keeps 233-prefixed digits", () => {
    expect(formatPhoneNumber("233241234567")).toBe("+233241234567");
  });
});

describe("formatWhatsAppLink", () => {
  it("builds a wa.me URL with encoded default text", () => {
    const href = formatWhatsAppLink("0241234567");
    expect(href.startsWith("https://wa.me/233241234567")).toBe(true);
    expect(href).toContain("text=");
  });

  it("uses a custom message when provided", () => {
    const href = formatWhatsAppLink("0241234567", "Hello");
    expect(decodeURIComponent(href.split("text=")[1] || "")).toBe("Hello");
  });
});
