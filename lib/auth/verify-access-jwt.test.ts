import { SignJWT } from "jose";
import { afterEach, describe, expect, it } from "vitest";
import { decodeAccessJwt } from "./verify-access-jwt";

const secret = new TextEncoder().encode("test-jwt-secret-for-unit-tests");

async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.sub))
    .setExpirationTime("1h")
    .sign(secret);
}

describe("decodeAccessJwt", () => {
  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  it("reads isAdmin from JWT claim", async () => {
    process.env.JWT_SECRET = "test-jwt-secret-for-unit-tests";
    const token = await signToken({
      sub: "u1",
      email: "a@test.com",
      role: "user",
      isAdmin: true,
    });
    const claims = await decodeAccessJwt(token);
    expect(claims.isAdmin).toBe(true);
  });

  it("treats role admin as admin for legacy tokens", async () => {
    process.env.JWT_SECRET = "test-jwt-secret-for-unit-tests";
    const token = await signToken({
      sub: "u1",
      email: "a@test.com",
      role: "admin",
    });
    const claims = await decodeAccessJwt(token);
    expect(claims.isAdmin).toBe(true);
  });

  it("denies non-admin users", async () => {
    process.env.JWT_SECRET = "test-jwt-secret-for-unit-tests";
    const token = await signToken({
      sub: "u1",
      email: "a@test.com",
      role: "user",
      isAdmin: false,
    });
    const claims = await decodeAccessJwt(token);
    expect(claims.isAdmin).toBe(false);
  });
});
