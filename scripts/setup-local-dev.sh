#!/usr/bin/env bash
# OceanCyber — local dev bootstrap (repo root).
# Run: bash scripts/setup-local-dev.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "Created .env from .env.example — edit DATABASE_URL if needed."
fi

# macOS: native Postgres often binds 127.0.0.1:5432; Docker cannot reliably replace it for localhost clients.
# Pick a free host port for the dev Postgres container (must match DATABASE_URL in .env).
: "${POSTGRES_HOST_PORT:=55432}"

echo "Starting Postgres (docker/docker-compose.dev.yml) on host port ${POSTGRES_HOST_PORT}..."
POSTGRES_PORT="${POSTGRES_HOST_PORT}" docker compose -f docker/docker-compose.dev.yml up -d postgres

echo "Installing npm dependencies..."
npm install

echo "Applying Prisma migrations..."
export DATABASE_URL="postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-oceancyber123}@127.0.0.1:${POSTGRES_HOST_PORT}/${POSTGRES_DB:-oceancyber}?schema=public"
npx prisma generate
npx prisma migrate deploy

echo "Seeding database..."
npx --yes tsx prisma/seed.ts

echo ""
echo "Done. Set DATABASE_URL in .env to:"
echo "  ${DATABASE_URL}"
echo ""
echo "Start Next.js: npm run dev  → http://localhost:${FRONTEND_PORT:-3020}"
