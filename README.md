# OceanCyber Website

Ghana's premier technology solutions provider website built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **World-Class UI/UX**: Modern, mobile-first design with smooth animations
- **Premium SEO**: Optimized for search engines with structured data
- **Analytics Ready**: Google Analytics 4 integration
- **Ghana-Specific**: Mobile money integration, WhatsApp Business, local SEO
- **Performance**: Optimized for Core Web Vitals
- **Docker Ready**: Full Docker setup for local development and Coolify deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (80%) + Custom CSS (20%)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: PostgreSQL + Prisma ORM
- **SEO**: next-seo, next-sitemap
- **Deployment**: Docker + Coolify

## 📦 Prerequisites

- Node.js 20+ 
- Docker & Docker Compose
- npm or yarn

## 🏃 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example file, then edit values (do not paste the words “adjust secrets” as part of the command):

```bash
cp .env.example .env
```

For Next-only local dev you can use `.env.local` instead of `.env` if you prefer.

### 3. Choose how you run the stack

**Full stack in Docker** (PostgreSQL, Redis, NestJS API, Next.js — all containers):

```bash
npm run docker:up
```

Then open [http://localhost:3020](http://localhost:3020) (default `FRONTEND_PORT`). API health: `http://localhost:4100/api/v1/health`.

**Or: databases in Docker, apps on the host**

```bash
docker compose -f docker/docker-compose.dev.yml up -d
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

In another terminal: `npm run dev:api` (NestJS on port 4100 by default).

## 🐳 Docker Commands

| Command | What it does |
|--------|----------------|
| `npm run docker:up` | Build and start Postgres, Redis, API, Web |
| `npm run docker:down` | Stop stack |
| `npm run docker:ps` | List containers |
| `npm run docker:logs` | Follow backend (NestJS) + Web logs |
| `docker compose -f docker/docker-compose.dev.yml up -d` | Postgres + Redis only (local dev) |

Do **not** run `npm run docker:up --build` — `--build` is already included, and npm may treat `--build` as its own flag. Use `npm run docker:up` only.

## 📁 Project Structure

```
oceancyber-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   ├── layout/            # Header, Footer
│   └── ghana-specific/    # Ghana market features
├── lib/                   # Utilities
│   ├── utils.ts          # Helper functions
│   ├── seo.ts            # SEO configuration
│   └── analytics.ts      # Analytics setup
├── prisma/                # Database schema
├── public/                # Static assets
└── docker-compose.yml     # Docker configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🌍 Deployment to Coolify (VPS, full stack)

This project is meant to run as **Docker Compose** (Postgres, Redis, Nest API, Next.js), not as a single Dockerfile only.

1. Push the repo to Git.
2. In Coolify: **New resource** → **Docker Compose** → select the repo and branch.
3. Compose file: **`docker-compose.yml`** (repo root).
4. Set **environment variables** (and build-time vars for `NEXT_PUBLIC_*`) as described in **[COOLIFY.md](./COOLIFY.md)**.
5. Attach domains to **`web`** (port 3000) and **`backend`** (port 4000), then deploy / rebuild.

See **[COOLIFY.md](./COOLIFY.md)** for the full checklist, URL wiring, and VPS hardening notes.

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

This is a private project for OceanCyber.

## 📄 License

Copyright © 2026 OceanCyber. All rights reserved.
