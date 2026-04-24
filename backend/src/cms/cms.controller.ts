import { Controller, Get, Param, Req } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type { Request } from "express";
import { CmsService } from "./cms.service";

/**
 * BFF for Directus: browser calls Nest (same origin as API) with no CMS token;
 * Nest forwards to Directus using CMS_STATIC_TOKEN when set.
 */
@SkipThrottle()
@Controller({ path: "cms", version: "1" })
export class CmsController {
  constructor(private readonly cms: CmsService) {}

  @Get("items/:collection")
  async list(
    @Param("collection") collection: string,
    @Req() req: Request,
  ): Promise<unknown> {
    const search = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";
    return this.cms.proxyItems(collection, search);
  }

  @Get("items/:collection/:id")
  async one(
    @Param("collection") collection: string,
    @Param("id") id: string,
  ): Promise<unknown> {
    return this.cms.proxyItem(collection, id);
  }
}
