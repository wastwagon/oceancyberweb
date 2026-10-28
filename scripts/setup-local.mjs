#!/usr/bin/env node
/**
 * One-shot local setup (host dev: Next + Nest, Docker Postgres/Redis).
 * Usage: npm run setup:local
 *
 * Requires Docker Desktop. Adjust POSTGRES_PORT / REDIS_PORT in .env if ports clash.
 */
import { execSync, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");
const examplePath = resolve(root, ".env.example");

function run(cmd, opts = {}) {
  console.log(`\n→ ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit", ...opts });
}

function loadEnvText() {
  if (!existsSync(envPath)) {
    if (!existsSync(examplePath)) throw new Error("Missing .env and .env.example");
    writeFileSync(envPath, readFileSync(examplePath, "utf8"));
    console.log("Created .env from .env.example");
  }
  return readFileSync(envPath, "utf8");
}

function patchEnv() {
  let env = loadEnvText();
  const get = (k) => {
    const m = env.match(new RegExp(`^${k}=(.*)$`, "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
  };
  const set = (key, val) => {
    const re = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${val}`;
    env = re.test(env) ? env.replace(re, line) : `${env.trim()}\n${line}\n`;
  };

  set("POSTGRES_USER", "postgres");
  set("POSTGRES_PASSWORD", "oceancyber123");
  set("POSTGRES_DB", "oceancyber");
  if (!get("POSTGRES_PORT")) set("POSTGRES_PORT", "55440");
  if (!get("REDIS_PORT")) set("REDIS_PORT", "6390");
  const pgPort = get("POSTGRES_PORT") || "55440";
  set(
    "DATABASE_URL",
    `postgresql://postgres:oceancyber123@localhost:${pgPort}/oceancyber?schema=public`,
  );
  if (!get("NEXT_PUBLIC_SITE_URL")) set("NEXT_PUBLIC_SITE_URL", "http://localhost:3020");
  if (!get("NEXT_PUBLIC_API_URL")) set("NEXT_PUBLIC_API_URL", "http://localhost:4100");

  const weakJwt = new Set(["change-me-generate-a-long-random-string", "dev-only-change-me"]);
  const weakSes = new Set(["change-session-secret-generate-random", "dev-session-secret-change-me"]);
  if (!get("JWT_SECRET") || weakJwt.has(get("JWT_SECRET")) || get("JWT_SECRET").length < 24) {
    set("JWT_SECRET", crypto.randomBytes(32).toString("hex"));
  }
  if (!get("SESSION_SECRET") || weakSes.has(get("SESSION_SECRET")) || get("SESSION_SECRET").length < 24) {
    set("SESSION_SECRET", crypto.randomBytes(32).toString("hex"));
  }

  writeFileSync(envPath, env.endsWith("\n") ? env : `${env}\n`);
}

function dockerOk() {
  const r = spawnSync("docker", ["info"], { stdio: "ignore" });
  return r.status === 0;
}

patchEnv();

if (!dockerOk()) {
  console.error("\nDocker is not running. Start Docker Desktop, then re-run npm run setup:local");
  process.exit(1);
}

run("docker compose --env-file .env -f docker/docker-compose.dev.yml up -d postgres redis");
run("npm ci");
run("npx prisma generate");
run("npx prisma migrate deploy");
run("npx prisma db seed");
run("npm run sync:help-center");
run("npm run sync:insights");
run("npx playwright install chromium");
run("npm run preflight:local");

console.log("\n✓ Local setup complete.");
console.log("  Site:  npm run dev          → http://localhost:3020");
console.log("  API:   npm run dev:api       → http://localhost:4100");
console.log("  Docker Postgres port: see POSTGRES_PORT in .env");
console.log("  Sample login (if seeded): sample.user@oceancyber.local / OceanCyber123!");
