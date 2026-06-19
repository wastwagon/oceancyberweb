import { describe, expect, it } from "vitest";
import { isAdminForUser } from "./admin";

describe("isAdminForUser", () => {
  it("returns false for missing user", () => {
    expect(isAdminForUser(null, "a@b.com")).toBe(false);
    expect(isAdminForUser(undefined, "")).toBe(false);
  });

  it("grants admin when role is admin", () => {
    expect(
      isAdminForUser({ email: "u@example.com", role: "admin" }, ""),
    ).toBe(true);
  });

  it("grants admin when email is in ADMIN_EMAILS", () => {
    expect(
      isAdminForUser(
        { email: "Ops@Example.com", role: "user" },
        "other@test.com, ops@example.com",
      ),
    ).toBe(true);
  });

  it("denies regular users not in ADMIN_EMAILS", () => {
    expect(
      isAdminForUser({ email: "user@test.com", role: "user" }, "admin@test.com"),
    ).toBe(false);
  });
});
