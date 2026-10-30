"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  size: string;
  color: string;
  qty: number;
  priceCents: number;
  image: string;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  lastAdded: CartItem | null;
  toast: string | null;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gm-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("gm-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const add: CartCtx["add"] = useCallback(
    (item, qty = 1) => {
      const key = `${item.slug}__${item.size}__${item.color}`;
      setItems((prev) => {
        const found = prev.find((p) => p.key === key);
        if (found) {
          return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + qty } : p));
        }
        return [...prev, { ...item, key, qty }];
      });
      setLastAdded({ ...item, key, qty });
      setOpen(true);
    },
    []
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty } : p))
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => p.key !== key));
    showToast("Removed from bag");
  }, [showToast]);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    return {
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal: items.reduce((a, i) => a + i.qty * i.priceCents, 0),
    };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, open, setOpen, add, updateQty, remove, clear, lastAdded, toast }),
    [items, count, subtotal, open, add, updateQty, remove, clear, lastAdded, toast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
