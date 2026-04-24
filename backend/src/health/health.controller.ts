import { Controller, Get, Inject } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type Redis from "ioredis";
import { PrismaService } from "../prisma/prisma.service";
import { REDIS } from "../redis/redis.module";
import type { ApiHealthResponse } from "@oceancyber/shared";

@SkipThrottle()
@Controller({ path: "health", version: "1" })
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  @Get()
  async check(): Promise<ApiHealthResponse> {
    let database: "up" | "down" = "down";
    let redis: "up" | "down" = "down";

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      database = "up";
    } catch {
      database = "down";
    }

    try {
      await this.redis.ping();
      redis = "up";
    } catch {
      redis = "down";
    }

    return {
      status: database === "up" && redis === "up" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      database,
      redis,
    };
  }
}
