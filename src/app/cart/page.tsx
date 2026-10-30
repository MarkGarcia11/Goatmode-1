"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingBag, Lock } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQty, remove } = useCart();
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 800;
  const total = subtotal + shipping;

  return (
    <div className="pt-[150px] md:pt-[170px] mx-auto max-w-[1200px] px-5 sm:px-8 pb-24 min-h-[70vh]">
      <p className="eyebrow text-charcoal/50">Shopping bag</p>
      <h1 className="font-display text-[44px] sm:text-[64px] mt-3">
        Your <span className="italic">bag.</span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-ivory/60 rounded-[24px] mt-10">
          <span className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto">
            <ShoppingBag size={24} strokeWidth={1.4} className="text-charcoal/60" />
          </span>
          <p className="font-display text-3xl mt-5">Your bag is empty</p>
          <p className="text-charcoal/55 text-sm mt-2">Every journey begins somewhere.</p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 bg-charcoal text-cream rounded-full px-8 py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold"
          >
            Start shopping <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 mt-10 items-start">
          <div className="space-y-5">
            {items.map((item) => (
              <motion.div
                key={item.key}
                layout
                className="flex gap-4 sm:gap-6 bg-white border border-line rounded-[20px] p-4 sm:p-5"
              >
                <Link href={`/product/${item.slug}`} className="w-[96px] sm:w-[130px] aspect-[3/3.6] rounded-2xl overflow-hidden bg-ivory shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${item.slug}`} className="font-bold text-[15.5px] hover:opacity-70">
                        {item.name}
                      </Link>
                      <p className="text-[13px] text-charcoal/55 mt-1">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.key)}
                      aria-label="Remove"
                      className="p-2 text-charcoal/45 hover:text-charcoal"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center border border-line rounded-full">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="p-2.5 px-3 hover:opacity-60" aria-label="Decrease">
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center font-bold text-[14px]">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="p-2.5 px-3 hover:opacity-60" aria-label="Increase">
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-[16px]">{formatPrice(item.priceCents * item.qty)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <Link href="/shop" className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase font-bold text-charcoal/70 hover:text-charcoal pt-2">
              <ArrowLeft size={15} /> Continue shopping
            </Link>
          </div>

          <div className="bg-charcoal text-cream rounded-[24px] p-7 sm:p-8 lg:sticky lg:top-[150px]">
            <p className="font-display text-3xl">Summary</p>
            <div className="mt-6 space-y-3.5 text-[14px]">
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span className="text-cream font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Shipping</span>
                <span className="text-cream font-bold">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[12.5px] text-cream/50">
                  {formatPrice(15000 - subtotal)} away from complimentary shipping.
                </p>
              )}
              <div className="border-t border-cream/15 pt-4 flex justify-between text-[16px]">
                <span className="font-bold">Total</span>
                <span className="font-bold">{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="group mt-7 w-full bg-cream text-charcoal rounded-full py-4 text-center text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={14} /> Secure checkout <ArrowRight size={15} className="cta-arrow" />
            </Link>
            <p className="mt-4 text-[12px] text-cream/45 text-center leading-relaxed">
              Taxes calculated at checkout. Secure 256-bit encrypted payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
