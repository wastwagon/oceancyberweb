#!/usr/bin/env bash
# Create `oceancyber_cms` if missing (needed for Directus when Postgres volume existed before init scripts).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if docker compose exec -T postgres psql -U "${POSTGRES_USER:-postgres}" -d postgres -tc \
  "SELECT 1 FROM pg_database WHERE datname = 'oceancyber_cms'" | grep -q 1; then
  echo "Database oceancyber_cms already exists."
else
  docker compose exec -T postgres psql -U "${POSTGRES_USER:-postgres}" -d postgres -c \
    "CREATE DATABASE oceancyber_cms OWNER ${POSTGRES_USER:-postgres};"
  echo "Created database oceancyber_cms."
fi
