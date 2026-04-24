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

### 3. **Components Created**
   - ✅ Header with mobile navigation
   - ✅ Footer with contact info
   - ✅ Hero section with animations
   - ✅ Stats section
   - ✅ Services showcase
   - ✅ Portfolio grid
   - ✅ Testimonials
   - ✅ Contact section
   - ✅ WhatsApp button (Ghana-specific)

### 4. **Database & Backend**
   - Prisma ORM configured
   - PostgreSQL schema ready
   - Models: Contact, Project, Testimonial

### 5. **Docker & full stack**
   - `docker-compose.yml` — PostgreSQL 16, Redis 7, NestJS API, Next.js (project name `oceancyber`)
   - `docker-compose.dev.yml` — Postgres + Redis only (run Next/API on the host)
   - Optional **Directus CMS** (`--profile cms`): `npm run docker:cms`
   - Helpers: `lib/cms/` (Directus REST), `scripts/docker-run.cjs` (used by `npm run docker:*`), `scripts/ensure-cms-database.sh`

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

### Option B — Databases in Docker, apps on your machine

```bash
docker compose -f docker-compose.dev.yml up -d
npm run prisma:migrate
npm run dev
```

In another terminal (with the same `.env`):

```bash
npm run dev:api
```

Visit: http://localhost:3020

### Optional — Directus CMS (headless)

1. If Postgres was created **before** the CMS database script existed, run:

   ```bash
   npm run docker:cms:db
   ```

2. Start Directus:

   ```bash
   npm run docker:cms
   ```

3. Open `http://localhost:8055/admin`, sign in with `CMS_ADMIN_EMAIL` / `CMS_ADMIN_PASSWORD` from `.env`.

4. Set `NEXT_PUBLIC_CMS_URL` and (in Docker) `CMS_INTERNAL_URL=http://cms:8055`, rebuild the web image if you change public env vars.

**Architecture:** **Directus** is the CMS engine (its own API + admin). **NestJS** adds an optional **BFF** so the site can call `GET /api/v1/cms/items/:collection` instead of talking to Directus directly—`CMS_STATIC_TOKEN` stays on the server.

- From Next (recommended when using the proxy): `lib/cms/via-api.ts` → `fetchCmsItemsViaApi('posts')`
- Direct to Directus (public collections only, or token in env): `lib/cms/directus.ts`

Set `CMS_BASE_URL` on the API (e.g. `http://cms:8055` in Docker, `http://localhost:8055` on the host) and `CMS_STATIC_TOKEN` if collections require auth.

### Docker: `address already in use` on the frontend port

Something else is using the host port (often **3020**). Either stop that process, or pick a free port in `.env` and align URLs:

```env
FRONTEND_PORT=3030
NEXT_PUBLIC_SITE_URL=http://localhost:3030
CORS_ORIGIN=http://localhost:3030
```

Then run `npm run docker:up` again (rebuild if you changed build-time `NEXT_PUBLIC_*` args).

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

### Development (Database only)
```bash
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
```

### Production Build
```bash
docker-compose up -d
docker-compose down
```

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
