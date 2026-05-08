import { jwtVerify } from "jose";

function secretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || "dev-only-change-me");
}

/** Validates Nest-issued HS256 access JWT (same secret as `backend` `JWT_SECRET`). */
export async function verifyAccessJwt(token: string): Promise<void> {
  await jwtVerify(token, secretKey());
}
