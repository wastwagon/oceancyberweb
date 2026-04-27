/** Shared API contract between Next.js and NestJS */

export const API_VERSION = "v1" as const;

export interface ApiHealthResponse {
  status: string;
  timestamp: string;
  database: "up" | "down";
  redis: "up" | "down";
}

export interface AuthTokens {
  access_token: string;
  token_type: "Bearer";
  expires_in: string;
}

export interface AuthUserPublic {
  id: string;
  email: string;
  /** `"user"` until a `role` column exists on `User`; admin flows may override via JWT/profile. */
  role: string;
}

export interface ApiErrorShape {
  statusCode: number;
  message: string | string[];
  error?: string;
}
