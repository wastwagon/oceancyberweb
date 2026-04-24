#!/usr/bin/env bash
# Same as: npm run docker:up
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
exec node "$ROOT/scripts/docker-run.cjs" up
