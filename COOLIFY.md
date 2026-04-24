# Coolify: full stack on a VPS (Docker Compose)

This repo’s production stack is defined in `docker-compose.yml`:


| Service    | Role                        | Container port | Published (default) |
| ---------- | --------------------------- | -------------- | ------------------- |
| `postgres` | PostgreSQL 16               | 5432           | host `5432`         |
| `redis`    | Redis 7                     | 6379           | host `6379`         |
| `backend`  | NestJS API                  | 4000           | host `4100`         |
| `web`      | Next.js (standalone)        | 3000           | host `3020`         |
| `cms`      | Directus (optional profile) | 8055           | host `8055`         |


Migrations run automatically on container start (`prisma migrate deploy` in both `web` and `backend` images).

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
| `POSTGRES_USER`     | `oceancyber`       | Superuser for the Postgres container (not `postgres` unless you change the image setup). |
| `POSTGRES_PASSWORD` | long random string | DB password.                                                                             |
| `POSTGRES_DB`       | `oceancyber`       | Main app database name.                                                                  |


`DATABASE_URL` is built inside Compose from these values and the hostname `postgres`. **Do not** point the app at a random Postgres on the host with user `postgres` unless that user actually exists there (that mismatch causes auth errors).

### Secrets


| Name             | Purpose                   |
| ---------------- | ------------------------- |
| `JWT_SECRET`     | JWT signing for the API.  |
| `SESSION_SECRET` | Session / cookie signing. |


### Internal API URL (usually leave default)


| Name               | Value                 | Purpose                                                          |
| ------------------ | --------------------- | ---------------------------------------------------------------- |
| `API_INTERNAL_URL` | `http://backend:4000` | Next.js **server-side** calls to Nest inside the Docker network. |


### Optional


| Name                                                           | Purpose                                                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_CMS_URL`                                          | Public Directus URL if you use CMS.                                                                          |
| `CMS_BASE_URL`, `CMS_STATIC_TOKEN`                             | Backend integration with Directus.                                                                           |
| `FRONTEND_PORT`, `BACKEND_PORT`, `POSTGRES_PORT`, `REDIS_PORT` | Host port mappings; defaults are fine behind Coolify’s proxy if you only expose `web` / `backend` via HTTPS. |


**Do not** use nested shell-style defaults inside a single value in Coolify (e.g. `http://localhost:${PORT}`). Use one plain URL per variable.

---

## 4. Domains and HTTPS in Coolify

1. Attach a domain to the `**web`** service and map it to container port **3000**.
2. Attach another domain (e.g. `api.yourdomain.com`) to the `**backend`** service on port **4000**.

Then ensure `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` and `CORS_ORIGIN` match those HTTPS URLs. If you change domains later, **rebuild** the `web` service so `NEXT_PUBLIC_`* updates.

---

## 5. Optional: Directus (`cms` service)

The `cms` service uses Compose **profile** `cms`. Coolify may not enable profiles by default. Options:

- Add a separate Coolify Docker Compose resource that only runs Directus + shared DB (advanced), or  
- Run Directus locally / elsewhere, or  
- If your Coolify version supports “Compose profiles”, enable profile `cms`.

Directus expects database `oceancyber_cms` (created by `docker/postgres/init` on first Postgres startup).

---

## 6. Security on a VPS

By default, Postgres and Redis publish ports on the host. For a public VPS you should **not** expose `5432` / `6379` to the internet.

**Option A — Firewall:** Allow only `80`/`443` (and SSH) from the world; block `5432`/`6379` from WAN.

**Option B — Compose override:** Add a `docker-compose.override.yml` (not committed, or a separate “production” compose in Coolify) that **removes** the `ports:` sections for `postgres` and `redis`. Containers on the same network still reach them as `postgres:5432` and `redis:6379`.

---

## 7. Deploy and verify

1. Deploy from Coolify (build + start).
2. Open `NEXT_PUBLIC_SITE_URL` — site should load.
3. Check API: `https://api.yourdomain.com/api/v1/health` (or your chosen API host).
4. If the UI calls the wrong API URL, fix `NEXT_PUBLIC_API_URL` and **rebuild** `web`.

---

## 8. Troubleshooting


| Symptom                                                                       | Likely cause                                                                                                                        |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Coolify: `Invalid template` in `build-time.env`                               | Unescaped or nested `${...}` in env values; use plain URLs (see §3).                                                                |
| `Failed to find Server Action` in dev                                         | Stale `.next` / multiple dev servers; clear `.next`, one `next dev`, hard-refresh browser.                                          |
| Postgres: `password authentication failed` / `Role "postgres" does not exist` | `DATABASE_URL` or tooling using user `postgres` while the container uses `POSTGRES_USER` (default `oceancyber`). Align credentials. |
| CORS errors from browser                                                      | `CORS_ORIGIN` must exactly match the site origin (scheme + host, no path).                                                          |


For local Docker usage (not Coolify), see `SETUP.md` and `ports.env.example`.