#!/bin/sh
# Dev containers: install deps when lockfile changes (shared volume), run migrations, then exec CMD.
# Web starts after backend is healthy, so both containers do not run npm ci at the same time.
set -eu
cd /app

export CHOKIDAR_USEPOLLING="${CHOKIDAR_USEPOLLING:-1}"
export WATCHPACK_POLLING="${WATCHPACK_POLLING:-true}"

LOCK_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)

if [ ! -f "node_modules/.lock-${LOCK_HASH}" ]; then
  echo "[entrypoint-dev] Lockfile changed or first run - running npm ci..."
  rm -f node_modules/.lock-* 2>/dev/null || true
  npm ci
  touch "node_modules/.lock-${LOCK_HASH}"
fi

echo "[entrypoint-dev] Prisma migrate deploy + generate..."
npx prisma migrate deploy
npx prisma generate

exec "$@"
