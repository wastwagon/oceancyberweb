# 🚀 OceanCyber Website - Setup Complete!

Your world-class website is now ready for development and deployment.

## ✅ What's Been Set Up

### 1. **Next.js 14+ Project**
   - TypeScript configured
   - App Router structure
   - Production-ready build

### 2. **Styling System**
   - Tailwind CSS (80% of styling)
   - Custom CSS modules (20% for brand-specific styles)
   - Responsive design utilities
   - Custom animations

### 3. **Components & home page (`/`)**
   - **Header** (light bar, fixed) and **Footer**
   - **Home sections (in order):** `Hero` → `MarketingLeadStrip` (“Why teams work with us”) → `Stats` → `ProjectCostPromo` (GHS project calculator promo) → `Services` → `Portfolio` → `Testimonials` → `Contact`
   - **Hero** includes primary CTAs, a **Project cost calculator** link, and a **domain search** card (`HeroDomainBlock`); full domain flows live on **`/domains`**
   - **Project cost tool** (full wizard): **`/tools/project-cost`**
   - Other tools/pages: **Dashboard / wallet / billing** (signed-in), **admin** (role-gated API), **help center**, **hosting**, **case studies** — see `app/` routes
   - **WhatsApp** and Ghana-specific contact patterns in layout/components

### 4. **Database & Backend**
   - **Prisma** + **PostgreSQL** — see `prisma/schema.prisma` (includes contacts, projects, **auth `User` with `role`**, **billing**: wallet ledger, renewals, `PaymentTransaction`, etc.)
   - **NestJS API** under `backend/src/` — **auth**, **billing** (Paystack, wallet, renewals), **admin**, mail, health
   - **Marketing content in DB:** portfolio rows (`Project`) and homepage quotes (`Testimonial`) load on the public site from Postgres (with JSON fallbacks if tables are empty). Admins can manage them at **`/admin/content`** (requires admin JWT + `ADMIN_EMAILS`), instead of only Prisma Studio.
   - **Migrations** in `prisma/migrations/`; `docker compose` runs `prisma migrate deploy` on **web** and **backend** startup
   - **Headless CMS (Directus)** is **not** in this stack anymore (removed to avoid env/ops confusion)

### 5. **Docker & full stack**
   - `docker-compose.yml` — PostgreSQL 16, Redis 7, NestJS API, Next.js (project name `oceancyber`)
   - `docker/docker-compose.dev.yml` — Postgres + Redis only (run Next/API on the host)
   - `scripts/docker-run.cjs` (used by `npm run docker:*`)

### 6. **SEO & Analytics**
   - next-seo configured
   - Metadata setup
   - Google Analytics ready
   - Structured data ready

### 7. **Ghana-Specific Features**
   - WhatsApp Business integration
   - Mobile money payment ready
   - Local SEO optimized
   - Ghana contact information

## 🏃 Quick Start

### Option A — Full stack in Docker (Postgres + Redis + API + Web)

From the project root, create your env file (one command per line):

```bash
cp .env.example .env
```

Edit `.env` for secrets and ports, then:

```bash
docker compose down
npm run docker:up
npm run docker:ps
```

**Windows:** Do not put `# comments` on the same line as commands in `package.json` scripts (cmd.exe does not treat `#` as a comment). This repo uses `scripts/docker-run.cjs` so `npm run docker:up` works without that issue.

This starts **postgres**, **redis**, **oceancyber-backend** (NestJS), and **oceancyber-web** (Next.js). In Docker Desktop you should see all four plus shared volumes.

- Site: `http://localhost:3020` (or your `FRONTEND_PORT`)
- API health: `http://localhost:4100/api/v1/health` (or your `BACKEND_PORT`)

**VPS / Coolify:** use the same `docker-compose.yml` as a **Docker Compose** resource in Coolify (not Dockerfile-only). Step-by-step variables, domains, and hardening: **[COOLIFY.md](./COOLIFY.md)**.

### Keeping “latest design” in sync

| You want… | Do this |
|-----------|---------|
| **Latest UI on your Mac (Docker)** | From repo root: `docker compose up -d --build web` (rebuilds the Next image with your current files). Use **`http://localhost:3020`** unless you changed `FRONTEND_PORT`. Hard-refresh the browser. |
| **Same UI on the public site (Coolify)** | 1) **Commit and push** to the branch Coolify deploys. 2) In Coolify, **Redeploy** the stack and use **rebuild** / clear build cache if the UI is stale. 3) Purge any **CDN** in front of the app. `NEXT_PUBLIC_*` values are baked in at **build** — change them in Coolify, then **rebuild `web`**. |
| **Uncommitted work** | `git status` — if `app/` or `components/` show modified, those changes exist **only on your machine** until you commit and push. |
| **Commits not on GitHub** | `git log origin/main..HEAD` — if this lists commits, run **`git push`** so Coolify (and teammates) see them. |

### Option B — Databases in Docker, apps on your machine

```bash
docker compose -f docker/docker-compose.dev.yml up -d
npm run prisma:migrate
npm run dev
```

In another terminal (with the same `.env`):

```bash
npm run dev:api
```

Visit: http://localhost:3020

### Docker: `address already in use` on the frontend port

Something else is using the host port (often **3020**). Either stop that process, or pick a free port in `.env` and align URLs:

```env
FRONTEND_PORT=3030
NEXT_PUBLIC_SITE_URL=http://localhost:3030
CORS_ORIGIN=http://localhost:3030
```

Then run `npm run docker:up` again (rebuild if you changed build-time `NEXT_PUBLIC_*` args).

### `ERR_CONNECTION_REFUSED` on localhost (Docker)

- **Default site URL is `http://localhost:3020`**, not `3021` (see `FRONTEND_PORT` in `.env`). If you use another port, set `FRONTEND_PORT`, `NEXT_PUBLIC_SITE_URL`, and `CORS_ORIGIN` to the same port and run `docker compose up -d --build web`.
- **Start Docker Desktop** (macOS/Windows) so the daemon is running, then from the repo root: `npm run docker:up` or `docker compose up -d --build`. Check `docker compose ps` — `oceancyber-web` should be `running`.
- **Stale UI after code changes:** the `web` image bakes the Next.js build. Pull or edit code, then rebuild: `docker compose up -d --build web` (or rebuild the whole stack). `NEXT_PUBLIC_*` values require a rebuild, not just a container restart.

## 📝 Next Steps

### Immediate Tasks:
1. **Add Your Content**
   - Replace placeholder images in `/public/images/`
   - Update project data in portfolio section
   - Add real testimonials

2. **Configure Analytics**
   - Get Google Analytics 4 ID
   - Add to `.env.local`: `NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"`

3. **Set Up Email**
   - Sign up for Resend API
   - Add to `.env.local`: `RESEND_API_KEY="your-key"`

4. **Payment Integration** (When ready)
   - Flutterwave API keys
   - PaySwitch API keys
   - Add to `.env.local`

### Design Enhancements:
- Add real images to portfolio
- Customize color scheme in `tailwind.config.ts`
- Add more animations with Framer Motion
- Create custom illustrations

### SEO Optimization:
- Add Google Search Console verification code
- Submit sitemap to Google
- Optimize meta descriptions
- Add structured data for local business

## 🐳 Docker Commands

### Development (database only)
```bash
docker compose -f docker/docker-compose.dev.yml up -d
docker compose -f docker/docker-compose.dev.yml down
```

### Full stack + hot reload (Docker Desktop; optional)
Uses bind mounts — not for Coolify/production. From repo root:
```bash
docker compose -f docker/docker-compose.hotreload.yml up --build
docker compose -f docker/docker-compose.hotreload.yml down
```

### Production-style full stack (same as VPS / Coolify)
```bash
docker compose up -d --build
docker compose down
```
Postgres and Redis are internal to this stack only (no `localhost` ports). For host access to DB/Redis (e.g. GUI clients), run `docker/docker-compose.dev.yml` or add a gitignored `docker-compose.override.yml` that maps ports.

## 📦 Deployment to Coolify

1. Push code to Git repository
2. Connect repository to Coolify
3. Coolify will auto-detect Dockerfile
4. Set environment variables in Coolify dashboard
5. Deploy!

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize:
- Primary colors
- Ghana flag colors (ghana.red, ghana.gold, ghana.green)
- Brand gradients

### Components
All components are in `/components/`:
- `/sections/` - Page sections
- `/layout/` - Header, Footer
- `/ghana-specific/` - Ghana market features
- `/ui/` - Reusable UI components (add shadcn/ui here)

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Coolify Docs](https://coolify.io/docs)

## 🆘 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker ps`
- Check DATABASE_URL in `.env.local`
- Run: `npm run prisma:generate`

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Port Already in Use
- Change port: `PORT=3001 npm run dev`

---

**Your website is ready! Start customizing and adding your content.** 🎉
