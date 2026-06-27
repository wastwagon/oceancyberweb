#!/bin/sh
set -eu

echo "[backend] prisma migrate deploy..."
npx prisma migrate deploy

if [ "${SKIP_PRISMA_SEED:-}" != "true" ]; then
  echo "[backend] prisma db seed..."
  npx prisma db seed
else
  echo "[backend] skipping seed (SKIP_PRISMA_SEED=true)"
fi

echo "[backend] starting NestJS on port ${BACKEND_PORT:-4000}..."
exec node backend/dist/main.js
