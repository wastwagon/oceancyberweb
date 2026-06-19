import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { assertProductionSecrets } from "@oceancyber/shared";
import helmet from "helmet";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import { AppModule } from "./app.module";

/** Express `trust proxy` so `req.ip` / throttling follow `X-Forwarded-For` behind Coolify/nginx. */
function trustProxySetting(): number | boolean {
  if (process.env.TRUST_PROXY === "false") {
    return false;
  }
  const raw = process.env.TRUST_PROXY_HOPS?.trim();
  if (raw === "0") {
    return false;
  }
  if (raw) {
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : false;
  }
  return process.env.NODE_ENV === "production" ? 1 : false;
}

async function bootstrap() {
  assertProductionSecrets(
    {
      nodeEnv: process.env.NODE_ENV,
      jwtSecret: process.env.JWT_SECRET,
      sessionSecret: process.env.SESSION_SECRET,
      ci: process.env.CI === "true",
    },
    "nestjs",
  );

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const trust = trustProxySetting();
  if (trust !== false) {
    app.set("trust proxy", trust);
  }

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === "production",
    }),
  );

  const origins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  });

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
  const sessionRedis = new Redis(redisUrl, { maxRetriesPerRequest: null });
  app.use(
    session({
      store: new RedisStore({ client: sessionRedis, prefix: "sess:" }),
      secret: process.env.SESSION_SECRET || "dev-session-secret-change-me",
      resave: false,
      saveUninitialized: false,
      name: "sid",
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  const port = Number(process.env.BACKEND_PORT || 4100);
  await app.listen(port, "0.0.0.0");
}

bootstrap();
