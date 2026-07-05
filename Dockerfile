# Next.js 14 — standalone (monorepo: shared types)
# Use Debian slim (glibc), not Alpine: Next.js SWC on linux/arm64 fails on musl (__res_init / failed-loading-swc).
FROM node:20-bookworm-slim AS deps
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json package-lock.json* ./
COPY packages ./packages
COPY backend ./backend
COPY prisma ./prisma
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm ci --ignore-scripts

FROM node:20-bookworm-slim AS builder
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Coolify/small VPS: parallel web+backend builds can OOM during `next build`
ENV NODE_OPTIONS="--max-old-space-size=3072"

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3020
ARG NEXT_PUBLIC_API_URL=http://localhost:4100
ARG NEXT_PUBLIC_GOOGLE_REVIEWS_URL=
ARG NEXT_PUBLIC_GOOGLE_PLACE_ID=
ARG NEXT_PUBLIC_CLUTCH_PROFILE_URL=
ARG NEXT_PUBLIC_GA_ID=
ARG NEXT_PUBLIC_SHOWREEL_URL=
ARG GOOGLE_VERIFICATION_CODE=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GOOGLE_REVIEWS_URL=$NEXT_PUBLIC_GOOGLE_REVIEWS_URL
ENV NEXT_PUBLIC_GOOGLE_PLACE_ID=$NEXT_PUBLIC_GOOGLE_PLACE_ID
ENV NEXT_PUBLIC_CLUTCH_PROFILE_URL=$NEXT_PUBLIC_CLUTCH_PROFILE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SHOWREEL_URL=$NEXT_PUBLIC_SHOWREEL_URL
ENV GOOGLE_VERIFICATION_CODE=$GOOGLE_VERIFICATION_CODE

RUN npm run build:shared
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/package.json ./package.json

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node server.js"]
