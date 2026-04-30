"use client";

import { useEffect, useState } from "react";
import {
  defaultNavigationConfig,
  type NavigationConfig,
} from "@/lib/navigation/menu";

export function useNavigationConfig(): NavigationConfig {
  const [config, setConfig] = useState<NavigationConfig>(defaultNavigationConfig);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/navigation", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as NavigationConfig;
        if (active) setConfig(json);
      } catch {
        // Keep defaults when API is unavailable.
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return config;
}
