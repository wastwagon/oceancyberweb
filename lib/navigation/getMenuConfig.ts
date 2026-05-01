import { getApiBaseUrl } from "@/lib/api-config";
import { defaultNavigationConfig, type NavigationConfig } from "@/lib/navigation/menu";

/**
 * CMS-ready menu adapter. 
 * Now fetches from the NestJS backend which handles database logic and caching.
 */
export async function getMenuConfig(): Promise<NavigationConfig> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/navigation`, {
      next: { revalidate: 3600, tags: ["navigation"] }, // Cache for 1 hour, support on-demand tag revalidation
    });
    
    if (res.ok) {
      return (await res.json()) as NavigationConfig;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[getMenuConfig] Failed to fetch from backend; using local fallback.", error);
    }
  }

  // Local fallback: ENV JSON override or Hardcoded Defaults
  const raw = process.env.NAVIGATION_CONFIG_JSON;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<NavigationConfig>;
      return {
        startupPrimaryNav: parsed.startupPrimaryNav ?? defaultNavigationConfig.startupPrimaryNav,
        startupPagesMenu: parsed.startupPagesMenu ?? defaultNavigationConfig.startupPagesMenu,
        mainHeaderNav: parsed.mainHeaderNav ?? defaultNavigationConfig.mainHeaderNav,
        mainHeaderDropdownContent:
          parsed.mainHeaderDropdownContent ?? defaultNavigationConfig.mainHeaderDropdownContent,
      };
    } catch {
      // ignore parse error, use defaults
    }
  }

  return defaultNavigationConfig;
}
