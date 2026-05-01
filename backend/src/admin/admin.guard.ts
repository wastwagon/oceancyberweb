import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { isAdminForUser } from "./admin.util";

type ReqUser = { id: string; email: string; role?: string };

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request & { user?: ReqUser }>();
    const u = req.user;
    if (!isAdminForUser(u, this.config.get<string>("ADMIN_EMAILS") || "")) {
      throw new ForbiddenException("Admin only");
    }
    return true;
  }
}
