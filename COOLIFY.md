# Coolify: full stack on a VPS (Docker Compose)

This repo’s production stack is defined only in **`docker-compose.yml`** at the repository root. Other compose files under `docker/` are for local development (databases-only or hot reload)—do not point Coolify at those.

Coolify’s build-time env merge may scan **all** `docker-compose*.yml` (and similar) under the repo. Those files must not use bash-style default substitution in values—same rules as the root compose file.


| Service    | Role                        | Container port | Published (default)      |
| ---------- | --------------------------- | -------------- | ------------------------ |
| `postgres` | PostgreSQL 16               | 5432           | **not** (internal only)  |
| `redis`    | Redis 7                     | 6379           | **not** (internal only)  |
| `backend`  | NestJS API                  | 4000           | host `4100`              |
| `web`      | Next.js (standalone)        | 3000           | host `3020`              |


Migrations run automatically on container start (`prisma migrate deploy` in both `web` and `backend` images). **`prisma db seed`** runs automatically on **`backend`** startup after migrations (the API image includes the tooling to execute `prisma/seed.ts`). The **`web`** service still runs migrations only (its standalone image does not ship the seed runner). Because `web` waits for `backend` to become healthy, the database is typically seeded before the site serves traffic.

To disable seed on a deploy, set **`SKIP_PRISMA_SEED=true`** on the **`backend`** service in Coolify. Sample login users still require **`SEED_DEMO_PASSWORD`** and **`SEED_ADMIN_PASSWORD`** in production (see `.env.example` / `prisma/seed.ts`).

---

## 1. Prerequisites

- Coolify installed on the VPS ([Coolify docs](https://coolify.io/docs)).
- This repository pushed to GitHub/GitLab/etc.
- DNS records ready for the URLs you will use (see §4).

---

## 2. Create the resource in Coolify

1. In Coolify: **New resource** → **Docker Compose** (not “Dockerfile only”).
2. Connect the Git repository and select branch (e.g. `main`).
3. Set the compose file path to `**docker-compose.yml`** at the repo root.
4. Save and open the resource **Environment variables** (and **Build arguments**, if Coolify splits them).

Coolify may inject variables such as `SERVICE_FQDN_WEB` / `SERVICE_URL_WEB` depending on version and how you attach domains. Use your real HTTPS URLs in the variables below even if Coolify also provides helpers.

---

## 3. Environment variables (required for production)

**Reference in repo:** [`.env.example`](./.env.example) lists every variable name with safe local defaults. Coolify does not load that file from Git by itself—copy keys into the resource’s environment UI (or import a dotenv snippet).

Set these **before the first successful build** of `web`, because `NEXT_PUBLIC_*` values are baked in at **image build time**.

### Public URLs (browser + CORS)

Replace examples with your real domains.


| Name                   | Example                   | Purpose                                                              |
| ---------------------- | ------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.example.com` | Canonical site URL (Next.js + SEO).                                  |
| `NEXT_PUBLIC_API_URL`  | `https://api.example.com` | API base URL used **in the browser**.                                |
| `CORS_ORIGIN`          | `https://www.example.com` | Allowed origin for the Nest API (match the site; no trailing slash). |


### Database (must stay consistent across services)


| Name                | Example            | Purpose                                                                                  |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `POSTGRES_USER`     | `postgres`         | Default matches Docker Hub image + most monitors (role `postgres` always exists). Override only if you know your volume was initialized with another user. |
| `POSTGRES_PASSWORD` | long random string | DB password.                                                                             |
| `POSTGRES_DB`       | `oceancyber`       | Main app database name.                                                                  |


`DATABASE_URL` is built inside Compose from these values and the hostname `postgres`. Keep `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` aligned with whatever initialized the data directory. If you reuse an **old volume** created with `POSTGRES_USER=oceancyber`, either keep that user in env or remove the volume once for a clean init with `postgres`.

### Secrets


| Name             | Purpose                   |
| ---------------- | ------------------------- |
| `JWT_SECRET`     | JWT signing for the API — **same value must be set on `web`** (middleware + `/api/auth/*`). |
| `SESSION_SECRET` | Session / cookie signing (Nest/redis session store). |


### Internal API URL (usually leave default)


| Name               | Value                 | Purpose                                                          |
| ------------------ | --------------------- | ---------------------------------------------------------------- |
| `API_INTERNAL_URL` | `http://backend:4000` | Next.js **server-side** calls to Nest inside the Docker network. |


### Optional


| Name                                                           | Purpose                                                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `OPENAI_API_KEY`, `OPENAI_CHAT_MODEL`                           | Passed to the **`backend`** service only: enables LLM replies for `POST /api/v1/chat` instead of the local fallback. Same vars as root `.env.example`. |
| `FRONTEND_PORT`, `BACKEND_PORT` | Optional host port mappings (defaults **3020** / **4100** in `docker-compose.yml` if unset). Coolify’s proxy usually maps domains to container ports **3000** / **4000** directly, so you may leave these unset. `POSTGRES_PORT` / `REDIS_PORT` are not used by root `docker-compose.yml`. |
| `COMPOSE_PARALLEL_LIMIT` | Set to `1` on small VPS if parallel `web` + `backend` builds OOM. |

### Marketing, SEO & Google reviews (`web` service)

Set in Coolify **before rebuilding `web`**. `NEXT_PUBLIC_*` values are baked in at **build time**; `GOOGLE_MAPS_API_KEY` is read at **runtime** (daily cache on `/reviews` and JSON-LD).

| Name | Example | Purpose |
| ---- | ------- | ------- |
| `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` | `https://maps.app.goo.gl/yWiB5pNhev2rgZSx7` | “Read reviews on Google” links (fallback exists in code if unset). |
| `NEXT_PUBLIC_GOOGLE_PLACE_ID` | `ChIJ…` | Direct “Write a review” URL ([Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)). |
| `GOOGLE_MAPS_API_KEY` | server API key | Sync live rating/count from Google Places API. Enable **Places API** in Google Cloud; restrict key to Places + your server IP. |
| `GOOGLE_PLACE_ID` | `ChIJ…` | Same as above; server-side Places lookup (optional if text search finds your listing). |
| `NEXT_PUBLIC_CLUTCH_PROFILE_URL` | `https://clutch.co/profile/…` | Clutch badge on `/reviews` and trust section. |
| `GOOGLE_VERIFICATION_CODE` | meta tag `content` value | Search Console HTML-tag verification. **Skip if you verified via** `public/google4aca0206ad5fa02e.html`. |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXX` | Google Analytics. |
| `NEXT_PUBLIC_SHOWREEL_URL` | CDN MP4 URL | Hero showreel video (optional). |

**Production copy-paste (OceanCyber):**

```bash
NEXT_PUBLIC_GOOGLE_REVIEWS_URL=https://maps.app.goo.gl/yWiB5pNhev2rgZSx7
# Optional — after creating Google Cloud project + Places API:
# GOOGLE_MAPS_API_KEY=
# GOOGLE_PLACE_ID=
# NEXT_PUBLIC_GOOGLE_PLACE_ID=
# NEXT_PUBLIC_CLUTCH_PROFILE_URL=
# NEXT_PUBLIC_GA_ID=
```

After adding or changing any `NEXT_PUBLIC_*` or `GOOGLE_VERIFICATION_CODE`, **rebuild** the `web` service in Coolify.


**Do not** use nested shell-style defaults inside a single value in Coolify (e.g. `http://localhost:${PORT}`). Use one plain URL per variable.

---

## 4. Domains and HTTPS in Coolify

1. Attach a domain to the `**web`** service and map it to container port **3000**.
2. Attach another domain (e.g. `api.yourdomain.com`) to the `**backend`** service on port **4000**.

Then ensure `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` and `CORS_ORIGIN` match those HTTPS URLs. If you change domains later, **rebuild** the `web` service so `NEXT_PUBLIC_`* updates.

---

## 5. Security on a VPS

The root `docker-compose.yml` **does not** publish Postgres or Redis on the host—they are reachable only inside the Compose network (`postgres:5432`, `redis:6379`). Apps still connect the same way; Coolify avoids conflicts with other stacks using host `6379`/`5432`.

Still use a firewall so only `80`/`443` (and SSH) are open to the WAN.

The **`backend`** container sets Express **`trust proxy`** from `TRUST_PROXY` / `TRUST_PROXY_HOPS` (see root `.env.example`) so **`req.ip`** and the global throttler reflect the browser (via `X-Forwarded-For`) rather than the upstream proxy only.

For host access during local development, use `docker/docker-compose.dev.yml` or add a gitignored `docker-compose.override.yml` that maps DB/Redis ports only on your laptop.

---

## 6. Deploy and verify

1. Deploy from Coolify (build + start).
2. Open `NEXT_PUBLIC_SITE_URL` — site should load. The root page sets **ISR** (`revalidate = 300` in `app/page.tsx`) so the homepage can refresh within minutes after a deploy instead of relying on long-lived edge cache alone.
3. Check API: `https://api.yourdomain.com/api/v1/health` (or your chosen API host).
4. If the UI calls the wrong API URL, fix `NEXT_PUBLIC_API_URL` and **rebuild** `web`.

---

## 7. Troubleshooting


| Symptom                                                                       | Likely cause                                                                                                                        |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Coolify: `Invalid template` / strings starting with `postgresql://` and bash defaults | Often an env value in the Coolify UI **or** another compose YAML in the repo still uses bash default syntax. Remove those patterns; use plain `${VAR}` and set variables in Coolify. Nested compose under `docker/` is aligned with the root file for this reason. |
| `Failed to find Server Action` (dev or after deploy)                         | Stale `.next`, multiple `next dev`, or browser cache: stop servers, remove `.next`, run a single dev instance, hard-refresh or clear site data for that origin. |
| Postgres: `Role "postgres" does not exist`                                   | DB was initialized with a **custom** `POSTGRES_USER` (no `postgres` role). Match credentials to that user, or use default `postgres` and **recreate the volume** once if you can afford a fresh DB. |
| Docker: `Bind for 0.0.0.0:6379 failed: port is already allocated`             | Another service on the host owns `6379` (often another Redis). Root compose no longer publishes Redis/Postgres—pull latest and redeploy. If you still map ports manually, pick a free host port or stop the conflicting container. |
| CORS errors from browser                                                      | `CORS_ORIGIN` must exactly match the site origin (scheme + host, no path).                                                          |
| Public site missing new homepage sections (promo strips, hero tools)         | **Git** on the server is behind: push your branch, redeploy, and **rebuild** the `web` service. Then purge **CDN** cache. Uncommitted local changes never reach Coolify. |
| Coolify / Compose: build exits **255** right after `npm install` or during `next build` | Often **out-of-memory** when `web` and `backend` build in parallel on a small VPS. **First:** in Coolify → resource → **Environment**, add `COMPOSE_PARALLEL_LIMIT=1` (builds backend, then web). **Second:** ensure the server has **≥4 GB RAM** or add **swap** (2–4 GB). Dockerfiles use `npm ci --ignore-scripts` and a capped Node heap to reduce peak memory. Also ensure `BACKEND_PORT` / `FRONTEND_PORT` are either unset (defaults **4100** / **3020**) or valid integers. |


For local Docker usage (not Coolify), see `SETUP.md` and `ports.env.example`.