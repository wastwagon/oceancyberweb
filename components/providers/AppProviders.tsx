"use client";

import { FxProvider } from "@/components/currency/FxProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <FxProvider>{children}</FxProvider>;
}
