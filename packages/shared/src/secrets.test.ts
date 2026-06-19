import { describe, expect, it } from "vitest";
import { assertProductionSecrets } from "./secrets";

describe("assertProductionSecrets", () => {
  it("no-ops outside production", () => {
    expect(() =>
      assertProductionSecrets({ nodeEnv: "development", jwtSecret: "weak" }),
    ).not.toThrow();
  });

  it("no-ops in CI production builds", () => {
    expect(() =>
      assertProductionSecrets({
        nodeEnv: "production",
        jwtSecret: "change-me-generate-a-long-random-string",
        ci: true,
      }),
    ).not.toThrow();
  });

  it("throws for default JWT secret in production", () => {
    expect(() =>
      assertProductionSecrets({
        nodeEnv: "production",
        jwtSecret: "change-me-generate-a-long-random-string",
        sessionSecret: "a-unique-session-secret-value-here",
      }),
    ).toThrow(/JWT_SECRET/);
  });

  it("throws for default session secret in production", () => {
    expect(() =>
      assertProductionSecrets({
        nodeEnv: "production",
        jwtSecret: "a-unique-jwt-secret-value-here-min-32",
        sessionSecret: "change-session-secret-generate-random",
      }),
    ).toThrow(/SESSION_SECRET/);
  });

  it("passes with strong secrets", () => {
    expect(() =>
      assertProductionSecrets({
        nodeEnv: "production",
        jwtSecret: "a-unique-jwt-secret-value-here-min-32",
        sessionSecret: "a-unique-session-secret-value-here",
      }),
    ).not.toThrow();
  });
});
