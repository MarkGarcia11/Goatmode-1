"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { open, setOpen, items, subtotal, updateQty, remove } = useCart();
  const freeShipAt = 15000;
  const progress = Math.min(1, subtotal / freeShipAt);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-charcoal/45 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[81] w-full max-w-[440px] bg-cream flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="font-display text-2xl">
                Your Bag{" "}
                <span className="text-sm font-sans text-charcoal/50">({items.reduce((a, i) => a + i.qty, 0)})</span>
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            {/* free shipping meter */}
            <div className="px-6 py-4 border-b border-line bg-ivory/60">
              <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-charcoal/70">
                {subtotal >= freeShipAt
                  ? "Complimentary shipping unlocked"
                  : `${formatPrice(freeShipAt - subtotal)} away from complimentary shipping`}
              </p>
              <div className="mt-2.5 h-[3px] rounded-full bg-charcoal/10 overflow-hidden">
                <motion.div
                  className="h-full bg-charcoal rounded-full"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center">
                    <ShoppingBag size={24} strokeWidth={1.4} className="text-charcoal/60" />
                  </span>
                  <p className="font-display text-2xl mt-5">Your bag is empty</p>
                  <p className="text-sm text-charcoal/55 mt-2 max-w-[240px]">
                    Every journey begins somewhere. Start with the essentials.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 rounded-full hover:bg-graphite transition-colors"
                  >
                    Explore collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-[88px] h-[108px] rounded-xl overflow-hidden bg-ivory shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[14px] leading-tight">{item.name}</p>
                          <p className="text-[12px] text-charcoal/55 mt-1">
                            {item.color} · Size {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(item.key)}
                          aria-label="Remove item"
                          className="p-1.5 text-charcoal/45 hover:text-charcoal transition-colors"
                        >
                          <Trash2 size={15} strokeWidth={1.7} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-line rounded-full">
                          <button
                            onClick={() => updateQty(item.key, item.qty - 1)}
                            className="p-2 px-2.5 hover:opacity-60"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-[13px] font-bold w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.key, item.qty + 1)}
                            className="p-2 px-2.5 hover:opacity-60"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="font-bold text-[14px]">{formatPrice(item.priceCents * item.qty)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-line bg-cream">
                <div className="flex justify-between text-[14px]">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-bold text-[17px]">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[12px] text-charcoal/50 mt-1.5">
                  Shipping & taxes calculated at checkout.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="btn-sweep border border-charcoal/25 rounded-full py-3.5 text-center text-[11px] tracking-[0.18em] uppercase font-bold"
                  >
                    View bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="group bg-charcoal text-cream rounded-full py-3.5 text-center text-[11px] tracking-[0.18em] uppercase font-bold hover:bg-graphite transition-colors flex items-center justify-center gap-2"
                  >
                    Checkout <ArrowRight size={14} className="cta-arrow" />
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
