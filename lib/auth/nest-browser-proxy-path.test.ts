import { describe, expect, it } from "vitest";
import { nestBrowserProxyPath } from "./nest-browser-proxy-path";

describe("nestBrowserProxyPath", () => {
  it("maps v1 API prefix to nested BFF route", () => {
    expect(nestBrowserProxyPath("/api/v1/auth/profile")).toBe("/api/nest/v1/auth/profile");
  });

  it("preserves query strings", () => {
    expect(nestBrowserProxyPath("/api/v1/admin/contacts/export.csv?take=10")).toBe(
      "/api/nest/v1/admin/contacts/export.csv?take=10",
    );
  });

  it("returns other paths unchanged", () => {
    expect(nestBrowserProxyPath("/api/auth/login")).toBe("/api/auth/login");
  });
});
