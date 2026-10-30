"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Ruler, ChevronDown, Truck, RotateCcw, ShieldCheck, ShoppingBag } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "../CartProvider";
import ProductCard from "../ProductCard";
import type { Product } from "@/db/schema";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("desc");
  const { add } = useCart();

  const doAdd = () => {
    if (!color) {
      setError("Please choose a colour.");
      return;
    }
    if (!size) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    add(
      {
        slug: product.slug,
        name: product.name,
        size,
        color,
        priceCents: product.priceCents,
        image: product.images[0],
      },
      qty
    );
  };

  const accs = [
    { id: "desc", title: "Description", body: product.description },
    { id: "details", title: "Details & fit", body: product.details.join(" · ") },
    {
      id: "ship",
      title: "Shipping & returns",
      body: "Orders ship within 2–4 business days. Complimentary shipping on orders over $150. Easy 30-day returns and exchanges — items must be unworn with tags attached.",
    },
  ];

  return (
    <>
      <div className="pt-[130px] md:pt-[160px] mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <nav className="text-[11px] tracking-[0.2em] uppercase font-bold text-charcoal/45 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span>/</span>
          <Link href={product.gender === "women" ? "/women" : "/men"} className="hover:text-charcoal capitalize">
            {product.gender}
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mt-6 pb-20">
          {/* gallery */}
          <div>
            <div
              className="relative overflow-hidden rounded-[22px] bg-ivory aspect-[3/3.6] cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onClick={() => setImgIdx((imgIdx + 1) % product.images.length)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={product.images[imgIdx]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    "h-full w-full object-cover img-cinematic transition-transform duration-700",
                    zoom && "scale-[1.5]"
                  )}
                />
              </AnimatePresence>
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
                  New arrival
                </span>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === imgIdx ? "w-8 bg-cream" : "w-1.5 bg-cream/50"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={cn(
                    "rounded-2xl overflow-hidden aspect-square bg-ivory transition-all",
                    i === imgIdx ? "ring-2 ring-charcoal ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="lg:sticky lg:top-[150px] self-start">
            <p className="eyebrow text-charcoal/50">{product.categoryLabel}</p>
            <h1 className="font-display text-[36px] sm:text-[48px] leading-[1.03] mt-3">{product.name}</h1>
            <div className="flex items-baseline gap-3 mt-3">
              <p className="text-[22px] font-bold">{formatPrice(product.priceCents)}</p>
              {product.compareAtCents && (
                <p className="text-charcoal/45 line-through">{formatPrice(product.compareAtCents)}</p>
              )}
            </div>
            <p className="text-[13px] text-charcoal/50 mt-1.5">Sample pricing — final pricing confirmed at launch.</p>

            {/* colour */}
            <div className="mt-7">
              <p className="text-[12px] tracking-[0.18em] uppercase font-bold">
                Colour {color && <span className="text-charcoal/50 font-semibold normal-case tracking-normal">— {color}</span>}
              </p>
              <div className="flex gap-3 mt-3.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setColor(c.name);
                      setError(null);
                    }}
                    aria-label={c.name}
                    title={c.name}
                    className={cn(
                      "w-10 h-10 rounded-full border border-black/10 transition-all",
                      color === c.name ? "ring-2 ring-charcoal ring-offset-[3px] ring-offset-cream scale-105" : "hover:scale-105"
                    )}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* size */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-[12px] tracking-[0.18em] uppercase font-bold">Size</p>
                <button
                  onClick={() => setGuideOpen(true)}
                  className="flex items-center gap-1.5 text-[12.5px] font-bold text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <Ruler size={15} /> Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-3.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError(null);
                    }}
                    className={cn(
                      "min-w-[56px] px-4 py-3 rounded-2xl text-[13.5px] font-bold border transition-all",
                      size === s
                        ? "bg-charcoal text-cream border-charcoal"
                        : "border-line bg-white hover:border-charcoal/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-[13px] font-bold text-red-900 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            {/* qty + add */}
            <div className="flex gap-3 mt-7">
              <div className="flex items-center border border-line bg-white rounded-full px-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:opacity-60" aria-label="Decrease">
                  <Minus size={15} />
                </button>
                <span className="w-7 text-center font-bold text-[15px]">{qty}</span>
                <button onClick={() => setQty(Math.min(9, qty + 1))} className="p-3 hover:opacity-60" aria-label="Increase">
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={doAdd}
                className="group flex-1 bg-charcoal text-cream rounded-full text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-graphite transition-colors flex items-center justify-center gap-2.5"
              >
                <ShoppingBag size={16} /> Add to bag — {formatPrice(product.priceCents * qty)}
              </button>
            </div>

            {/* trust row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: Truck, label: "Ships in 2–4 days" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: ShieldCheck, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 bg-ivory/70 border border-line rounded-2xl py-4 px-2 text-center">
                  <Icon size={18} strokeWidth={1.6} className="text-charcoal/70" />
                  <p className="text-[11px] font-bold text-charcoal/70">{label}</p>
                </div>
              ))}
            </div>

            {/* accordions */}
            <div className="mt-7 border-t border-line">
              {accs.map((a) => (
                <div key={a.id} className="border-b border-line">
                  <button
                    onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)}
                    className="w-full flex items-center justify-between py-5 text-left font-bold text-[14.5px]"
                  >
                    {a.title}
                    <ChevronDown
                      size={17}
                      className={cn("transition-transform duration-300", openAcc === a.id && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAcc === a.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[14px] leading-relaxed text-charcoal/65">{a.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="pb-24">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-[32px] sm:text-[44px]">
                Complete <span className="italic">the fit.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 mt-8">
              {related.map((p, i) => (
                <ProductCard
                  key={p.slug}
                  index={i}
                  product={{
                    slug: p.slug,
                    name: p.name,
                    categoryLabel: p.categoryLabel,
                    priceCents: p.priceCents,
                    compareAtCents: p.compareAtCents,
                    images: p.images,
                    colors: p.colors,
                    sizes: p.sizes,
                    isNew: p.isNew,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* sticky mobile bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[50] bg-cream/95 backdrop-blur-xl border-t border-line px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[13.5px] truncate">{product.name}</p>
          <p className="text-[13px] text-charcoal/60">
            {formatPrice(product.priceCents)}
            {size && color ? ` · ${color} / ${size}` : " · Select options"}
          </p>
        </div>
        <button
          onClick={doAdd}
          className="bg-charcoal text-cream rounded-full px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-bold shrink-0"
        >
          Add to bag
        </button>
      </div>

      {/* size guide modal */}
      <AnimatePresence>
        {guideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGuideOpen(false)}
              className="fixed inset-0 z-[85] bg-charcoal/50"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="fixed z-[86] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[560px] bg-cream rounded-[24px] p-6 sm:p-9 max-h-[86svh] overflow-y-auto"
            >
              <h3 className="font-display text-3xl">Size guide</h3>
              <p className="text-[13.5px] text-charcoal/55 mt-2">
                Body measurements in inches. When between sizes, we recommend sizing up for a relaxed fit.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th className="py-3 pr-4 font-bold">Size</th>
                      <th className="py-3 pr-4 font-bold">Chest</th>
                      <th className="py-3 pr-4 font-bold">Waist</th>
                      <th className="py-3 font-bold">Hip</th>
                    </tr>
                  </thead>
                  <tbody className="text-charcoal/75">
                    {[
                      ["XS", "32–34", "24–26", "33–35"],
                      ["S", "34–36", "26–28", "35–37"],
                      ["M", "36–38", "28–31", "37–40"],
                      ["L", "39–42", "31–34", "40–43"],
                      ["XL", "42–45", "34–38", "43–46"],
                      ["XXL", "45–48", "38–41", "46–49"],
                    ].map((r) => (
                      <tr key={r[0]} className="border-b border-line/60">
                        <td className="py-3 pr-4 font-bold text-charcoal">{r[0]}</td>
                        <td className="py-3 pr-4">{r[1]}</td>
                        <td className="py-3 pr-4">{r[2]}</td>
                        <td className="py-3">{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setGuideOpen(false)}
                className="mt-6 w-full bg-charcoal text-cream rounded-full py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
