import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PublicContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeaturedProjects() {
    return this.prisma.project.findMany({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
    });
  }

  async getFeaturedTestimonials() {
    return this.prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
      take: 10,
    });
  }
}
