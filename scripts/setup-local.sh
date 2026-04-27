#!/usr/bin/env bash
# Local dev setup: deps, Docker Postgres+Redis, Prisma schema, shared package build.
# Run from repo root: bash scripts/setup-local.sh

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Repo root: $ROOT"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "==> Created .env from .env.example (edit secrets for anything beyond local dev)."
else
  echo "==> .env already exists; not overwriting."
fi

echo "==> npm install (workspaces: web + backend + shared)"
npm install

echo "==> Build shared workspace package"
npm run build:shared

echo "==> Start PostgreSQL + Redis (Docker Compose)"
docker compose down >/dev/null 2>&1 || true
if ! docker compose up -d postgres redis; then
  echo "ERROR: Could not start Docker services. If you see 'port is already allocated', edit"
  echo "  POSTGRES_PORT, REDIS_PORT, DATABASE_URL, and REDIS_URL in .env to free host ports, then re-run this script."
  exit 1
fi

echo "==> Wait for Postgres"
for i in $(seq 1 45); do
  if docker compose exec -T postgres pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-oceancyber}" >/dev/null 2>&1; then
    echo "Postgres is ready."
    break
  fi
  if [[ "$i" -eq 45 ]]; then
    echo "ERROR: Postgres did not become ready in time." >&2
    exit 1
  fi
  sleep 1
done

echo "==> Prisma: apply migrations then sync schema (covers billing fields not in older migrations)"
npx prisma migrate deploy --schema=prisma/schema.prisma
npx prisma db push --schema=prisma/schema.prisma

echo "==> Prisma generate"
npx prisma generate --schema=prisma/schema.prisma

echo "==> Backend TypeScript build (sanity check)"
npm run build --workspace=@oceancyber/api

echo ""
echo "Done. Next steps (two terminals from repo root):"
echo "  1) npm run dev:api     # Nest API → http://localhost:4100"
echo "  2) npm run dev         # Next.js   → http://localhost:3020"
echo ""
echo "Or run the full hot-reload stack in Docker:"
echo "  npm run docker:up:dev"
