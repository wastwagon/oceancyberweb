"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartAddon = {
  id: string;
  label: string;
  priceGhs: number;
  selected: boolean;
  required?: boolean;
};

export type CartItem = {
  id: string;
  kind: "domain" | "hosting" | "ssl";
  label: string;
  planCode: string;
  priceGhs: number;
  interval: "month" | "year";
  reference: string;
  addons: CartAddon[];
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalGhs: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  toggleAddon: (itemId: string, addonId: string, selected: boolean) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "oceancyber_checkout_cart_v1";
const CartContext = createContext<CartContextValue | null>(null);

function computeItemTotal(item: CartItem): number {
  const addOnsTotal = item.addons
    .filter((a) => a.selected || a.required)
    .reduce((sum, a) => sum + a.priceGhs, 0);
  return item.priceGhs + addOnsTotal;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      // ignore invalid persisted payloads
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((incoming: CartItem) => {
    setItems((prev) => {
      const exists = prev.some(
        (row) =>
          row.planCode === incoming.planCode &&
          row.label.toLowerCase() === incoming.label.toLowerCase(),
      );
      if (exists) return prev;
      return [...prev, incoming];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const toggleAddon = useCallback(
    (itemId: string, addonId: string, selected: boolean) => {
      setItems((prev) =>
        prev.map((row) => {
          if (row.id !== itemId) return row;
          return {
            ...row,
            addons: row.addons.map((addon) => {
              if (addon.id !== addonId || addon.required) return addon;
              return { ...addon, selected };
            }),
          };
        }),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totalGhs = items.reduce((sum, item) => sum + computeItemTotal(item), 0);
    return {
      items,
      itemCount: items.length,
      totalGhs,
      addItem,
      removeItem,
      toggleAddon,
      clearCart,
    };
  }, [items, addItem, removeItem, toggleAddon, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
