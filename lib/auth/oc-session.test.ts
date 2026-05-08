import { afterEach, describe, expect, it } from "vitest";
import { ocAccessCookieSecure } from "./oc-session";

describe("ocAccessCookieSecure", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.AUTH_COOKIE_SECURE;
    delete process.env.AUTH_COOKIE_INSECURE;
  });

  it("uses Secure when public site URL is https", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.example.com";
    expect(ocAccessCookieSecure()).toBe(true);
  });

  it("skips Secure for http localhost URLs by default", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3020";
    expect(ocAccessCookieSecure()).toBe(false);
  });

  it("honors AUTH_COOKIE_SECURE=true even over http URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3020";
    process.env.AUTH_COOKIE_SECURE = "true";
    expect(ocAccessCookieSecure()).toBe(true);
  });

  it("honors AUTH_COOKIE_INSECURE=true even for https URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.example.com";
    process.env.AUTH_COOKIE_INSECURE = "true";
    expect(ocAccessCookieSecure()).toBe(false);
  });
});
