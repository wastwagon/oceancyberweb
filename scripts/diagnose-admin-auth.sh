#!/usr/bin/env bash
# Run on the VPS (Hostinger/Coolify host) to diagnose admin login + /admin API access.
# Usage: bash scripts/diagnose-admin-auth.sh [backend-container-name]

set -euo pipefail

BACKEND="${1:-backend-acowkwwk0wog4kkwck44wo4w-190902227363}"
EMAIL="${DIAG_EMAIL:-admin@oceancyber.net}"
PASS="${DIAG_PASS:-OceanCyber123!}"

echo "=== OceanCyber admin auth diagnostic ==="
echo "Backend container: $BACKEND"
echo ""

echo "--- 1. DB user roles ---"
docker exec "$BACKEND" npx tsx -e "
(async () => {
  const { PrismaClient } = require('@prisma/client');
  const p = new PrismaClient();
  const users = await p.user.findMany({ select: { email: true, role: true } });
  console.table(users);
  await p.\$disconnect();
})();
"

echo ""
echo "--- 2. API login (inside backend container) ---"
LOGIN_JSON=$(docker exec "$BACKEND" curl -sS -X POST http://127.0.0.1:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")

echo "$LOGIN_JSON" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_JSON"

TOKEN=$(echo "$LOGIN_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('access_token',''))" 2>/dev/null || true)

if [ -z "$TOKEN" ]; then
  echo "ERROR: login failed — no access_token. Fix password/role first."
  exit 1
fi

IS_ADMIN=$(echo "$LOGIN_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('user',{}).get('isAdmin', False))" 2>/dev/null || echo "?")
echo ""
echo "Login user.isAdmin: $IS_ADMIN"

echo ""
echo "--- 3. Profile (Bearer token) ---"
docker exec "$BACKEND" curl -sS -o /tmp/profile.json -w "HTTP %{http_code}\n" \
  http://127.0.0.1:4000/api/v1/auth/profile \
  -H "Authorization: Bearer $TOKEN"
docker exec "$BACKEND" cat /tmp/profile.json | python3 -m json.tool 2>/dev/null || docker exec "$BACKEND" cat /tmp/profile.json

echo ""
echo "--- 4. Admin summary ---"
docker exec "$BACKEND" curl -sS -o /tmp/summary.json -w "HTTP %{http_code}\n" \
  http://127.0.0.1:4000/api/v1/admin/summary \
  -H "Authorization: Bearer $TOKEN"
docker exec "$BACKEND" head -c 400 /tmp/summary.json; echo

echo ""
echo "--- 5. Admin projects list ---"
docker exec "$BACKEND" curl -sS -o /tmp/projects.json -w "HTTP %{http_code}\n" \
  http://127.0.0.1:4000/api/v1/projects/admin \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo "--- 6. JWT_SECRET match (web vs backend) ---"
WEB=$(docker ps --format '{{.Names}}' | grep -E '^web-' | head -1 || true)
if [ -n "$WEB" ]; then
  BSEC=$(docker exec "$BACKEND" printenv JWT_SECRET | sha256sum | cut -c1-12)
  WSEC=$(docker exec "$WEB" printenv JWT_SECRET | sha256sum | cut -c1-12)
  echo "backend JWT_SECRET hash prefix: $BSEC"
  echo "web      JWT_SECRET hash prefix: $WSEC"
  if [ "$BSEC" = "$WSEC" ]; then
    echo "OK: JWT_SECRET matches"
  else
    echo "ERROR: JWT_SECRET differs — set the same value on web + backend in Coolify"
  fi
else
  echo "web container not found — skip JWT compare"
fi

echo ""
echo "=== Done ==="
echo "If login isAdmin=true and admin/summary=200, sign in at:"
echo "  https://oceancyber.net/signin?next=/admin"
echo "Use: $EMAIL / (your password)"
