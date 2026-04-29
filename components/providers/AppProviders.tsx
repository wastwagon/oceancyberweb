"use client";

import { FxProvider } from "@/components/currency/FxProvider";
import { CartProvider } from "@/components/commerce/CartProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FxProvider>
      <CartProvider>{children}</CartProvider>
    </FxProvider>
  );
}
