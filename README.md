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

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the environment variables with your actual values.

### 3. Start PostgreSQL with Docker

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Commands

### Development (Database only)

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production Build

```bash
docker-compose up -d
```

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

## 🌍 Deployment to Coolify

1. Push your code to a Git repository
2. Connect your repository to Coolify
3. Coolify will automatically detect the Dockerfile
4. Set environment variables in Coolify dashboard
5. Deploy!

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

This is a private project for OceanCyber.

## 📄 License

Copyright © 2026 OceanCyber. All rights reserved.
