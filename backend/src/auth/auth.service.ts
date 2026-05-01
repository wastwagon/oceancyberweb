import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import type { AuthTokens, AuthUserPublic } from "@oceancyber/shared";
import type { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<{ user: AuthUserPublic } & AuthTokens> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
      },
      select: { id: true, email: true, role: true },
    });

    const publicUser: AuthUserPublic = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      user: publicUser,
      ...this.signTokens(publicUser),
    };
  }

  async login(dto: LoginDto): Promise<{ user: AuthUserPublic } & AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const publicUser: AuthUserPublic = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      user: publicUser,
      ...this.signTokens(publicUser),
    };
  }

  private signTokens(user: AuthUserPublic): AuthTokens {
    const access_token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return {
      access_token,
      token_type: "Bearer",
      expires_in: "7d",
    };
  }
}
