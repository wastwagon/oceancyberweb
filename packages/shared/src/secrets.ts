const WEAK_JWT_SECRETS = new Set([
  "dev-only-change-me",
  "change-me-generate-a-long-random-string",
]);

const WEAK_SESSION_SECRETS = new Set([
  "dev-session-secret-change-me",
  "change-session-secret-generate-random",
]);

export type SecretEnv = {
  nodeEnv?: string;
  jwtSecret?: string;
  sessionSecret?: string;
  /** When true, skip checks (GitHub Actions build uses production mode). */
  ci?: boolean;
};

/** Fail fast when production is started with default or missing secrets. */
export function assertProductionSecrets(
  env: SecretEnv,
  label = "app",
): void {
  if (env.nodeEnv !== "production") return;
  if (env.ci) return;

  const jwt = env.jwtSecret?.trim();
  if (!jwt || WEAK_JWT_SECRETS.has(jwt)) {
    throw new Error(
      `[${label}] JWT_SECRET must be set to a strong random value in production`,
    );
  }

  const session = env.sessionSecret?.trim();
  if (!session || WEAK_SESSION_SECRETS.has(session)) {
    throw new Error(
      `[${label}] SESSION_SECRET must be set to a strong random value in production`,
    );
  }
}
