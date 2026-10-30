import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/products";
import ProductCard from "../ProductCard";
import { Reveal, SplitWords } from "../Reveal";

export async function NewArrivals() {
  let items = await getProducts({ isNew: true, limit: 4 }).catch(() => []);
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow text-charcoal/50">Just landed</p>
          </Reveal>
          <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] mt-4">
            <SplitWords text="New arrivals" />{" "}
            <span className="italic text-graphite">
              <SplitWords text="worth moving in." delay={0.2} />
            </span>
          </h2>
        </div>
        <Reveal delay={0.15} className="hidden md:block shrink-0">
          <Link
            href="/new-arrivals"
            className="group inline-flex items-center gap-2.5 border border-charcoal/20 rounded-full px-7 py-3.5 text-[11.5px] tracking-[0.2em] uppercase font-bold btn-sweep"
          >
            View all <ArrowRight size={15} className="cta-arrow" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 mt-10 md:mt-14">
        {items.map((p, i) => (
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

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/new-arrivals"
          className="inline-flex items-center gap-2 bg-charcoal text-cream rounded-full px-8 py-4 text-[11.5px] tracking-[0.2em] uppercase font-bold"
        >
          Explore all products <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

export async function BestSellers() {
  const items = await getProducts({ isBestSeller: true, limit: 4 }).catch(() => []);
  if (!items.length) return null;
  return (
    <section className="bg-ivory/70 border-y border-line">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-charcoal/50">Community favourites</p>
            </Reveal>
            <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] mt-4">
              <SplitWords text="Most" /> <span className="italic"><SplitWords text="loved." delay={0.15} /></span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-4 text-charcoal/55 text-[14.5px] max-w-[52ch]">
                The pieces our early community reaches for most. Sample showcase —
                live best-seller ranking activates with real sales data.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="hidden md:block shrink-0">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 bg-charcoal text-cream rounded-full px-7 py-3.5 text-[11.5px] tracking-[0.2em] uppercase font-bold hover:bg-graphite transition-colors"
            >
              Shop best sellers <ArrowRight size={15} className="cta-arrow" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 mt-10 md:mt-14">
          {items.map((p, i) => (
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
    </section>
  );
}
