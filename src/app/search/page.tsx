import { getProducts } from "@/lib/products";
import CollectionView from "@/components/shop/CollectionView";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const items = q ? await getProducts({ search: q }).catch(() => []) : [];
  return (
    <div className="pt-[150px] md:pt-[170px] mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-24 min-h-[70vh]">
      <Reveal>
        <p className="eyebrow text-charcoal/50">Search</p>
        <h1 className="font-display text-[42px] sm:text-[60px] mt-3">
          {q ? (
            <>
              Results for <span className="italic">“{q}”</span>
            </>
          ) : (
            "Search the collection"
          )}
        </h1>
      </Reveal>
      {q && (
        <div className="mt-4">
          <CollectionView
            products={items.map((p) => ({
              slug: p.slug,
              name: p.name,
              categoryLabel: p.categoryLabel,
              priceCents: p.priceCents,
              compareAtCents: p.compareAtCents,
              images: p.images,
              colors: p.colors,
              colorsFull: p.colors,
              sizes: p.sizes,
              isNew: p.isNew,
              gender: p.gender,
              category: p.category,
            }))}
            categories={[
              { id: "shirts", label: "Shirts" },
              { id: "shorts", label: "Shorts" },
              { id: "hoodies", label: "Hoodies" },
              { id: "leggings", label: "Leggings" },
              { id: "tops", label: "Tops" },
            ]}
          />
        </div>
      )}
    </div>
  );
}
