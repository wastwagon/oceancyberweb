import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CmsService {
  constructor(private readonly config: ConfigService) {}

  private baseUrl(): string {
    const url = this.config.get<string>("CMS_BASE_URL")?.replace(/\/$/, "");
    if (!url) {
      throw new ServiceUnavailableException(
        "CMS_BASE_URL is not set (start Directus: npm run docker:cms)",
      );
    }
    return url;
  }

  private authHeaders(): HeadersInit {
    const token = this.config.get<string>("CMS_STATIC_TOKEN");
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }

  async proxyItems(collection: string, search: string): Promise<unknown> {
    const root = this.baseUrl();
    const q = search.startsWith("?") ? search : search ? `?${search}` : "";
    const res = await fetch(`${root}/items/${collection}${q}`, {
      headers: {
        Accept: "application/json",
        ...this.authHeaders(),
      },
    });
    if (!res.ok) {
      throw new ServiceUnavailableException(
        `CMS returned ${res.status}: ${res.statusText}`,
      );
    }
    return res.json();
  }

  async proxyItem(collection: string, id: string): Promise<unknown> {
    const root = this.baseUrl();
    const res = await fetch(`${root}/items/${collection}/${id}`, {
      headers: {
        Accept: "application/json",
        ...this.authHeaders(),
      },
    });
    if (!res.ok) {
      throw new ServiceUnavailableException(
        `CMS returned ${res.status}: ${res.statusText}`,
      );
    }
    return res.json();
  }
}
