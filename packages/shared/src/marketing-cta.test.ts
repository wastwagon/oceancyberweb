import { describe, expect, it } from "vitest";
import { SITE_CTA, getStartedHref, serviceHeroCta } from "./marketing-cta";

describe("marketing CTA constants", () => {
  it("uses plain paths without trailing slashes", () => {
    for (const { href } of Object.values(SITE_CTA)) {
      expect(href.startsWith("/")).toBe(true);
      expect(href.endsWith("/") && href.length > 1).toBe(false);
    }
  });

  it("keeps get-started as the service hero CTA", () => {
    expect(serviceHeroCta).toEqual(SITE_CTA.getStarted);
  });

  it("uses consistent talk-to-team wording", () => {
    expect(SITE_CTA.talkToTeam.label).toBe("Talk to our team");
    expect(SITE_CTA.talkToTeam.href).toBe("/contact");
  });

  it("builds get-started URLs with plan and topic", () => {
    expect(getStartedHref()).toBe("/get-started");
    expect(getStartedHref({ plan: "professional" })).toBe(
      "/get-started?plan=professional",
    );
    expect(getStartedHref({ topic: "Need quote" })).toBe(
      "/get-started?topic=Need+quote",
    );
    expect(getStartedHref({ plan: "startup", topic: "From pricing" })).toBe(
      "/get-started?plan=startup&topic=From+pricing",
    );
  });
});
