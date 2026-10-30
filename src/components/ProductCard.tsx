"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartProvider";

export type CardProduct = {
  slug: string;
  name: string;
  categoryLabel: string;
  priceCents: number;
  compareAtCents?: number | null;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean | null;
};

export default function ProductCard({ product, index = 0 }: { product: CardProduct; index?: number }) {
  const [hover, setHover] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const { add } = useCart();
  const second = product.images[1] ?? product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden rounded-[18px] bg-ivory aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover img-cinematic transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          style={{ opacity: hover ? 0 : 1 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={second}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover img-cinematic transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          style={{ opacity: hover ? 1 : 0 }}
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
            New
          </span>
        )}
        {product.compareAtCents && (
          <span className="absolute top-4 left-4 bg-charcoal text-cream px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
            Sample offer
          </span>
        )}
        {/* quick add */}
        <div
          className={`absolute inset-x-4 bottom-4 transition-all duration-500 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          } hidden sm:block`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              add(
                {
                  slug: product.slug,
                  name: product.name,
                  size: product.sizes[Math.min(1, product.sizes.length - 1)] ?? "M",
                  color: product.colors[colorIdx]?.name ?? "Default",
                  priceCents: product.priceCents,
                  image: product.images[0],
                },
                1
              );
            }}
            className="w-full bg-cream/95 backdrop-blur text-charcoal rounded-full py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-charcoal hover:text-cream transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={15} /> Quick add
          </button>
        </div>
        {/* mobile quick add */}
        <button
          onClick={(e) => {
            e.preventDefault();
            add(
              {
                slug: product.slug,
                name: product.name,
                size: product.sizes[Math.min(1, product.sizes.length - 1)] ?? "M",
                color: product.colors[colorIdx]?.name ?? "Default",
                priceCents: product.priceCents,
                image: product.images[0],
              },
              1
            );
          }}
          aria-label={`Quick add ${product.name}`}
          className="sm:hidden absolute bottom-3 right-3 w-10 h-10 rounded-full bg-cream text-charcoal flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Plus size={18} />
        </button>
      </Link>

      <div className="pt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10.5px] tracking-[0.2em] uppercase font-bold text-charcoal/45">
              {product.categoryLabel}
            </p>
            <Link href={`/product/${product.slug}`} className="block mt-1 font-bold text-[15px] leading-snug hover:opacity-70 transition-opacity">
              {product.name}
            </Link>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-[15px]">{formatPrice(product.priceCents)}</p>
            {product.compareAtCents && (
              <p className="text-[12px] text-charcoal/45 line-through">{formatPrice(product.compareAtCents)}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          {product.colors.slice(0, 5).map((c, i) => (
            <button
              key={c.name}
              onClick={() => setColorIdx(i)}
              aria-label={c.name}
              title={c.name}
              className={`w-5 h-5 rounded-full border transition-all ${
                colorIdx === i ? "ring-2 ring-charcoal ring-offset-2 ring-offset-cream scale-110" : "border-black/10 hover:scale-110"
              }`}
              style={{ background: c.hex }}
            />
          ))}
          <span className="text-[11.5px] text-charcoal/50 ml-1">{product.colors[colorIdx]?.name}</span>
        </div>
      </div>
    </motion.article>
  );
}
