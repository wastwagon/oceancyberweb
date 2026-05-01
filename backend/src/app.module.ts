import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { BillingModule } from "./billing/billing.module";
import { HealthModule } from "./health/health.module";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProjectsModule } from "./projects/projects.module";
import { RedisModule } from "./redis/redis.module";
import { ContactModule } from "./contact/contact.module";
import { CalculatorModule } from "./calculator/calculator.module";
import { NavigationModule } from "./navigation/navigation.module";
import { FxModule } from "./fx/fx.module";
import { DomainsModule } from "./domains/domains.module";
import { ChatModule } from "./chat/chat.module";
import { PublicContentModule } from "./public-content/public-content.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MailModule,
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    RedisModule,
    HealthModule,
    AuthModule,
    BillingModule,
    ProjectsModule,
    AdminModule,
    ContactModule,
    CalculatorModule,
    NavigationModule,
    FxModule,
    DomainsModule,
    ChatModule,
    PublicContentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
