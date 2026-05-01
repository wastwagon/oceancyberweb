import { Controller, Get } from "@nestjs/common";
import { PublicContentService } from "./public-content.service";

@Controller({ path: "public-content", version: "1" })
export class PublicContentController {
  constructor(private readonly publicContent: PublicContentService) {}

  @Get("projects")
  getProjects() {
    return this.publicContent.getFeaturedProjects();
  }

  @Get("testimonials")
  getTestimonials() {
    return this.publicContent.getFeaturedTestimonials();
  }
}
