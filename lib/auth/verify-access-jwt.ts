import { jwtVerify } from "jose";

export type AccessJwtClaims = {
  sub: string;
  email?: string;
  role?: string;
  isAdmin: boolean;
};

function secretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "dev-only-change-me");
}

/** Validates Nest-issued HS256 access JWT (same secret as `backend` `JWT_SECRET`). */
export async function verifyAccessJwt(token: string): Promise<void> {
  await jwtVerify(token, secretKey());
}

/** Decode and verify JWT; use for middleware admin checks. */
export async function decodeAccessJwt(token: string): Promise<AccessJwtClaims> {
  const { payload } = await jwtVerify(token, secretKey());
  const role = typeof payload.role === "string" ? payload.role : undefined;
  const isAdminClaim = payload.isAdmin === true;
  return {
    sub: String(payload.sub),
    email: typeof payload.email === "string" ? payload.email : undefined,
    role,
    isAdmin: isAdminClaim || role === "admin",
  };
}
