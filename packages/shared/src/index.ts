/** Shared API contract between Next.js and NestJS */

export { isAdminForUser } from "./admin";
export { assertProductionSecrets } from "./secrets";
export { verifyPaystackWebhookSignature } from "./paystack";
export type { SecretEnv } from "./secrets";

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
  /** `user` or `admin` (see Prisma `UserRole` enum). */
  role: string;
  isAdmin?: boolean;
}

export interface ApiErrorShape {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export enum ContactSource {
  WEB_CONTACT_FORM = "web-contact-form",
  INTAKE_WIZARD = "intake_wizard",
  PROPOSAL_REQUEST = "proposal_request",
  WEBSITE_TO_APP_QUOTE = "website_to_app_quote",
  HELP_CENTER_FEEDBACK = "help_center_feedback",
}
