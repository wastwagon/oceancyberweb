export async function register() {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.CI === "true") return;
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { assertProductionSecrets } = await import("@oceancyber/shared");
  assertProductionSecrets(
    {
      nodeEnv: process.env.NODE_ENV,
      jwtSecret: process.env.JWT_SECRET,
      sessionSecret: process.env.SESSION_SECRET,
    },
    "next",
  );
}
