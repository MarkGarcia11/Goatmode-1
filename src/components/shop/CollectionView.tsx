"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard, { type CardProduct } from "../ProductCard";
import { cn } from "@/lib/utils";

export type CollectionProduct = CardProduct & {
  gender: string;
  category: string;
  colorsFull: { name: string; hex: string }[];
};

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Alphabetical" },
];

const PRICE_BANDS = [
  { id: "all", label: "All prices", test: (_: number) => true },
  { id: "u50", label: "Under $50", test: (c: number) => c < 5000 },
  { id: "50-70", label: "$50 – $70", test: (c: number) => c >= 5000 && c <= 7000 },
  { id: "70p", label: "Over $70", test: (c: number) => c > 7000 },
];

export default function CollectionView({
  products,
  categories,
}: {
  products: CollectionProduct[];
  categories: { id: string; label: string }[];
}) {
  const [cat, setCat] = useState("all");
  const [sizes, setSizes] = useState<string[]>([]);
  const [color, setColor] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);

  const allSizes = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.sizes.forEach((z) => s.add(z)));
    const order = ["XS", "S", "M", "L", "XL", "XXL"];
    return [...s].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [products]);

  const allColors = useMemo(() => {
    const m = new Map<string, string>();
    products.forEach((p) => p.colorsFull.forEach((c) => m.set(c.name, c.hex)));
    return [...m.entries()].map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === price)!;
    let list = products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (sizes.length === 0 || sizes.some((s) => p.sizes.includes(s))) &&
        (color === "all" || p.colorsFull.some((c) => c.name === color)) &&
        band.test(p.priceCents)
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, cat, sizes, color, price, sort]);

  const activeCount =
    (cat !== "all" ? 1 : 0) + sizes.length + (color !== "all" ? 1 : 0) + (price !== "all" ? 1 : 0);

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const clear = () => {
    setCat("all");
    setSizes([]);
    setColor("all");
    setPrice("all");
  };

  const filtersUI = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow text-charcoal/50">Category</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {[{ id: "all", label: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[12.5px] font-bold border transition-all",
                cat === c.id
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-line bg-white hover:border-charcoal/30"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow text-charcoal/50">Size</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                "min-w-[46px] px-3 py-2.5 rounded-xl text-[12.5px] font-bold border transition-all",
                sizes.includes(s)
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-line bg-white hover:border-charcoal/30"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow text-charcoal/50">Colour</p>
        <div className="flex flex-wrap gap-2.5 mt-4">
          <button
            onClick={() => setColor("all")}
            className={cn(
              "px-4 py-2 rounded-full text-[12px] font-bold border",
              color === "all" ? "bg-charcoal text-cream border-charcoal" : "border-line bg-white"
            )}
          >
            All
          </button>
          {allColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(color === c.name ? "all" : c.name)}
              title={c.name}
              className={cn(
                "w-9 h-9 rounded-full border border-black/10 transition-all",
                color === c.name && "ring-2 ring-charcoal ring-offset-2 ring-offset-cream scale-110"
              )}
              style={{ background: c.hex }}
              aria-label={c.name}
            />
          ))}
        </div>
        {color !== "all" && <p className="text-[12.5px] text-charcoal/60 mt-2">{color}</p>}
      </div>
      <div>
        <p className="eyebrow text-charcoal/50">Price</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {PRICE_BANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => setPrice(b.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[12.5px] font-bold border transition-all",
                price === b.id
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-line bg-white hover:border-charcoal/30"
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button onClick={clear} className="link-line text-[12px] tracking-[0.18em] uppercase font-bold text-charcoal/70">
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* toolbar */}
      <div className="flex items-center justify-between gap-4 py-5 border-y border-line sticky top-[104px] md:top-[112px] z-30 bg-cream/90 backdrop-blur-xl -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawer(true)}
            className="lg:hidden flex items-center gap-2 border border-charcoal/20 rounded-full px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase font-bold"
          >
            <SlidersHorizontal size={15} /> Filters
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-charcoal text-cream text-[10px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
          <p className="text-[13px] text-charcoal/55 hidden sm:block">
            <span className="font-bold text-charcoal">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>
        <label className="flex items-center gap-2 text-[12px] font-bold">
          <span className="hidden sm:inline text-charcoal/50 uppercase tracking-[0.16em]">Sort</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-ivory border border-line rounded-full pl-5 pr-10 py-2.5 text-[12.5px] font-bold outline-none cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/60" />
          </span>
        </label>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10 py-10">
        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-[210px]">{filtersUI}</div>
        </aside>

        {/* grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-ivory/60 rounded-[22px]">
              <p className="font-display text-3xl">Nothing matches those filters</p>
              <p className="text-charcoal/55 text-sm mt-2">Try widening your selection.</p>
              <button
                onClick={clear}
                className="mt-6 bg-charcoal text-cream rounded-full px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-bold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} index={i} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-[80] bg-charcoal/45 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[81] bg-cream rounded-t-[26px] max-h-[86svh] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                <p className="font-display text-2xl">Filters</p>
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="Close filters"
                  className="p-2 rounded-full bg-ivory"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-6">{filtersUI}</div>
              <div className="px-6 py-4 border-t border-line">
                <button
                  onClick={() => setDrawer(false)}
                  className="w-full bg-charcoal text-cream rounded-full py-4 text-[12px] tracking-[0.2em] uppercase font-bold"
                >
                  Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
